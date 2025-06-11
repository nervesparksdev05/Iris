import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Theme } from '../../utils/types';
import { fontStyles } from '../../utils/theme';

const { width, height } = Dimensions.get('window');

export const createStyles = ({
  theme,
  isEditMode,
}: {
  theme: Theme;
  isEditMode: boolean;
}) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
    },
    palBtn: {
      height: height * 0.035,
      width: height * 0.035,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.inverseTextSecondary,
      borderRadius: 100,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: width * 0.03,
      borderRadius: 12,
      minHeight: height * 0.07,
    },
    input: {
      ...theme.fonts.inputTextStyle,
      flex: 1,
      maxHeight: height * 0.2,
      paddingVertical: Platform.OS === 'ios' ? 10 : 6,
      paddingHorizontal: width * 0.03,
      fontSize: width * 0.035,
      backgroundColor: '#21314A',
      borderRadius: 16,
      height: height * 0.07,
      marginLeft: width * 0.015,
      color: '#fff',
      width: width * 0.7,
    },
    footerContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#000',
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.012,
      gap: width * 0.025,
    },
    imageIcon: {
      width: width * 0.11,
      height: width * 0.11,
      tintColor: '#aaa',
      marginLeft: -width * 0.07,
    },
    marginRight: {
      marginRight: width * 0.04,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      borderRadius: 12,
      overflow: 'hidden',
    },
    editBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.surfaceVariant,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.03,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    editBarText: {
      color: theme.colors.onSurfaceVariant,
    },
    editBarButton: {
      margin: 0,
    },
    inputRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: width * 0.06,
      paddingVertical: height * 0.025,
      marginTop: isEditMode ? height * 0.035 : 0,
    },
    palNameWrapper: {
      ...fontStyles.regular,
      color: theme.colors.inverseOnSurface,
      fontSize: width * 0.03,
    },
    palName: {
      fontSize: width * 0.03,
      color: theme.colors.inverseOnSurface,
      ...fontStyles.semibold,
    },
    inputInnerContainer: {
      flexShrink: 1,
      flexGrow: 1,
    },
  });
