import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import {observer} from 'mobx-react';
import {modelStore} from '../../store';
import {Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Linking} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface SwipeModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SwipeModal: React.FC<SwipeModalProps> = observer(
  ({isVisible, onClose}) => {
    const translateX = useRef(new Animated.Value(-screenWidth)).current;

    useEffect(() => {
      if (isVisible) {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      } else {
        Animated.spring(translateX, {
          toValue: -screenWidth,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    }, [isVisible]);

    const handleClose = () => {
      onClose();
    };

    const panGesture = Gesture.Pan()
      .onUpdate(event => {
        if (event.translationX < 0) {
          translateX.setValue(event.translationX);
        }
      })
      .onEnd(event => {
        if (event.translationX < -screenWidth * 0.3 || event.velocityX < -500) {
          runOnJS(handleClose)();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
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
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{translateX}],
                },
              ]}>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    //   top: 0,
    width: screenWidth * 0.85,
    top: 0,
    bottom: 0,

    zIndex: 1001,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },

  gradientBackground: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 15,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    // backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  modelName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeText: {
    color: 'rgba(255,255,255,0.1)',
    fontSize: 200,
    fontWeight: 'bold',
  },
  bottomSection: {
    paddingBottom: 50,
  },
  bottomText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  emailText: {
    color: '#4285F4',
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  githubIcon: {
    width: 25,
    height: 25,
    borderRadius: 12,
    overflow: 'hidden',
  },

  poweredBy: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default SwipeModal;
