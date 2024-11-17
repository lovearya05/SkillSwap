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
    getUserData(otherUser.email, (data) => {
      setOthereUserData(data)
    })
  }
  const isFocused = useIsFocused()
  
  useEffect(() => {
    if (otherUser.email) {
      fetchData()
    }
  }, [otherUser.email, isFocused])

  const navigation = useNavigation()

  const handleStartLearning = () => {
    navigation.navigate('LearningScreen', { learnWith: otherUserData })
  }

  const profileImage = otherUserData?.avatarUrl ? { uri: otherUserData?.avatarUrl } : require('../../assets/icons/userProfileIcon.png')
  const profileName = otherUserData?.userName ? otherUserData?.userName : 'User Name'
  const skills = otherUserData?.skills || []

  return (
    <View >

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: scale(16) }} >
        <View style={{ flexDirection: 'row', paddingVertical: scale(18), width: scale(200) }} >
          <Image source={profileImage} style={{ height: scale(45), width: scale(45), borderRadius: scale(200) }} />
          <View style={{ marginLeft: scale(12) }} >
            <Text style={textBlk(14, 500)} >{profileName}</Text>
            <View style={{ flexDirection: 'row', overflow: 'hidden' }} >
            {skills.map((item, i) => {
                      const isLastItem = i === skills.length - 1; // Check if the current item is the last
                      return (
                        <Text
                          numberOfLines={1}
                          key={i}
                          style={[
                            textGry(12, 300),
                            { marginRight: scale(4) },
                          ]}
                        >
                          {item + (!isLastItem ? ',' : '')}
                        </Text>
                      );
                    })}
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleStartLearning} style={{ opacity: 1, backgroundColor: '#3776ff', paddingHorizontal: scale(12), paddingVertical: scale(8), marginHorizontal: scale(16), borderRadius: scale(4), marginVertical: scale(8) }} >
          <Text style={[textwhite(16, 500), { textAlign: 'center' }]} >{'Start Learning'}</Text>
        </TouchableOpacity>
      </View>

      <HorizontalLine />
    </View>
  )
}

export default UserSkillList