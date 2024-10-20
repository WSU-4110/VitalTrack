import React,{useState} from 'react'; 
import {View,Text,TouchableOpacity,Modal,StyleSheet} from 'react-native';
import PhysicalHealthSelection from './PhysicalHealthSelection';
import MentalHealthSelection from './MentalHealthSelection';
import WellBeingSelection from './WellBeingSelection';
export default function HealthModal(){
    const [isPhysicalModalVisible,setPhysicalModalVisible] = useState(false);
    const [isMentalModalVisible, setMentalModalVisible] = useState(false);
    const [isWellBeingModalVisible, setWellBeingModalVisible] = useState(false);

    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [selectedWellBeing, setSelectedWellBeing] = useState('');

    return(
        <View style = {styles.container}>
            <TouchableOpacity onPress={()=> setPhysicalModalVisible(true)}>
                <Text>Physical Health</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setMentalModalVisible(true)}>
                <Text>Mental Health</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setWellBeingModalVisible(true)}>
                <Text>Well Being</Text>
            </TouchableOpacity>

            {/* Physical Health Modal */}
      <Modal
        visible={isPhysicalModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPhysicalModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <PhysicalHealthSelection 
            selectedActivity={selectedActivity} 
            setSelectedActivity={setSelectedActivity} 
          />
          <TouchableOpacity onPress={() => setPhysicalModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Mental Health Modal */}
      <Modal
        visible={isMentalModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMentalModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <MentalHealthSelection 
            selectedMood={selectedMood} 
            setSelectedMood={setSelectedMood} 
          />
          <TouchableOpacity onPress={() => setMentalModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Well-being Modal */}
      <Modal
        visible={isWellBeingModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setWellBeingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <WellBeingSelection 
            selectedWellBeing={selectedWellBeing} 
            setSelectedWellBeing={setSelectedWellBeing} 
          />
          <TouchableOpacity onPress={() => setWellBeingModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        </View>

    ); 
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });