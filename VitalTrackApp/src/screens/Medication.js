import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Modal } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const MedicationsScreen = () => {
    const { currentUser, loading: authLoading } = useAuth();
    const [medications, setMedications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMedicationIndex, setSelectedMedicationIndex] = useState(null);

    useEffect(() => {
        const fetchMedications = async () => {
            if (currentUser) {
                try {
                    setIsLoading(true);
                    setError(null);

                    const userId = currentUser.uid;
                    const response = await fetch(`http://10.0.2.2:5000/getMedications/${userId}`, { method: 'GET' });
                    const result = await response.json();

                    if (response.ok) {
                        setMedications(result);
                    } else {
                        setError(result.error || "Failed to load medications");
                    }
                } catch (error) {
                    setError("Failed to load medications");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchMedications();
    }, [currentUser]);

    const handleAddOrUpdateMedication = async () => {
        if (!name || !dosage || !frequency) {
            Alert.alert('All fields are required');
            return;
        }

        const userId = currentUser.uid;
        const url = isEditing
            ? `http://10.0.2.2:5000/updateMedication/${userId}/${selectedMedicationIndex}`
            : `http://10.0.2.2:5000/logMedication/${userId}`;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, dosage, frequency }),
            });

            if (response.ok) {
                const newMedication = { name, dosage, frequency };
                if (isEditing) {
                    setMedications(medications.map((med, index) =>
                        index === selectedMedicationIndex ? newMedication : med));
                } else {
                    setMedications([...medications, newMedication]);
                }
                resetForm();
                setIsModalVisible(false);
                Alert.alert(isEditing ? 'Medication updated successfully' : 'Medication added successfully');
            } else {
                Alert.alert('Failed to save medication');
            }
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
    };

    const handleDeleteMedication = async (index) => {
        const userId = currentUser.uid;
        try {
            const response = await fetch(`http://10.0.2.2:5000/deleteMedication/${userId}/${index}`, { method: 'DELETE' });
            if (response.ok) {
                setMedications(medications.filter((_, i) => i !== index));
                Alert.alert('Medication deleted successfully');
            } else {
                Alert.alert('Failed to delete medication');
            }
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
    };

    const openEditModal = (medication, index) => {
        setSelectedMedicationIndex(index);
        setName(medication.name);
        setDosage(medication.dosage);
        setFrequency(medication.frequency);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    const resetForm = () => {
        setName('');
        setDosage('');
        setFrequency('');
        setIsEditing(false);
        setSelectedMedicationIndex(null);
    };

    if (authLoading || isLoading) {
        return <ActivityIndicator size="large" color="#4A90E2" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Medications</Text>
            </View>

            <FlatList
                data={medications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.dosage}>Dosage: {item.dosage}</Text>
                        <Text style={styles.frequency}>Frequency: {item.frequency}</Text>
                        <View style={styles.itemButtons}>
                            <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item, index)}>
                                <Text style={styles.editButtonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteMedication(index)}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No medications logged yet.</Text>}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.addButtonText}>Add New Medication</Text>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{isEditing ? 'Edit Medication' : 'Add New Medication'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Medication Name"
                            placeholderTextColor="#888"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Dosage"
                            placeholderTextColor="#888"
                            value={dosage}
                            onChangeText={setDosage}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Frequency (e.g., Daily, Weekly)"
                            placeholderTextColor="#888"
                            value={frequency}
                            onChangeText={setFrequency}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleAddOrUpdateMedication}>
                                <Text style={styles.addButtonText}>{isEditing ? 'Update Medication' : 'Add Medication'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    emptyText: {
        color: '#B0B0B0',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7BB7E0',
        marginBottom: 5,
    },
    dosage: {
        fontSize: 18,
        color: '#333333',
        marginVertical: 2,
    },
    frequency: {
        fontSize: 16,
        color: '#555555',
    },
    addButton: {
        backgroundColor: '#7BB7E0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 15,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#404040',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#7BB7E0',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        color: '#333333',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: '#7BB7E0',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: '#DE0F3F',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#7BB7E0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#DE0F3F',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default MedicationsScreen;
