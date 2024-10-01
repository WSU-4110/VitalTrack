import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
           <Image
        source={require('../../assets/images/VitalTrack-Logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settingsIcon}>⚙️</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
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
