import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const ParametersPage = () => {
  const [thread, setThread] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [topP, setTopP] = useState(0);
  const [topK, setTopK] = useState(0);
  const navigation = useNavigation();

  const resetDefaults = () => {
    setThread(0);
    setTemperature(0);
    setTopP(0);
    setTopK(0);
  };

  const saveChanges = () => {
    console.log({thread, temperature, topP, topK});
  };

  return (
    <LinearGradient
      colors={['#060A15', '#051632']}
      style={styles.gradientBackground}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/appIcons/backIcon.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Parameters</Text>
          <View style={{width: 20}} />
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 40}}>
          <Text style={styles.note}>
            After changing please Save the changes
          </Text>

          <View style={styles.card}>
            {/* Thread */}
            <Text style={styles.label}>Thread Selection</Text>
            <Text style={styles.subLabel}>
              Select thread for process, 0 for default
            </Text>
            <Text style={styles.value}>{thread}</Text>
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={thread}
              onValueChange={setThread}
              minimumTrackTintColor="#3c82f6"
              maximumTrackTintColor="#999"
              thumbTintColor="#3c82f6"
            />

            {/* Temperature */}
            <View style={styles.sectionSpacing} />
            <Text style={styles.label}>Temperature</Text>
            <Text style={styles.subLabel}>Adjust randomness (0.0 - 1.0)</Text>
            <Text style={styles.value}>{temperature.toFixed(2)}</Text>
            <Slider
              minimumValue={0}
              maximumValue={1}
              step={0.01}
              value={temperature}
              onValueChange={setTemperature}
              minimumTrackTintColor="#3c82f6"
              maximumTrackTintColor="#999"
              thumbTintColor="#3c82f6"
            />

            {/* Top P */}
            <View style={styles.sectionSpacing} />
            <Text style={styles.label}>Top P</Text>
            <Text style={styles.subLabel}>
              Nucleus sampling threshold (0.0 - 1.0)
            </Text>
            <Text style={styles.value}>{topP.toFixed(2)}</Text>
            <Slider
              minimumValue={0}
              maximumValue={1}
              step={0.01}
              value={topP}
              onValueChange={setTopP}
              minimumTrackTintColor="#3c82f6"
              maximumTrackTintColor="#999"
              thumbTintColor="#3c82f6"
            />

            {/* Top K */}
            <View style={styles.sectionSpacing} />
            <Text style={styles.label}>Top K</Text>
            <Text style={styles.subLabel}>
              Number of tokens to consider (0 - 50)
            </Text>
            <Text style={styles.value}>{topK}</Text>
            <Slider
              minimumValue={0}
              maximumValue={50}
              step={1}
              value={topK}
              onValueChange={setTopK}
              minimumTrackTintColor="#3c82f6"
              maximumTrackTintColor="#999"
              thumbTintColor="#3c82f6"
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetDefaults}>
              <Text style={styles.resetButtonText}>Reset Default</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a35',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  headerTitle: {
    fontSize: 26,
    color: 'white',
    fontWeight: '400',
    width: 230,
  },
  container: {
    padding: 20,
  },
  note: {
    color: 'white',
    fontSize: 13,
    marginBottom: 9,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#11152a',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  subLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 8,
  },
  value: {
    color: '#3c82f6',
    fontSize: 13,
    marginBottom: 4,
  },
  sectionSpacing: {
    height: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#aaa',
    borderRadius: 8,
    padding: 14,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3c82f6',
    borderRadius: 8,
    padding: 14,
    marginLeft: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  gradientBackground: {
    flex: 1,
  },
});

export default ParametersPage;
