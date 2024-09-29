import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    Image,
} from 'react-native';

export default function EntriesScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [moodEntries, setMoodEntries] = useState([]);
    const [symptomsEntries, setSymptomsEntries] = useState([]);
    const [sleepEntries, setSleepEntries] = useState([]);
    const [activityEntries, setActivityEntries] = useState([]);

    const [currentStep, setCurrentStep] = useState('wellbeing');

    const toggleButton = (group, selection, setGroup) => {
        if (group.includes(selection)) {
            setGroup(group.filter((e) => e !== selection));
        } else {
            setGroup([...group, selection]);
        }
    };

    const handleWellBeingSelection = (selection) => {
        toggleButton(moodEntries, selection, setMoodEntries);
        setCurrentStep('details');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Entries</Text>
            </View>

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
                    {/* X Button at Top-Right */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    <View style={styles.modalContent}>
                        {currentStep === 'details' && (
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => setCurrentStep('wellbeing')}
                            >
                                <Text style={styles.backButtonText}>← Back</Text>
                            </TouchableOpacity>
                        )}

                        {/* Well-being Selection */}
                        {currentStep === 'wellbeing' ? (
                            <>
                                <Text style={styles.modalTitle}>How is your well-being today?</Text>
                                <View style={styles.iconRow}>
                                    <TouchableOpacity
                                        style={[
                                            styles.moodOption,
                                            moodEntries.includes('Very Poor') && styles.selectedOption,
                                        ]}
                                        onPress={() => handleWellBeingSelection('Very Poor')}
                                    >
                                        <Image source={require('../../assets/icons/well-being/well-being-verypoor.png')}
                                            style={[
                                                styles.icon,
                                                moodEntries.includes('Very Poor') && { tintColor: 'black' }
                                            ]}
                                        />
                                        <Text style={[
                                            styles.iconLabel,
                                            moodEntries.includes('Very Poor') && { color: 'black' }
                                        ]}>Very Poor</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.moodOption,
                                            moodEntries.includes('Poor') && styles.selectedOption,
                                        ]}
                                        onPress={() => handleWellBeingSelection('Poor')}
                                    >
                                        <Image source={require('../../assets/icons/well-being/well-being-poor.png')}
                                            style={[
                                                styles.icon,
                                                moodEntries.includes('Poor') && { tintColor: 'black' }
                                            ]}
                                        />
                                        <Text style={[
                                            styles.iconLabel,
                                            moodEntries.includes('Poor') && { color: 'black' }
                                        ]}>Poor</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.moodOption,
                                            moodEntries.includes('Okay') && styles.selectedOption,
                                        ]}
                                        onPress={() => handleWellBeingSelection('Okay')}
                                    >
                                        <Image source={require('../../assets/icons/well-being/well-being-okay.png')}
                                            style={[
                                                styles.icon,
                                                moodEntries.includes('Okay') && { tintColor: 'black' }
                                            ]}
                                        />
                                        <Text style={[
                                            styles.iconLabel,
                                            moodEntries.includes('Okay') && { color: 'black' }
                                        ]}>Okay</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.moodOption,
                                            moodEntries.includes('Good') && styles.selectedOption,
                                        ]}
                                        onPress={() => handleWellBeingSelection('Good')}
                                    >
                                        <Image source={require('../../assets/icons/well-being/well-being-good.png')}
                                            style={[
                                                styles.icon,
                                                moodEntries.includes('Good') && { tintColor: 'black' }
                                            ]}
                                        />
                                        <Text style={[
                                            styles.iconLabel,
                                            moodEntries.includes('Good') && { color: 'black' }
                                        ]}>Good</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.moodOption,
                                            moodEntries.includes('Great') && styles.selectedOption,
                                        ]}
                                        onPress={() => handleWellBeingSelection('Great')}
                                    >
                                        <Image source={require('../../assets/icons/well-being/well-being-great.png')}
                                            style={[
                                                styles.icon,
                                                moodEntries.includes('Great') && { tintColor: 'black' }
                                            ]}
                                        />
                                        <Text style={[
                                            styles.iconLabel,
                                            moodEntries.includes('Great') && { color: 'black' }
                                        ]}>Great</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalTitle}>Select Symptoms, Sleep, and Activity</Text>
                                <ScrollView style={styles.scrollView}>
                                    {/* Symptoms Section */}
                                    <View style={styles.groupContainer}>
                                        <View style={styles.groupBorder}>
                                            <Text style={styles.sectionTitle}>Symptoms</Text>
                                            <View style={styles.iconRow}>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        symptomsEntries.includes('Sneeze') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(symptomsEntries, 'Sneeze', setSymptomsEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/symptoms/symptoms-sneeze.png')}
                                                        style={[
                                                            styles.icon,
                                                            symptomsEntries.includes('Sneeze') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        symptomsEntries.includes('Sneeze') && { color: 'black' }
                                                    ]}>Sneeze</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        symptomsEntries.includes('Nausea') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(symptomsEntries, 'Nausea', setSymptomsEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/symptoms/symptoms-nausea.png')}
                                                        style={[
                                                            styles.icon,
                                                            symptomsEntries.includes('Nausea') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        symptomsEntries.includes('Nausea') && { color: 'black' }
                                                    ]}>Nausea</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        symptomsEntries.includes('Headache') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(symptomsEntries, 'Headache', setSymptomsEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/symptoms/symptoms-headache.png')}
                                                        style={[
                                                            styles.icon,
                                                            symptomsEntries.includes('Headache') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        symptomsEntries.includes('Headache') && { color: 'black' }
                                                    ]}>Headache</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        symptomsEntries.includes('Fever') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(symptomsEntries, 'Fever', setSymptomsEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/symptoms/symptoms-fever.png')}
                                                        style={[
                                                            styles.icon,
                                                            symptomsEntries.includes('Fever') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        symptomsEntries.includes('Fever') && { color: 'black' }
                                                    ]}>Fever</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        symptomsEntries.includes('Fatigue') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(symptomsEntries, 'Fatigue', setSymptomsEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/symptoms/symptoms-fatigue.png')}
                                                        style={[
                                                            styles.icon,
                                                            symptomsEntries.includes('Fatigue') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        symptomsEntries.includes('Fatigue') && { color: 'black' }
                                                    ]}>Fatigue</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Sleep Section */}
                                    <View style={styles.groupContainer}>
                                        <View style={styles.groupBorder}>
                                            <Text style={styles.sectionTitle}>Sleep</Text>
                                            <View style={styles.iconRow}>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        sleepEntries.includes('Bad') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(sleepEntries, 'Bad', setSleepEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/sleep/sleep-bad.png')}
                                                        style={[
                                                            styles.icon,
                                                            sleepEntries.includes('Bad') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        sleepEntries.includes('Bad') && { color: 'black' }
                                                    ]}>Bad</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        sleepEntries.includes('Moderate') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(sleepEntries, 'Moderate', setSleepEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/sleep/sleep-moderate.png')}
                                                        style={[
                                                            styles.icon,
                                                            sleepEntries.includes('Moderate') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        sleepEntries.includes('Moderate') && { color: 'black' }
                                                    ]}>Moderate</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        sleepEntries.includes('Good') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(sleepEntries, 'Good', setSleepEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/sleep/sleep-good.png')}
                                                        style={[
                                                            styles.icon,
                                                            sleepEntries.includes('Good') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        sleepEntries.includes('Good') && { color: 'black' }
                                                    ]}>Good</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Activity Section */}
                                    <View style={styles.groupContainer}>
                                        <View style={styles.groupBorder}>
                                            <Text style={styles.sectionTitle}>Activity</Text>
                                            <View style={styles.iconRow}>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        activityEntries.includes('Yoga') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(activityEntries, 'Yoga', setActivityEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/activity/activity-yoga.png')}
                                                        style={[
                                                            styles.icon,
                                                            activityEntries.includes('Yoga') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        activityEntries.includes('Yoga') && { color: 'black' }
                                                    ]}>Yoga</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        activityEntries.includes('Weights') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(activityEntries, 'Weights', setActivityEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/activity/activity-weights.png')}
                                                        style={[
                                                            styles.icon,
                                                            activityEntries.includes('Weights') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        activityEntries.includes('Weights') && { color: 'black' }
                                                    ]}>Weights</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        activityEntries.includes('Walk') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(activityEntries, 'Walk', setActivityEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/activity/activity-walk.png')}
                                                        style={[
                                                            styles.icon,
                                                            activityEntries.includes('Walk') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        activityEntries.includes('Walk') && { color: 'black' }
                                                    ]}>Walk</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        activityEntries.includes('Sport') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(activityEntries, 'Sport', setActivityEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/activity/activity-sport.png')}
                                                        style={[
                                                            styles.icon,
                                                            activityEntries.includes('Sport') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        activityEntries.includes('Sport') && { color: 'black' }
                                                    ]}>Sport</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.moodOption,
                                                        activityEntries.includes('HIT') && styles.selectedOption,
                                                    ]}
                                                    onPress={() => toggleButton(activityEntries, 'HIT', setActivityEntries)}
                                                >
                                                    <Image source={require('../../assets/icons/activity/activity-HIT.png')}
                                                        style={[
                                                            styles.icon,
                                                            activityEntries.includes('HIT') && { tintColor: 'black' }
                                                        ]}
                                                    />
                                                    <Text style={[
                                                        styles.iconLabel,
                                                        activityEntries.includes('HIT') && { color: 'black' }
                                                    ]}>HIT</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
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
});
