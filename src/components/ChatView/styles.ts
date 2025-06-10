import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export const createStyles = ({theme}: {theme: Theme}) =>
  StyleSheet.create({
    container: {
      //backgroundColor: theme.colors.primary,
      flex: 1,
    },
    flatList: {
      // backgroundColor: theme.colors.background,
      // backgroundColor: '#0D0D1A',
      height: '100%',
    },
    flatListContentContainer: {
      flexGrow: 1,
    },
    footer: {
      height: 16,
    },
    footerLoadingPage: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
      height: 32,
    },
    header: {
      height: 4,
    },
    menu: {
      width: 170,
    },
    scrollToBottomButton: {
      position: 'absolute',
      right: 16,
      backgroundColor: theme.colors.primary,
      width: 40,
      height: 40,
      borderRadius: 20,
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
      //minHeight: 64,
    },
    chatContainer: {
      flex: 1,
      position: 'relative',
      backgroundColor: 'transparent',
      // backgroundColor: theme.colors.background,
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
      fontSize: Math.min(width * 0.3, 44),
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
      borderRadius: 12,
      marginBottom: height * 0.025,
      alignItems: 'center',
    },
    infoText: {
      color: '#fff',
      marginLeft: 10,
      flex: 1,
      fontSize: Math.min(width * 0.04, 14),
    },
    suggestionContainer: {
      paddingVertical: height * 0.015,
      paddingLeft: width * 0.02,
    },
    suggestionBox: {
      backgroundColor: '#020814',
      borderRadius: 12,
      padding: width * 0.035,
      marginRight: width * 0.03,
      width: width * 0.55,
      minHeight: height * 0.12,
    },
    suggestionText: {
      color: '#898a94',
      fontSize: Math.min(width * 0.035, 14),
    },
    iconMargin: {
      marginRight: 15,
      height: width * 0.08,
      width: width * 0.08,
      resizeMode: 'contain',
    },

    chatList: {
      paddingTop: 10,
      paddingHorizontal: 8,
    },
    userMsgContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    userMsg: {
      backgroundColor: '#1E1E2E',
      color: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      marginRight: 8,
      maxWidth: '75%',
      marginTop: 8,
    },
    userIcon: {
      width: 24,
      height: 24,
      marginBottom: 4,
    },
    aiMsgContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    aiIcon: {
      width: 24,
      height: 24,
      marginRight: 4,
      marginBottom: 4,
    },
    aiMsg: {
      color: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      maxWidth: '75%',
      marginTop: 1,
    },

    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginBottom: 10,
      gap: 6,
    },
    dot: {
      width: 8,
      height: 8,
      backgroundColor: '#fff',
      borderRadius: 4,
    },
  });
