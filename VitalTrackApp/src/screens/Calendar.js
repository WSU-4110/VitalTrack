import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View, StatusBar, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useAuth } from '../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

export default function CalendarScreen() {
    const { currentUser, loading: authLoading } = useAuth();
    const [selectedDate, setSelectedDate] = useState('');
    const [loggedEntries, setLoggedEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEntries = async () => {
        if (currentUser) {
            try {
                setLoading(true);
                const userId = currentUser.uid;
                const response = await fetch(`http://10.0.2.2:5000/getEntries/${userId}`, { method: 'GET' });
                const result = await response.json();
                if (result.success) {
                    setLoggedEntries(result.entries);
                }
            } catch (error) {
                console.error('Error fetching entries:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchEntries();
        }, [currentUser])
    );

    const markedDates = loggedEntries.reduce((acc, entry) => {
        const moodColor = entry.mood === 'Good' ? '#4CAF50' : entry.mood === 'Okay' ? '#FFD700' : '#FF3B30';
        acc[entry.date] = {
            customStyles: { container: { backgroundColor: moodColor }, text: { color: 'white' } },
        };
        return acc;
    }, {});

    const filteredEntries = loggedEntries.filter((entry) => entry.date === selectedDate);

    if (authLoading || loading) {
        return <ActivityIndicator size="large" color="#4A90E2" />;
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Calendar Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Calendar</Text>
            </View>

            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={markedDates}
                    markingType={'custom'}
                    theme={{
                        backgroundColor: '#2E2E2E',
                        calendarBackground: '#FFFFFF',
                        textSectionTitleColor: '#4A90E2',
                        selectedDayBackgroundColor: '#FF3B30',
                        selectedDayTextColor: '#FFFFFF',
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
                    style={styles.calendar}
                    firstDay={1}
                    enableSwipeMonths={true}
                />
            </View>

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

            <View style={styles.entriesContainer}>
                <Text style={styles.entriesHeader}>Entries</Text>

                {selectedDate && filteredEntries.length > 0 ? (
                    <FlatList
                        data={filteredEntries}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.entryCard}>
                                <Text style={styles.entryText}>Date: {item.date}</Text>
                                <Text style={styles.entryText}>Mood: {item.mood}</Text>
                                <Text style={styles.entryText}>Well-being: {item.well_being}</Text>
                                <Text style={styles.entryText}>Sleep Quality: {item.sleep_quality}</Text>
                                <Text style={styles.entryText}>Activity: {item.activity}</Text>
                                <Text style={styles.entryText}>Symptoms: {item.symptoms.join(', ')}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noEntriesText}>
                        {selectedDate ? 'No entries for this date.' : 'Select a date to view entries.'}
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    calendar: {
        borderRadius: 8,
        overflow: 'hidden',
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
    entriesContainer: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 15,
        marginHorizontal: 15,
        paddingTop: 10,
    },
    entriesHeader: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    entryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    entryText: {
        color: '#333333',
        fontSize: 14,
        marginBottom: 3,
    },
    noEntriesText: {
        color: '#333333',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10,
    },
});
