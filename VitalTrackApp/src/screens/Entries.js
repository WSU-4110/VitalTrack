import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

export default function EntriesScreen() {
  // State to manage modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  // State to store entries
  const [entries, setEntries] = useState([
    { id: '1', date: 'TODAY, SEP 7', mood: '😊 good' },
    { id: '2', date: 'YESTERDAY, SEP 6', mood: '😐 okay' },
  ]);

  // Function to handle mood selection
  const handleMoodSelection = (mood) => {
    const newEntry = {
      id: (entries.length + 1).toString(),
      date: 'NEW ENTRY', // You can format the date as needed
      mood: mood,
    };
    setEntries([newEntry, ...entries]);
    setModalVisible(false);
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
            <Text style={styles.modalTitle}>How was your day?</Text>
            {/* Mood Options */}
            <TouchableOpacity
              style={styles.moodOption}
              onPress={() => handleMoodSelection('😊 good')}
            >
              <Text style={styles.moodText}>😊 Good</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moodOption}
              onPress={() => handleMoodSelection('😐 okay')}
            >
              <Text style={styles.moodText}>😐 Okay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moodOption}
              onPress={() => handleMoodSelection('😞 bad')}
            >
              <Text style={styles.moodText}>😞 Bad</Text>
            </TouchableOpacity>

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
        backgroundColor: '#2C2C2C', // Grayish blue color
        padding: 20,

      },
      header: {
          backgroundColor: '#4c4c4c', // Dark gray color
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
    tips:{
        backgroundColor: '#4c4c4c', // Dark gray color
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
        color: '#00ff00', // Change as needed
        fontSize: 18,
    },
    iconsContainer: {
        // Style for your icons container
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalContent: {
        backgroundColor: '#4c4c4c',
        margin: 20,
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
      },
      modalTitle: {
        color: '#ffffff',
        fontSize: 24,
        marginBottom: 15,
      },
      moodOption: {
        padding: 10,
        marginVertical: 5,
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 5,
        alignItems: 'center',
      },
      moodText: {
        color: '#ffffff',
        fontSize: 18,
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
});
