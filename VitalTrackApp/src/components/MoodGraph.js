import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from 'axios';
import auth from '@react-native-firebase/auth';

export default function MoodGraph() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const userId = auth().currentUser ? auth().currentUser.uid : null; // Get the user ID from Firebase
      if (!userId) return;

      try {
        const response = await axios.get(`http://10.0.2.2:5000/getEntries/${userId}`);
        if (response.data.success) {
          const fetchedEntries = response.data.entries;

          const moods = fetchedEntries
            .slice().reverse().slice(0, 7)
            .map(entry => moodNums.get(entry.mood) || 0);

          setMoodData(moods);
        } else {
          Alert.alert('Error', response.data.error);
        }
      } catch (error) {
        console.log("Error fetching entries:", error);
        Alert.alert('Error', error.message);
      }
    };

    fetchEntries();
  }, []);

  return (
    <View style={styles.subtitle}>
      {moodData.length === 0 ? (
        <Text style={styles.subtitle}>Log entries to see data</Text>
      ) : (
        moodData.map((mood, index) => (
          <Text key={index} style={styles.moodText}>
            {`Mood ${index + 1}: ${mood}`}
          </Text>
        ))
      )}
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const chartConfig ={
    backgroundColor: "#2C2C2C",
    backgroundGradientFrom: "#7a7979",
    backgroundGradientTo: "#c9c7c7",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {borderRadius: 16},
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#092b4d"}
}
const moodNums = new Map([
  ["Very Bad", 1],
  ["Bad", 2],
  ["Okay", 3],
  ["Good", 4],
  ["Great", 5]
]);

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    color: '#ff3b44',
    marginBottom: 10,
  },
  moodText: {
    fontSize: 16,
    color: '#b3b5b4',
    marginBottom: 5,
  }
});
