import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProtectedRoute from './src/components/ProtectedRoute';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import EntriesScreen from './src/screens/Entries';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import SettingsScreen from './src/screens/Settings';
import SignupScreen from './src/screens/Signup';
import AnalyticsScreen from './src/screens/Analytics';
import CalendarScreen from './src/screens/Calendar';
import MedicationsScreen from './src/screens/Medication';
import MyTabs from './src/components/navigationTabs';  // Import MyTabs

const Stack = createStackNavigator();

function AppNavigator() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={currentUser ? 'Home' : 'Signup'}>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {() => (
          <ProtectedRoute>
            <MyTabs />
          </ProtectedRoute>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false, tabBarStyle: { display: 'none' } }} // Hide tab bar
      />
      <Stack.Screen
        name="Entries"
        component={EntriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Medication"
        component={MedicationsScreen}
        options={{ headerShown: false }}
      />
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
