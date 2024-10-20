import React, { useState } from 'react';
import IconSelection from './IconSelection'; // Import the reusable component
import { activityIcons, symptomsIcons, sleepIcons } from './icons';
import {View,Text} from 'react-native';

export default function PhysicalHealthSelection() {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [selectedSleepQuality, setSelectedSleepQuality] = useState('');

  return (
    <View>
      <IconSelection
        icons={activityIcons}
        selected={selectedActivity}
        setSelected={setSelectedActivity}
        title="Select your activity"
      />
      <IconSelection
        icons={symptomsIcons}
        selected={selectedSymptom}
        setSelected={setSelectedSymptom}
        title="Select your symptoms"
      />
      <IconSelection
        icons={sleepIcons}
        selected={selectedSleepQuality}
        setSelected={setSelectedSleepQuality}
        title="Select your sleep quality"
      />


    </View>
  );
}
