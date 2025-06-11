import * as React from 'react';
import {Dimensions, StyleSheet, View, Alert, Easing} from 'react-native';
import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Provider as PaperProvider, Portal} from 'react-native-paper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

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
import ModelLoadingScreen from './src/screens/ModelLoadingScreen/ModelLoadingScreen';
import {DownloadModelScreen} from './src/screens/DownloadModelScreen/DownloadModelScreen';
import {DownloadModelHome} from './src/screens/DownloadModelScreen/DownloadModelsHome';
import ParametersPage from './src/screens/ParameterScreen/ParameterScreen';

import {SidebarContent, HeaderLeft, AppWithMigration} from './src/components';

import {SwipeModalProvider, useSwipeModal} from './src/store/SwipeModalContext';
import SwipeModal from './src/screens/GlobalSideBar/GlobalSideBar';
import GlobalSwipeHandler from './src/screens/GlobalSideBar/GlobalHandler';

import {modelStore, uiStore} from './src/store';
import {useTheme} from './src/hooks';
import {Theme} from './src/utils/types';
import {l10n} from './src/utils/l10n';
import {initLocale} from './src/utils';
import {L10nContext} from './src/utils';
import {ROUTES} from './src/utils/navigationConstants';
import {
  DownloadScreenProvider,
  useDownloadScreen,
} from './src/store/DownloadScreenContext';

const Stack = createStackNavigator();
const screenWidth = Dimensions.get('window').width;
const isDebugMode = __DEV__;

const dissolveAnimation = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 350,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      },
    },
  },
  cardStyleInterpolator: ({current, next, layouts}) => {
    const progress = current.progress;
    const nextProgress = next ? next.progress : 0;

    return {
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0.7, 1],
        }),
        transform: [
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.92, 1],
            }),
          },
          {
            translateX: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width * 0.1, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.3],
        }),
      },
    };
  },
  headerStyleInterpolator: ({current}) => {
    return {
      leftLabelStyle: {
        opacity: current.progress,
      },
      leftButtonStyle: {
        opacity: current.progress,
      },
      rightButtonStyle: {
        opacity: current.progress,
      },
      titleStyle: {
        opacity: current.progress,
      },
      backgroundStyle: {
        opacity: current.progress,
      },
    };
  },
};

const crossFadeDissolve = {
  gestureEnabled: true,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 500,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 400,
        easing: Easing.in(Easing.ease),
      },
    },
  },
  cardStyleInterpolator: ({current, next, layouts}) => {
    const progress = current.progress;

    return {
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.3, 1],
          outputRange: [0, 0.5, 1],
        }),
        transform: [
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1],
            }),
          },
        ],
      },
    };
  },
};

const blurDissolve = {
  gestureEnabled: true,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 450,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 350,
        easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
      },
    },
  },
  cardStyleInterpolator: ({current, next, layouts}) => {
    const progress = current.progress;

    return {
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.4, 1],
          outputRange: [0, 0.6, 1],
        }),
        transform: [
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.9, 1],
            }),
          },
          {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
        backgroundColor: progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)'],
        }),
      },
    };
  },
};

const ChatScreenWrapper = observer(() => {
  const theme = useTheme();
  const {isModalVisible, hideModal} = useSwipeModal();

  const [isModelLoading, setIsModelLoading] = React.useState(false);
  const [loadingModelName, setLoadingModelName] = React.useState('');
  const {showDownloadScreen, setShowDownloadScreen} = useDownloadScreen();

  const autoLoadModel = async () => {
    try {
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
      Alert.alert('Error Loading Model', error.message || 'Unknown error');
    }
  };

  const waitForHydration = async () => {
    while (!modelStore.isHydrated || !uiStore.isHydrated) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  React.useEffect(() => {
    const init = async () => {
      await initLocale(uiStore.language);
      await waitForHydration();
      await autoLoadModel();
    };
    init();
  }, []);

  React.useEffect(() => {
    if (modelStore.availableModels.length === 0) {
      setShowDownloadScreen(true);
    }
  }, [modelStore.availableModels.length]);

  return (
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
          <DownloadModelHome />
        </View>
      )}
      {isModelLoading && (
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
      <Portal>
        <SwipeModal isVisible={isModalVisible} onClose={hideModal} />
      </Portal>
    </>
  );
});

const StackScreens = observer(() => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const defaultHeaderOptions = {
    headerLeft: () => <HeaderLeft />,
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
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'transparent'},
        ...dissolveAnimation,
      }}>
      <Stack.Screen
        name={ROUTES.CHAT}
        component={gestureHandlerRootHOC(ChatScreenWrapper)}
        options={{
          headerShown: false,
          ...crossFadeDissolve,
        }}
      />
      <Stack.Screen
        name={ROUTES.MODELS}
        component={gestureHandlerRootHOC(ModelsScreen)}
        options={{
          headerShown: true,
          header: ({navigation}) => <ModelHeader navigation={navigation} />,
          ...dissolveAnimation,
        }}
      />
      <Stack.Screen
        name={ROUTES.BENCHMARK}
        component={gestureHandlerRootHOC(BenchmarkScreen)}
        options={{
          headerShown: false,
          ...dissolveAnimation,
        }}
      />
      <Stack.Screen
        name={ROUTES.SIDEBAR}
        component={gestureHandlerRootHOC(SidebarContent)}
        options={{
          headerShown: false,
          ...dissolveAnimation,
        }}
      />
      <Stack.Screen
        name={ROUTES.APP_INFO}
        component={gestureHandlerRootHOC(AboutScreen)}
        options={{
          headerShown: false,
          ...dissolveAnimation,
        }}
      />
      {isDebugMode && (
        <Stack.Screen
          name={ROUTES.DEV_TOOLS}
          component={gestureHandlerRootHOC(DevToolsScreen)}
          options={{
            headerShown: true,
            ...defaultHeaderOptions,
            headerStyle: styles.headerWithoutDivider,
            title: 'Dev Tools',
            ...dissolveAnimation,
          }}
        />
      )}
      <Stack.Screen
        name={ROUTES.REPORT}
        component={gestureHandlerRootHOC(ReportScreen)}
        options={{
          headerShown: false,
          ...blurDissolve,
        }}
      />
      <Stack.Screen
        name={ROUTES.CHANGE_PARAMETER}
        component={gestureHandlerRootHOC(ParametersPage)}
        options={{
          headerShown: false,
          ...blurDissolve,
        }}
      />
      <Stack.Screen
        name="DownloadModelScreen"
        component={gestureHandlerRootHOC(DownloadModelScreen)}
        options={{
          headerShown: false,
          ...crossFadeDissolve,
        }}
      />
    </Stack.Navigator>
  );
});

const AppContent = observer(() => {
  const theme = useTheme();
  const currentL10n = l10n[uiStore.language];

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <LinearGradient
        colors={['#060A15', '#051632']}
        style={{flex: 1}}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}>
        <SafeAreaProvider>
          <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
            <PaperProvider theme={theme}>
              <L10nContext.Provider value={currentL10n}>
                <DownloadScreenProvider>
                  <NavigationContainer>
                    <BottomSheetModalProvider>
                      <GlobalSwipeHandler>
                        <StackScreens />
                      </GlobalSwipeHandler>
                    </BottomSheetModalProvider>
                  </NavigationContainer>
                </DownloadScreenProvider>
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
    headerWithoutDivider: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      backgroundColor: 'transparent',
    },
    headerTitle: {
      ...theme.fonts.titleSmall,
      color: 'white',
    },
  });

const App = () => (
  <SwipeModalProvider>
    <AppContent />
  </SwipeModalProvider>
);

const AppWithMigrationWrapper = () => (
  <AppWithMigration>
    <App />
  </AppWithMigration>
);

export default AppWithMigrationWrapper;