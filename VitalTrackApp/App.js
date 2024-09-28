/**

Sample React Native App
https://github.com/facebook/react-native
@Format
*/
import React from 'react';
import LoginScreen from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
return (
  <NavigationContainer>

<Stack.Navigator initialRouteName = "Login">
<Stack.Screen name = "Login" component = {LoginScreen}/>
</Stack.Navigator>
</NavigationContainer>

);
}