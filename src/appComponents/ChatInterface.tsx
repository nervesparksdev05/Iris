import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DownloadModelScreen from './DownloadModel';
import {BlurView} from '@react-native-community/blur';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../TypeScript';

const INITIAL = 'initial';
const CHAT = 'chat';

const ChatInterface = () => {
  const [screen, setScreen] = useState(INITIAL);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{text: string; type: 'user' | 'ai'}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dotsAnim = useRef(new Animated.Value(0)).current;
  const [modelDownloaded, setModelDownloaded] = useState(false);

  type NavigationProp = StackNavigationProp<
    RootStackParamList,
    'ChatInterface'
  >;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(dotsAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;

    if (screen === INITIAL) setScreen(CHAT);

    const newMessage = {text: input, type: 'user' as const};
    setChat(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const mockResponse = {
        text: 'This is a mock response from the assistant.',
        type: 'ai' as const,
      };
      setChat(prev => [...prev, mockResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const renderItem = ({item}: {item: {text: string; type: 'user' | 'ai'}}) => {
    if (item.type === 'user') {
      return (
        <View style={styles.userMsgContainer}>
          <Text style={styles.userMsg}>{item.text}</Text>
          <Image
            source={require('../assets/appIcons/userProfile.png')}
            style={styles.userIcon}
          />
        </View>
      );
    }
    return (
      <View style={styles.aiMsgContainer}>
        <Animated.Image
          source={require('../assets/appIcons/nerveSparkIcon.png')}
          style={styles.aiIcon}
        />
        <Text style={styles.aiMsg}>{item.text}</Text>
      </View>
    );
  };

  const renderLoading = () => {
    const translateY1 = dotsAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -4],
    });
    const translateY2 = dotsAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-2, 2],
    });
    const translateY3 = dotsAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -4],
    });

    return (
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[styles.dot, {transform: [{translateY: translateY1}]}]}
        />
        <Animated.View
          style={[styles.dot, {transform: [{translateY: translateY2}]}]}
        />
        <Animated.View
          style={[styles.dot, {transform: [{translateY: translateY3}]}]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>Iris</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image
              source={require('../assets/appIcons/settingIcon.png')}
              style={styles.iconMargin}
            />
          </TouchableOpacity>

          <Image
            source={require('../assets/appIcons/chatIcon.png')}
            style={styles.iconMargin}
          />
        </View>
      </View>

      <View style={styles.content}>
        {screen === INITIAL ? (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Hello, Ask me Anything</Text>
            </View>

            <View style={styles.infoSection}>
              {[
                'Explains complex topics simply.',
                'May sometimes be inaccurate.',
                'Unable to provide current affairs due to no internet connectivity.',
                'Long Press on messages to report.',
              ].map((msg, index) => (
                <View key={index} style={styles.infoBox}>
                  <Image
                    source={require('../assets/appIcons/infoIcon.png')}
                    style={styles.iconMargin}
                  />
                  <Text style={styles.infoText}>{msg}</Text>
                </View>
              ))}
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.suggestionContainer}>
              <TouchableOpacity style={styles.suggestionBox}>
                <Text style={styles.suggestionText}>
                  Explain how to develop a consistent reading habit.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.suggestionBox}>
                <Text style={styles.suggestionText}>
                  Write an email to your teacher requesting leave for...
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>
        ) : (
          <FlatList
            data={chat}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.chatList}
            ListFooterComponent={isLoading ? renderLoading : null}
          />
        )}
      </View>

      {/* Shared Footer */}
      <View style={styles.footerContainer}>
        <Image
          source={require('../assets/appIcons/micIcon.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Message"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend}>
          <Image
            source={require('../assets/appIcons/sendIcon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {!modelDownloaded && (
        <View style={styles.overlay}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
          <DownloadModelScreen
            onDownloadComplete={() => setModelDownloaded(true)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1A',
    paddingTop: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  logo: {
    color: '#fff',
    fontSize: 26,
  },
  navIcons: {
    flexDirection: 'row',
  },
  iconMargin: {
    marginRight: 15,
    height: 30,
    width: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  titleText: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#010825',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
  },
  suggestionContainer: {
    paddingVertical: 10,
    paddingLeft: 4,
  },
  suggestionBox: {
    backgroundColor: '#020814',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 184,
    height: 101,
  },
  suggestionText: {
    color: '#898a94',
    fontSize: 13,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#21314A',
    borderRadius: 12,
    height: 54,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#aaa',
  },
  chatList: {
    paddingTop: 10,
  },
  userMsgContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  userMsg: {
    backgroundColor: '#1E1E2E',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
    maxWidth: '75%',
  },
  userIcon: {
    width: 30,
    height: 30,
  },
  aiMsgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  aiIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  aiMsg: {
    backgroundColor: '#161624',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

export default ChatInterface;
