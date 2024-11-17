import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from '../../utilityFunctions/utilityFunctions';
import { textBlk, textGry, textwhite } from '../../components/baseStyleSheet';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const LearningScreen = ({ route }) => {
  const { learnWith = {} } = route?.params;
  const navigation = useNavigation();
  const { user, userData } = useAuth();


  const topHeader = () => {
    const profileImage = learnWith?.avatarUrl ? { uri: learnWith?.avatarUrl } : require('../../assets/icons/userProfileIcon.png')
    const skills = learnWith?.skills || []
    const profileName = learnWith?.userName ? learnWith?.userName : 'User Name'
    const bio = learnWith.bio || ''

    return (
      <View style={{ paddingHorizontal: scale(16),paddingBottom:scale(12) }} >

        <View style={{ paddingVertical: scale(8),  flexDirection: 'row', paddingVertical: scale(8),}} >
          <Image source={profileImage} style={{ height: scale(50), width: scale(50), borderRadius: scale(200) }} />

          <View style={{ marginLeft: scale(12) }} >
            <Text style={textBlk(14, 500)} >{profileName}</Text>
            <View style={{ flexDirection: 'row', overflow: 'hidden' }} >
              {skills.map((item, i) => {
                return (
                  <Text numberOfLines={1} key={i} style={[textGry(14, 400), { marginRight: scale(8), }]} >{item}</Text>
                )
              })}
            </View>
          </View>
        </View>

        <View  >
          <Text style={[textBlk(14, 400)]} >{bio}</Text>
        </View>
      </View>

    )
  }
  const handleStartCall = () => {
    const connectedUsers = learnWith?.connectedUser || []
    const conDetails = connectedUsers.filter(item => item.email == userData.email);
    const meetUrl = conDetails[0] ? conDetails[0]?.meetUrl : null;

    navigation.navigate('JitsiMeet', { meetUrl })
  }

  console.log('le', learnWith)

  const renderBody = () => {
    const profileImage = learnWith?.avatarUrl ? { uri: learnWith?.avatarUrl } : require('../../assets/icons/userProfileIcon.png')
    const currProfileImage = userData?.avatarUrl ? { uri: userData?.avatarUrl } : require('../../assets/icons/userProfileIcon.png')
    const profileName = learnWith?.userName ? learnWith?.userName : 'User Name'

    return (
      <View style={{ backgroundColor: '#fff', flex: 1, flexDirection:'column', justifyContent:'space-between' }} >
        <View>
          {[0,0].map((item, i)=>{
            return(
              <View key={i} style={{paddingHorizontal: scale(16), marginTop:scale(12), flexDirection: i==0 ? 'row': 'row-reverse'}} >
                <Image source={i==0 ? profileImage : currProfileImage} style={{height: scale(30), width: scale(30), borderRadius: scale(200)}} />

                <View style={{marginStart: scale(4)}} >
                  {i==0 && (<Text style={[textBlk(10, 200),{ paddingBottom: scale(2), marginLeft: scale(4)}]} >{profileName}</Text>)}
                  <View style={{backgroundColor: i==0 ? '#EDEFF2' : '#3071FF', paddingHorizontal: scale(16), paddingVertical: scale(8), borderRadius: scale(20)}} >
                    <Text>{i==0 ? `Hey ${userData?.userName}, how's it going?` : 'Just finished a great book!'}</Text>
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        <View style={{ height: scale(50), width: scale(376) }} >
          <Image source={require('../../assets/ImageIcons/chatBottom.png')} style={{  height: scale(50), width: scale(376)}} resizeMode={'cover'} />
        </View>
        
      </View>
    )
  }
  const renderTopPageTitle = () => {
    return (
      <View style={{ paddingVertical: scale(12), paddingHorizontal: scale(16), flexDirection: 'row', justifyContent: 'space-between' }} >
      <View style={{flexDirection:'row', alignItems:'center'}} >
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Image source={require('../../assets/icons/backIcon.png')} style={{ height: scale(30), width: scale(30) }} />
        </TouchableOpacity>
      <Text style={[textBlk(14,500), {marginLeft: scale(16)}]} >Chat Room</Text>
      </View>
        <TouchableOpacity onPress={handleStartCall} >
          <Image source={require('../../assets/icons/videoIcon.png')} style={{ height: scale(30), width: scale(30) }} />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={{flex: 1}} >
      {renderTopPageTitle()}
      {topHeader()}
      {renderBody()}
    </View>
  )
}

export default LearningScreen