import { View, Text, ScrollView, Dimensions, TouchableOpacity, BackHandler, Image, StyleSheet, } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashBackground from '../../assets/icons/SplashBackground'
import baseStyles, { textBlk, textwhite } from '../../components/baseStyleSheet'
import CodeMintText from '../../assets/icons/CodeMintText'
import InputView from './InputView'
import GreenButton from '../../components/GreenButton'
import OTPPage from './OTPPage'
import auth from '@react-native-firebase/auth';
import { handleGoogleSignup } from './utilityFunctions'
import { createNewDocument, generateRandom4DigitNumber, isEmailValid, saveDataToLocalStorage, scale, showToast, userExistsOrNot } from '../../utilityFunctions/utilityFunctions'
import { useAuth } from '../../context/AuthContext'

const Signup = ({ setShowLoginPage, }) => {
    const vh = Dimensions.get('window').height
    const [inputEmail, setInputEmail] = useState('')
    const [showEnterOtp, setShowOtp] = useState(false)
    const [inputPassword, setInputPassword] = useState('')
    // const dispatch = useDispatch()
    const [sendingOTP, setSendingOTP] = useState(false)
    const [OTP, setOTP] = useState('')


    const handleSendOtp = async () => { // create Account
        try {
            if (!isEmailValid(inputEmail)) {
                showToast('Please enter valid email')
            } else if (!inputPassword || inputPassword.length < 6) {
                showToast('Password must be at least 6 characters')
            // } else if (await userExistsOrNot(inputEmail)) {
                // showToast('User already exists')
            } else {
                signupUser()

                // const otp = generateRandom4DigitNumber()
                // console.log('OTP', otp)
                // setOTP(otp)

                // const otpMessageData = {
                //     emailToSend: inputEmail,
                //     subject: 'Verify your email for SkillSwap',
                //     message: `<br>
                //     Your email OTP verification code for SkillSwap is: ${otp}
                //     If you didn’t ask for OTP, you can ignore this email.
                //     <br>Thank You.<br>
                //     Team SkillSwap
                //     `
                // }
                // const errorMessage = 'Try again later'
                // setSendingOTP(true)
                // createNewDocument('sendEmail', otpMessageData, () => {
                //     setShowOtp(true)
                //     setSendingOTP(false)
                // }, errorMessage)
            }
        } catch (e) {
            showToast('something went wrong')
        }

    }
    const handleVerifyOTP = (enteredOTP = '') => {
        console.log('enteredOTP', enteredOTP, OTP)
        if (!enteredOTP || enteredOTP.length < 4 || enteredOTP != OTP) {
            showToast('Invalid OTP')
        } else {
            signupUser()
        }
    }

    const handleGoogleSignupBtn = () => handleGoogleSignup(dispatch)

    const handleShowLoginPage = () => setShowLoginPage(true)
    const { setUserData, setUser } = useAuth();

    const signupUser = () => {
        console.log('signup', inputEmail, inputPassword)
        try {
            auth()
                .createUserWithEmailAndPassword(inputEmail, inputPassword)
                .then((userCredential) => {
                    console.log('userCredential---->', userCredential?.user)
                    if (userCredential?.user) {
                        saveDataToLocalStorage('user', userCredential?.user)
                        setUser(JSON.parse(JSON.stringify(userCredential?.user)))
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    if (error.code === 'auth/email-already-in-use') {
                        showToast('That email address is already in use! Please Login');
                    }

                    if (error.code === 'auth/invalid-email') {
                        showToast('That email address is invalid!');
                    }
                });

        } catch (error) {
            console.log('error while signup', error)
        }
    }

    useEffect(() => {
        let backhandler;
        if(showEnterOtp){
            backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
                setShowOtp(false)
                return true;
            }
            );
        }
        return () => backhandler?.remove();
    }, [showEnterOtp])

    return (
        <SplashBackground makeDark>
            <View style={{ height: '100%', flexDirection:'column', justifyContent:'space-between' }} >
                {showEnterOtp ? <OTPPage email={inputEmail} handleVerifyOTP={handleVerifyOTP} handleResendBtn={handleSendOtp} />
                    :
                    <ScrollView >
                        <View style={{ marginTop: '15%', paddingHorizontal: 16 }} >
                        <View style={styles.loginSignupTextView} >
                                <Image style={styles.logoImage} source={require('../../assets/icons/CarbonMintLogo2.png')} />
                                <Text>
                                    <Text style={[textwhite(24, 600)]} >Sign up </Text>
                                    <CodeMintText textColor={1} />
                                </Text>
                            </View>

                            <View style={{ marginTop: '15%' }} >
                                <InputView inputTitle='Email' placeholderText='abc@gmail.com' value={inputEmail} setValue={setInputEmail} />
                                <InputView inputTitle='Password' placeholderText='******' value={inputPassword} setValue={setInputPassword} isPassword />
                            </View>


                            <GreenButton text='Create Account' onPress={handleSendOtp} isDisabled={sendingOTP} />

                            <View style={{ marginTop: 16 }} >
                                <Text style={{ textAlign: 'center' }} onPress={handleShowLoginPage} >
                                    <Text style={[textwhite(16, 400)]} >Already a user? </Text>
                                    <Text style={[textwhite(16, 400), { color: 'rgba(5, 167, 122, 1)' }]} >Login here</Text>
                                </Text>

                            </View>

                        </View>
                    </ScrollView  >
                }
                <View style={{height:40}} />
                <View style={{ bottom: 20, width: '100%' }} >
                    <Text style={{ textAlign: 'center' }} >
                        <Text style={[textwhite(12, 400), { color: 'rgba(169, 163, 163, 1)' }]} >By signing up, you agree to our </Text>
                        <Text style={[textwhite(12, 400), { color: 'rgba(0, 149, 95, 1)' }]} >Terms & Privacy policy</Text>
                    </Text>
                </View>
            </View>
        </SplashBackground>
    )
}

export default Signup

const styles = StyleSheet.create({
    logoImage:{
        height: scale(25),
        width: scale(25),
        marginRight:scale(4)
    },
    loginSignupTextView:{
        flexDirection:'row',
        alignItems:'center',
    }
})