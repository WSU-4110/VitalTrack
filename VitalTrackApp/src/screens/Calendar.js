import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StatusBar, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useAuth } from '../contexts/AuthContext';

export default function CalendarScreen() {
  const { currentUser, loading: authLoading } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [loggedEntries, setLoggedEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchEntries = async () => {
    if (currentUser) {
      try {
        const userId = currentUser.uid;
        const response = await fetch(`http://10.0.2.2:5000/getEntries/${userId}`, {
          method: 'GET',
        });
        const result = await response.json();
        console.log('API Response:', result); 
        if (result.success) {
          setLoggedEntries(result.entries);
          console.log('Logged Entries:', result.entries); 
        } else {
          console.error('Error fetching entries:', result.error);
        }
      } catch (error) {
        console.error('Error fetching entries:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  fetchEntries();
}, [currentUser]);



  const markedDates = loggedEntries.reduce((acc, entry) => {
    const moodColor = entry.mood === 'Good' ? 'green' : entry.mood === 'Okay' ? 'yellow' : 'red';
    acc[entry.date] = {
      customStyles: { container: { backgroundColor: moodColor }, text: { color: 'white' } },
    };
    return acc;
  }, {});

  const filteredEntries = loggedEntries.filter((entry) => entry.date === selectedDate);

  if (authLoading || loading) {
    return <ActivityIndicator size="large" color="#7BB7E0" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Calendar</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={markedDates}
          markingType={'custom'}
          theme={{
            backgroundColor: '#2C2C2C',
            calendarBackground: '#2C2C2C',
            textSectionTitleColor: '#7BB7E0',
            selectedDayBackgroundColor: '#DE0F3F',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#7BB7E0',
            dayTextColor: '#FFFFFF',
            textDisabledColor: '#444444',
            arrowColor: '#7BB7E0',
            monthTextColor: '#FFFFFF',
            indicatorColor: 'blue',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
            textDayFontSize: 16, 
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
          style={styles.calendar}
          firstDay={1}
          enableSwipeMonths={true}
          hideExtraDays={false}
        />
      </View>

      {/* Display the entry for the selected date */}
      <View style={styles.entriesContainer}>
        {selectedDate && filteredEntries.length > 0 ? (
          <>
            <Text style={styles.selectedDateText}>Entries for {selectedDate}:</Text>
            <FlatList
              data={filteredEntries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.entryCard}>
                  <Text style={styles.entryTitle}>Well-being: {item.well_being}</Text>
                  <Text style={styles.summary}>Symptoms: {item.symptoms.join(', ')}</Text>
                  <Text style={styles.summary}>Sleep: {item.sleep_quality}</Text>
                  <Text style={styles.summary}>Activity: {item.activity}</Text>
                  <Text style={styles.summary}>Mood: {item.mood}</Text>
                </View>
              )}
            />
          </>
        ) : (
          <Text style={styles.noEntriesText}>
            {selectedDate ? 'No entries for this date.' : 'Select a date to view entries.'}
          </Text>
        )}
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: 'green' }]} />
          <Text style={styles.legendText}>Your mood was good</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: 'yellow' }]} />
          <Text style={styles.legendText}>Your mood was okay</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, { backgroundColor: 'red' }]} />
          <Text style={styles.legendText}>Your mood was bad</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  titleContainer: {
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 20,  
    fontWeight: 'bold',
  },
  calendarContainer: {
    flex: 2,  
    paddingBottom: 10,
  },
  calendar: {
    width: '100%',
    padding: 5,
  },
  entriesContainer: {
    flex: 1.3,
    paddingHorizontal: 15, 
    paddingBottom: 10, 
  },
  selectedDateText: {
    fontSize: 16,  
    color: '#7BB7E0',
    marginBottom: 5,
  },
  entryCard: {
    backgroundColor: '#4C4C4C',
    borderRadius: 12, 
    padding: 10,
    marginBottom: 8, 
    elevation: 3,
  },
  entryTitle: {
    color: '#FFFFFF',
    fontSize: 15, 
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summary: {
    color: '#CCCCCC',
    fontSize: 13, 
    marginBottom: 3,
  },
  noEntriesText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15, 
  },
  legendContainer: {
    paddingVertical: 8, 
    paddingHorizontal: 15, 
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendColorBox: {
    width: 15,  
    height: 15, 
    marginRight: 8,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 13, 
  },
});
