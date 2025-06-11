import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDownloadScreen} from '../../../store/DownloadScreenContext';

export const ModelHeader = ({navigation}) => {
  const theme = useTheme();
  const {showDownloadScreen} = useDownloadScreen();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {!showDownloadScreen && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/appIcons/backIcon.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Models</Text>

          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../../../assets/appIcons/refreshIcon.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#060A15',
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#060A15',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '500',
    marginRight: 150,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});
