import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MoodGraph from '../components/MoodGraph';
import TextGeneratorEffect from '../components/TextGeneratorEffect';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

export default function AnalyticsScreen() {
  const [tips, setTips] = useState(null);
  const [trendAnalysis, setTrendAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = auth().currentUser ? auth().currentUser.uid : null;

  // Helper function to map numeric values to descriptive words
  const mapToWords = (value) => {
    if (value <= 1.5) return "Low";
    if (value <= 2.5) return "Moderate";
    if (value <= 3.5) return "Good";
    if (value > 3.5) return "Great";
    return "No data available"; // Fallback for unexpected values
  };
  // Fetch trend analysis data
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        console.log(`Fetching trends for user ID: ${userId}`);
        const response = await fetch(`http://10.0.2.2:5000/getTrends/${userId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('Trends data:', data);
        setTrendAnalysis(data.trends);
      } catch (error) {
        console.log('Error fetching trends:', error.message);
      }
    };

    fetchTrends();
  }, [userId]);


  // Fetch AI tips
  useEffect(() => {
    const fetchTips = async () => {
      if (!userId) {
        console.log('No user ID, skipping tips fetch');
        return;
      }

      try {
        console.log(`Fetching tips for user ID: ${userId}`);
        const response = await axios.get(`http://10.0.2.2:5000/tips/${userId}`);
        console.log('Tips response:', response.data);
        if (response.data) {
          setTips(response.data);
        } else {
          Alert.alert('Error', 'No tips found');
        }
      } catch (error) {
        console.log('Error fetching tips:', error.message);
        Alert.alert('Error', error.message);
      }
    };

    fetchTips();
  }, [userId]);

  // Show loading indicator if fetching data
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading analytics...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Analytics</Text>
        </View>
        <Text style={styles.subtitle}>An overview of your wellbeing</Text>

        {/* AI Insights Section */}
        <View style={styles.section}>
          <Text style={styles.title}>AI Insights</Text>
          <TextGeneratorEffect style={styles.caption} text={tips ? tips.message : ""} />
        </View>

        {/* Mood Graph Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Mental Health</Text>
          <Text style={styles.caption}>Your mood this week</Text>
          <MoodGraph />
        </View>



        {/* Moving Averages Section */}
        {trendAnalysis && (
          <View style={styles.section}>
            <Text style={styles.title}>Moving Averages</Text>
            <Text style={styles.caption}>Weekly averages of well-being and mood:</Text>
            <Text style={styles.caption}>
              {`Well-being: ${trendAnalysis.moving_averages?.well_being?.length > 0
                  ? mapToWords(trendAnalysis.moving_averages?.well_being?.slice(-1)[0])
                  : "No data available"
                }`}
            </Text>
            <Text style={styles.caption}>
              {`Mood: ${trendAnalysis.moving_averages?.mood?.length > 0
                  ? mapToWords(trendAnalysis.moving_averages?.mood?.slice(-1)[0])
                  : "No data available"
                }`}
            </Text>
          </View>
        )}

{/* Weekly Summary Section */}
{trendAnalysis && trendAnalysis.weekly_summary?.date?.length > 0 ? (
  <View style={styles.section}>
    <Text style={styles.title}>Weekly Summary</Text>
    {trendAnalysis.weekly_summary.date.map((date, index) => (
      <Text key={index} style={styles.caption}>
        {`Week of ${date}: Well-being: ${
          mapToWords(trendAnalysis.weekly_summary.well_being[index]) || "N/A"
        }, Mood: ${
          mapToWords(trendAnalysis.weekly_summary.mood[index]) || "N/A"
        }`}
      </Text>
    ))}
  </View>
) : (
  <Text style={styles.caption}>No weekly summary available</Text>
)}

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
  section: {
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#333',
    width: '95%',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
});
