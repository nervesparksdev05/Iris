import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, Alert, Image, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {Text} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {chatSessionStore, SessionMetaData} from '../../store';
import {RenameModal} from '..';
import {L10nContext} from '../../utils';
import {ROUTES} from '../../utils/navigationConstants';

const isDebugMode = __DEV__;

export const SidebarContent: React.FC<DrawerContentComponentProps> = observer(
  props => {
    const [menuVisible, setMenuVisible] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [sessionToRename, setSessionToRename] = useState<SessionMetaData | null>(null);

    const theme = useTheme();
    const styles = createStyles(theme);
    const l10n = useContext(L10nContext);

    useEffect(() => {
      chatSessionStore.loadSessionList();
      chatSessionStore.setDateGroupNames(l10n.components.sidebarContent.dateGroups);
    }, [l10n.components.sidebarContent.dateGroups]);

    const openMenu = (sessionId: string, event: any) => {
      const {nativeEvent} = event;
      setMenuPosition({x: nativeEvent.pageX, y: nativeEvent.pageY});
      setMenuVisible(sessionId);
    };

    const closeMenu = () => setMenuVisible(null);

    const onPressDelete = (sessionId: string) => {
      if (sessionId) {
        Alert.alert(
          l10n.components.sidebarContent.deleteChatTitle,
          l10n.components.sidebarContent.deleteChatMessage,
          [
            {text: l10n.common.cancel, style: 'cancel'},
            {
              text: l10n.common.delete,
              style: 'destructive',
              onPress: async () => {
                chatSessionStore.resetActiveSession();
                await chatSessionStore.deleteSession(sessionId);
                closeMenu();
              },
            },
          ],
        );
      }
      closeMenu();
    };

    const menuItems = [
      {
        title: 'Chat',
        icon: require('../../assets/appIcons/chatIcon.png'),
        route: ROUTES.CHAT,
      },
      {
        title: 'Models',
        icon: require('../../assets/appIcons/modelsIcon.png'),
        route: ROUTES.MODELS,
      },
      {
        title: 'Change Parameters',
        icon: require('../../assets/appIcons/parameterIcon.png'),
        route: ROUTES.MODELS,
      },
      {
        title: 'Benchmark',
        icon: require('../../assets/appIcons/benchMarkIcon.png'),
        route: ROUTES.BENCHMARK,
      },
      {
        title: 'About',
        icon: require('../../assets/appIcons/aboutIcon.png'),
        route: ROUTES.APP_INFO,
      },
      {
        title: 'Report',
        icon: require('../../assets/appIcons/reportIcon.png'),
        route: ROUTES.APP_INFO,
      },
      // {
      //   title: 'Settings',
      //   icon: require('../../assets/appIcons/settingIcon.png'),
      //   route: ROUTES.SETTINGS,
      // },
    ];

    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <ScrollView contentContainerStyle={{backgroundColor: '#0D122B', flexGrow: 1, paddingHorizontal: 20, paddingTop: 40}}>
          <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Image source={require('../../assets/appIcons/backIcon.png')} style={{width: 24, height: 24, tintColor: 'white'}} />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 26, fontWeight: '500', marginVertical: 20}}>Settings</Text>
          </View>


                  

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#1A1F3D',
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
              }}
              onPress={() => props.navigation.navigate(item.route)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={item.icon} style={{width: 24, height: 24, marginRight: 15, resizeMode: 'contain'}} />
                <Text style={{color: 'white', fontSize: 16}}>{item.title}</Text>
              </View>
              <Image source={require('../../assets/appIcons/nextIcon.png')} style={{width: 16, height: 16, resizeMode: 'contain'}} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <RenameModal
          visible={sessionToRename !== null}
          onClose={() => setSessionToRename(null)}
          session={sessionToRename}
        />
      </GestureHandlerRootView>
    );
  },
);
