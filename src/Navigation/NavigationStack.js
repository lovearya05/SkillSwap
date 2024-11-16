import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import 'react-native-gesture-handler';

const HomeStack = createStackNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginSignUpHandlePage from '../screens/loginSignup/LoginSignUpHandlePage';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();


const BottomTabsNavigator = () => {
  
  const { user } = useAuth();
  const isUserLogedIn = user ? true : false;

  return isUserLogedIn ?
    (
      <Tab.Navigator screenOptions={{
        headerShown: false,
      }} options={{ headerShown: false }} >
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
        <Tab.Screen name="Connect" component={ConnectionsStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
    ) :
    (
      <AuthStackNavigator />
    )
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }} >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }} >
      <HomeStack.Screen name="LoginSignUpHandlePage" component={LoginSignUpHandlePage} />
    </HomeStack.Navigator>
  );
};

const ConnectionsStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }} >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
};
const ProfileStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }} >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
};

export default BottomTabsNavigator;
