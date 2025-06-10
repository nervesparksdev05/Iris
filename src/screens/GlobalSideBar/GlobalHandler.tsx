import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {useSwipeModal} from '../../store/SwipeModalContext';
import Animated from 'react-native-reanimated';

const {width: screenWidth} = Dimensions.get('window');

interface GlobalSwipeHandlerProps {
  children: React.ReactNode;
}

const GlobalSwipeHandler: React.FC<GlobalSwipeHandlerProps> = ({children}) => {
  const {showModal, isModalVisible} = useSwipeModal();

  const handleShowModal = () => {
    if (!isModalVisible) {
      showModal();
    }
  };

  let gestureStartX = 0;

  const panGesture = Gesture.Pan()
    .onStart(event => {
      gestureStartX = event.absoluteX;
    })
    .onUpdate(event => {
      if (gestureStartX < 20 && event.translationX > 50 && !isModalVisible) {
        runOnJS(handleShowModal)();
      }
    })
    .activeOffsetX(10)
    .failOffsetX(-10);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={styles.container}>{children}</Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GlobalSwipeHandler;
