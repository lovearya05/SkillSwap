import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { getDataFromFireBase, handleUpdateUser, scale } from '../../utilityFunctions/utilityFunctions'
import { textBlk, textGry, textwhite } from '../../components/baseStyleSheet'
import { useAuth } from '../../context/AuthContext'
import HorizontalLine from '../../components/HorizontalLine'
import StartLearning from './StartLearning'

const Connect = () => {
  const [users, setUsers] = useState([])
  const { user, userData, updateUserData } = useAuth();
  const [selectedTab, setSelectedTab] = useState('connect');

  const fetchUsers = async () => {
    const data = await getDataFromFireBase('users')
    if (data) setUsers(data.filter((usr) => usr.email != userData.email));
  }

  const ConnectToUser = (connectionTo = {}) => {
    const connectedData = userData['connectedUser'] || []
    const meetUrl = userData.userName + "-" + connectionTo.userName
    connectedData.push({email: connectionTo?.email, meetUrl});
    const currentUser = { ...userData, connectedUser: connectedData,  }
    
    // 2nd user 
    const connectedData2 = connectionTo['connectedUser'] || []
    connectedData2.push({email: userData.email, meetUrl});
    const connectedUser = { ...connectionTo, connectedUser: connectedData2 }

    handleUpdateUser(connectionTo?.email, connectedUser)
    handleUpdateUser(userData?.email, currentUser, () => {
      fetchUsers()
      updateUserData()
    })
  }

  const isFocused = useIsFocused()

  useEffect(() => {
    fetchUsers()
  }, [userData, isFocused])

  useEffect(() => {

  }, [])

  const suggestedProfiles = () => {

    return (
      <View >
        <FlatList
          data={users}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item, index }) => {
            const profileImage = item?.avatarUrl ? { uri: item?.avatarUrl } : require('../../assets/icons/userProfileIcon.png')
            const profileName = item?.userName || ''
            const skills = item?.skills || []
            const isUserConnected = userData?.connectedUser?.some((usr) => usr.email == item?.email)

            return (
              <View style={{ paddingHorizontal: scale(12), marginBottom: scale(20), marginLeft: scale(20), paddingVertical: scale(10), borderRadius: scale(8), backgroundColor: '#fff', width: scale(160) }} >
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: scale(8) }} >
                  <Image source={profileImage} style={{ height: scale(100), width: scale(100), borderRadius: scale(200) }} />
                </View>

                <View>
                  <Text style={textBlk(13, 500)} >{profileName}</Text>
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

                {/* connect button  */}
                <TouchableOpacity disabled={isUserConnected} onPress={() => ConnectToUser(item)} style={{ opacity: isUserConnected ? 0.8 : 1, backgroundColor: isUserConnected ? '#16c6ed' : '#3776ff', paddingVertical: scale(4), marginHorizontal: scale(16), borderRadius: scale(4), marginVertical: scale(8) }} >
                  <Text style={[textwhite(16, 500), { textAlign: 'center' }]} >{isUserConnected ? 'Connected' : 'Connect'}</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />

      </View>
    )
  }

  const renderTopHeader = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', }} >
          <TouchableOpacity onPress={()=> setSelectedTab('connect')} style={{ flex: 1, backgroundColor: selectedTab == 'connect' ? '#fff' : undefined, paddingVertical: scale(6), marginVertical: scale(2), borderRightColor: '#000', borderRightWidth: scale(2), }} >
            <Text style={[textBlk(14, 500), { textAlign: 'center' }]}>Connect</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=> setSelectedTab('learn')} style={{ flex: 1, backgroundColor: selectedTab == 'learn' ? '#fff' : undefined, paddingVertical: scale(6), marginVertical: scale(2) }} >
            <Text style={[textBlk(14, 500), { textAlign: 'center' }]}>Start Learning</Text>
          </TouchableOpacity>
        </View>

        <HorizontalLine />
      </View>

    )
  }

  return (
    <View>
      {renderTopHeader()}
      {selectedTab == 'connect' ? suggestedProfiles() : <StartLearning />}
    </View>
  )
}

export default Connect