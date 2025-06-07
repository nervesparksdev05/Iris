import React, {useCallback, useState, useEffect} from 'react';
import {
  Alert,
  Linking,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
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
import {Divider} from '../../../components';
import {useTheme, useMemoryCheck, useStorageCheck} from '../../../hooks';
import {uiStore, modelStore} from '../../../store';
import {Model, ModelOrigin, RootDrawerParamList} from '../../../utils/types';
import {
  getModelDescription,
  L10nContext,
  checkModelFileIntegrity,
  getLocalizedModelCapabilities,
} from '../../../utils';

import {createStyles} from './styles';

type ChatScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

interface ModelCardProps {
  model: Model;
  activeModelId?: string;
  onFocus?: () => void;
  onOpenSettings?: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = observer(
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
          setIntegrityError(errorMessage);
        });
      } else {
        setIntegrityError(null);
      }
    }, [isDownloaded, model]);

    const stopDownload = useCallback(() => {
      modelStore.cancelDownload(model.id);
    }, [model.id]);

    const handleDelete = useCallback(() => {
      if (model.isDownloaded) {
        Alert.alert(
          l10n.models.modelCard.alerts.deleteTitle,
          l10n.models.modelCard.alerts.deleteMessage,
          [
            {text: l10n.common.cancel, style: 'cancel'},
            {
              text: l10n.common.delete,
              onPress: async () => {
                await modelStore.deleteModel(model);
              },
            },
          ],
        );
      }
    }, [model, l10n]);

    const openHuggingFaceUrl = useCallback(() => {
      if (model.hfUrl) {
        Linking.openURL(model.hfUrl).catch(err => {
          console.error('Failed to open URL:', err);
          setSnackbarVisible(true);
        });
      }
    }, [model.hfUrl]);

    const handleRemove = useCallback(() => {
      Alert.alert(
        l10n.models.modelCard.alerts.removeTitle,
        l10n.models.modelCard.alerts.removeMessage,
        [
          {text: l10n.common.cancel, style: 'cancel'},
          {
            text: l10n.models.modelCard.buttons.remove,
            style: 'destructive',
            onPress: () => modelStore.removeModelFromList(model),
          },
        ],
      );
    }, [model, l10n]);

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

    const renderModelLoadButton = () => {
      if (
        modelStore.isContextLoading &&
        modelStore.loadingModel?.id === model.id
      ) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              testID="loading-indicator"
              animating={true}
              color={theme.colors.primary}
            />
          </View>
        );
      }

      const handlePress = async () => {
        if (isActiveModel) {
          modelStore.manualReleaseContext();
        } else {
          try {
            await modelStore.initContext(model);
            if (uiStore.autoNavigatetoChat) {
              navigation.navigate('Chat');
            }
          } catch (e) {
            console.log(`Error: ${e}`);
          }
        }
      };

      return (
        <TouchableOpacity
          style={isActiveModel ? styles.deleteButton : styles.loadButton}
          onPress={handlePress}>
          <Text style={styles.buttonText}>
            {isActiveModel
              ? l10n.models.modelCard.buttons.offload
              : l10n.models.modelCard.buttons.load}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <>
        <View style={styles.card}>
          {isActiveModel && (
            <Text style={styles.activeLabel}>Active Model</Text>
          )}

          <Text style={styles.modelName}>{model.name}</Text>

          {isDownloaded ? (
            <View style={styles.buttonRow}>
              {renderModelLoadButton()}

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}>
                <Text style={styles.buttonText}>{l10n.common.delete}</Text>
              </TouchableOpacity>
            </View>
          ) : isDownloading ? (
            <View style={styles.downloadingContainer}>
              <Text style={styles.downloadingText}>
                Downloading{' '}
                <Text style={styles.progressPercent}>{Math.round(model.progress)}%</Text>
              </Text>

              <TouchableOpacity
                style={styles.stopButton}
                onPress={stopDownload}>
                <Text style={styles.stopButtonText}>Stop Download</Text>
              </TouchableOpacity>

              <Text style={styles.fileSize}>
                {getModelDescription(model, isActiveModel, modelStore, l10n)}
              </Text>
            </View>
          ) : (
            renderDownloadOverlay()
          )}

          {!isDownloaded && !isDownloading && (
            <Text style={styles.statusText}>Not Downloaded</Text>
          )}

          {isDownloaded && (
            <View style={styles.defaultRow}>
              <View style={styles.radioCircle} />
              <Text style={styles.defaultText}>Set as Default Model</Text>
            </View>
          )}

          {isDownloaded && (
            <Text style={styles.sizeText}>
              {getModelDescription(model, isActiveModel, modelStore, l10n)}
            </Text>
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
      </>
    );
  },
);
