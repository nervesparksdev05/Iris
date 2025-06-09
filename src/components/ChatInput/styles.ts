import {StyleSheet} from 'react-native';

import {Theme} from '../../utils/types';
import {fontStyles} from '../../utils/theme';

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
      flexDirection: 'row',
    },
    palBtn: {
      height: 28,
      width: 28,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.inverseTextSecondary,
      borderRadius: 100,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 12,
      borderRadius: 12,
      minHeight: 54,
    },
    input: {
      ...theme.fonts.inputTextStyle,
      flex: 1,
      maxHeight: 150,
      paddingVertical: 0,

      color: '#fff',
      paddingHorizontal: 12,
      fontSize: 14,
      backgroundColor: '#21314A',
      borderRadius: 12,
      height: 54,
      marginLeft: 20,
    },
    footerContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#000',
      paddingHorizontal: 16,
      paddingVertical: 10,
      gap: 10,
    },
    imageIcon: {
      width: 30,
      height: 30,
      tintColor: '#aaa',
    },
    marginRight: {
      marginRight: 16,
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
      paddingHorizontal: 12,
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
      paddingHorizontal: 24,
      paddingVertical: 20,
      marginTop: isEditMode ? 28 : 0,
    },
    palNameWrapper: {
      ...fontStyles.regular,
      color: theme.colors.inverseOnSurface,
      fontSize: 12,
    },
    palName: {
      fontSize: 12,
      color: theme.colors.inverseOnSurface,
      ...fontStyles.semibold,
    },
    inputInnerContainer: {
      flexShrink: 1,
      flexGrow: 1,
    },
  });
