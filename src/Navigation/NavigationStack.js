import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import 'react-native-gesture-handler';

const HomeStack = createStackNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    // <Tab.Navigator screenOptions={{
    //   headerShown: false,
    // }} options={{headerShown: false}} >
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Hides the text labels below icons
        tabBarIcon: ({ focused, size }) => {
          let iconSource;

          // Set the appropriate icon for each tab
          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/ImageIcons/Blue_Home_Icon.png') // Active icon
              : require('../assets/ImageIcons/Home_Icon.png'); // Inactive icon
          } else if (route.name === 'Connect') {
            iconSource = focused
              ? require('../assets/ImageIcons/Blue_Network_Icon.png')
              : require('../assets/ImageIcons/Network_Icon.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('../assets/ImageIcons/Blue_Profile_Icon.png')
              : require('../assets/ImageIcons/Profile_Icon.png');
          }

          // Return the Image component for the icon
          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
              }}
            />
          );
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60, // Adjust height as needed
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Connect" component={ConnectionsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
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
