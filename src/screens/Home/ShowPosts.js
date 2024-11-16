import { View, Text, FlatList } from 'react-native'
import React from 'react'

const ShowPosts = () => {
  
  return (
    <View>
      <FlatList
        data={[]}
        renderItem={({ Item, index }) => {
          return (
            <View>
            </View>
          )
        }}
      />
      <Text>ShowPosts</Text>
    </View>
  )
}

export default ShowPosts