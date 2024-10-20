import React, { useState } from 'react';
import IconSelection from './IconSelection'; // Reuse the IconSelection component
import { moodIcons, energyIcons, stressIcons } from './icons'; // Import mood, energy, and stress icons
import {View,Text} from 'react-native';

export default function MentalHealthSelection() {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedEnergy, setSelectedEnergy] = useState('');
  const [selectedStress, setSelectedStress] = useState('');

  return (
    <View>
      {/* Mood Selection */}
      <IconSelection
        icons={moodIcons}
        selected={selectedMood}
        setSelected={setSelectedMood}
        title="How is your mood today?"
      />

      {/* Energy Level Selection */}
      <IconSelection
        icons={energyIcons}
        selected={selectedEnergy}
        setSelected={setSelectedEnergy}
        title="How is your energy level today?"
      />

      {/* Stress Level Selection */}
      <IconSelection
        icons={stressIcons}
        selected={selectedStress}
        setSelected={setSelectedStress}
        title="How is your stress level today?"
      />


    </View>
  );
}
