import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

export default function EntrySummary() {
  const [entries, setEntries] = useState([]);

  // Fetch entries for the logged-in user
  useEffect(() => {
    const fetchEntries = async () => {
      const userId = auth().currentUser ? auth().currentUser.uid : null; // Get the user ID from Firebase
      if (!userId) return;

      try {
        const response = await axios.get(`http://10.0.2.2:5000/getEntries/${userId}`);
        if (response.data.success) {
          setEntries(response.data.entries); // Set fetched entries to the state
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

  // Display a summary of logged entries
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Entries</Text>
      <ScrollView style={styles.scrollView}>
        {entries.length > 0 ? (
          entries.slice().reverse().map((entry, index) => (  // Reverse the entries array
            <View key={index} style={styles.entryItem}>
              <Text style={styles.entryText}>Date: {entry.date}</Text>
              <Text style={styles.entryText}>Mood: {entry.mood}</Text>
              <Text style={styles.entryText}>Well-being: {entry.well_being}</Text>
              <Text style={styles.entryText}>Sleep Quality: {entry.sleep_quality}</Text>
              <Text style={styles.entryText}>Stress: {entry.stress}</Text>
              <Text style={styles.entryText}>
                Activity: {entry.activity.length > 0 ? entry.activity.join(', ') : 'None'}
              </Text>
              <Text style={styles.entryText}>
                Symptoms: {entry.symptoms.length > 0 ? entry.symptoms.join(', ') : 'None'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noEntriesText}>No entries logged yet.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15, // Increase padding for better spacing
    margin: 20, // Adds space between the summary and log button
    backgroundColor: '#f0f0f0', // Light background for contrast
    borderRadius: 10, // Rounded container edges
    width: 400,
    height: 550,
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 550, // Increase max height to show more entries
  },
  entryItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff', // White background for each entry
    borderRadius: 8,
    borderWidth: 1, // Add a border for better separation between entries
    borderColor: '#ddd',
  },
  entryText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 5, // Add space between each tracked value
  },
  noEntriesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
