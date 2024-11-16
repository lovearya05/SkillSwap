/**
  * @format
 */
import 'react-native-gesture-handler'
import React, { useEffect } from 'react';
import { useColorScheme, StatusBar, SafeAreaView, StyleSheet, Platform, Text } from 'react-native';
import { Colors, } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, } from '@react-navigation/native';
// import DrawerNavigator from './src/navigator/Navigator';
import SplashScreen from 'react-native-splash-screen';




function App() {
  const isAndroid = Platform.OS == 'android'
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isAndroid ? isDarkMode ? '#000' : '#fff' : isDarkMode ? Colors.darker : Colors.lighter

  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setHidden(false);
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeAreaStyle} >
        <Text>Hello</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  safeAreaStyle: { flex: 1, }
})
