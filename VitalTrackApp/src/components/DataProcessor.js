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
  const userId = auth().currentUser ? auth().currentUser.uid : null; // Get the user ID from Firebase
  if (!userId) return [];

  try {
    const response = await axios.get(`http://10.0.2.2:5000/getEntries/${userId}`);
    if (response.data.success) {
      return response.data.entries;
    } else {
      Alert.alert('Error', response.data.error);
      return [];
    }
  } catch (error) {
    console.log("Error fetching entries:", error);
    Alert.alert('Error', error.message);
    return [];
  }
};

export const processMoodData = (entries) => {
  return entries
    .slice()
    .slice(0, 7)
    .map(entry => moodNums.get(entry.mood) || 0);
};