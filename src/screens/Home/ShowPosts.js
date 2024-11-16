import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { getDataFromFireBase } from '../../utilityFunctions/utilityFunctions'
import { useIsFocused } from '@react-navigation/native'
import Post from '../../components/Post'

const ShowPosts = () => {
  const [posts, setPosts] = React.useState([])

  const fetchPosts = async () => {
    const data = await getDataFromFireBase('posts')
    if (data) setPosts(data);
  }
  const isFocused = useIsFocused()

  useEffect(() => {
    fetchPosts()
  }, [isFocused])

  return (
    <View>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Post data={item} />
            </View>
          )
        }}
      />
      <Text>Show Posts</Text>
    </View>
  )
}

export default ShowPosts