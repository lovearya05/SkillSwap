/**
  * @format
 */
import 'react-native-gesture-handler'
import React, { useEffect } from 'react';
import { useColorScheme, StatusBar, SafeAreaView, StyleSheet, Platform, Text } from 'react-native';
import { Colors, } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import LoginSignUpHandlePage from './src/screens/loginSignup/LoginSignUpHandlePage';
import BottomTabsNavigator from './src/Navigation/NavigationStack';
import { AuthProvider } from './src/context/AuthContext';
import AuthStateChange from './src/firebaseMethods/AuthStateChange';


function App() {
  const isAndroid = Platform.OS == 'android'
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isAndroid ? isDarkMode ? '#000' : '#fff' : isDarkMode ? Colors.darker : Colors.lighter

  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setHidden(false);
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.safeAreaStyle} >
          <AuthStateChange />
          <BottomTabsNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  safeAreaStyle: { flex: 1, }
})
