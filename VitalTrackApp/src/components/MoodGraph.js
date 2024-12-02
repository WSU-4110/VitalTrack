import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { fetchEntries, processMoodData } from '../components/analytics/DataProcessor';

export default function MoodGraph() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
      const fetchMoodData = async () => {
        const entries = await fetchEntries();
        const processedMoodData = processMoodData(entries);
        setMoodData(processedMoodData);
      };

      fetchMoodData();
    }, []);

 return (
    <View style={styles.container}>
      {moodData.length === 0 ? (
        <Text style={styles.subtitle}>Log entries to see data</Text>
      ) : (
        <ScrollView horizontal>
          <LineChart
            data={{
              labels: moodData.map((_, index) => `Day ${index + 1}`),
              datasets: [{ data: moodData }],
            }}
            width={screenWidth - 16}
            height={220}
            chartConfig={chartConfig}
            style={styles.chartStyle}
          />
        </ScrollView>
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