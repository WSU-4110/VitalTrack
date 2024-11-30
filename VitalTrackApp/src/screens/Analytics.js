import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import MoodGraph from '../components/analytics/MoodGraph';
import ActivityGraph from '../components/analytics/ActivityGraph';
import TextGeneratorEffect from '../components/TextGeneratorEffect';
import axios from 'axios';
import auth from '@react-native-firebase/auth';


export default function AnalyticsScreen() {
  const [tips, setTips] = useState(null);
  const userId = auth().currentUser ? auth().currentUser.uid : null;

  useEffect(() => {
    const fetchTips = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://10.0.2.2:5000/tips/${userId}`);
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
        <View style={styles.header}>
            <Text style={styles.headerText}>Analytics</Text>
          </View>
        <Text style={styles.subtitle}>An overview of your wellbeing</Text>

        <View style={styles.section}>
            <Text style={styles.title}>AI Insights</Text>
            <TextGeneratorEffect style={styles.caption} text={tips ? tips.message : " "}/>
        </View>

        <View style={styles.section}>
            <Text style={styles.title}>Mental Health</Text>
            <Text style={styles.caption}>Your mood this week</Text>
            <MoodGraph />
        </View>


        <View style={styles.section}>
            <Text style={styles.title}>Physical Health</Text>
            <Text style={styles.caption}>Your activities this week</Text>
            <ActivityGraph />

         </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#b3b5b4',
  },
   header: {
     width: '100%',
     padding: 20,
     backgroundColor: '#7bb7e0',
     alignItems: 'center',
   },
   headerText: {
     fontSize: 34,
     color: 'white',
     fontWeight: 'bold',
   },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7bb7e0',
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 2,
  },
  caption: {
    fontSize: 17,
    color: '#b3b5b4',
    marginBottom: 8,
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