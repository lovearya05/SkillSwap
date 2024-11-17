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
    const profileName = learnWith?.name ? learnWith?.name : 'User Name'

    return (
      <View style={{ paddingVertical: scale(8), paddingHorizontal: scale(16), flexDirection: 'row', paddingVertical: scale(8), backgroundColor: '#fff' }} >
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
    )
  }
  const handleStartCall = () => {
    const connectedUsers = learnWith?.connectedUser || []
    const conDetails = connectedUsers.filter(item=> item.email == userData.email);
    const meetUrl = conDetails[0] ? conDetails[0]?.meetUrl : null;

    navigation.navigate('JitsiMeet', {meetUrl})
  }

  const renderBody = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }} >
        <TouchableOpacity onPress={handleStartCall} style={{ opacity: 1, backgroundColor: 'blue', paddingHorizontal: scale(12), paddingVertical: scale(8), marginHorizontal: scale(16), borderRadius: scale(4), marginVertical: scale(8) }} >
          <Text style={[textwhite(16, 500), { textAlign: 'center' }]} >{'Start Call'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      {topHeader()}
      {renderBody()}
    </View>
  )
}

export default LearningScreen