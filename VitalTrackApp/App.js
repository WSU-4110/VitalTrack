import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider, useAuth} from './src/contexts/AuthContext';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import SignupScreen from './src/screens/Signup';
import ProtectedRoute from './src/components/ProtectedRoute';
import SettingsScreen from './src/screens/Settings';

const Stack = createStackNavigator();

function AppNavigator() {
  const {currentUser, loading} = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={currentUser ? 'Home' : 'Signup'}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home">
        {() => (
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        )}
      </Stack.Screen>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
