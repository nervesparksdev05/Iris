import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {useTheme} from '../../hooks';

export const HeaderLeft: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={styles.menuIcon}
      onPress={() => navigation.openDrawer()}>
      <Image
        source={require('../../assets/appIcons/settingIcon.png')}
        style={{width: 24, height: 24, tintColor: theme.colors.primary}} 
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
