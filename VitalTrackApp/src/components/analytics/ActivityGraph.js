import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import {BarChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { fetchEntries, processActivities } from './DataProcessor';

export default function ActivityGraph() {
  const [activityData, setActivityData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const entries = await fetchEntries();
      const activityCounts = processActivities(entries);
      setActivityData(activityCounts);
    };

    fetchData();
    }, []);

 return (
    <View style={styles.container}>
      {activityData.length === 0 ? (
        <Text style={styles.subtitle}>Log entries to see data</Text>
      ) : (
        <ScrollView horizontal>
          <BarChart
            data={{
            //fix
            }}
            width={screenWidth - 16}
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
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
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {borderRadius: 16},
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#092b4d"}
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    color: '#ff3b44',
    marginBottom: 10,
  },
  activityText: {
    fontSize: 16,
    color: '#b3b5b4',
    marginBottom: 5,
  }
});