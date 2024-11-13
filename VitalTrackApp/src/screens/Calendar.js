import React, { useState, useCallback } from 'react';
import { ActivityIndicator, View, StatusBar, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useAuth } from '../contexts/AuthContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function CalendarScreen() {
    const navigation = useNavigation(); // Initialize navigation
    const { currentUser, loading: authLoading } = useAuth();
    const [selectedDate, setSelectedDate] = useState('');
    const [loggedEntries, setLoggedEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [moodFilter, setMoodFilter] = useState('All');

    const fetchEntries = async () => {
        if (currentUser) {
            try {
                setLoading(true);
                const userId = currentUser.uid;
               
                
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
        if (moodFilter === 'All' || moodFilter === entry.mood) {
            acc[entry.date] = {
                customStyles: { container: { backgroundColor: moodColor, borderRadius: 5 }, text: { color: 'white' } },
            };
        }
        return acc;
    }, {});

    const today = moment().format('YYYY-MM-DD');
    if (!markedDates[today]) {
        markedDates[today] = { customStyles: { container: { borderColor: '#4A90E2', borderWidth: 2, borderRadius: 5 } } };
    }

    const filteredEntries = loggedEntries.filter((entry) => entry.date === selectedDate);

    if (authLoading || loading) {
        return <ActivityIndicator size="large" color="#4A90E2" />;
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Calendar Section */}
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

            {/* Mood Filter */}
            <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Filter by Mood:</Text>
                {['All', 'Good', 'Okay', 'Bad'].map((mood) => (
                    <TouchableOpacity key={mood} onPress={() => setMoodFilter(mood)} style={styles.filterButton}>
                        <Text style={[styles.filterText, moodFilter === mood && styles.filterTextActive]}>{mood}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Legend Section */}
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

            {/* Entries Section */}
            <ScrollView style={styles.entriesContainer}>
                <Text style={styles.entriesHeader}>Entries for {selectedDate || "Selected Date"}</Text>
                {selectedDate && filteredEntries.length > 0 ? (
                    <FlatList
                        data={filteredEntries}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.entryCard}>
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
            </ScrollView>

            {/* Floating Add Entry Button */}
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => navigation.navigate('Entries')} // Navigate to Entries screen
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E2E2E',
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
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    filterLabel: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    filterButton: {
        marginHorizontal: 5,
        paddingVertical: 5,
    },
    filterText: {
        color: '#888888',
        fontSize: 14,
    },
    filterTextActive: {
        color: '#FFFFFF',
        fontWeight: 'bold',
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
        marginTop: 10,
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
        padding: 10,
        marginBottom: 10,
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
    addButton: {
        backgroundColor: '#de0f3f',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

