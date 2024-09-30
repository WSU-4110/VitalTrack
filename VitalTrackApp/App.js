import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ProtectedRoute from './src/components/ProtectedRoute';
import {AuthProvider, useAuth} from './src/contexts/AuthContext';
import EntriesScreen from './src/screens/Entries';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import SettingsScreen from './src/screens/Settings';
import SignupScreen from './src/screens/Signup';
import CalendarScreen from './src/screens/Calendar';    
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function AppNavigator() {
  const {currentUser, loading} = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={currentUser ? 'Home' : 'Signup'}>
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Home">
        {() => (
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        )}
      </Stack.Screen>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Entries" component={EntriesScreen} options={{ headerShown: false }}/>
       <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
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
