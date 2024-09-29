import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation, CommonActions} from '@react-navigation/native';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const baseUrl = 'http://10.0.2.2:5000';

  function handleSubmit() {
    createUser(email, password);
  }

  async function createUser(email, password) {
    if (email && password) {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const uid = userCredential.user.uid;

        const response = await fetch(`${baseUrl}/createUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uid, email}),
        });

        const data = await response.json();
        console.log('User created in database:', data);
        Alert.alert('User created successfully');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );
      } catch (error) {
        console.log(error);
        Alert.alert(error.code);
      }
    } else {
      Alert.alert('Please enter email and password');
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/VitalTrack-Logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#888"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.newToApp}>
        <Text style={styles.smallText}>Have an Account? </Text>
        <Text
          style={styles.joinNow}
          onPress={() => navigation.navigate('Login')}>
          Sign In
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2C2C2C',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#D3D3D3',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#3C3C3C',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#1E90FF',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  logo: {
    height: 200,
    aspectRatio: 1.5,
    marginBottom: 0,
  },
  smallText: {
    fontSize: 16,
    color: '#ffffff',
  },
  newToApp: {
    marginTop: 10,
    flexDirection: 'row',
  },
  joinNow: {
    fontSize: 16,
    color: '#1E90FF',
  },
});
