import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
return (
<View style = {styles.container}>
<Image source={require('../../assets/images/VitalTrack-Logo.png')} style={styles.logo} />
    <Text style={styles.container}>Welcome to the VitalTack App!</Text>
    <TouchableOpacity
        style={styles.button}
        onPress={() =>navigation.navigate('Login')}
        >
         <Text style={styles.buttonText}>Sign In Or Sign Up</Text>
         </TouchableOpacity>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#2C2C2C',
      },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 30,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 40,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#007bff', 
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
  });
  
export default HomeScreen