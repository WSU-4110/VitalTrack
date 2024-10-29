import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import EntriesScreen from '../screens/Entries';
import CalendarScreen from '../screens/Calendar';
import AnalyticsScreen from '../screens/Analytics';
import MedicationsScreen from "../screens/Medication";
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

import homeIcon from '../../assets/icons/navigation/home-colored.png';
import calendarIcon from '../../assets/icons/navigation/calendar.webp';
import analyticsIcon from '../../assets/icons/navigation/analytics.png';
import entriesIcon from '../../assets/icons/navigation/journal.png';
import medicationIcon from "../../assets/icons/navigation/Medication.png";

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconSource;
          
          // Set the correct icon based on the route name
          if (route.name === 'Home') {
            iconSource = homeIcon;
          } else if (route.name === 'Calendar') {
            iconSource = calendarIcon;
          } else if (route.name === 'Analytics') {
            iconSource = analyticsIcon;
          } else if (route.name === 'Entries') {
            iconSource = entriesIcon;
          }
          else if (route.name === 'Medications') {
            iconSource = medicationIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{ width: size, height: size }}
            />
          );
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: '#ffffff',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Entries" component={EntriesScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name ='Medications' component={MedicationsScreen}/>
    </Tab.Navigator>
  );
}
