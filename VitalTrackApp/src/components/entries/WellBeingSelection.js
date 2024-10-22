import React from 'react';
import IconSelection from './IconSelection'; // Import the reusable component
import { wellBeingIcons } from './icons'; // Import your icons
import { View, Text } from 'react-native';

export default function WellBeingSelection({ selectedWellBeing, setSelectedWellBeing }) {
  return (
    <View>
      <IconSelection
        icons={wellBeingIcons}
        selected={selectedWellBeing}
        setSelected={setSelectedWellBeing}
        title="How is your well-being today?"
      />
  
    </View>
  );
}
