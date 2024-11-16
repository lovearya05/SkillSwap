import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import DrawerNavbar from '../navbar/DrawerNavbar'
import HorizontalLine from '../../components/HorizontalLine'
import {useNavigation } from '@react-navigation/native'
import {  scale, } from '../../utilityFunctions/utilityFunctions'
import firestore from '@react-native-firebase/firestore';
import LoadingScreen from '../../components/LoadingScreen'
import RetakeButtonSvg from '../../assets/icons/RetakeButtonSvg'


const HomePage = () => {
  // const navigation = useNavigation()
  // const [userAnalytics, setUserAnalytics] = useState()
  // const [loadingData, setLoadingData] = useState(false)
  // const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  // const vh = Dimensions.get('window').height

  // console.log('userData -=-=-=-=-=-=>', userData?.email)

  // const handleFetchAnalytics = () => {
  //   setLoadingData(true)

  //   var currentYear = new Date().getFullYear();
  //   console.log('selectedMonth', selectedMonth)
  //   var startDate = new Date(currentYear, +selectedMonth-1, 1, 0, 0, 0); // Start of the given month
  //   var endDate = new Date(currentYear, +selectedMonth, 0, 23, 59, 59); // End of the given month

  //   firestore().collection("userAssessments")
  //     .where("email", "==", userData?.email)
  //     .where("createdAt", ">=", startDate)
  //     .where("createdAt", "<=", endDate)
  //     .get()
  //     .then((querySnapshot) => {
  //       let homePoints = 0, transportPoints = 0, shoppingPoints = 0, foodPoints = 0, totalPoints=0;
  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data()
  //         homePoints += data?.homePoints
  //         transportPoints += data?.transportPoints
  //         shoppingPoints += data?.shoppingPoints
  //         foodPoints += data?.foodPoints
  //         totalPoints += data?.totalPoints
  //       });
  //       setLoadingData(false)
  //       setUserAnalytics({homePoints, transportPoints, shoppingPoints, foodPoints, totalPoints});
  //     })
  //     .catch((error) => {
  //       console.log("Error getting documents: ", error);
  //     });
  // }

  if (loadingData) return <LoadingScreen showAsLoadingScreen={false} />

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      {/* <DrawerNavbar text='Home' /> */}
      {/* <HorizontalLine /> */}

      {/* <Text onPress={updateQuestions} >clik to upload Questions</Text> */}



      {/* BOTTOM CHAT VIEW  */}
      {/* <View style={{ position: 'absolute', bottom: 0, zIndex: 1, width: '100%', }} >
        <ChatPage />
      </View> */}

    </View>
  )
}

export default HomePage