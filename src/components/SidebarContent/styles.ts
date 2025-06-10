import {StyleSheet} from 'react-native';

import {MD3Theme} from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
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
      fontSize: 24,
      fontWeight: '500',
      marginLeft: 20,
    },
    gradientBackground: {
      flex: 1,
    },
  });
