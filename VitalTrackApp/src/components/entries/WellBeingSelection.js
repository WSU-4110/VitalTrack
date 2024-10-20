import React, { useState } from 'react';
import IconSelection from './IconSelection'; // Import the reusable component
import { wellBeingIcons } from './icons';
import {View,Text} from 'react-native';

export default function WellBeingSelection() {
  const [selectedWellBeing, setSelectedWellBeing] = useState('');

  return (
    <View>
      <IconSelection
        icons={wellBeingIcons}
        selected={selectedWellBeing}
        setSelected={setSelectedWellBeing}
        title="How is your well-being today?"
      />
      {selectedWellBeing && (
        <Text style={{ marginTop: 20, fontSize: 16, fontWeight: 'bold', color: '#007AFF' }}>
          Selected Well-being: {selectedWellBeing}
        </Text>
      )}
    </View>
  );
}
