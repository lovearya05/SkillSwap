import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { } from 'react-native-svg'
import { textBlk, textGry, textwhite } from '../../components/baseStyleSheet'
import { getDataFromFireBase, handleUpdateUser, requestStoragePermission, scale } from '../../utilityFunctions/utilityFunctions'
import AddSkillModal from './EditProfileModal'
import { useAuth } from '../../context/AuthContext'
import * as ImagePicker from 'react-native-image-picker';
import Post from '../../components/Post'
import HorizontalLine from '../../components/HorizontalLine'
import ShowPosts from '../Home/ShowPosts'
import { useIsFocused } from '@react-navigation/native'
import EditProfileModalDetails from './EditProfileModalDetails'


const ProfileScreen = () => {
  const [addSkillType, setAddSkillType] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [users, setUsers] = useState([])
  const { user, userData, logout, login, updateUserData } = useAuth();

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchUsers()
  }, [userData, isFocused])

  const fetchUsers = async () => {
    const data = await getDataFromFireBase('users')
    console.log('datadatadatadatadatadatadatadata', data)
    if (data) setUsers(data.filter((usr) => usr.email != userData.email));
  }


  const handleAddSkill = (imageUrl = '') => {
    if (userData.email) {
      const updatedData = { ...userData, avatarUrl: imageUrl }
      handleUpdateUser(userData.email, updatedData, () => updateUserData());
    }
  };

  const pickImage = async () => {
    const response = await requestStoragePermission();
    if (!response) return;
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
      multiple: false,
    };
    try {

      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response?.assets[0] };
          const source1 = { uri: response?.assets[1] };
          const source2 = { uri: response?.assets[2] };

          const images = [];
          if (source?.uri) images.push(source);
          if (source1?.uri) images.push(source1);
          if (source2?.uri) images.push(source2);

          console.log('images', images)
          setImage(images);
          uploadImages(images)
        }
      });

    } catch (error) {
      setImage([])
      console.log('image pic error', error)
    }

  };

  const YOUR_CLOUD_NAME = 'daznasbt0';
  const YOUR_UPLOAD_PRESET = 'skillSwap';

  const uploadImages = async (images) => {

    if (images.length === 0) return;
    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const img1 of images) {
        const img = img1.uri;
        const formData = new FormData();
        formData.append('upload_preset', YOUR_UPLOAD_PRESET);
        formData.append('file', {
          uri: uri = img.uri.startsWith('file://') ? img.uri : `file://${img.uri}`,
          type: img.type || 'image/jpeg',
          name: img.fileName || `image-${Date.now()}.jpg`,
          width: img.width,
          height: img.height,
        });

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${YOUR_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      }
      uploadedUrls[0] && handleAddSkill(uploadedUrls[0])
      console.log('All images uploaded successfully:', uploadedUrls);

      alert(`Successfully uploaded ${uploadedUrls.length} images`);

    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload some images');
    } finally {
      setUploading(false);
    }
  };


  const ConnectToUser = (connectionTo = {}) => {
    const connectedData = userData['connectedUser'] || []
    connectedData.push(connectionTo?.email);
    const currentUser = { ...userData, connectedUser: connectedData }

    // 2nd user 
    const connectedData2 = connectionTo['connectedUser'] || []
    connectedData2.push(userData.email);
    const connectedUser = { ...connectionTo, connectedUser: connectedData2 }

    handleUpdateUser(connectionTo?.email, connectedUser)
    handleUpdateUser(userData?.email, currentUser, () => {
      fetchUsers()
      updateUserData()
    })
  }

  const editIcon = (type = '') => {
    return (
      <TouchableOpacity onPress={() => {
        if (type === 'name') {
          setAddSkillType('editName')
        } else if (type === 'pic') {
          pickImage()
        } else if (type === 'skills') {
          setAddSkillType('skills')
        } else if (type === 'interestedSkills') {
          setAddSkillType('interestedSkills')
        }
      }} style={{ marginLeft: scale(10) }} >
        <Image style={{ height: scale(20), width: scale(20) }} source={require('../../assets/icons/editIcon.png')} />
      </TouchableOpacity>
    )
  }
  const userProfileDetails = () => {
    const userName = userData?.userName || ''
    const userEmail = userData?.email || ''
    const userBio = userData?.bio || ''
    const profileImage = userData?.avatarUrl ? { uri: userData?.avatarUrl } : require('../../assets/icons/userProfileIcon.png')
    return (
      <View style={{ paddingVertical: scale(40), paddingHorizontal: scale(16) }} >
        <View style={{ flexDirection: 'row' }} >
          <View style={{}} >
            <Image source={profileImage} style={{ height: scale(100), width: scale(100), borderRadius: scale(200) }} />
            <View style={{ position: 'absolute', bottom: 0, left: scale(30), bottom: scale(5) }} >
              {editIcon('pic')}
            </View>
          </View>
          <View style={{ paddingHorizontal: scale(20) }} >
            <View style={{ flexDirection: 'row', }} >
              <Text style={textBlk(16, 800)} >{userName}</Text>
              {editIcon('name')}
            </View>
            <Text style={textGry(14, 500)} >{userEmail}</Text>
          </View>
        </View>
        <View style={{paddingVertical: scale(12)}} >
          <Text style={textBlk(12, 400)} >{userBio}</Text>
        </View>
      </View>
    )
  }
  const skillsSection = () => {
    const userSkills = userData?.skills || []

    return (
      <View style={{ paddingHorizontal: scale(16) }} >
        <View style={{ flexDirection: 'row', }} >
          <Text style={textBlk(20, 600)}>Skills</Text>
          {editIcon('skills')}
        </View>

        <View style={{ flexDirection: 'row', paddingVertical: scale(10) }} >
          {userSkills.map((item, i) => {
            return (
              <View key={i} style={{ backgroundColor: '#fff', marginRight: scale(12), padding: scale(8), borderRadius: scale(10) }} >
                <Text style={textBlk(14, 600)} >{item}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
  const skillsOfInterest = () => {
    const userSkills = userData?.skillToLearn || []
    return (
      <View style={{ paddingHorizontal: scale(16), paddingVertical: scale(8) }} >
        <View style={{ flexDirection: 'row', }} >
          <Text style={textBlk(20, 600)}>Skills of Interest</Text>
          {editIcon('interestedSkills')}
        </View>

        <View style={{ flexDirection: 'row', paddingVertical: scale(10) }} >
          {userSkills.map((item, i) => {
            return (
              <View key={i} style={{ backgroundColor: '#fff', marginRight: scale(12), padding: scale(8), borderRadius: scale(10) }} >
                <Text style={textBlk(14, 600)} >{item}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
  const suggestedProfiles = () => {

    return (
      <View >
        <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingBottom: scale(16)}} >
          <Text style={textBlk(20, 600)}>Suggestions</Text>
        </View>
        <FlatList
          data={users}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const profileImage = item?.avatarUrl ? { uri: item?.avatarUrl } : require('../../assets/icons/userProfileIcon.png')
            const profileName = item?.userName || ''
            const skills = item?.skills || []
            const isUserConnected = userData?.connectedUser?.some((usr) => usr == item?.email)

            return (
              <View style={{ paddingHorizontal: scale(12), marginLeft: scale(20), paddingVertical: scale(10), borderRadius: scale(8), backgroundColor: '#fff', width: scale(160) }} >
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: scale(8) }} >
                  <Image source={profileImage} style={{ height: scale(100), width: scale(100), borderRadius: scale(200) }} />
                </View>

                <View>
                  <Text style={textBlk(14, 500)} >{profileName}</Text>
                  <View style={{ flexDirection: 'row', overflow: 'hidden' }} >
                    {skills.map((item, i) => {
                      return (
                        <Text numberOfLines={1} key={i} style={[textGry(14, 400), { marginRight: scale(8), }]} >{item}</Text>
                      )
                    })}
                  </View>
                </View>

                {/* connect button  */}
                <TouchableOpacity disabled={isUserConnected} onPress={() => ConnectToUser(item)} style={{ opacity: isUserConnected ? 0.8 : 1, backgroundColor: isUserConnected ? 'green' : 'blue', paddingVertical: scale(4), marginHorizontal: scale(16), borderRadius: scale(4), marginVertical: scale(8) }} >
                  <Text style={[textwhite(16, 500), { textAlign: 'center' }]} >{isUserConnected ? 'Connected' : 'Connect'}</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />

      </View>
    )
  }


  return (
    <ScrollView>

      <AddSkillModal addSkillType={addSkillType} setAddSkillType={setAddSkillType} />
      <EditProfileModalDetails  addSkillType={addSkillType} setAddSkillType={setAddSkillType} />

      <HorizontalLine />
      {userProfileDetails()}
      {/* <HorizontalLine/> */}
      {skillsSection()}
      {/* <HorizontalLine/> */}
      {skillsOfInterest()}
      <HorizontalLine />
      {suggestedProfiles()}
      <HorizontalLine />
      <ShowPosts renderCurrentUserOnly={true} />
      <View>

      </View>
    </ScrollView>
  )
}

export default ProfileScreen