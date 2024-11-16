import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext';

const HomeScreen = () => {
  const { user, logout, login } = useAuth();

  console.log('user', user)

  if (!user) {
    return (
      <TouchableOpacity onPress={()=>{
        console.log('rrrr', login)
        login()
      }} style={{marginTop:100}}  >
        <Text>Please login first</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => { }} >
        <Text>increment</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen