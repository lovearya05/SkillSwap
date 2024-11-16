import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../utilityFunctions/utilityFunctions';
import { useAuth } from '../context/AuthContext';


const AuthStateChange = () => {
  const { setUserData, setUser } = useAuth();
  
  const navigation = useNavigation()
  function onAuthStateChanged(user) {
    setUser(JSON.parse(JSON.stringify(user)));

    console.log('user', user)
    saveDataToLocalStorage('user', user)
    firestore().collection('users').doc(user?.email).get().then((userDataTemp) => {
      setUser(JSON.parse(JSON.stringify(user)))

      const userDataTemp1 = userDataTemp.data();
      if (userDataTemp1) {
        saveDataToLocalStorage('userData', userDataTemp1)
        setUserData(userDataTemp1 ? JSON.parse(JSON.stringify(userDataTemp1)) : null)
      }
    })
  }

  useEffect(() => {
    (async () => {
      const user = await getDataFromLocalStorage('user')
      const userData = await getDataFromLocalStorage('userData')

      if (user) setUser(user)
      if (userData) setUserData(userData)

    })()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return null
}

export default AuthStateChange
