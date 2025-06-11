import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {styles} from './styles';
import {useTheme} from '../../hooks';
import {ROUTES} from '../../utils/navigationConstants';

export const HeaderLeft: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={styles.menuIcon}
      onPress={() => navigation.navigate(ROUTES.SIDEBAR)}>
      <Image
        source={require('../../assets/appIcons/settingIcon.png')}
        style={{width: 24, height: 24, tintColor: theme.colors.primary}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
