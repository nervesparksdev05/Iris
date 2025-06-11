import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  // Animated,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
// import {runOnJS} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import {observer} from 'mobx-react';
import {modelStore} from '../../store';
import {Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Linking} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface SwipeModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SwipeModal: React.FC<SwipeModalProps> = observer(
  ({isVisible, onClose}) => {
    const translateX = useSharedValue(-screenWidth);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{translateX: translateX.value}],
    }));

    useEffect(() => {
      translateX.value = withSpring(isVisible ? 0 : -screenWidth, {
        damping: 15,
        stiffness: 150,
      });
    }, [isVisible]);

    const handleClose = () => {
      onClose();
    };

    const panGesture = Gesture.Pan()
      .onUpdate(event => {
        if (event.translationX < 0) {
          translateX.value = event.translationX;
        }
      })
      .onEnd(event => {
        if (event.translationX < -screenWidth * 0.3 || event.velocityX < -500) {
          runOnJS(handleClose)();
        } else {
          translateX.value = withSpring(0, {
            damping: 15,
            stiffness: 150,
          });
        }
      });

    if (!isVisible) return null;

    return (
      <Portal>
        <View style={styles.overlay} pointerEvents="box-none">
          {/* <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" /> */}

          {/* Background blur/overlay */}
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={onClose}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={10}
              reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
            />
          </TouchableOpacity>

          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.modalContainer, animatedStyle]}>
              <LinearGradient
                colors={['#060A15', '#051632']}
                style={styles.gradientBackground}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}>
                {/* Header */}
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <View style={styles.logoContainer}>
                      <View style={styles.logo}>
                        <Image
                          source={require('../../assets/appIcons/nerveSparkIcon.png')}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={styles.appName}>Iris</Text>
                      <Text style={styles.subtitle}>NerveSparks</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* Active Model Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Active Model</Text>
                  <Text style={styles.modelName}>
                    {modelStore.activeModel?.name || 'No model loaded'}
                  </Text>
                </View>

                {/* Content Area */}
                <View style={styles.contentArea}></View>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                  {/* Action Buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() =>
                        Linking.openURL(
                          'https://github.com/nervesparksdev05/Iris',
                        )
                      }>
                      <Text style={styles.buttonText}>Star us </Text>

                      <Image
                        source={require('../../assets/appIcons/githubIcon.png')}
                        style={styles.githubIcon}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() =>
                        Linking.openURL('https://nervesparks.com')
                      }>
                      <Text style={styles.buttonText}>NerveSparks.com</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.poweredBy}>powered by llama.cpp</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          </GestureDetector>
        </View>
      </Portal>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: screenWidth * 0.85,
    zIndex: 1001,
    borderTopRightRadius: screenWidth * 0.05,
    borderBottomRightRadius: screenWidth * 0.05,
    overflow: 'hidden',
  },
  gradientBackground: {
    flex: 1,
    paddingTop: screenHeight * 0.06,
    paddingHorizontal: screenWidth * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight * 0.04,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: screenWidth * 0.04,
  },
  logo: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    color: 'white',
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
    fontSize: screenWidth * 0.035,
  },
  closeButton: {
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: screenWidth * 0.05,
  },
  section: {
    marginBottom: screenHeight * 0.03,
  },
  sectionTitle: {
    color: '#888',
    fontSize: screenWidth * 0.035,
    marginBottom: 8,
  },
  modelName: {
    color: 'white',
    fontSize: screenWidth * 0.045,
    fontWeight: '500',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingBottom: screenHeight * 0.06,
  },
  buttonContainer: {
    gap: screenHeight * 0.015,
    marginBottom: screenHeight * 0.02,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.05,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: screenWidth * 0.02,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  buttonText: {
    color: 'white',
    fontSize: screenWidth * 0.045,
    marginRight: screenWidth * 0.02,
  },
  githubIcon: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06,
    borderRadius: screenWidth * 0.03,
  },
  poweredBy: {
    color: '#666',
    fontSize: screenWidth * 0.03,
    textAlign: 'center',
  },
});

export default SwipeModal;
