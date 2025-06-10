import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Theme } from '../../utils/types';

const { width, height } = Dimensions.get('window');

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    flatList: {
      height: '100%',
    },
    flatListContentContainer: {
      flexGrow: 1,
    },
    footer: {
      height: height * 0.02,
    },
    footerLoadingPage: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: height * 0.02,
      height: height * 0.04,
    },
    header: {
      height: height * 0.005,
    },
    menu: {
      width: width * 0.45,
    },
    scrollToBottomButton: {
      position: 'absolute',
      right: width * 0.04,
      backgroundColor: theme.colors.primary,
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: width * 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    inputContainer: {
      backgroundColor: theme.colors.primary,
      borderTopLeftRadius: theme.borders.inputBorderRadius,
      borderTopRightRadius: theme.borders.inputBorderRadius,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: height * 0.12,
    },
    chatContainer: {
      flex: 1,
      position: 'relative',
      backgroundColor: 'transparent',
    },
    gradientBackground: {
      flex: 1,
    },
    customBottomComponent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    scrollContent: {
      paddingBottom: height * 0.05,
      paddingHorizontal: width * 0.05,
    },
    titleContainer: {
      alignItems: 'center',
      marginVertical: height * 0.03,
    },
    titleText: {
      fontSize: Math.min(width * 0.15),
      color: '#fff',
      textAlign: 'center',
    },
    infoSection: {
      marginBottom: height * 0.02,
    },
    infoBox: {
      flexDirection: 'row',
      backgroundColor: '#010825',
      padding: width * 0.035,
      borderRadius: width * 0.03,
      marginBottom: height * 0.025,
      alignItems: 'center',
    },
    infoText: {
      color: '#fff',
      marginLeft: width * 0.025,
      flex: 1,
      fontSize: width * 0.035,
    },
    suggestionContainer: {
      paddingVertical: height * 0.015,
      paddingLeft: width * 0.04,
      paddingRight: width * 0.01,
      flexDirection: 'row',
      marginBottom: height * 0.13,
    },
    suggestionBox: {
      backgroundColor: '#020814',
      borderRadius: width * 0.03,
      padding: width * 0.035,
      marginRight: width * 0.06,
      width: width * 0.57,
      height: height * 0.14,
    },
    suggestionText: {
      color: '#898a94',
      fontSize: width * 0.035,
    },
    iconMargin: {
      marginRight: width * 0.04,
      height: width * 0.06,
      width: width * 0.06,
      resizeMode: 'contain',
    },
    chatList: {
      paddingTop: height * 0.012,
      paddingHorizontal: width * 0.02,
    },
    userMsgContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      marginBottom: height * 0.02,
      paddingHorizontal: width * 0.02,
    },
    userMsg: {
      backgroundColor: '#1E1E2E',
      color: '#fff',
      paddingVertical: height * 0.012,
      paddingHorizontal: width * 0.035,
      borderRadius: width * 0.025,
      marginRight: width * 0.02,
      maxWidth: '75%',
      marginTop: height * 0.01,
    },
    userIcon: {
      width: width * 0.06,
      height: width * 0.06,
      marginBottom: height * 0.005,
    },
    aiMsgContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: height * 0.02,
      paddingHorizontal: width * 0.02,
    },
    aiIcon: {
      width: width * 0.06,
      height: width * 0.06,
      marginRight: width * 0.01,
      marginBottom: height * 0.005,
    },
    aiMsg: {
      color: '#fff',
      paddingVertical: height * 0.012,
      paddingHorizontal: width * 0.035,
      borderRadius: width * 0.025,
      maxWidth: '75%',
      marginTop: height * 0.005,
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: width * 0.025,
      marginBottom: height * 0.015,
      gap: width * 0.015,
    },
    dot: {
      width: width * 0.02,
      height: width * 0.02,
      backgroundColor: '#fff',
      borderRadius: width * 0.01,
    },
  });
