import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { } from 'react-native-svg'
import { textBlk, textGry } from '../../components/baseStyleSheet'
import { scale } from '../../utilityFunctions/utilityFunctions'

const ProfileScreen = () => {

  const userProfileDetails = () => {
    const userName = 'LovePreet'
    const userEmail = 'lovepreet@gmail.com'
    const userBio = 'A passionate software developer with a love for creating innovative solutions. Experienced in full-stack development and always eager to leam new technologies.'
    const profileImage = require('../../assets/icons/userProfileIcon.png')
    return (
      <View style={{ paddingVertical: scale(40), paddingHorizontal: scale(16) }} >
        <View style={{ flexDirection: 'row' }} >
          <Image source={profileImage} style={{ height: scale(100), width: scale(100) }} />
          <View style={{ paddingHorizontal: scale(20) }} >
            <Text style={textBlk(16, 800)} >{userName}</Text>
            <Text style={textGry(14, 500)} >{userEmail}</Text>
          </View>
        </View>

        <Text style={textBlk(12, 400)} >{userBio}</Text>
      </View>
    )
  }
  const skillsSection = () => {
    const userSkills = ['Design', 'Development', 'Coding']

    return (
      <View style={{ paddingHorizontal: scale(16) }} >
        <Text style={textBlk(20, 600)}>Skills</Text>

        <View style={{ flexDirection: 'row', paddingVertical: scale(10) }} >
          {userSkills.map((item, i) => {
            return (
              <View key={i} style={{ backgroundColor: '#fff', marginRight: scale(12), padding: scale(8), borderRadius: scale(10) }} >
                <Text style={textBlk(14, 600)} >{item}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
  const skillsOfInterest = () => {
    const userSkills = ['Design', 'Development', 'Coding']
    return (
      <View style={{ paddingHorizontal: scale(16), paddingVertical: scale(8) }} >
        <Text style={textBlk(20, 600)}>Skills of Interest</Text>

        <View style={{ flexDirection: 'row', paddingVertical: scale(10) }} >
          {userSkills.map((item, i) => {
            return (
              <View key={i} style={{ backgroundColor: '#fff', marginRight: scale(12), padding: scale(8), borderRadius: scale(10) }} >
                <Text style={textBlk(14, 600)} >{item}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  const suggestedProfiles = () => {
    const profileImage = require('../../assets/icons/userProfileIcon.png')
    const profileName = 'John Doe'
    const skills = ['Gutar', 'Singing', 'Playing'];

    return (
      <ScrollView >

        <View style={{paddingLeft: scale(16)}} >
          <Image source={profileImage} style={{ height: scale(100), width: scale(100) }} />
          <View>
            <Text style={textBlk(14,500)} >{profileName}</Text>
            <View style={{ flexDirection: 'row' }} > 
              {skills.map((item, i)=>{
                return(
                  <Text key={i} style={[textGry(14,400), { marginRight: scale(8)}]} >{item}</Text>
                )
              })}
            </View>
          </View>
        </View>
        
      </ScrollView>
    )
  }

  return (
    <View>
      {userProfileDetails()}
      {skillsSection()}
      {skillsOfInterest()}
      {suggestedProfiles()}
      <View>

      </View>
    </View>
  )
}

export default ProfileScreen