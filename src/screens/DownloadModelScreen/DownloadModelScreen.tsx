import React, {useCallback, useState, useEffect} from 'react';
import {
  Alert,
  Linking,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  Card,
  ProgressBar,
  Button,
  IconButton,
  Text,
  Paragraph,
  TouchableRipple,
  HelperText,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import {useTheme, useMemoryCheck, useStorageCheck} from '../../hooks';
import {uiStore, modelStore} from '../../store';
import {Model, ModelOrigin, RootDrawerParamList} from '../../utils/types';
import {
  getModelDescription,
  L10nContext,
  checkModelFileIntegrity,
  getLocalizedModelCapabilities,
} from '../../utils';

import {createStyles} from '../ModelsScreen/ModelCard/styles';

type ChatScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

interface ModelCardProps {
  model: Model;
  activeModelId?: string;
  onFocus?: () => void;
  onOpenSettings?: () => void;
}

export const DownloadModelScreen: React.FC<ModelCardProps> = observer(
  ({model, activeModelId, onOpenSettings}) => {
    const l10n = React.useContext(L10nContext);
    const theme = useTheme();
    const styles = createStyles(theme);

    const navigation = useNavigation<ChatScreenNavigationProp>();

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [integrityError, setIntegrityError] = useState<string | null>(null);

    const {memoryWarning, shortMemoryWarning} = useMemoryCheck(model);
    const {isOk: storageOk, message: storageNOkMessage} = useStorageCheck(
      model,
      {enablePeriodicCheck: true, checkInterval: 10000},
    );

    const isActiveModel = activeModelId === model.id;
    const isDownloaded = model.isDownloaded;
    const isDownloading = modelStore.isDownloading(model.id);
    const isHfModel = model.origin === ModelOrigin.HF;

    useEffect(() => {
      if (isDownloaded) {
        checkModelFileIntegrity(model, modelStore).then(({errorMessage}) => {
          if (!errorMessage) {
            // Automatically handle the downloaded model
            handleAutoLoadModel();
          } else {
            setIntegrityError(errorMessage);
          }
        });
      } else {
        setIntegrityError(null);
      }
    }, [isDownloaded, model]);

    const handleAutoLoadModel = async () => {
      try {
        await modelStore.setDefaultModel(model.id);
        
        await modelStore.initContext(model);
        
        navigation.navigate('Chat');
      } catch (error) {
        console.error('Error auto-loading model:', error);
        setSnackbarVisible(true);
      }
    };

    const stopDownload = useCallback(() => {
      modelStore.cancelDownload(model.id);
    }, [model.id]);



    const handleWarningPress = () => {
      setSnackbarVisible(true);
    };

    const renderDownloadOverlay = () => (
      <View>
        {!storageOk && (
          <HelperText
            testID="storage-error-text"
            type="error"
            visible={!storageOk}
            padding="none"
            style={styles.storageErrorText}>
            {storageNOkMessage}
          </HelperText>
        )}
        {storageOk && (
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => modelStore.checkSpaceAndDownload(model.id)}
            disabled={!storageOk}>
            <Text style={styles.buttonText}>
              {l10n.models.modelCard.buttons.download}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );

    return (
      <ScrollView
        style={ModelStyles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={ModelStyles.modelCard}>
          <Text style={ModelStyles.modelLabel}>{model.name}</Text>

          {isDownloaded ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                testID="loading-indicator"
                animating={true}
                color={theme.colors.primary}
              />
              <Text style={ModelStyles.loadingText}>
                Loading model...
              </Text>
            </View>
          ) : isDownloading ? (
            <View style={styles.downloadingContainer}>
              <Text style={ModelStyles.downloadingText}>
                Downloading{' '}
                <Text style={styles.progressPercent}>
                  {Math.round(model.progress)}%
                </Text>
              </Text>

              <TouchableOpacity
                style={ModelStyles.stopButton}
                onPress={stopDownload}>
                <Text style={ModelStyles.stopButtonText}>Stop Download</Text>
              </TouchableOpacity>

              <Text style={ModelStyles.fileSize}>
                File {getModelDescription(model, isActiveModel, modelStore, l10n)}
              </Text>
            </View>
          ) : (
            renderDownloadOverlay()
          )}

        

          {/* Display warning icon if there's a memory warning */}
          {shortMemoryWarning && isDownloaded && (
            <TouchableRipple
              testID="memory-warning-button"
              onPress={handleWarningPress}
              style={styles.warningContainer}>
              <View style={styles.warningContent}>
                <IconButton
                  icon="alert-circle-outline"
                  iconColor={theme.colors.error}
                  size={20}
                  style={styles.warningIcon}
                />
                <Text style={styles.warningText}>{shortMemoryWarning}</Text>
              </View>
            </TouchableRipple>
          )}

          {/* Display integrity warning if check fails */}
          {integrityError && (
            <TouchableRipple
              testID="integrity-warning-button"
              style={styles.warningContainer}>
              <View style={styles.warningContent}>
                <IconButton
                  icon="alert-circle-outline"
                  iconColor={theme.colors.error}
                  size={20}
                  style={styles.warningIcon}
                />
                <Text style={styles.warningText}>{integrityError}</Text>
              </View>
            </TouchableRipple>
          )}
        </View>

        {/* Snackbar to show full memory warning */}
        <Snackbar
          testID="memory-warning-snackbar"
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_MEDIUM}
          action={{
            label: l10n.common.dismiss,
            onPress: () => {
              setSnackbarVisible(false);
            },
          }}>
          {memoryWarning}
        </Snackbar>
      </ScrollView>
    );
  },
);

const ModelStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // modal overlay background
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modal: {
    backgroundColor: '#2D3E50',
    borderRadius: 10,
    width: '90%',
    maxHeight: '60%',
    padding: 20,
  },
  scrollContainer: {
    maxHeight: 300,
  },
  title: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  prompt: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '900',
  },
  modelCard: {
    backgroundColor: '#1B2A3C',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    paddingBottom: 20,
  },
  modelLabel: {
    color: '#babdc2',
    marginBottom: 10,
    textAlign: 'center',
  },
  fileSize: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: '#2662ea',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    height: 50,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  downloadText: {
    color: '#eafeff',
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 15,
  },
  stopButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  downloadingText: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
  },
});
