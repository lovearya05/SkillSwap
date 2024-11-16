import { View, Text, ScrollView, Dimensions, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashBackground from '../../assets/icons/SplashBackground'
import baseStyles, { textBlk, textwhite } from '../../components/baseStyleSheet'
import InputView from './InputView'
import GreenButton from '../../components/GreenButton'
import GoogleIcon from '../../assets/icons/GoogleIcon'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { handleFirebaseError, isEmailValid, saveDataToLocalStorage, scale, showToast } from '../../utilityFunctions/utilityFunctions'
import { useNavigation } from '@react-navigation/native'
import CodeMintText from '../../assets/icons/CodeMintText'
import { useAuth } from '../../context/AuthContext'

const Login = ({ setShowLoginPage = () => { }, }) => {
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isResetMailSend, setIsResetMailSend] = useState(false)
    const navigation = useNavigation()

    const { setUserData, setUser } = useAuth();

    const handleForgotPassword = () => {
        // if (!isEmailValid(inputEmail)) {
        //     showToast('Please enter valid email')
        // } else {
        //     auth().sendPasswordResetEmail(inputEmail).then((value) => {
        //         showToast('Your password reset link has been sent on mail.')
        //         setIsResetMailSend(true)
        //     })
        // }
    }
    const handleShowSignUpPage = () => setShowLoginPage(false)
//     const value = useSelector(state => state?.appData)

    const handleLogin = async () => {
        if (!isEmailValid(inputEmail)) {
            showToast('Please enter valid email')
        } else if (inputPassword.length < 6) {
            showToast('Please enter valid password')
        } else {
            setIsLoading(true)
            auth().signInWithEmailAndPassword(inputEmail, inputPassword).then((user) => {
                console.log('user: ', user)
                if (user?.user) {
                    firestore().collection('users').doc(inputEmail).get().then((userDataTemp) => {
                        const userDataTemp1 = userDataTemp.data();
                        saveDataToLocalStorage('user', user?.user)
                        saveDataToLocalStorage('userData', userDataTemp1)

                        setUserData(userDataTemp1 ? JSON.parse(JSON.stringify(userDataTemp1)) : null)
                        setUser(JSON.parse(JSON.stringify(user?.user)))

                        // navigation.navigate('HandlePageToRender')
                        setIsLoading(false)
                    })
                }
            }).catch((e) => {
                setIsLoading(false)
                handleFirebaseError(e)
                console.log(e)
                setIsLoading(false)
                // showToast('try again later')
            })
        }
    }
    // return null

//     // const handleGoogleLoginPress = () => handleGoogleSignup(dispatch)

    return (
        <SplashBackground makeDark>
            <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                <ScrollView>
                    <View style={{ marginTop: '14%', paddingHorizontal: 16 }}>
                        <View style={styles.loginSignupTextView}>
                            <Image style={styles.logoImage} source={require('../../assets/icons/CarbonMintLogo2.png')} />
                            <Text>
                                <Text style={[textwhite(24, 600)]}>Login to </Text>
                                <CodeMintText textColor={1} />
                            </Text>
                        </View>

                        <View style={{ marginTop: '10%' }}>
                            {/* Input fields updated */}
                            <InputView
                                inputTitle="Email Address"
                                placeholderText="Enter your email"
                                value={inputEmail}
                                setValue={setInputEmail}
                                titleStyle={styles.inputTitle}
                                placeholderStyle={styles.placeholderText}
                            />
                            <InputView
                                inputTitle="Password"
                                placeholderText="Enter your password"
                                value={inputPassword}
                                setValue={setInputPassword}
                                isPassword
                                titleStyle={styles.inputTitle}
                                placeholderStyle={styles.placeholderText}
                            />
                        </View>

                        <View>
                            {isResetMailSend ? (
                                <Text style={[styles.forgotPasswordText, { color: 'rgba(248, 94, 0, 1)' }]}>
                                    Password reset link sent
                                </Text>
                            ) : (
                                <Text onPress={handleForgotPassword} style={styles.forgotPasswordText}>
                                    Forgot Password?
                                </Text>
                            )}
                        </View>

                        <GreenButton text="LOGIN" onPress={handleLogin} isDisabled={isLoading} />

                        <View style={{ marginTop: 16 }}>
                            <Text style={{ textAlign: 'center' }} onPress={handleShowSignUpPage}>
                                <Text style={[textwhite(16, 400)]}>Don't have an account? </Text>
                                <Text style={[styles.signupLink]}>Sign up</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ height: 60 }} />
                <View style={{ bottom: 20, width: '100%' }}>
                    <Text style={{ textAlign: 'center' }}>
                        <Text style={[styles.termsText]}>
                            By signing up, you agree to our{' '}
                        </Text>
                        <Text style={[styles.termsLink]}>Terms & Privacy policy</Text>
                    </Text>
                </View>
            </View>
        </SplashBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    logoImage: {
        height: scale(40),
        width: scale(40),
        marginRight: scale(4),
    },
    loginSignupTextView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    placeholderText: {
        fontSize: 14,
        color: '#A9A9A9',
    },
    forgotPasswordText: {
        fontSize: 16,
        fontWeight: '800',
        //color: 'rgba(0, 122, 255, 1)', // Matches the blue in the design
        color: 'white',
        textAlign: 'right',
        marginVertical: 8,
    },
    signupLink: {
        color: 'rgba(0, 122, 255, 1)', // Matches the blue color in the design
        fontWeight: '800',
        fontSize: 18
    },
    termsText: {
        fontSize: 14,
        color: 'rgba(169, 163, 163, 1)',
    },
    termsLink: {
        fontSize: 14,
        color: 'rgba(0, 122, 255, 1)',
        fontWeight: '600',
    },
})
