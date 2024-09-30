import React, { useState } from 'react';
import { View, StatusBar, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();

  const markedDates = {
    '2024-09-30': { customStyles: { container: { backgroundColor: 'green' }, text: { color: 'white' } } },
    '2024-09-28': { customStyles: { container: { backgroundColor: 'red' }, text: { color: 'white' } } },
    '2024-09-27': { customStyles: { container: { backgroundColor: 'yellow' }, text: { color: 'black' } } },
    ...(selectedDate && {
      [selectedDate]: { selected: true, selectedColor: '#DE0F3F', textColor: '#FFFFFF' },
    }),
  };

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
            navigation.navigate('Entries', { date: day.dateString });
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
    flex: 1,
  },
  calendar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2C2C2C',
  },
  legendContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2C2C2C',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});