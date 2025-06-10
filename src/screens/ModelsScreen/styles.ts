import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 10,
    },
    listContainer: {
      paddingBottom: 150,
    },
    filterContainer: {
      flexDirection: 'row',
      padding: 4,
      gap: 1,
      justifyContent: 'flex-end',
    },
    filterIcon: {
      borderRadius: 8,
      marginHorizontal: 2,
    },
    sectionTitle: {
      color: '#888',
      fontSize: 14,
      marginBottom: 12,
    },
    gradientBackground: {
      flex: 1,
    },
  });
