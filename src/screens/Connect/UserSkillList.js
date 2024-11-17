import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../utilityFunctions/utilityFunctions';
import { useAuth } from '../../context/AuthContext';

const UserSkillList = ({otherUser='', }) => {

  const [otherUserData, setOthereUserData] = useState(null)
  const { user, userData, updateUserData } = useAuth();


  const fetchData = async()=>{
    if(otherUser){
      getUserData(otherUser,(data)=>{
        setOthereUserData(data)
      })
    }
  }
  useEffect(()=>{
    fetchData()
  },[otherUser])

  return (
    <View>
      <Text>{otherUserData?.email}</Text>
    </View>
  )
}

export default UserSkillList