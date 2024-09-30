import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  function handleSubmit() {
    loginUser(email, password);
  }

  async function loginUser(email, password) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      console.log('User signed in!', user);

      if (navigation) {
        navigation.navigate('Home');
      } else {
        console.log('Navigation object is undefined');
      }
    } catch (error) {
      console.error('Error during sign in:', error.message);
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
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
        onChangeText={password => setPassword(password)}
      />
      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.newToApp}>
        <Text style={styles.smallText}>New to VitalTrack? </Text>
        <Text
          style={styles.joinNow}
          onPress={() => navigation.navigate('Signup')}>
          Join Now
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