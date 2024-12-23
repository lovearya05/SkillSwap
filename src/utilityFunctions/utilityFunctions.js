import Toast from 'react-native-simple-toast';
// import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Dimensions, Linking, PermissionsAndroid } from 'react-native';
const { height, width } = Dimensions.get('window')
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



export const showToast = (text = '') => {
  Toast.show(text);
}
export const isNumber = (txt = '') => /^\d+$/.test(txt)

export const getIn2Digit = (txt = '') => `${txt}`.padStart(2, 0)
export const fixedToPoint = (txt = '', point = 1) => parseFloat(txt).toFixed(point)
export function currentDateTime() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
export const isEmailValid = (email) => {
  if (!email) return false;
  const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  return email_regex.test(email)

}

export const createNewDocument = (collectionName = '', dataToCreate = {}, nextFunction = () => { }, errorMessage = '', errorFunction = () => { }) => {
  try {
    firestore().collection(collectionName).add(dataToCreate).then((data) => {
      console.log('data created successfully', data)
    })
    nextFunction()
  } catch (e) {
    showToast(errorMessage)
    errorFunction()
    console.log(e)
  }
}
// export const userExistsOrNot = async (emailId) => {
//   return new Promise((resolve, reject) => {
//     try {
//       firestore().collection('users').doc(emailId).get().then((user) => {
//         console.log('usere exist', user.data())
//         if (user.data()) resolve(true)
//         resolve(false)
//       })
//     } catch (e) {
//       reject()
//       showToast('Something went wrong')
//       console.log(e)
//     }
//   })
// }
// export function generateRandom4DigitNumber() {
//   const randomDecimal = Math.random();
//   const random4DigitNumber = Math.floor(randomDecimal * 9000) + 1000;
//   return random4DigitNumber;
// }
// export function handleFetchError(err = '', errorKey = '') {
//   console.log(errorKey + ' :: ->', err)
//   if (err.message == 'Network request failed') {
//     showToast('Please try again')
//   } else if (err?.message == 'NETWORK_ERROR') {
//     showToast('Please check your internet connection')
//   } else {
//     showToast('try again')
//   }

// }
export const handleFirebaseError = (err) => {
  switch (err.code) {
    case 'auth/invalid-email':
      showToast('That email address is invalid!')
      break;
    case 'auth/invalid-credential':
      showToast('That password is invalid!')
      break;
    case 'auth/too-many-requests':
      showToast('Too many attempts to login try again later')
      break;
    case 'auth/email-already-exists':
      showToast('already a use')
      break;
    case 'auth/invalid-argument':
      showToast('An invalid argument was provided to an Authentication method')
      break;
    case 'auth/invalid-credential':
      showToast('An invalid credential was provided to an Authentication method')
      break;
    case 'auth/invalid-email':
      showToast('The provided value for the email user property is invalid')
      break;
    case 'auth/invalid-password':
      showToast(' The provided value for the password is invalid')
      break;
    case 'auth/too-many-requests':
      showToast('Too many attempts')
      break;
    case 'auth/uid-already-exists':
      showToast('The provided uid is already in use by an existing user')
      break;
    case 'auth/user-not-found':
      showToast('user not found')
      break;
    default:
      showToast('Something went wrong')
      break;
  }
}
export const saveDataToLocalStorage = async (key = '', data = {}) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e)
  }
}
export const getDataFromLocalStorage = async (key = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) resolve(JSON.parse(data))
      else resolve(null)
    } catch (e) {
      resolve(null)
      console.log(e)
    }
  })
}

export const getDataFromFireBase = (collectionName = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const snapshot = await firestore().collection(collectionName).get();
      const Data = [];
      
      snapshot.forEach(doc => {
        Data.push({ id: doc.id, ...doc.data() }); // Include document ID with data
      });

      resolve(Data);
    } catch (e) {
      resolve([]);
      showToast('Failed to fetch data from Firebase');
      console.error(e);
      handleFirebaseError(e);
    }
  });
};

export const createdAt = () => firestore.FieldValue.serverTimestamp()
export const updatedAt = () => firestore.FieldValue.serverTimestamp()

// export const debounceHandler = (nextFunction = () => { }, time = 0) => {
//   let interval;
//   return () => {
//     clearTimeout(interval)
//     interval = setTimeout(() => {
//       nextFunction()
//     }, time)
//   }
// }
export const SCREEN_WIDTH = 375;
export const scale = (units = 0) => {
  return width / SCREEN_WIDTH * units;
}

export const handleLogout = (dispatch = () => { }) => {
  auth().signOut()
  saveDataToLocalStorage('user', null)
  saveDataToLocalStorage('userData', null)
}
export const consoleMessage = (screenName = '', method = '', data = {}) => {
  console.log(screenName, " :: " + method + " ::-> " + JSON.stringify(data))
}



export const handleUpdateUser = (userEmail='', userDate={}, nextFunction=()=>{}) => {
    try {
      firestore().collection('users').doc(userEmail).set(userDate).then(()=>{
        firestore().collection('users').doc(userEmail).get().then((userDataTemp)=>{
          const userDataTemp1 = userDataTemp.data();
          console.log('userData------------------->', userDataTemp1)
          nextFunction()
          // setUserData(JSON.parse(JSON.stringify(userDataTemp1)))
        })
        showToast('Successfully updated')
      })
    } catch (error) {
      showToast('try again')
      console.log(error)
    }
  // }
  // setDisableButton(false)
}


export const requestStoragePermission = async () => {

  return new Promise( async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ],
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to read files.',
          buttonPositive: 'OK',
        },
      );

      if (granted['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Permission granted, you can access images now.');
        resolve(true)
      } else {
        // console.log('Permission denied, cannot access images.');
        Alert.alert(
          'Storage Permission Denied',
          'Please enable storage permission in the app settings.',
          [{ text: 'Go to Settings', onPress: () => Linking.openSettings() }]
        );
        resolve(false)
      }

    } catch (err) {
      resolve(false)
      console.warn(err);
    };
  });


}

export const getUserData = (userEmail='', responseData=()=>{})=>{
  // return new Promise((resolve, reject) => {
    try {
      firestore().collection('users').doc(userEmail).get().then((userDataTemp) => {
        const userDataTemp1 = userDataTemp.data()
        if (userDataTemp1) {
          responseData(userDataTemp1)
          // console.log('userDataTemp1', userDataTemp1)
          // resolve(userDataTemp1 ? JSON.parse(JSON.stringify(userDataTemp1)) : null)
        }
      })

      // resolve(null)
    } catch (error) {
      // resolve(null)
      console.log(error)
    }
  // })
}

export const convertFirestoreTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.seconds) {
    return null; // Handle cases where the timestamp is invalid
  }

  // Convert seconds to milliseconds
  const date = new Date(timestamp.seconds * 1000);

  // Format the date into 'YYYY-MM-DD HH:mm'
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  return formattedDate;
};