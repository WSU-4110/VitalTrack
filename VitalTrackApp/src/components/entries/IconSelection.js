import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// Reusable IconSelection component
export default function IconSelection({ icons, selected, setSelected, title, multiple = false }) {
  // Check if an icon is selected
  const isSelected = (currentSelection, label) => {
    return multiple ? currentSelection.includes(label) : currentSelection === label;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.iconContainer}>
        {Object.entries(icons).map(([label, icon]) => (
          <TouchableOpacity
            key={label}
            onPress={() => setSelected(label)} // Handles adding/removing selection
            style={[
              styles.iconButton,
              isSelected(selected, label) && styles.iconButtonSelected, // Apply selected style
            ]}
          >
            <Image
              source={icon}
              style={[
                styles.iconImage,
                isSelected(selected, label) && styles.iconImageSelected, // Apply selected icon color
              ]}
            />
            <Text
              style={[
                styles.iconLabel,
                isSelected(selected, label) && styles.iconLabelSelected, // Apply selected text color
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20, // Space between sections
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  iconButton: {
    marginVertical: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#333', // Dark color for the button background
    padding: 18,
    borderRadius: 40, // Rounded button
    width: 100, // Circular button width
    height: 90, // Circular button height
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Subtle shadow for better appearance
    borderWidth: 2, // Add border width
    borderColor: 'black',
  },
  iconButtonSelected: {
    backgroundColor: '#7bb7e0', // Professional theme color for selected button
    borderColor: 'blue',

  },
  iconImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
    tintColor: 'white', // Initial white icon
  },
  iconImageSelected: {
    tintColor: 'black', // Icon changes to black when selected
  },
  iconLabel: {
    fontSize: 12,
    color: 'white', // White text initially
    textAlign: 'center',
  },
  iconLabelSelected: {
    color: 'black', // Text changes to black when selected
    fontWeight: '500', // Slightly bolder text for emphasis
  },
});
