import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../TypeScript';

const settingsOptions = [
  { title: 'Models', icon: require('../assets/appIcons/modelsIcon.png') },
  { title: 'Change Parameters', icon: require('../assets/appIcons/parameterIcon.png') },
  { title: 'BenchMark', icon: require('../assets/appIcons/benchMarkIcon.png') },
  { title: 'About', icon: require('../assets/appIcons/aboutIcon.png') },
  { title: 'Report', icon: require('../assets/appIcons/reportIcon.png') },
];

type NavigationProp = StackNavigationProp<RootStackParamList>;
const SettingsPage = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigation = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/appIcons/backIcon.png')} style={styles.navBackIcon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Settings</Text>
      </View>

      {settingsOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handleNavigation(item.title as keyof RootStackParamList)}>
          <View style={styles.optionLeft}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Image source={require('../assets/appIcons/nextIcon.png')} style={styles.nextIcon} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D122B',
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  navBackIcon: {
    height: 24,
    width: 24,
  },
  heading: {
    color: 'white',
    fontSize: 26,
    fontWeight: '500',
    marginLeft: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1F3D',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  nextIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});

export default SettingsPage;
