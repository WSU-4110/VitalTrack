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
    const [modalVisible, setModalVisible] = useState(false);
    const [wellbeingEntries, setWellbeingEntries] = useState([]);
    const [symptomsEntries, setSymptomsEntries] = useState([]);
    const [sleepEntries, setSleepEntries] = useState([]);
    const [activityEntries, setActivityEntries] = useState([]);
    const [moodEntries, setMoodEntries] = useState([]);
    const [stressEntries, setStressEntries] = useState([]);
    const [energyEntries, setEnergyEntries] = useState([]);

    const [loggedEntries, setLoggedEntries] = useState([]); // Store all logged entries
    const [currentStep, setCurrentStep] = useState('wellbeing');
    const [selectedWellBeing, setSelectedWellBeing] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [selectedStress, setSelectedStress] = useState('');
    const [selectedEnergy, setSelectedEnergy] = useState('');

  
const wellBeingIcons = {
    'Very Poor': require('../../assets/icons/well-being/well-being-verypoor.png'),
    'Poor': require('../../assets/icons/well-being/well-being-poor.png'),
    'Okay': require('../../assets/icons/well-being/well-being-okay.png'),
    'Good': require('../../assets/icons/well-being/well-being-good.png'),
    'Great': require('../../assets/icons/well-being/well-being-great.png'),
};

const symptomsIcons = {
    'Sneeze': require('../../assets/icons/symptoms/symptoms-sneeze.png'),
    'Nausea': require('../../assets/icons/symptoms/symptoms-nausea.png'),
    'Headache': require('../../assets/icons/symptoms/symptoms-headache.png'),
    'Fever': require('../../assets/icons/symptoms/symptoms-fever.png'),
    'Fatigue': require('../../assets/icons/symptoms/symptoms-fatigue.png'),
};

const sleepIcons = {
    'Bad': require('../../assets/icons/sleep/sleep-bad.png'),
    'Moderate': require('../../assets/icons/sleep/sleep-moderate.png'),
    'Good': require('../../assets/icons/sleep/sleep-good.png'),
};

const activityIcons = {
    'Yoga': require('../../assets/icons/activity/activity-yoga.png'),
    'Weights': require('../../assets/icons/activity/activity-weights.png'),
    'Walk': require('../../assets/icons/activity/activity-walk.png'),
    'Sport': require('../../assets/icons/activity/activity-sport.png'),
    'HIT': require('../../assets/icons/activity/activity-HIT.png'),
};

const moodIcons = {
    'Vey Bad': require('../../assets/icons/mood/mood-verybad.png'),
    'Bad': require('../../assets/icons/mood/mood-bad.png'),
    'Okay': require('../../assets/icons/mood/mood-okay.png'),
    'Good': require('../../assets/icons/mood/mood-good.png'),
    'Great': require('../../assets/icons/mood/mood-great.png'),
};

const energyIcons = {
    'Very Low': require('../../assets/icons/energy/energy-verylow.png'),

    'Low': require('../../assets/icons/energy/energy-low.png'),
    'Moderate': require('../../assets/icons/energy/energy-moderate.webp'),
    'High': require('../../assets/icons/energy/energy-high.webp'),
};

const stressIcons = {
    'Low': require('../../assets/icons/stress/stress-low.png'),
    'Moderate': require('../../assets/icons/stress/stress-medium.jpg'),
    'High': require('../../assets/icons/stress/stress-high.png'),
};

    const toggleButton = (group, selection, setGroup) => {
        if (group.includes(selection)) {
            setGroup(group.filter((e) => e !== selection));
        } else {
            setGroup([...group, selection]);
        }
    };

    const handleWellBeingSelection = (selection) => {
        toggleButton(wellbeingEntries, selection, setWellbeingEntries);
        setSelectedWellBeing(selection);
        setCurrentStep('details');
    };

    const handleNextToMood = () => {
        setCurrentStep('mood'); // Move to the mood, energy, and stress step
    };

    const logEntry = () => {
        const newEntry = {
            id: Math.random().toString(),
            wellBeing: selectedWellBeing,
            symptoms: symptomsEntries,
            sleep: sleepEntries,
            activity: activityEntries,
            mood: selectedMood,
            stress: selectedStress,
            energy: selectedEnergy,
            date: new Date().toLocaleDateString(),
        };

        // When an entry is logged, reset all selections
        setLoggedEntries([...loggedEntries, newEntry]);
        setModalVisible(false);
        setWellbeingEntries([]);
        setSymptomsEntries([]);
        setSleepEntries([]);
        setActivityEntries([]);
        setSelectedMood('');
        setSelectedStress('');
        setSelectedEnergy('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Entries</Text>
            </View>

            {/* Display Logged Entries */}
            {(() => {
                if (loggedEntries.length === 0) {
                    return <Text style={styles.noEntriesText}>No entries logged yet</Text>;
                } else {
                    return (
                        <FlatList
                            data={loggedEntries}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.entryCard}>
                                    <View style={styles.entryContent}>
                                        <View>
                                            <Text style={styles.date}>{item.date}</Text>
                                            <Text style={styles.summary}>Symptoms: {item.symptoms.join(', ')}</Text>
                                            <Text style={styles.summary}>Sleep: {item.sleep.join(', ')}</Text>
                                            <Text style={styles.summary}>Activity: {item.activity.join(', ')}</Text>
                                            <Text style={styles.summary}>Mood: {item.mood}</Text>
                                            <Text style={styles.summary}>Stress: {item.stress}</Text>
                                            <Text style={styles.summary}>Energy: {item.energy}</Text>
                                        </View>
                                        <Image source={wellBeingIcons[item.wellBeing]} style={styles.wellBeingIcon} />
                                    </View>
                                </View>
                            )}
                        />
                    );
                }
            })()}

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setModalVisible(true);
                    setCurrentStep('wellbeing');
                }}
            >
                <Text style={styles.buttonText}>Add Entry</Text>
            </TouchableOpacity>

            {/* Full-Screen Modal */}
            <Modal
                transparent={false}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    <View style={styles.modalContent}>
                        {/* Step 1: Well-being Selection */}
                        {currentStep === 'wellbeing' && (
                            <>
                                <Text style={styles.modalTitle}>How is your well-being today?</Text>
                                <View style={styles.iconRow}>
                                    {Object.keys(wellBeingIcons).map((wellBeing) => (
                                        <TouchableOpacity
                                            key={wellBeing}
                                            style={[
                                                styles.moodOption,
                                                selectedWellBeing === wellBeing && styles.selectedOption,
                                            ]}
                                            onPress={() => handleWellBeingSelection(wellBeing)}
                                        >
                                            <Image
                                                source={wellBeingIcons[wellBeing]}
                                                style={[
                                                    styles.icon,
                                                    selectedWellBeing === wellBeing && { tintColor: 'black' }
                                                ]}
                                            />
                                            <Text style={[
                                                styles.iconLabel,
                                                selectedWellBeing === wellBeing && { color: 'black' }
                                            ]}>
                                                {wellBeing}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        )}

                        {/* Step 2: Symptoms, Sleep, and Activity */}
                        {currentStep === 'details' && (
                            <>
                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={() => setCurrentStep('wellbeing')}
                                >
                                    <Text style={styles.backButtonText}>← Back</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Select Symptoms, Sleep, and Activity</Text>
                                <ScrollView style={styles.scrollView}>
                                    {/* Symptoms Section */}
                                    <View style={styles.groupContainer}>
                                        <View style={styles.groupBorder}>
                                            <Text style={styles.sectionTitle}>Symptoms</Text>
                                            <View style={styles.iconRow}>
                                                {Object.keys(symptomsIcons).map((symptom) => (
                                                    <TouchableOpacity
                                                        key={symptom}
                                                        style={[
                                                            styles.moodOption,
                                                            symptomsEntries.includes(symptom) && styles.selectedOption,
                                                        ]}
                                                        onPress={() => toggleButton(symptomsEntries, symptom, setSymptomsEntries)}
                                                    >
                                                        <Image source={symptomsIcons[symptom]}
                                                            style={[
                                                                styles.icon,
                                                                symptomsEntries.includes(symptom) && { tintColor: 'black' }
                                                            ]}
                                                        />
                                                        <Text style={[
                                                            styles.iconLabel,
                                                            symptomsEntries.includes(symptom) && { color: 'black' }
                                                        ]}>{symptom}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    </View>

                                    {/* Sleep Section */}
                                    <View style={styles.groupContainer}>
                                        <View style={styles.groupBorder}>
                                            <Text style={styles.sectionTitle}>Sleep</Text>
                                            <View style={styles.iconRow}>
                                                {Object.keys(sleepIcons).map((sleep) => (
                                                    <TouchableOpacity
                                                        key={sleep}
                                                        style={[
                                                            styles.moodOption,
                                                            sleepEntries.includes(sleep) && styles.selectedOption,
                                                        ]}
                                                        onPress={() => toggleButton(sleepEntries, sleep, setSleepEntries)}
                                                    >
                                                        <Image source={sleepIcons[sleep]}
                                                            style={[
                                                                styles.icon,
                                                                sleepEntries.includes(sleep) && { tintColor: 'black' }
                                                            ]}
                                                        />
                                                        <Text style={[
                                                            styles.iconLabel,
                                                            sleepEntries.includes(sleep) && { color: 'black' }
                                                        ]}>{sleep}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    </View>

                                    {/* Activity Section */}
                                    <View style={styles.groupContainer}>
                                        <View style={styles.groupBorder}>
                                            <Text style={styles.sectionTitle}>Activity</Text>
                                            <View style={styles.iconRow}>
                                                {Object.keys(activityIcons).map((activity) => (
                                                    <TouchableOpacity
                                                        key={activity}
                                                        style={[
                                                            styles.moodOption,
                                                            activityEntries.includes(activity) && styles.selectedOption,
                                                        ]}
                                                        onPress={() => toggleButton(activityEntries, activity, setActivityEntries)}
                                                    >
                                                        <Image source={activityIcons[activity]}
                                                            style={[
                                                                styles.icon,
                                                                activityEntries.includes(activity) && { tintColor: 'black' }
                                                            ]}
                                                        />
                                                        <Text style={[
                                                            styles.iconLabel,
                                                            activityEntries.includes(activity) && { color: 'black' }
                                                        ]}>{activity}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.logButton}
                                        onPress={handleNextToMood} // Move to the mood step
                                    >
                                        <Text style={styles.logButtonText}>Next</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </>
                        )}

                        {/* Step 3: Mood, Energy, and Stress */}
                        {currentStep === 'mood' && (
                            <>
                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={() => setCurrentStep('details')}
                                >
                                    <Text style={styles.backButtonText}>← Back</Text>
                                </TouchableOpacity>

                                <Text style={styles.modalTitle}>Track your Mood, Energy, and Stress</Text>

                                {/* Mood Section */}
                                <View style={styles.groupContainer}>
                                    <View style={styles.groupBorder}>
                                        <Text style={styles.sectionTitle}>Mood</Text>
                                        <View style={styles.iconRow}>
                                            {Object.keys(moodIcons).map((mood) => (
                                                <TouchableOpacity
                                                    key={mood}
                                                    style={[
                                                        styles.moodOption,
                                                        selectedMood === mood && styles.selectedOption,
                                                    ]}
                                                    onPress={() => setSelectedMood(mood)}
                                                >
                                                    <Image source={moodIcons[mood]}
                                                        style={[
                                                            styles.icon,
                                                            selectedMood === mood && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        selectedMood === mood && { color: 'black' }
                                                    ]}>{mood}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>

                                {/* Energy Section */}
                                <View style={styles.groupContainer}>
                                    <View style={styles.groupBorder}>
                                        <Text style={styles.sectionTitle}>Energy</Text>
                                        <View style={styles.iconRow}>
                                            {Object.keys(energyIcons).map((energy) => (
                                                <TouchableOpacity
                                                    key={energy}
                                                    style={[
                                                        styles.moodOption,
                                                        selectedEnergy === energy && styles.selectedOption,
                                                    ]}
                                                    onPress={() => setSelectedEnergy(energy)}
                                                >
                                                    <Image source={energyIcons[energy]}
                                                        style={[
                                                            styles.icon,
                                                            selectedEnergy === energy && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        selectedEnergy === energy && { color: 'black' }
                                                    ]}>{energy}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>

                                {/* Stress Section */}
                                <View style={styles.groupContainer}>
                                    <View style={styles.groupBorder}>
                                        <Text style={styles.sectionTitle}>Stress</Text>
                                        <View style={styles.iconRow}>
                                            {Object.keys(stressIcons).map((stress) => (
                                                <TouchableOpacity
                                                    key={stress}
                                                    style={[
                                                        styles.moodOption,
                                                        selectedStress === stress && styles.selectedOption,
                                                    ]}
                                                    onPress={() => setSelectedStress(stress)}
                                                >
                                                    <Image source={stressIcons[stress]}
                                                        style={[
                                                            styles.icon,
                                                            selectedStress === stress && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        selectedStress === stress && { color: 'black' }
                                                    ]}>{stress}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>

                                {/* Log Entry Button */}
                                <TouchableOpacity
                                    style={styles.logButton}
                                    onPress={logEntry}  // Log the entry
                                >
                                    <Text style={styles.logButtonText}>Log Entry</Text>
                                </TouchableOpacity>
                            </>
                        )}
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
        backgroundColor: '#000000',
        justifyContent: 'flex-start',
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#ffffff',
    },
    modalContent: {
        padding: 35,
        alignItems: 'center',
        maxHeight: '100%',
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
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    groupContainer: {
        marginBottom: 20,
    },
    groupBorder: {
        borderColor: '#4c4c4c',
        backgroundColor: '#4c4c4c',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        flexWrap: 'wrap',
        gap: 8,
    },
    icon: {
        height: 60,
        width: 60,
        tintColor: '#ffffff',
        resizeMode: 'contain',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
    },
    selectedOption: {
        backgroundColor: '#7bb7e0',
        borderRadius: 30,
    },
    iconLabel: {
        color: '#ffffff',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 5,
    },
    logButton: {
        backgroundColor: '#de0f3f',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    logButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    entryCard: {
        backgroundColor: '#4c4c4c',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    entryContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summary: {
        color: '#ffffff',
        fontSize: 14,
    },
    date: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    wellBeingIcon: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        tintColor: '#ffffff',
    },
    logButton: {
        backgroundColor: '#de0f3f',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    logButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
