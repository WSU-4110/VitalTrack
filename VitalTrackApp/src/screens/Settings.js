

import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import SignOutButton from '../components/SignoutButton';
import HomeScreen from './Home';
import {useNavigation} from '@react-navigation/native';

const settingsData = [
  { id: 1, title: 'Profile' },
  { id: 4, title: 'Help' },
];

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.backButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>

      {settingsData.map(item => (
        <TouchableOpacity key={item.id} style={styles.settingItem}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.chevronIcon}>{'>'}</Text>
        </TouchableOpacity>
      ))}

      <SignOutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#555',
  },
  chevronIcon: {
    fontSize: 22,
    color: '#aaa',
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton:{
    backgroundColor: '#0056b3',
    padding:15,
    borderRadius:12,
    marginBottom:10,
    width:150,
    height:50,
  },
  backButtonText: {
    color: '#cce5ff',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default SettingsScreen;
