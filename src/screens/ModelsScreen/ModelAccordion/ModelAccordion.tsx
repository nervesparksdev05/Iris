import React from 'react';
import {StyleSheet} from 'react-native';

import {observer} from 'mobx-react-lite';

import { View } from 'react-native';


interface ModelAccordionProps {
  group: any;
  expanded: boolean;
  onPress: () => void;
  children: React.ReactNode;
  description?: string;
}

export const ModelAccordion: React.FC<ModelAccordionProps> = observer(
  ({children}) => {
    return <View style={styles.container}>{children}</View>;
  },
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    paddingVertical: 0,
  },
});
