import React, { useState } from 'react';
import IconSelection from './IconSelection'; // Import the reusable component
import { activityIcons, symptomsIcons, sleepIcons } from './icons';
import { View, Text } from 'react-native';

export default function PhysicalHealthSelection() {
  const [selectedActivities, setSelectedActivities] = useState([]); // Store multiple selected activities
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Store multiple selected symptoms
  const [selectedSleepQuality, setSelectedSleepQuality] = useState(''); // Single selection for sleep quality

  // Toggle selection for activities (add/remove)
  const toggleActivity = (activity) => {
    setSelectedActivities((prevSelected) =>
      prevSelected.includes(activity)
        ? prevSelected.filter((a) => a !== activity) // Remove if already selected
        : [...prevSelected, activity] // Add if not selected
    );
  };

  // Toggle selection for symptoms (add/remove)
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prevSelected) =>
      prevSelected.includes(symptom)
        ? prevSelected.filter((s) => s !== symptom) // Remove if already selected
        : [...prevSelected, symptom] // Add if not selected
    );
  };

  return (
    <View>
      <IconSelection
        icons={activityIcons}
        selected={selectedActivities}
        setSelected={toggleActivity} // Use toggle function for activities
        title="What activity did you do today?"
        multiple={true} // Indicate multiple selection
      />
      <IconSelection
        icons={symptomsIcons}
        selected={selectedSymptoms}
        setSelected={toggleSymptom} // Use toggle function for symptoms
        title="Did you have any symptoms?"
        multiple={true} // Indicate multiple selection
      />
      <IconSelection
        icons={sleepIcons}
        selected={selectedSleepQuality}
        setSelected={setSelectedSleepQuality} // Single selection for sleep quality
        title="How was your sleep last night?"
        multiple={false} // Single selection for sleep
      />
    </View>
  );
}
