import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import MoodGraph from '../components/MoodGraph';
import axios from 'axios';
import auth from '@react-native-firebase/auth';


export default function AnalyticsScreen() {
  const [tips, setTips] = useState(null);
  const userId = auth().currentUser ? auth().currentUser.uid : null;

  // Use useEffect to fetch tips when the component mounts
  useEffect(() => {
    const fetchTips = async () => {
      if (!userId) return;

      try {
        const response = await axios.get('http://10.0.2.2:5000/tips/${userId}');
        if (response.data) {
          setTips(response.data);
        } else {
          Alert.alert('Error', 'No tips found');
        }
      } catch (error) {
        console.log("Error fetching tips:", error);
        Alert.alert('Error', error.message);
      }
    };

    fetchTips();
  }, [userId]);


  return(
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Analytics Page</Text>
        <Text style={styles.subtitle}>An overview of your wellbeing</Text>

        <View style={styles.section}>
            <Text style={styles.title}>Insights</Text>
            <Text style={styles.subtitle}>{tips.message}</Text>
        </View>

        <View style={styles.section}>
            <Text style={styles.title}>Mental Health</Text>
            <Text style={styles.caption}>Your mood this week</Text>
            <MoodGraph />
        </View>


        <View style={styles.section}>
            <Text style={styles.title}>Physical Health</Text>
            <Text style={styles.subtitle}>This month, you were less likely to [have headaches] when you
             [slept well].</Text>


         </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: '#2C2C2C',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#D3D3D3',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 2,
  },
  caption: {
    fontSize: 20,
    color: '#72baff',
    marginBottom: 10,
  },
  graph: {
      height: 200,
      aspectRatio: 1.5,
      marginBottom: 5,
    },
  section: {
      marginVertical: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: '#333',
      width: '95%',
    }
});