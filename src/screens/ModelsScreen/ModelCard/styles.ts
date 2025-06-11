import {StyleSheet, Dimensions} from 'react-native';
import {Theme} from '../../../utils/types';

const {width, height} = Dimensions.get('window');

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: '#0f223b',
      borderRadius: width * 0.03,
      padding: width * 0.04,
      marginBottom: height * 0.02,
    },
    activeLabel: {
      color: '#18c522',
      fontSize: width * 0.03,
      marginBottom: height * 0.009,
    },
    modelName: {
      color: '#fff',
      fontSize: width * 0.04,
      fontWeight: '600',
      marginBottom: height * 0.015,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: height * 0.01,
    },
    loadButton: {
      backgroundColor: '#3465ff',
      paddingVertical: height * 0.007,
      paddingHorizontal: width * 0.05,
      borderRadius: width * 0.08,
      height: height * 0.055,
      width: width * 0.22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: '#d9534f',
      paddingVertical: height * 0.007,
      paddingHorizontal: width * 0.05,
      borderRadius: width * 0.08,
      height: height * 0.055,
      width: width * 0.28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    downloadButton: {
      backgroundColor: '#2662ea',
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.05,
      borderRadius: 200,
      height: height * 0.055,
      width: width * 0.32,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: height * 0.01,
      marginLeft: width * 0.015,
      marginBottom: height * 0.03,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
    statusText: {
      color: '#aaa',
      fontSize: width * 0.03,
      marginTop: height * 0.005,
    },
    defaultRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: height * 0.018,
      marginLeft: width * 0.01,
      marginBottom: height * 0.018,
    },
    defaultText: {
      color: '#aaa',
      fontSize: width * 0.033,
      marginLeft: width * 0.01,
    },
    sizeText: {
      color: '#999',
      fontSize: width * 0.03,
      marginTop: height * 0.007,
    },
    warningContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: height * 0.01,
    },
    warningContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    warningIcon: {
      marginRight: width * 0.01,
    },
    warningText: {
      color: theme.colors.error,
      fontSize: width * 0.03,
      flex: 1,
      flexWrap: 'wrap',
    },
    overlayButtons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    storageErrorText: {
      fontWeight: 'bold',
      marginHorizontal: width * 0.02,
      color: theme.colors.error,
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: width * 0.025,
      width: width * 0.25,
    },
    progressBar: {
      height: height * 0.01,
      borderRadius: 5,
      marginTop: height * 0.01,
      backgroundColor: '#061529',
    },
    downloadSpeed: {
      textAlign: 'right',
      fontSize: width * 0.03,
      marginTop: height * 0.006,
      color: '#aaa',
    },
    downloadingContainer: {
      marginTop: height * 0.012,
      marginBottom: height * 0.02,
    },
    downloadingText: {
      color: '#fff',
      fontSize: width * 0.035,
      marginVertical: height * 0.015,
      fontWeight: 'bold',
    },
    progressPercent: {
      color: '#39e6eb',
    },
    stopButton: {
      backgroundColor: '#fff',
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.07,
      borderRadius: width * 0.06,
      marginVertical: height * 0.02,
      width: width * 0.45,
      height: height * 0.06,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stopButtonText: {
      color: '#000',
      fontWeight: 'bold',
    },
    fileSize: {
      color: '#aaa',
      fontSize: width * 0.03,
    },
    radioCircle: {
      height: width * 0.05,
      width: width * 0.05,
      borderRadius: width * 0.025,
      borderWidth: 2,
      borderColor: '#888',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: width * 0.02,
    },
    radioCircleSelected: {
      borderColor: '#FFD700',
    },
    radioDot: {
      height: width * 0.025,
      width: width * 0.025,
      borderRadius: width * 0.0125,
      backgroundColor: '#FFD700',
    },
  });
