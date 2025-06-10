import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../utils/types';

const { width, height } = Dimensions.get('window');

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: width * 0.025,
    },
    listContainer: {
      paddingBottom: height * 0.18,
    },
    filterContainer: {
      flexDirection: 'row',
      padding: width * 0.01,
      gap: width * 0.01,
      justifyContent: 'flex-end',
    },
    filterIcon: {
      borderRadius: width * 0.02,
      marginHorizontal: width * 0.005,
    },
    sectionTitle: {
      color: '#888',
      fontSize: width * 0.04,
      marginBottom: height * 0.015,
    },
    gradientBackground: {
      flex: 1,
    },
  });
