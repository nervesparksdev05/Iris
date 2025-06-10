import {StyleSheet, Dimensions} from 'react-native';
import type {Theme} from '../../../utils/types';

const {width} = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    deviceInfoCard: {
      marginBottom: scale(16),
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: scale(15),
    },
    deviceInfoRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: scale(6),
    },
    deviceInfoLabel: {
      color: '#000',
      fontSize: scale(14),
      fontWeight: '500',
    },
    deviceInfoValue: {
      color: '#000',
      fontSize: scale(14),
      fontWeight: '400',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: scale(16),
    },
    headerContent: {
      flex: 1,
    },
    headerSummary: {
      color: '#000',
      fontSize: scale(13),
      marginTop: scale(4),
    },
    section: {
      marginVertical: scale(8),
    },
    sectionTitle: {
      color: theme.colors.primary,
      fontSize: scale(14),
      marginBottom: scale(8),
      textTransform: 'uppercase',
      fontWeight: '600',
    },
  });
