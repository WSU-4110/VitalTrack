import React, { useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import WellBeingSelection from './WellBeingSelection';
import MentalHealthSelection from './MentalHealthSelection';
import PhysicalHealthSelection from './PhysicalHealthSelection';

const { width: viewportWidth } = Dimensions.get('window');

export default function CarouselComponent({
  selectedWellBeing, setSelectedWellBeing,
  selectedMood, setSelectedMood,
  selectedActivity, setSelectedActivity,
  setCurrentStep
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of components
  const data = [
    { key: 'wellbeing', component: (
      <WellBeingSelection 
        selectedWellBeing={selectedWellBeing}
        setSelectedWellBeing={setSelectedWellBeing}
      />
    )},
    { key: 'mentalHealth', component: (
      <MentalHealthSelection 
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
      />
    )},
    { key: 'physicalHealth', component: (
      <PhysicalHealthSelection 
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
      />
    )}
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {item.component}
      </View>
    );
  };

  const onScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / viewportWidth);
    setCurrentIndex(index);
    setCurrentStep(index); // Notify parent about step change
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={onScrollEnd}
      keyExtractor={(item) => item.key}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    width: viewportWidth,  // Full width of screen
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
});
