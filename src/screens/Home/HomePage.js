import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { createNewDocument, scale } from '../../utilityFunctions/utilityFunctions';
import HorizontalLine from '../../components/HorizontalLine';
import CreatePostModal from './CreatePostModal';
import ShowPosts from './ShowPosts';

const HomePage = () => {
  const { user, userData } = useAuth();
  const profileImage = {uri : userData?.avatarUrl} || require('../../assets/icons/userProfileIcon.png')
  const [showCreatePost, setShowCreatePost] = useState(false);

  const topHeader = ()=>{
    return(
      <View style={{paddingVertical: scale(8), paddingHorizontal: scale(16), flexDirection:'row', paddingVertical: scale(8), backgroundColor: '#fff'}} >
         <Image source={profileImage} style={{ height: scale(30), width: scale(30), borderRadius: scale(200) }} />

         <View style={{borderColor: '#000', borderWidth: scale(1), width: scale(250), borderRadius: scale(4), marginHorizontal: scale(8)}} >
          {/* search bar  */}
         </View>

         <TouchableOpacity onPress={()=> setShowCreatePost(true)} >
          <Image source={require('../../assets/icons/writeIcon.png')} style={{height: scale(30), width: scale(30)}} />
         </TouchableOpacity>
      </View>
    )
  }

  const [renderNumber, setRenderNumber] = useState(0);

  return (
    <SafeAreaView>
      {topHeader()}
      <HorizontalLine />
      <CreatePostModal setRenderNumber={setRenderNumber} showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} />

      <ShowPosts renderNumber={renderNumber} />


    </SafeAreaView>
  )
}

export default HomePage