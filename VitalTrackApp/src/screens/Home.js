import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsIcon}>⚙️</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../../assets/images/VitalTrack-Logo.png')}
          style={styles.logo}
        />
        
        <View style={styles.box}>
          <Text style={styles.title}>Welcome to VitalTrack</Text>
          <Text style={styles.description}>
            VitalTrack is your all-in-one health and wellness companion. Manage
            your physical and mental well-being, track daily progress, set goals,
            and gain insights through personalized analytics.
          </Text>
        </View>
        
        <View style={styles.box}>
          <Text style={styles.featureTitle}>Key Features:</Text>
          <Text style={styles.features}>
            • Comprehensive health tracking{'\n'}
            • Mood, stress, and energy monitoring{'\n'}
            • Fitness and symptom tracking{'\n'}
            • Medication and vitamin reminders{'\n'}
            • Personalized wellness insights
          </Text>
        </View>

        <View style={styles.box}>
        <View style={styles.container}>
 
    </View>
          <Text style={styles.motivation}>
            "Your journey to better health starts here!"
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  box: {
    backgroundColor: '#3E3E3E',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 22,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  features: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 22,
  },
  motivation: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#B3E5FC',
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 5,
    padding: 10,
  },
  settingsIcon: {
    fontSize: 24,
    color: '#333',
  },
  logo: {
    height: 200,
    aspectRatio: 1.5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
