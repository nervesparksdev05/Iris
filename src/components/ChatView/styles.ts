import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';

export const createStyles = ({theme}: {theme: Theme}) =>
  StyleSheet.create({
    container: {
      //backgroundColor: theme.colors.primary,
      flex: 1,
    },
    flatList: {
      // backgroundColor: theme.colors.background,
      backgroundColor: '#0D0D1A',
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
      backgroundColor: theme.colors.background,
    },
    customBottomComponent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  scrollContent: {
    paddingBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  titleText: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#010825',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
  },
  suggestionContainer: {
    paddingVertical: 10,
    paddingLeft: 4,
  },
  suggestionBox: {
    backgroundColor: '#020814',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 184,
    height: 101,
  },
  suggestionText: {
    color: '#898a94',
    fontSize: 13,
  },
  iconMargin: {
    marginRight: 15,
    height: 30,
    width: 30,
  },

  chatList: {
    paddingTop: 10,
  },
  userMsgContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  userMsg: {
    backgroundColor: '#1E1E2E',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
    maxWidth: '75%',
  },
  userIcon: {
    width: 30,
    height: 30,
  },
  aiMsgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  aiIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  aiMsg: {
    backgroundColor: '#161624',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
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
