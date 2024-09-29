import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    FlatList,
    Image,

} from 'react-native';

export default function EntriesScreen() {
    // State to manage modal visibility
    const [modalVisible, setModalVisible] = useState(false);
    // State to store entries
    const [entries, setEntries] = useState([]);

    // States for different entries
    const [moodEntries, setMoodEntries] = useState([]);       // Empty list for mood entries
    const [symptomsEntries, setSymptomsEntries] = useState([]); // Empty list for symptoms

    // Reusable toggleButton function
    const toggleButton = (group, selection, setGroup) => {
        if (group.includes(selection)) {
            setGroup(group.filter((e) => e !== selection)); // Update the group by filtering out the selection
        } else {
            setGroup([...group, selection]); // Update the group by adding the selection
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Entries</Text>
            </View>

            {/* Tips */}
            <View style={styles.tips}>
                <Text style={styles.description}>
                    You are feeling significantly better today
                </Text>
            </View>

            {/* Entries List */}
            <FlatList
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.entryCard}>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.mood}>{item.mood}</Text>
                    </View>
                )}
            />

            {/* Button to open modal */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>Add Entry</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Track your physical health</Text>

                        {/* Scrollable content within modal */}
                        <ScrollView style={styles.scrollView}>
                            {/* Left and Right Columns Container */}
                            <View style={styles.rowContainer}>
                                {/* Left Column (Labels) */}
                                <View style={styles.leftColumn}>
                                    <Text style={styles.label}>Overall well-being:</Text>
                                    <Text style={styles.label}>Symptoms:</Text>
                                </View>

                                {/* Right Column (Icons/Buttons) */}
                                <View style={styles.rightColumn}>
                                    {/* Overall Well-being Row */}
                                    <View style={styles.iconRow}>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(moodEntries, 'Very Poor', setMoodEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(moodEntries, 'Poor', setMoodEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(moodEntries, 'Okay', setMoodEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(moodEntries, 'Good', setMoodEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(moodEntries, 'Great', setMoodEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Symptoms Row */}
                                    <View style={styles.iconRow}>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(symptomsEntries, 'Sneeze', setSymptomsEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(symptomsEntries, 'Nausea', setSymptomsEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(symptomsEntries, 'Headache', setSymptomsEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(symptomsEntries, 'Fever', setSymptomsEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.moodOption}
                                            onPress={() => toggleButton(symptomsEntries, 'Fatigue', setSymptomsEntries)}
                                        >
                                            <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>

                        {/* Cancel Button */}
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2C2C',
        padding: 20,
    },
    header: {
        backgroundColor: '#4c4c4c',
        width: '90%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: 10,
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    tips: {
        backgroundColor: '#4c4c4c',
        height: 50,
        borderRadius: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    entryCard: {
        backgroundColor: '#000',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    date: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    mood: {
        color: '#00ff00',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20, // Ensure there's padding around the modal
    },
    modalContent: {
        backgroundColor: '#4c4c4c',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        maxHeight: '100%', // Set max height for the modal to prevent overflow
        width: '100%',
    },
    scrollView: {
        width: '100%',
    },
    modalTitle: {
        color: '#ffffff',
        fontSize: 24,
        marginBottom: 15,
    },
    cancelButton: {
        marginTop: 15,
        padding: 10,
        width: '100%',
        backgroundColor: '#ff0000',
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    leftColumn: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    rightColumn: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    label: {
        color: '#ffffff',
        fontSize: 18,
        marginVertical: 10,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    moodOption: {
        // backgroundColor: '#000',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    icon: {
        height:40,
        width:30,
    },
});
