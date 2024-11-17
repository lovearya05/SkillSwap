import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext';
import UserSkillList from './UserSkillList';

const StartLearning = () => {
  const { user, userData, updateUserData } = useAuth();
  const connectedUsers = userData?.connectedUser || []

  return (
    <View>
      <FlatList
        data={connectedUsers}
        renderItem={({item, index})=>{
          return(
            <UserSkillList otherUser={item} />
          )
        }}
       />
    </View>
  )
}

export default StartLearning