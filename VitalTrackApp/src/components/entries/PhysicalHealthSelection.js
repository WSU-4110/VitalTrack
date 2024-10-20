import React from 'react';
import { View } from 'react-native';
import IconSelection from './IconSelection';  // Reusable IconSelection component

// Import the icon objects (update the paths as needed)
import { activityIcons, symptomsIcons, sleepIcons } from './icons'; 

export default function PhysicalHealthSelection({
  selectedActivity,
  setSelectedActivity,
  selectedSymptom,
  setSelectedSymptom,
  selectedSleepQuality,
  setSelectedSleepQuality,
}) {

  // Toggle logic for multiple activity selection
  const toggleActivity = (activity) => {
    setSelectedActivity((prevSelected) => {
      const newSelected = prevSelected.includes(activity)
        ? prevSelected.filter((a) => a !== activity)
        : [...prevSelected, activity];
      console.log("Selected Activities:", newSelected);
      return newSelected;
    });
  };

  // Toggle logic for multiple symptom selection
  const toggleSymptom = (symptom) => {
    setSelectedSymptom((prevSelected) => {
      const newSelected = prevSelected.includes(symptom)
        ? prevSelected.filter((s) => s !== symptom)
        : [...prevSelected, symptom];
      console.log("Selected Symptoms:", newSelected);
      return newSelected;
    });
  };

  return (
    <View>
      {/* Activity Selection */}
      <IconSelection
        icons={activityIcons}
        selected={selectedActivity}
        setSelected={toggleActivity}  // Use toggle logic for multiple selections
        title="Select Your Activity"
        multiple={true}
      />

      {/* Symptom Selection */}
      <IconSelection
        icons={symptomsIcons}
        selected={selectedSymptom}
        setSelected={toggleSymptom}  // Use toggle logic for multiple selections
        title="Select Any Symptoms"
        multiple={true}
      />

      {/* Sleep Quality Selection */}
      <IconSelection
        icons={sleepIcons}
        selected={selectedSleepQuality}
        setSelected={setSelectedSleepQuality}  // Direct setter for single selection
        title="Select Sleep Quality"
        multiple={false}
      />
    </View>
  );
}
