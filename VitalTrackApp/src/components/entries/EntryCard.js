import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const wellBeingIcons = {
    'Very Poor': require('../../../assets/icons/well-being/well-being-verypoor.png'),
    'Poor': require('../../../assets/icons/well-being/well-being-poor.png'),
    'Okay': require('../../../assets/icons/well-being/well-being-okay.png'),
    'Good': require('../../../assets/icons/well-being/well-being-good.png'),
    'Great': require('../../../assets/icons/well-being/well-being-great.png'),
};

export default function EntryCard({ entry }) {
    return (
        <View style={styles.EntryCard}>
            <View style={styles.textContent}>
                <Text style={styles.date}>{entry.date}</Text>
                <Text style={styles.summary}>Well-being: {entry.well_being}</Text>
                <Text style={styles.summary}>
                    Symptoms: {entry.symptoms.length > 0 ? entry.symptoms.join(', ') : 'None'}
                </Text>
                <Text style={styles.summary}>Sleep Quality: {entry.sleep_quality}</Text>
                <Text style={styles.summary}>
                    Activity: {entry.activity.length > 0 ? entry.activity.join(', ') : 'None'}
                </Text>
                <Text style={styles.summary}>Mood: {entry.mood}</Text>
                <Text style={styles.summary}>Stress: {entry.stress}</Text>
                <Text style={styles.summary}>Energy: {entry.energy}</Text>
            </View>
            <Image
                source={wellBeingIcons[entry.well_being]}
                style={styles.icon}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    EntryCard: {
        backgroundColor: '#4c4c4c',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContent: {
        flex: 1,  // Allows text to take up remaining space
        marginRight: 10,  // Adds spacing between text and icon
    },
    summary: {
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 5,
    },
    date: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    icon: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        tintColor: '#ffffff',
    },
});
