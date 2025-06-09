import * as React from 'react';
import {Dimensions, StyleSheet, View, Alert} from 'react-native';

import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {BlurView} from '@react-native-community/blur';

import {modelStore, uiStore} from './src/store';
import {useTheme} from './src/hooks';
import {Theme} from './src/utils/types';

import {l10n} from './src/utils/l10n';
import {initLocale} from './src/utils';
import {L10nContext} from './src/utils';
import {ROUTES} from './src/utils/navigationConstants';

import LinearGradient from 'react-native-linear-gradient';

import {SidebarContent, HeaderLeft, AppWithMigration} from './src/components';
import {
  ChatScreen,
  ModelsScreen,
  SettingsScreen,
  BenchmarkScreen,
  AboutScreen,
  DevToolsScreen,
} from './src/screens';
import {ModelHeader} from './src/screens/ModelsScreen/ModelHeader/ModelHeader';
import ReportScreen from './src/screens/ReportScreen/ReportScreen';
import ParametersPage from './src/appComponents/Parameter';
import ModelLoadingScreen from './src/screens/ModelLoadingScreen/ModelLoadingScreen';
import { DownloadModelScreen } from './src/screens/DownloadModelScreen/DownloadModelScreen';
import { DownloadModelHome } from './src/screens/DownloadModelScreen/DownloadModelsHome';

const isDebugMode = __DEV__;
const Drawer = createDrawerNavigator();
const screenWidth = Dimensions.get('window').width;

const App = observer(() => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const currentL10n = l10n[uiStore.language];

  const [isModelLoading, setIsModelLoading] = React.useState(false);
  const [loadingModelName, setLoadingModelName] = React.useState('');
  const [showDownloadScreen, setShowDownloadScreen] = React.useState(false);

  const autoLoadModel = async () => {
    try {
      if (!modelStore || !uiStore) return;

      const availableModels = modelStore.availableModels;

      const tryLoadModel = async (model: any) => {
        setIsModelLoading(true);
        setLoadingModelName(model.name);
        await modelStore.initContext(model);
        modelStore.setActiveModel(model.id);
        setIsModelLoading(false);
      };

      const lastUsedModel = availableModels.find(
        m => m.id === modelStore.lastUsedModelId,
      );
      if (lastUsedModel) return await tryLoadModel(lastUsedModel);

      const defaultModel = availableModels.find(m => m.isDefault);
      if (defaultModel) return await tryLoadModel(defaultModel);

      if (availableModels.length > 0) {
        return await tryLoadModel(availableModels[0]);
      }

      setShowDownloadScreen(true);
    } catch (error: any) {
      setIsModelLoading(false);
      console.error('Error loading model:', error);
      Alert.alert(
        'Error Loading Model',
        `Failed to load model: ${error.message}`,
        [{text: 'OK'}],
      );
    }
  };

  const waitForHydration = async () => {
    while (!modelStore.isHydrated || !uiStore.isHydrated) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  React.useEffect(() => {
    const initializeApp = async () => {
      await initLocale(uiStore.language);
      await waitForHydration();
      await autoLoadModel();
    };
    initializeApp();
  }, []);


  return (
    <GestureHandlerRootView style={styles.root}>
      <LinearGradient
        colors={['#060A15', '#051632']}
        style={styles.gradientBackground}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}>
      <SafeAreaProvider>

        <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
          <PaperProvider theme={theme}>
            <L10nContext.Provider value={currentL10n}>
              <NavigationContainer>
                <BottomSheetModalProvider>
                  <Drawer.Navigator
                    screenOptions={{
                      headerLeft: () => <HeaderLeft />,
                      drawerStyle: {width: screenWidth},
                      headerStyle: {backgroundColor: 'transparent'},
                      headerTintColor: theme.colors.onBackground,
                      headerTitleStyle: styles.headerTitle,
                      headerBackground: () => (
                          <LinearGradient
                            colors={['rgba(6, 10, 21, 0.9)', 'rgba(5, 22, 50, 0.9)']}
                            style={StyleSheet.absoluteFill}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 1}}
                          />
                        ),
                    }}
                    drawerContent={props => <SidebarContent {...props} />}>
                    <Drawer.Screen
                      name={ROUTES.CHAT}
                      component={() => (
                        <>
                          <ChatScreen />
                          {showDownloadScreen && (
                            <View style={StyleSheet.absoluteFillObject}>
                              <BlurView
                                style={StyleSheet.absoluteFill}
                                blurType="light"
                                blurAmount={1}
                                reducedTransparencyFallbackColor="white"
                              />
                              <DownloadModelHome/>
                            </View>
                          )}
                          {isModelLoading &&(
                            <View style={StyleSheet.absoluteFillObject}>
                              <BlurView
                                style={StyleSheet.absoluteFill}
                                blurType="light"
                                blurAmount={1}
                                reducedTransparencyFallbackColor="white"
                              />
                              <ModelLoadingScreen modelName={loadingModelName} />
                            </View>
                          )}
                        </>
                      )}
                      options={{headerShown: false}}
                    />

                    <Drawer.Screen
                      name={ROUTES.MODELS}
                      component={gestureHandlerRootHOC(ModelsScreen)}
                      options={{
                        header: ({navigation}) => (
                          <ModelHeader navigation={navigation} />
                        ),
                      }}
                    />

                    {/* Other Drawer Screens */}
                    <Drawer.Screen
                      name={ROUTES.BENCHMARK}
                      component={gestureHandlerRootHOC(BenchmarkScreen)}
                      options={{
                        headerStyle: styles.headerWithoutDivider,
                        title: currentL10n.screenTitles.benchmark,
                      }}
                    />
                    <Drawer.Screen
                      name={ROUTES.SETTINGS}
                      component={gestureHandlerRootHOC(SettingsScreen)}
                      options={{
                        headerStyle: styles.headerWithoutDivider,
                        title: currentL10n.screenTitles.settings,
                      }}
                    />
                    <Drawer.Screen
                      name={ROUTES.APP_INFO}
                      component={gestureHandlerRootHOC(AboutScreen)}
                      options={{headerShown: false}}
                    />
                    <Drawer.Screen
                      name={ROUTES.REPORT}
                      component={gestureHandlerRootHOC(ReportScreen)}
                      options={{headerShown: false}}
                    />
                    <Drawer.Screen
                      name={ROUTES.CHANGE_PARAMETER}
                      component={gestureHandlerRootHOC(ParametersPage)}
                      options={{headerShown: false}}
                    />
                    {isDebugMode && (
                      <Drawer.Screen
                        name={ROUTES.DEV_TOOLS}
                        component={gestureHandlerRootHOC(DevToolsScreen)}
                        options={{
                          headerStyle: styles.headerWithoutDivider,
                          title: 'Dev Tools',
                        }}
                      />
                    )}
                  </Drawer.Navigator>
                </BottomSheetModalProvider>
              </NavigationContainer>
            </L10nContext.Provider>
          </PaperProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
      </LinearGradient>
    </GestureHandlerRootView>
  );
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {flex: 1},
    gradientBackground: {
      flex: 1,
    },
    headerWithoutDivider: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      backgroundColor: 'transparent', // Make transparent
    },
    headerTitle: {
      ...theme.fonts.titleSmall,
      color: 'white', // Ensure text is visible
    },
  });

const AppWithMigrationWrapper = () => (
  <AppWithMigration>
    <App />
  </AppWithMigration>
);

export default AppWithMigrationWrapper;
