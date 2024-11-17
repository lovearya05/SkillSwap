import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { getDataFromFireBase } from '../../utilityFunctions/utilityFunctions'
import { useIsFocused } from '@react-navigation/native'
import Post from '../../components/Post'
import { useAuth } from '../../context/AuthContext'

const ShowPosts = ({ renderCurrentUserOnly = false, renderNumber=0 }) => {
  const [posts, setPosts] = React.useState([])
  const { user, userData, logout, login, updateUserData } = useAuth();


  const fetchPosts = async () => {
    const data = await getDataFromFireBase('posts')
    if (renderCurrentUserOnly) {
      if (data) {
        const filteredPosts = data.filter(post => post.email == userData.email)
        setPosts(filteredPosts);
      }
    } else {
      if (data) setPosts(data);
    }
  }
  const isFocused = useIsFocused()

  useEffect(() => {
    fetchPosts()
  }, [isFocused, renderNumber])

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
    </View>
  )
}

export default ShowPosts