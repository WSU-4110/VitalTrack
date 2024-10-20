import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// Reusable IconSelection component
export default function IconSelection({ icons, selected, setSelected, title }) {
  const isSelected = (currentSelection, label) => currentSelection === label;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.iconContainer}>
        {Object.entries(icons).map(([label, icon]) => (
          <TouchableOpacity
            key={label}
            onPress={() => setSelected(label)}
            style={[
              styles.iconButton,
              isSelected(selected, label) && styles.iconButtonSelected
            ]}
          >
            <Image source={icon} style={styles.iconImage} />
            <Text style={styles.iconLabel}>{label}</Text>
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
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconButtonSelected: {
    backgroundColor: '#007AFF', // Selected color
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  iconLabel: {
    fontSize: 14,
    color: '#333',
  },
});
