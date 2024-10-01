

import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import SignOutButton from '../components/SignoutButton';
import HomeScreen from './Home';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import homeIcon from '../../assets/icons/navigation/Home.png';

const settingsData = [
  { id: 1, title: 'Profile' },
  { id: 4, title: 'Help' },
];

const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Image source={homeIcon} style={styles.iconStyle} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>



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
  backButton: {
    borderRadius: 50, 
    borderColor: 'darkgrey',
    backgroundColor: 'grey',
    padding: 10, 
    width: 50, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  backButtonText: {
    color: '#cce5ff',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    width: 30,
    height: 30,
    tintColor: '#333',  // Optional: adjust color if needed
  },
});

export default SettingsScreen;
