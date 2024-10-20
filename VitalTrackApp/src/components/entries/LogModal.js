import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import PhysicalHealthSelection from './PhysicalHealthSelection';
import MentalHealthSelection from './MentalHealthSelection';
import WellBeingSelection from './WellBeingSelection';
import axios from 'axios';
import auth from '@react-native-firebase/auth'; 

export default function HealthModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState('wellbeing'); // Track the current step/page

  // Well-being slide
  const [selectedWellBeing, setSelectedWellBeing] = useState('');

  // Physical health slide
  const [selectedActivity, setSelectedActivity] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState([]);
  const [selectedSleepQuality, setSelectedSleepQuality] = useState('');

  // Mental health slide
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedEnergy, setSelectedEnergy] = useState('');
  const [selectedStress, setSelectedStress] = useState('');

  // For forward navigation
  const handleNextStep = () => {
    if (currentStep === 'wellbeing') {
      setCurrentStep('physical');
    } else if (currentStep === 'physical') {
      setCurrentStep('mental');
    }
  };

  // For backward navigation
  const handlePrevStep = () => {
    if (currentStep === 'mental') {
      setCurrentStep('physical');
    } else if (currentStep === 'physical') {
      setCurrentStep('wellbeing');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const entryData = {
      date: new Date().toISOString(),
      well_being: selectedWellBeing,
      sleep_quality: selectedSleepQuality,
      mood: selectedMood,
      activity: selectedActivity,
      symptoms: selectedSymptom,
    };
  
    const userId = auth().currentUser ? auth().currentUser.uid : null; // Get the user ID from Firebase auth
  
    try {
      const response = await axios.post('http://your-backend-url/logEntry', {
        user_id: userId,
        entry: entryData,
      });
  
      if (response.data.success) {
        Alert.alert('Success', 'Entry logged successfully');
      } else {
        Alert.alert('Error', response.data.error);
      }
  
      setModalVisible(false); // Close the modal after submission
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  return (
    <View style={styles.pageContainer}>
      {/* Page Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Entries</Text>
      </View>

      {/* Log Entry Button */}
      <View style={styles.logButtonContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.logButton}>
          <Text style={styles.logButtonText}>Log Entry</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>

        {/* Scrollable content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalContainer}>
            {currentStep === 'wellbeing' && (
              <WellBeingSelection
                selectedWellBeing={selectedWellBeing}
                setSelectedWellBeing={setSelectedWellBeing}
              />
            )}
            {currentStep === 'physical' && (
              <PhysicalHealthSelection
                selectedActivity={selectedActivity}
                setSelectedActivity={setSelectedActivity}
                selectedSymptom={selectedSymptom}
                setSelectedSymptom={setSelectedSymptom}
                selectedSleepQuality={selectedSleepQuality}
                setSelectedSleepQuality={setSelectedSleepQuality}
              />
            )}
            {currentStep === 'mental' && (
              <MentalHealthSelection
                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}
                selectedEnergy={selectedEnergy}
                setSelectedEnergy={setSelectedEnergy}
                selectedStress={selectedStress}
                setSelectedStress={setSelectedStress}
              />
            )}
          </View>
        </ScrollView>

        {/* Navigation buttons */}
        <View style={styles.buttonContainer}>
          {currentStep !== 'wellbeing' && (
            <TouchableOpacity style={styles.backButton} onPress={handlePrevStep}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          )}
          {currentStep !== 'mental' && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}

          {/* Submit button appears only on the last step */}
          {currentStep === 'mental' && (
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
          }

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#7bb7e0', // Theme color for the header
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  logButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logButton: {
    backgroundColor: '#de0f3f',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  logButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#403f3f',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#de0f3f',
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#940e2d',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 10,
  },
  nextButton: {
    backgroundColor: '#7bb7e0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 100,
  },
  backButton: {
    backgroundColor: '#7bb7e0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 100,
  },
  submitButton: {
    backgroundColor: '#de0f3f',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
