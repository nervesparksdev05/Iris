import {StyleSheet, Dimensions} from 'react-native';
import {MD3Theme} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    navContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: height * 0.025,
      paddingHorizontal: width * 0.04,
      marginTop: height * 0.01
    },
    navBackIcon: {
      height: height * 0.03,
      width: height * 0.03,
    },
    heading: {
      color: 'white',
      fontSize: width * 0.07,
      fontWeight: '500',
      marginLeft: width * 0.04,
    },
    gradientBackground: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.05,
    },
    menuBox: {
      backgroundColor: '#0f172a',
      borderRadius: width * 0.03,
      paddingVertical: height * 0.006,
      marginBottom: height * 0.03,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.04,
    },
    menuIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuIcon: {
      width: width * 0.055,
      height: width * 0.055,
      marginRight: width * 0.04,
      resizeMode: 'contain',
      tintColor: 'white',
    },
    menuTitle: {
      color: 'white',
      fontSize: width * 0.05,
    },
    nextIcon: {
      width: width * 0.08,
      height: width * 0.08,
      resizeMode: 'contain',
      tintColor: '#aaa',
    },
    separator: {
      height: 1,
      backgroundColor: '#2C314C',
      marginHorizontal: width * 0.04,
    },
  });
