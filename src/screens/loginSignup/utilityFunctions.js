import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { handleFetchError, saveDataToLocalStorage, showToast } from '../../utilityFunctions/utilityFunctions';
// import { setUser, setUserData } from '../../redux/slicer';
import firestore from '@react-native-firebase/firestore';

export const handleGoogleSignup = async (dispatch) => {
    
    try {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive'],
            webClientId: "297797240603-hri1hphktr6b4ni2l3obo6hokpn3g1o3.apps.googleusercontent.com",
            iosClientId: '297797240603-6csku856pftn2sf6091u9404brqmhn1k.apps.googleusercontent.com',
            offlineAccess: true,
        });

        const hasPlay =  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        console.log('hasPlay --- >', hasPlay)
        // Get the users ID token
        if(hasPlay){
            const { idToken } = await GoogleSignin?.signIn();
        
            // Create a Google credential with the token
            const googleCredential = auth?.GoogleAuthProvider?.credential(idToken);
            console.log('googleCredential --- > ', googleCredential)
    
            // Sign-in the user with the credential
            const user = await auth()?.signInWithCredential(googleCredential);
            console.log('////')
            if(user?.user){
                firestore().collection('users').doc(user?.user?.email).get().then((userDataTemp) => {
                    const userDataTemp1 = userDataTemp.data();
                    saveDataToLocalStorage('user', user?.user)
                    saveDataToLocalStorage('userData', userDataTemp1)
                    // dispatch(setUserData(userDataTemp1 ? JSON.parse(JSON.stringify(userDataTemp1)) : null))
                    // dispatch(setUser(JSON.parse(JSON.stringify(user?.user))))
                    showToast('Login successful')
                })
            }
        }
        
    } catch (error) {
        handleFetchError(error, 'google login error ->')
    }

}