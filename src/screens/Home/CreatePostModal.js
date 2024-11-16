import { View, Text, Modal, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createdAt, createNewDocument, requestStoragePermission, scale, showToast } from '../../utilityFunctions/utilityFunctions'
import { textBlk, textwhite } from '../../components/baseStyleSheet'
import InputBox from '../../components/InputBox'
import * as ImagePicker from 'react-native-image-picker';
import { useAuth } from '../../context/AuthContext'
import LoadingScreen from '../../components/LoadingScreen'


const CreatePostModal = ({ showCreatePost = false, setShowCreatePost = () => { } }) => {
  const [postDesc, setPostDesc] = useState('');
  const [images, setImages] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user, userData, logout, login, updateUserData } = useAuth();


  console.log('userData', userData)

  const postPost = (uploadedUrls = []) => {
    if ((images && images.lenght > 0) || postDesc) {

      createNewDocument('posts', {
        email: userData?.email,
        userName: userData?.userName,
        postDesc: postDesc,
        postImage: uploadedUrls,
        createdAt: createdAt()
      })
      setUploading(false)
      setPostDesc('')
      setImages(null)
      setShowCreatePost(false)
    } else {
      showToast('Please write something')
    }
  }

  const YOUR_CLOUD_NAME = 'daznasbt0';
  const YOUR_UPLOAD_PRESET = 'skillSwap';

  const uploadImages = async () => {
    console.log('uplading')
    if (!images || images.length === 0) {
      setUploading(true);
      postPost()
      return
    }

    setUploading(true);
    const uploadedUrls = [];

    try {
      console.log('img ---> 1', images)
      for (const img1 of images) {
        console.log('img ---> 2')
        const img = img1.uri;
        console.log('img --->', img)
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
        console.log('uplading ...',)
        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      }

      postPost(uploadedUrls)
      console.log('All images uploaded successfully:', uploadedUrls);

    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload some images');
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    const response = await requestStoragePermission();
    if (!response) return;
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 3,
      multiple: true,
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
          setImages(images);
          // uploadImages(images)
        }
      });

    } catch (error) {
      setImages([])
      console.log('image pic error', error)
    }

  };

  if (uploading && showCreatePost) {
    return (
      <View style={{ height: '100%', flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }} >
        <LoadingScreen />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <Modal
        visible={showCreatePost}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCreatePost(false)}
      >
        <View style={{ marginTop: scale(40), backgroundColor: '#fff', paddingHorizontal: scale(16), paddingVertical: scale(14) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

            <TouchableOpacity onPress={() => setShowCreatePost(false)} >
              <Image source={require('../../assets/icons/closeIcon.png')} style={{ height: scale(30), width: scale(30) }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={uploadImages} style={{ backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(16), borderRadius: scale(30) }} >
              <Text style={textwhite(16, 600)} >Post</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingVertical: scale(4) }} >
            <InputBox
              placeholderText='What do you want to talk about?'
              height={200}
              value={postDesc}
              setValue={setPostDesc}
              useLightTheme={true}
            />
            <View style={{ flexDirection: 'row' }} >
              {images && images.map((item, i) => {
                return (
                  <View key={i} style={{ marginRight: scale(8) }} >
                    <Image source={{ uri: item.uri.uri }} style={{ height: scale(100), width: scale(100) }} />
                  </View>
                )
              })}
            </View>
            <TouchableOpacity onPress={pickImage} >
              <Image source={require('../../assets/icons/gallery.png')} style={{ height: scale(30), width: scale(30) }} />
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </SafeAreaView>
  )
}

export default CreatePostModal