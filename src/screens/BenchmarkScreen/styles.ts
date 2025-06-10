import {Platform, StyleSheet} from 'react-native';
import type {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
      padding: 16,
    },
    card: {
      marginBottom: 16,
    },
    HeadingText: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 20
    },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a35',
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    width: '85%',
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
    description: {
      flex: 1,
      color: theme.colors.onSurfaceVariant,
      paddingRight: 8,
      fontSize: 12,
    },
    warning: {
      color: theme.colors.error,
      marginVertical: 8,
      textAlign: 'center',
    },
    button: {
      marginTop: 24,
    backgroundColor: '#007bff',
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    },
    buttonLabel: {
  color: 'white',
  fontSize: 14,
  fontWeight: 'bold',
},
gradientBackground: {
  flex: 1
},
    loadingContainer: {
      alignItems: 'center',
      marginVertical: 8,
    },
    loadingText: {
      marginTop: 8,
      color: theme.colors.onSurfaceVariant,
    },
    modelSelectorContent: {
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
    presetContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: 8,
    },
    presetButton: {
      flex: 1,
      minWidth: 100,
      marginHorizontal: 4,
    },
    slidersContainer: {
      marginTop: 16,
    },
    sliderDescriptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    settingItem: {
      marginBottom: 16,
    },
    settingLabel: {
      color: theme.colors.primary,
      marginBottom: 0,
    },
    settingValue: {
      textAlign: 'right',
      color: theme.colors.onSurface,
      marginTop: 0,
      minWidth: 40,
      marginLeft: 8,
    },
    slider: {
      //height: 40,
      ...Platform.select({
        android: {
          marginLeft: -12,
          marginRight: -10,
        },
      }),
    },
    sectionTitle: {
      color: theme.colors.primary,
      marginBottom: 8,
    },
    advancedButton: {
      marginBottom: 6,
    },
    advancedDescription: {
      marginBottom: 16,
      color: theme.colors.onSurfaceVariant,
      fontSize: 12,
    },
    warningContainer: {
      backgroundColor: theme.colors.errorContainer,
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    warningList: {
      marginTop: 8,
      paddingLeft: 8,
    },
    warningText: {
      color: theme.colors.error,
      marginVertical: 4,
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    resultsCard: {
      marginTop: 16,
      padding: 0,
    },
    resultItem: {
      marginBottom: 16,
    },
    errorText: {
      marginTop: 16,
      color: theme.colors.error,
    },
    dialogList: {
      marginVertical: 10,
      paddingLeft: 8,
    },
    dialogSection: {
      marginTop: 16,
      marginBottom: 8,
      fontWeight: '600',
    },
    link: {
      textDecorationLine: 'underline',
    },
    detailsButton: {
      marginTop: 16,
      alignSelf: 'flex-start',
    },
    detailsContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
    },
    codeBlock: {
      fontFamily: Platform.select({ios: 'Menlo', android: 'monospace'}),
      fontSize: 11,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.surfaceVariant,
    },
    checkboxLabel: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 12,
      marginLeft: 12,
      flex: 1,
    },
    maxValueHint: {
      color: theme.colors.onSurfaceVariant,
      fontStyle: 'italic',
    },
    simpleResultText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#00FF00', // Bright green
    fontSize: 16,
    fontWeight: '600',
  },
  });
