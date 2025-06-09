import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';

const ReportScreen = () => {
  const [reportText, setReportText] = useState('');
  const [focused, setFocused] = useState(false);
  
  const borderAnim = useRef(new Animated.Value(0)).current;
  const labelAnim = useRef(new Animated.Value(0)).current;
  const inputHeight = useRef(new Animated.Value(Dimensions.get('window').height * 0.6)).current;
  const buttonBottom = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      const screenHeight = Dimensions.get('window').height;
      
      // Calculate available height (screen height - keyboard - header - button - margins)
      const availableHeight = screenHeight - keyboardHeight - 100 - 62 - 32;
      
      Animated.parallel([
        Animated.timing(inputHeight, {
          toValue: availableHeight,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(buttonBottom, {
          toValue: keyboardHeight + 10,
          duration: 250,
          useNativeDriver: false,
        })
      ]).start();
    });

    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.parallel([
        Animated.timing(inputHeight, {
          toValue: Dimensions.get('window').height * 0.6,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(buttonBottom, {
          toValue: 20,
          duration: 250,
          useNativeDriver: false,
        })
      ]).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const handleFocus = () => {
    setFocused(true);
    animateBorder(1);
    animateLabel(1);
  };

  const handleBlur = () => {
    if (reportText.trim() === '') {
      setFocused(false);
      animateBorder(0);
      animateLabel(0);
    }
  };

  const animateBorder = (toValue) => {
    Animated.timing(borderAnim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animateLabel = (toValue) => {
    Animated.timing(labelAnim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#444', '#999'],
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>← Report</Text>
            </View>

            {/* Input with floating label */}
            <Animated.View style={[styles.inputContainer, { 
              borderColor,
              height: inputHeight 
            }]}>
              <Animated.Text
                style={[
                  styles.floatingLabel,
                  {
                    top: labelTop,
                    fontSize: labelFontSize,
                  },
                ]}
              >
                Report Content
              </Animated.Text>

              <TextInput
                value={reportText}
                onChangeText={setReportText}
                placeholder=""
                placeholderTextColor="#888"
                style={styles.textInput}
                multiline
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Animated.View>

            {/* Button with absolute positioning */}
            <Animated.View style={[styles.buttonContainer, { bottom: buttonBottom }]}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Send Report</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#060d1f',
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    position: 'relative',
  },
  floatingLabel: {
    position: 'absolute',
    left: 12,
    backgroundColor: '#060d1f',
    color: '#888',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
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