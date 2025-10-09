import {StyleSheet} from 'react-native';

import {Theme} from '../../utils/types';

export const createTagsStyles = (theme: Theme) => ({
  body: {
    color: theme.colors.onBackground,
    fontSize: 16,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: 0,
    paddingTop: 0,
    margin: 0,
    backgroundColor: 'transparent',
    lineHeight: 24,
  },
  // Headers
  h1: {
    color: theme.colors.onBackground,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    lineHeight: 32,
  },
  h2: {
    color: theme.colors.onBackground,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 6,
    lineHeight: 28,
  },
  h3: {
    color: theme.colors.onBackground,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    lineHeight: 26,
  },
  h4: {
    color: theme.colors.onBackground,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
    lineHeight: 24,
  },
  h5: {
    color: theme.colors.onBackground,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    lineHeight: 22,
  },
  h6: {
    color: theme.colors.onBackground,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 4,
    lineHeight: 20,
  },
  // Paragraphs
  p: {
    color: theme.colors.onBackground,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 8,
  },
  // Lists
  ul: {
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 20,
  },
  ol: {
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 20,
  },
  li: {
    color: theme.colors.onBackground,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  // Links
  a: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  // Emphasis
  strong: {
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  },
  em: {
    fontStyle: 'italic',
    color: theme.colors.onBackground,
  },
  // Code
  code: {
    fontFamily: 'Courier',
    backgroundColor: theme.colors.surface,
    padding: 4,
    borderRadius: 4,
    color: theme.colors.onSurface,
    fontSize: 14,
  },
  pre: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 8,
    color: theme.colors.onSurface,
    fontFamily: 'Courier',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  // Blockquotes
  blockquote: {
    backgroundColor: theme.colors.surfaceContainer,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 8,
    marginBottom: 8,
    fontStyle: 'italic',
    color: theme.colors.onSurface,
  },
  // Tables
  table: {
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  th: {
    backgroundColor: theme.colors.surfaceContainer,
    padding: 8,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
    color: theme.colors.onSurface,
  },
  td: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
    color: theme.colors.onSurface,
  },
  // Horizontal rules
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
    marginTop: 16,
    marginBottom: 16,
  },
  // Styles for thinking tags
  thinking: {
    color: theme.colors.thinkingBubbleText,
    fontSize: 14,
    lineHeight: 20,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  think: {
    color: theme.colors.thinkingBubbleText,
    fontSize: 14,
    lineHeight: 20,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  thought: {
    color: theme.colors.thinkingBubbleText,
    fontSize: 14,
    lineHeight: 20,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    thinkContainer: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderRadius: 8,
      padding: 12,
      marginVertical: 8,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
      opacity: 0.8,
    },
    thinkText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      marginRight: 8,
    },
    thinkTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
  });
