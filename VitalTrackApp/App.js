import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import ProtectedRoute from './src/components/ProtectedRoute';
import MyTabs from './src/components/navigationTabs'; // Import MyTabs
import {AuthProvider, useAuth} from './src/contexts/AuthContext';
import AnalyticsScreen from './src/screens/Analytics';
import CalendarScreen from './src/screens/Calendar';
import EntriesScreen from './src/screens/Entries';
import LoginScreen from './src/screens/Login';
import MedicationsScreen from './src/screens/Medication';
import SettingsScreen from './src/screens/Settings';
import SignupScreen from './src/screens/Signup';
import notificationHandler from './src/services/notificationHandler';

const Stack = createStackNavigator();

function AppNavigator() {
  const {currentUser, loading} = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={currentUser ? 'Home' : 'Signup'}>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" options={{headerShown: false}}>
        {() => (
          <ProtectedRoute>
            <MyTabs />
          </ProtectedRoute>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Entries"
        component={EntriesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Medication"
        component={MedicationsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    PushNotification.cancelAllLocalNotifications();

    const scheduleDailyReminder = () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);

      notificationHandler.scheduleNotification({
        title: 'Daily Health Check-in',
        message: 'Time to log your daily health metrics and mood!',
        date: tomorrow,
        repeatType: 'day',
      });
    };

    const scheduleWeeklySummary = () => {
      const nextSunday = new Date();
      nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));
      nextSunday.setHours(18, 0, 0, 0);

      notificationHandler.scheduleNotification({
        title: 'Weekly Health Summary',
        message: 'Check your weekly health trends and progress!',
        date: nextSunday,
        repeatType: 'week',
      });
    };

    scheduleDailyReminder();
    scheduleWeeklySummary();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
