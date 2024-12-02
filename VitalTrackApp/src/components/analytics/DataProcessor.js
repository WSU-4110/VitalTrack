import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const moodNums = new Map([
  ["Very Bad", 1],
  ["Bad", 2],
  ["Okay", 3],
  ["Good", 4],
  ["Great", 5]
]);

export const fetchEntries = async () => {
  const userId = auth().currentUser ? auth().currentUser.uid : null;
  if (!userId) return [];

  try {
    const response = await axios.get(`http://10.0.2.2:5000/getEntries/${userId}`);
    return response.data.success ? response.data.entries : [];
  } catch (error) {
    Alert.alert("Error", error.message);
    return [];
  }
};

export const processMoodData = (entries) => {
  return entries.slice(0, 7).map(entry => moodNums.get(entry.mood) || 0);
};

export const processActivities = (entries) => {
  const activityCounts = {};
  const recentEntries = entries.slice(0, 7);

  recentEntries.forEach(entry => {
    const activity = entry.activityType;
    if (activity) {
      activityCounts[activity] = (activityCounts[activity] || 0) + 1;
    }
  });

  return activityCounts;
};
