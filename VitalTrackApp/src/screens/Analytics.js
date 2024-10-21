import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import MoodGraph from '../components/MoodGraph'

export default function AnalyticsScreen() {
  return(
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Analytics Page</Text>
        <Text style={styles.subtitle}>An overview of your wellbeing</Text>

        <View style={styles.section}>
            <Text style={styles.title}>Insights</Text>
            <Text style={styles.subtitle}>You felt [less stressed] when you [did yoga] this week.</Text>
        </View>

        <View style={styles.section}>
            <Text style={styles.title}>Mental Health</Text>
            <Text style={styles.caption}>Your mood this week</Text>
            <MoodGraph />
        </View>


        <View style={styles.section}>
            <Text style={styles.title}>Physical Health</Text>
            <Text style={styles.subtitle}>This month, you were less likely to [have headaches] when you
             [slept well].</Text>
         </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: '#2C2C2C',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#D3D3D3',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 2,
  },
  caption: {
    fontSize: 20,
    color: '#72baff',
    marginBottom: 10,
  },
  graph: {
      height: 200,
      aspectRatio: 1.5,
      marginBottom: 5,
    },
  section: {
      marginVertical: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: '#333',
      width: '95%',
    }
});