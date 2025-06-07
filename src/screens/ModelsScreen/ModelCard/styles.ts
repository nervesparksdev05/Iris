import {StyleSheet} from 'react-native';

import {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) => StyleSheet.create({
  card: {
    backgroundColor: '#0f223b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  activeLabel: {
    color: '#18c522',
    fontSize: 12,
    marginBottom: 6,
  },
  modelName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  loadButton: {
    backgroundColor: '#3465ff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#2662ea',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 200,
    height: 40,
    width: 115,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 5,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  statusText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  defaultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 30,
    marginBottom: 15,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 8,
  },
  defaultText: {
    color: '#aaa',
    fontSize: 13,
    marginLeft: 20,
  },
  sizeText: {
    color: '#999',
    fontSize: 12,
    marginTop: 6,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    marginTop: 8,
  },
  warningContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningIcon: {
    marginLeft: 0,
    marginRight: 2,
  },
  warningText: {
    color: theme.colors.error,
    fontSize: 12,
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
    marginHorizontal: 8,
    color: theme.colors.error,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 100,
  },
  progressBar: {
    height: 8,
    borderRadius: 5,
    marginTop: 8,
    backgroundColor: '#061529',
  },
  downloadSpeed: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 5,
    color: '#aaa',
  },

  downloadingContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  downloadingText: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  progressPercent: {
    color: '#39e6eb',
  },
  stopButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 15,
    width: 160,
    height: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stopButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  fileSize: {
    color: '#aaa',
    fontSize: 12,
  },
});