
import 'react-native-gesture-handler'
import React from 'react';
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmptyScreen from '../screens/Home/EmptyScreen';


// const StackNavigator = () => {
//     const Stack = createNativeStackNavigator()
//     const navigation = useNavigation()
//     return (
//       <Stack.Navigator screenOptions={{
//         headerShown:false,
//         // headerTintColor: '#fff' // text color
//       }}
//       initialRouteName='HandlePageToRender'
//       >
//         <Stack.Screen name='EmptyScreen' component={EmptyScreen} options={{}} />
  
//       </Stack.Navigator>
//     )
//   }

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator()
  const navigation = useNavigation()
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false,
      // headerTintColor: '#fff' // text color
    }}
    initialRouteName='HandlePageToRender'
    >
      <Stack.Screen name='EmptyScreen' component={EmptyScreen} options={{}} />

    </Stack.Navigator>
  )
  }
  
export default DrawerNavigator