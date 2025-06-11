import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const ReportScreen = () => {
  const [reportText, setReportText] = useState('');
  const [focused, setFocused] = useState(false);

  const borderAnim = useRef(new Animated.Value(0)).current;
  const labelAnim = useRef(new Animated.Value(0)).current;
  const inputHeight = useRef(new Animated.Value(height * 0.80)).current;
  const buttonBottom = useRef(new Animated.Value(20)).current;
  const navigation = useNavigation();
  const initialLayoutHeight = useRef(0);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', e => {
      const keyboardHeight = e.endCoordinates.height;
      const availableHeight = height - keyboardHeight - 120;

      Animated.parallel([
        Animated.spring(inputHeight, {
          toValue: availableHeight,
          useNativeDriver: false,
        }),
        Animated.timing(buttonBottom, {
          toValue: keyboardHeight + 10,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    });

    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.parallel([
        Animated.spring(inputHeight, {
          toValue: height * 0.80,
          useNativeDriver: false,
        }),
        Animated.timing(buttonBottom, {
          toValue: 20,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!reportText.trim()) {
      setFocused(false);
      Animated.timing(borderAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(labelAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#333', '#999'],
  });

  const labelTop = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [18, -10],
  });

  const labelFontSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 13],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#060A15', '#051632']}
        style={styles.gradientBackground}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}>
        <View style={styles.wrapper}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/appIcons/backIcon.png')}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Report</Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={styles.innerContainer}
                onLayout={e => {
                  if (!focused && initialLayoutHeight.current === 0) {
                    initialLayoutHeight.current = e.nativeEvent.layout.height - 100;
                    inputHeight.setValue(initialLayoutHeight.current);
                  }
                }}>
                {/* Animated Input Field */}
                <Animated.View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor,
                      height: inputHeight,
                    },
                  ]}>
                  <Animated.Text
                    style={[
                      styles.floatingLabel,
                      {
                        top: labelTop,
                        fontSize: labelFontSize,
                      },
                    ]}>
                    Report Content
                  </Animated.Text>

                  <TextInput
                    value={reportText}
                    onChangeText={setReportText}
                    multiline
                    style={styles.textInput}
                    placeholder=""
                    placeholderTextColor="#888"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    textAlignVertical="top"
                  />
                </Animated.View>

                {/* Send Button */}
                <Animated.View
                  style={[styles.buttonContainer, {bottom: buttonBottom}]}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Send Report</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#060A15',
  },
  gradientBackground: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.06,
    paddingBottom: height * 0.025,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a35',
  },
  headerTitle: {
    fontSize: width * 0.055,
    color: 'white',
    fontWeight: '600',
    marginLeft: width * 0.03,
  },
  headerIcon: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: 'white',
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  floatingLabel: {
    position: 'absolute',
    left: 12,
    backgroundColor: '#060A15',
    color: '#aaa',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingTop: 8,
  },
  buttonContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  button: {
    backgroundColor: '#1843a1',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#99b5ef',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ReportScreen;
