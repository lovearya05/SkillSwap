import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData, scale } from '../../utilityFunctions/utilityFunctions';
import { useAuth } from '../../context/AuthContext';
import HorizontalLine from '../../components/HorizontalLine';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { textBlk, textGry, textwhite } from '../../components/baseStyleSheet';

const UserSkillList = ({ otherUser = '', }) => {

  const [otherUserData, setOthereUserData] = useState(null)
  const { user, userData, updateUserData } = useAuth();


  const fetchData = async () => {
    if (otherUser) {
      getUserData(otherUser, (data) => {
        setOthereUserData(data)
      })
    }
  }
  const isFocused = useIsFocused()
  console.log('otherUserData',)
  useEffect(() => {
    if (otherUser) {
      fetchData()
    }
  }, [otherUser, isFocused])

  const navigation = useNavigation()

  const handleStartLearning = () =>{
    navigation.navigate('LearningScreen', {learnWith: otherUserData })
  }

  const profileImage = otherUserData?.avatarUrl ? { uri: otherUserData?.avatarUrl } : require('../../assets/icons/userProfileIcon.png')
  const profileName = otherUserData?.name ? otherUserData?.name : 'User Name'
  const skills = otherUserData?.skills || []

  return (
    <View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
        <View style={{ flexDirection: 'row', paddingVertical: scale(18), paddingHorizontal: scale(16) }} >
          <Image source={profileImage} style={{ height: scale(45), width: scale(45), borderRadius: scale(200) }} />

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
        <TouchableOpacity onPress={handleStartLearning } style={{ opacity: 1, backgroundColor: 'blue', paddingHorizontal: scale(12), paddingVertical: scale(8), marginHorizontal: scale(16), borderRadius: scale(4), marginVertical: scale(8) }} >
          <Text style={[textwhite(16, 500), { textAlign: 'center' }]} >{'Start Learning'}</Text>
        </TouchableOpacity>
      </View>

      <HorizontalLine />
    </View>
  )
}

export default UserSkillList