

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StatusBar, StyleSheet,Text,} from 'react-native';
import { CalendarWithTooltips } from '../components/CalendarWithTooltips';
import { useAuth } from '../contexts/AuthContext';

export default function CalendarScreen() {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    if (currentUser) {
      try {
        setLoading(true);
        const userId = currentUser.uid;
        const response = await fetch(`http://10.0.2.2:5000/getEntries/${userId}`);
        const result = await response.json();
        if (result.success) {
          setEntries(result.entries);
        }
      } catch (error) {
        console.error('Error fetching entries:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [currentUser]);

  // Compute markedDates based on entries
  const markedDates = entries.reduce((acc, entry) => {
    const moodColor =
      entry.mood === 'Good'
        ? '#4CAF50'
        : entry.mood === 'Okay'
        ? '#FFD700'
        : entry.mood === 'Bad'
        ? '#FF3B30'
        : '#B0B0B0';

    acc[entry.date] = {
      customStyles: {
        container: {
          backgroundColor: moodColor,
          borderRadius: 16,
        },
        text: {
          color: '#FFFFFF',
        },
      },
    };
    return acc;
  }, {});

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Calendar Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Calendar</Text>
      </View>

      <View style={styles.calendarContainer}>
        <CalendarWithTooltips
          entries={entries}
          markedDates={markedDates}
          firstDay={1}
          enableSwipeMonths={true}
        />
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Good Mood</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#FFD700' }]} />
          <Text style={styles.legendText}>Okay Mood</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: '#FF3B30' }]} />
          <Text style={styles.legendText}>Bad Mood</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... your existing styles
  container: {
    flex: 1,
    backgroundColor: '#2E2E2E',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2E2E2E',
  },
  titleContainer: {
    backgroundColor: '#7bb7e0',
    paddingVertical: 10,
    alignItems: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColorBox: {
    width: 15,
    height: 15,
    marginRight: 5,
    borderRadius: 3,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
