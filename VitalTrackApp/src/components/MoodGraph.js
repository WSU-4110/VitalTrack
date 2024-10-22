import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { Dimensions } from "react-native";

export default function MoodGraph(){
  const [entries, setEntries] = useState([]);
  const [moodData, setMoodData] = useState([]);

  // Fetch entries for the logged-in user
  useEffect(() => {
    const fetchEntries = async () => {
      const userId = auth().currentUser ? auth().currentUser.uid : null; // Get the user ID from Firebase
      if (!userId) return;

      try {
        const response = await axios.get(`http://10.0.2.2:5000/getEntries/${userId}`);
        if (response.data.success) {
          const fetchedEntries = response.data.entries;
          setEntries(fetchedEntries); // Set fetched entries to the state

          // Extract mood data from the last 7 entries
          const moods = fetchedEntries.slice().reverse().slice(0, 7).map(entry => entry.mood);
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

     const data = {
       labels: ["1","2","3","4","5","6","7"], // just 1 to 7 for now
       datasets: [
         {
           data: moodData.length > 0 ? moodData : [0, 0, 0, 0, 0, 0, 0],
         }
       ]
     };

    return(
        <View>
         {moodData.length > 0 ? (
          <LineChart
            data={data}
            width={Dimensions.get("window").width-60} // from react-native
            height={220}
            yAxisLabel=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        ) : (
           <Text style={styles.subtitle}>Log entries to see graph</Text> // Show a message if no data
        )}
      </View>
    )
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

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    color: '#D3D3D3',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 2,
    }
});