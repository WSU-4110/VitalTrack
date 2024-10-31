

import React from 'react';
import { Calendar } from 'react-native-calendars';
import { Tooltip } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';

export function CalendarWithTooltips(props) {
  const { entries, markedDates, ...restProps } = props;


  const entriesByDate = entries.reduce((acc, entry) => {
    acc[entry.date] = entry;
    return acc;
  }, {});

  return (
    <Calendar
      {...restProps}
      markedDates={markedDates}
      markingType={'custom'}
      dayComponent={({ date, state, marking }) => {
        const entry = entriesByDate[date.dateString];
        const isDisabled = state === 'disabled';

        const dayStyle = [
          styles.dayText,
          marking?.customStyles?.text,
          { color: isDisabled ? '#B0B0B0' : '#333333' },
        ];

        const containerStyle = [
          styles.dayContainer,
          marking?.customStyles?.container,
        ];

        if (entry) {
          return (
            <Tooltip
              popover={
                <View style={styles.tooltipContent}>
                  <Text style={styles.tooltipTitle}>Mood: {entry.mood}</Text>
                  <Text style={styles.tooltipText}>Well-being: {entry.well_being}</Text>
                  <Text style={styles.tooltipText}>Sleep Quality: {entry.sleep_quality}</Text>
                  <Text style={styles.tooltipText}>Activity: {entry.activity}</Text>
                  <Text style={styles.tooltipText}>
                    Symptoms: {entry.symptoms.join(', ')}
                  </Text>
                </View>
              }
              backgroundColor="rgba(255, 255, 255, 0.9)"
              height={120}
              width={180}
              overlayColor="rgba(0, 0, 0, 0.5)"
              containerStyle={styles.tooltipContainer}
              skipAndroidStatusBar={true} /
            >
              <View style={containerStyle}>
                <Text style={dayStyle}>{date.day}</Text>
              </View>
            </Tooltip>
          );
        } else {
          return (
            <View style={containerStyle}>
              <Text style={dayStyle}>{date.day}</Text>
            </View>
          );
        }
      }}
      theme={{
        backgroundColor: '#2E2E2E',
        calendarBackground: '#FFFFFF',
        textSectionTitleColor: '#4A90E2',
        todayTextColor: '#4A90E2',
        dayTextColor: '#333333',
        textDisabledColor: '#B0B0B0',
        arrowColor: '#4A90E2',
        monthTextColor: '#333333',
        textDayFontWeight: '400',
        textMonthFontWeight: '600',
        textDayHeaderFontWeight: '500',
        textDayFontSize: 16,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 14,
      }}
    />
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    margin: 1,
  },
  dayText: {
    textAlign: 'center',
    fontSize: 14,
  },
  tooltipContent: {
    padding: 10,
  },
  tooltipTitle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  tooltipText: {
    color: '#555555',
    fontSize: 12,
    marginBottom: 2,
  },
  tooltipContainer: {
    padding: 5,
  },
});
