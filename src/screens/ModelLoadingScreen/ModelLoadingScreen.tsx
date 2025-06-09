import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../hooks';

const {width} = Dimensions.get('window');

const ModelLoadingScreen = ({modelName}: {modelName: string}) => {
  const theme = useTheme();
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.9, width * 0.9],
  });

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.loaderBox}>
        <Text style={styles.loadingText}>Loading Model{'\n'}Please wait...</Text>
        <Text style={styles.modelName}>{modelName}</Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                transform: [{translateX}],
              },
            ]}>
            <LinearGradient
              colors={['#ffffff40', '#7A5DF5', '#ffffff40']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    backgroundColor: '#11182B',
    padding: 30,
    borderRadius: 10,
    width: width * 0.9,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  modelName: {
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#444',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    width: '50%',
    height: '100%',
  },
});

export default ModelLoadingScreen;
