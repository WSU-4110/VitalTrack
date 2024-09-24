/**

Sample React Native App
https://github.com/facebook/react-native
@Format
*/
import React from 'react';

import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
return (
<NavigationContainer>


<Stack.Navigator initialRouteName = "Home">
<Stack.Screen name = "Login" component = {LoginScreen}/>
<Stack.Screen name= "Home" component={HomeScreen}/>
</Stack.Navigator>
</NavigationContainer>
);
}