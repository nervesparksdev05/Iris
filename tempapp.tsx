import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppWithMigration} from './src/components';
import DownloadModelScreen from './src/appComponents/DownloadModel';
import ChatInterface from './src/appComponents/ChatInterface';
import SettingsPage from './src/appComponents/SettingPage';
import ModelManagement from './src/appComponents/ModelManagementPage';
import AboutUs from './src/appComponents/AboutUs';
import SearchModelScreen from './src/appComponents/SearchModelScreen';
import ModelSearchScreen from './src/appComponents/SearchModelScreen';
import ParametersPage from './src/appComponents/Parameter';

import {RootStackParamList} from './TypeScript';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ChatInterface" component={ChatInterface} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="Models" component={ModelManagement} />
        <Stack.Screen name="ModelSearchScreen" component={ModelSearchScreen} />
        <Stack.Screen name="Change Parameters" component={ParametersPage} />
        <Stack.Screen name="About" component={AboutUs} />
        {/* <Stack.Screen name="Report" component={ReportScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWithMigrationWrapper = () => {
  return (
    <AppWithMigration>
      <App />
    </AppWithMigration>
  );
};

export default AppWithMigrationWrapper;
