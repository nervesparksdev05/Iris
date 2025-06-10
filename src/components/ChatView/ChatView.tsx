import * as React from 'react';
import {
  FlatList,
  FlatListProps,
  InteractionManager,
  LayoutAnimation,
  StatusBar,
  StatusBarProps,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import dayjs from 'dayjs';
import {observer} from 'mobx-react';
import calendar from 'dayjs/plugin/calendar';
import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  KeyboardAvoidingView,
  useKeyboardAnimation,
} from 'react-native-keyboard-controller';

import {
  useComponentSize,
  useKeyboardDimensions,
} from '../KeyboardAccessoryView/hooks';

import {usePrevious, useTheme, useMessageActions} from '../../hooks';

import ImageView from './ImageView';
import {createStyles} from './styles';

import {chatSessionStore, modelStore, palStore} from '../../store';

import {MessageType, User} from '../../utils/types';
import {calculateChatMessages, unwrap, UserContext} from '../../utils';

import {
  Message,
  MessageTopLevelProps,
  CircularActivityIndicator,
  ChatInput,
  ChatInputAdditionalProps,
  ChatInputTopLevelProps,
  Menu,
  LoadingBubble,
  ChatPalModelPickerSheet,
  ChatHeader,
  ChatEmptyPlaceholder,
} from '..';
import {
  CopyIcon,
  GridIcon,
  PencilLineIcon,
  RefreshIcon,
} from '../../assets/icons';

type MenuItem = {
  label: string;
  onPress?: () => void;
  icon?: () => React.ReactNode;
  disabled: boolean;
  submenu?: SubMenuItem[];
};

type SubMenuItem = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  width?: number;
};

// Untestable
/* istanbul ignore next */
const animate = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

dayjs.extend(calendar);

export type ChatTopLevelProps = ChatInputTopLevelProps & MessageTopLevelProps;

export interface ChatProps extends ChatTopLevelProps {
  /** If {@link ChatProps.dateFormat} and/or {@link ChatProps.timeFormat} is not enough to
   * customize date headers in your case, use this to return an arbitrary
   * string based on a `dateTime` of a particular message. Can be helpful to
   * return "Today" if `dateTime` is today. IMPORTANT: this will replace
   * all default date headers, so you must handle all cases yourself, like
   * for example today, yesterday and before. Or you can just return the same
   * date header for any message. */
  customDateHeaderText?: (dateTime: number) => string;
  /** Allows you to customize the date format. IMPORTANT: only for the date,
   * do not return time here. @see {@link ChatProps.timeFormat} to customize the time format.
   * @see {@link ChatProps.customDateHeaderText} for more customization. */
  dateFormat?: string;
  /** Disable automatic image preview on tap. */
  disableImageGallery?: boolean;
  /** Allows you to change what the user sees when there are no messages.
   * `emptyChatPlaceholder` and `emptyChatPlaceholderTextStyle` are ignored
   * in this case. */
  emptyState?: () => React.ReactNode;
  /** Use this to enable `LayoutAnimation`. Experimental on Android (same as React Native). */
  enableAnimation?: boolean;
  flatListProps?: Partial<FlatListProps<MessageType.DerivedAny[]>>;
  inputProps?: ChatInputAdditionalProps;
  /** Used for pagination (infinite scroll) together with {@link ChatProps.onEndReached}.
   * When true, indicates that there are no more pages to load and
   * pagination will not be triggered. */
  isLastPage?: boolean;
  /** Indicates if the AI is currently streaming tokens */
  isStreaming?: boolean;
  /** Indicates if the AI is currently thinking (processing but not yet streaming) */
  isThinking?: boolean;
  messages: MessageType.Any[];
  /** Used for pagination (infinite scroll). Called when user scrolls
   * to the very end of the list (minus `onEndReachedThreshold`).
   * See {@link ChatProps.flatListProps} to set it up. */
  onEndReached?: () => Promise<void>;
  /** Show user names for received messages. Useful for a group chat. Will be
   * shown only on text messages. */
  showUserNames?: boolean;
  /**
   * Allows you to customize the time format. IMPORTANT: only for the time,
   * do not return date here. @see {@link ChatProps.dateFormat} to customize the date format.
   * @see {@link ChatProps.customDateHeaderText} for more customization.
   */
  timeFormat?: string;
  user: User;
}

/** Entry component, represents the complete chat */
export const ChatView = observer(
  ({
    customDateHeaderText,
    dateFormat,
    disableImageGallery,
    enableAnimation,
    flatListProps,
    inputProps,
    isAttachmentUploading,
    isLastPage,
    isStopVisible,
    isStreaming = false,
    isThinking = false,
    messages,
    onAttachmentPress,
    onEndReached,
    onMessageLongPress: externalOnMessageLongPress,
    onMessagePress,
    onPreviewDataFetched,
    onSendPress,
    onStopPress,
    renderBubble,
    renderCustomMessage,
    renderFileMessage,
    renderImageMessage,
    renderTextMessage,
    sendButtonVisibilityMode = 'editing',
    showUserAvatars = false,
    showUserNames = false,
    textInputProps,
    timeFormat,
    usePreviewData = true,
    user,
  }: ChatProps) => {
    const theme = useTheme();
    const styles = createStyles({theme});

    const [inputText, setInputText] = React.useState('');
    const [isPickerVisible, setIsPickerVisible] = React.useState(false);

    const animationRef = React.useRef(false);
    const list = React.useRef<FlatList<MessageType.DerivedAny>>(null);
    const insets = useSafeAreaInsets();
    const {progress} = useKeyboardAnimation();
    const headerHeight = useHeaderHeight();
    const activePalId = chatSessionStore.activePalId;
    const activePal = palStore.pals.find(pal => pal.id === activePalId);

    const {onLayout, size} = useComponentSize();
    const {onLayout: onLayoutChatInput, size: chatInputHeight} =
      useComponentSize();

    const bottomComponentHeight = React.useMemo(() => {
      const height = chatInputHeight.height;
      return height;
    }, [chatInputHeight.height]);

    const listPaddingBottom = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [
        bottomComponentHeight,
        bottomComponentHeight - insets.bottom,
      ],
    });

    const {keyboardHeight: keyboardHeight} = useKeyboardDimensions(true);
    const translateY = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        Math.max(0, Math.min(insets.bottom, keyboardHeight - insets.bottom)),
      ],
    });

    const [isImageViewVisible, setIsImageViewVisible] = React.useState(false);
    const [isNextPageLoading, setNextPageLoading] = React.useState(false);
    const [imageViewIndex, setImageViewIndex] = React.useState(0);
    const [stackEntry, setStackEntry] = React.useState<StatusBarProps>({});

    const [showScrollButton, setShowScrollButton] = React.useState(false);

    React.useEffect(() => {
      if (activePal) {
        if (!modelStore.activeModel && activePal.defaultModel) {
          const palDefaultModel = modelStore.availableModels.find(
            m => m.id === activePal.defaultModel?.id,
          );
          if (palDefaultModel) {
            modelStore.initContext(palDefaultModel);
          }
        }
      }
    }, [activePal]);

    const handleScroll = React.useCallback(event => {
      const {contentOffset} = event.nativeEvent;
      const isAtTop = contentOffset.y <= 80;
      setShowScrollButton(!isAtTop);
    }, []);

    const scrollToBottom = React.useCallback(() => {
      list.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }, []);

    const wrappedOnSendPress = React.useCallback(
      async (message: MessageType.PartialText) => {
        if (chatSessionStore.isEditMode) {
          await chatSessionStore.commitEdit();
        }
        onSendPress(message);
        setInputText('');
      },
      [onSendPress],
    );

    const handleCancelEdit = React.useCallback(() => {
      setInputText('');
      chatSessionStore.exitEditMode();
    }, []);

    const {handleCopy, handleEdit, handleTryAgain, handleTryAgainWith} =
      useMessageActions({
        user,
        messages,
        handleSendPress: wrappedOnSendPress,
        setInputText,
      });

    const {chatMessages, gallery} = calculateChatMessages(messages, user, {
      customDateHeaderText,
      dateFormat,
      showUserNames,
      timeFormat,
    });

    const previousChatMessages = usePrevious(chatMessages);

    React.useEffect(() => {
      if (
        chatMessages[0]?.type !== 'dateHeader' &&
        chatMessages[0]?.id !== previousChatMessages?.[0]?.id &&
        chatMessages[0]?.author?.id === user.id
      ) {
        list.current?.scrollToOffset({
          animated: true,
          offset: 0,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatMessages]);

    // Untestable
    /* istanbul ignore next */
    if (animationRef.current && enableAnimation) {
      InteractionManager.runAfterInteractions(animate);
    }

    React.useEffect(() => {
      // Untestable
      /* istanbul ignore next */
      if (animationRef.current && enableAnimation) {
        InteractionManager.runAfterInteractions(animate);
      } else {
        animationRef.current = true;
      }
    }, [enableAnimation, messages]);

    const handleEndReached = React.useCallback(
      // Ignoring because `scroll` event for some reason doesn't trigger even basic
      // `onEndReached`, impossible to test.
      // TODO: Verify again later
      /* istanbul ignore next */
      async ({distanceFromEnd}: {distanceFromEnd: number}) => {
        if (
          !onEndReached ||
          isLastPage ||
          distanceFromEnd <= 0 ||
          messages.length === 0 ||
          isNextPageLoading
        ) {
          return;
        }

        setNextPageLoading(true);
        await onEndReached?.();
        setNextPageLoading(false);
      },
      [isLastPage, isNextPageLoading, messages.length, onEndReached],
    );

    const handleImagePress = React.useCallback(
      (message: MessageType.Image) => {
        setImageViewIndex(
          gallery.findIndex(
            image => image.id === message.id && image.uri === message.uri,
          ),
        );
        setIsImageViewVisible(true);
        setStackEntry(
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
          }),
        );
      },
      [gallery],
    );

    const handleMessagePress = React.useCallback(
      (message: MessageType.Any) => {
        if (message.type === 'image' && !disableImageGallery) {
          handleImagePress(message);
        }
        onMessagePress?.(message);
      },
      [disableImageGallery, handleImagePress, onMessagePress],
    );

    // TODO: Tapping on a close button results in the next warning:
    // `An update to ImageViewing inside a test was not wrapped in act(...).`
    /* istanbul ignore next */
    const handleRequestClose = () => {
      setIsImageViewVisible(false);
      StatusBar.popStackEntry(stackEntry);
    };

    const keyExtractor = React.useCallback(
      ({id}: MessageType.DerivedAny) => id,
      [],
    );

    const [menuVisible, setMenuVisible] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState({x: 0, y: 0});
    const [selectedMessage, setSelectedMessage] =
      React.useState<MessageType.Any | null>(null);

    const handleMessageLongPress = React.useCallback(
      (message: MessageType.Any, event: any) => {
        if (message.type !== 'text') {
          externalOnMessageLongPress?.(message);
          return;
        }

        const {pageX, pageY} = event.nativeEvent;
        setMenuPosition({x: pageX, y: pageY});
        setSelectedMessage(message);
        setMenuVisible(true);
        externalOnMessageLongPress?.(message);
      },
      [externalOnMessageLongPress],
    );

    const handleMenuDismiss = React.useCallback(() => {
      setMenuVisible(false);
      setSelectedMessage(null);
    }, []);

    const menuItems = React.useMemo((): MenuItem[] => {
      if (!selectedMessage || selectedMessage.type !== 'text') {
        return [];
      }

      const isAuthor = selectedMessage.author.id === user.id;
      const hasActiveModel = modelStore.activeModelId !== undefined;
      const models = modelStore.availableModels || [];

      const baseItems: MenuItem[] = [
        {
          label: 'Copy',
          onPress: () => {
            handleCopy(selectedMessage);
            handleMenuDismiss();
          },
          icon: () => <CopyIcon stroke={theme.colors.primary} />,
          disabled: false,
        },
      ];

      if (!isAuthor) {
        baseItems.push({
          label: 'Regenerate',
          onPress: () => {
            handleTryAgain(selectedMessage);
            handleMenuDismiss();
          },
          icon: () => <RefreshIcon stroke={theme.colors.primary} />,
          disabled: !hasActiveModel,
        });

        baseItems.push({
          label: 'Regenerate with',
          icon: () => <GridIcon stroke={theme.colors.primary} />,
          disabled: false,
          submenu: models.map(model => ({
            label: model.name,
            width: Math.min(300, size.width),
            onPress: () => {
              handleTryAgainWith(model.id, selectedMessage);
              handleMenuDismiss();
            },
          })),
        });
      }

      if (isAuthor) {
        baseItems.push({
          label: 'Edit',
          onPress: () => {
            handleEdit(selectedMessage);
            handleMenuDismiss();
          },
          icon: () => <PencilLineIcon stroke={theme.colors.primary} />,
          disabled: !hasActiveModel,
        });
      }

      return baseItems;
    }, [
      selectedMessage,
      user.id,
      handleCopy,
      handleTryAgain,
      handleTryAgainWith,
      handleEdit,
      handleMenuDismiss,
      size.width,
      theme.colors.primary,
    ]);

    const renderMenuItem = React.useCallback(
      (item: MenuItem, index: number) => {
        if (item.submenu) {
          return (
            <React.Fragment key={index}>
              <Menu.Item
                label={item.label}
                leadingIcon={item.icon}
                disabled={item.disabled}
                submenu={item.submenu.map(
                  (subItem: SubMenuItem, subIndex: number) => (
                    <React.Fragment key={subIndex}>
                      <Menu.Item
                        key={subIndex}
                        label={subItem.label}
                        onPress={subItem.onPress}
                        disabled={subItem.disabled}
                      />
                    </React.Fragment>
                  ),
                )}
              />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            <Menu.Item
              label={item.label}
              onPress={item.onPress}
              leadingIcon={item.icon}
              disabled={item.disabled}
            />
          </React.Fragment>
        );
      },
      [],
    );

    const renderMessage = React.useCallback(
      ({item: message}: {item: MessageType.DerivedAny; index: number}) => {
        const messageWidth =
          showUserAvatars &&
          message.type !== 'dateHeader' &&
          message.author?.id !== user.id
            ? Math.floor(Math.min(size.width * 0.9, 900))
            : Math.floor(Math.min(size.width * 0.92, 900));

        const roundBorder =
          message.type !== 'dateHeader' && message.nextMessageInGroup;
        const showAvatar =
          message.type !== 'dateHeader' && !message.nextMessageInGroup;
        const showName = message.type !== 'dateHeader' && message.showName;
        const showStatus = message.type !== 'dateHeader' && message.showStatus;

        return (
          <View>
            <Message
              {...{
                enableAnimation,
                message,
                messageWidth,
                onMessageLongPress: handleMessageLongPress,
                onMessagePress: handleMessagePress,
                onPreviewDataFetched,
                renderBubble,
                renderCustomMessage,
                renderFileMessage,
                renderImageMessage,
                renderTextMessage,
                roundBorder,
                showAvatar,
                showName,
                showStatus,
                showUserAvatars,
                usePreviewData,
              }}
            />
          </View>
        );
      },
      [
        enableAnimation,
        handleMessageLongPress,
        handleMessagePress,
        onPreviewDataFetched,
        renderBubble,
        renderCustomMessage,
        renderFileMessage,
        renderImageMessage,
        renderTextMessage,
        showUserAvatars,
        size.width,
        usePreviewData,
        user.id,
      ],
    );

    const renderListEmptyComponent = React.useCallback(
      () => (
        <ChatEmptyPlaceholder
          bottomComponentHeight={bottomComponentHeight}
          onSelectModel={() => setIsPickerVisible(true)}
        />
      ),
      [bottomComponentHeight, setIsPickerVisible],
    );

    const renderListFooterComponent = React.useCallback(
      () =>
        // Impossible to test, see `handleEndReached` function
        /* istanbul ignore next */
        isNextPageLoading ? (
          <View style={styles.footerLoadingPage}>
            <CircularActivityIndicator color={theme.colors.primary} size={16} />
          </View>
        ) : (
          <View style={styles.footer} />
        ),
      [
        isNextPageLoading,
        styles.footerLoadingPage,
        styles.footer,
        theme.colors.primary,
      ],
    );

    const [isLoading, setIsLoading] = React.useState(false);

    const LoadingDots = () => {
      const dotsAnim = React.useRef(new Animated.Value(0)).current;

      React.useEffect(() => {
        Animated.loop(
          Animated.timing(dotsAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ).start();
      }, []);

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

    const renderListHeaderComponent = React.useCallback(
      () => (isThinking || isStreaming ? <LoadingDots /> : null),
      [isThinking, isStreaming],
    );
    const renderChatList = React.useCallback(
      () => (
        <>
          <Animated.FlatList
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={[
              styles.chatList,
              {flexGrow: 1, justifyContent: 'flex-end', paddingTop: 80},
            ]}
            initialNumToRender={10}
            ListEmptyComponent={renderListEmptyComponent}
            ListHeaderComponent={renderListHeaderComponent}
            maxToRenderPerBatch={6}
            onEndReachedThreshold={0.75}
            style={[styles.flatList]}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            {...unwrap(flatListProps)}
            data={chatMessages}
            inverted={true}
            keyboardDismissMode="interactive"
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleEndReached}
            ref={list}
            renderItem={({item}) => {
              if (item.type === 'dateHeader') return null;

              // User messages (sent by current user)
              if (item.author?.id === user.id) {
                return (
                  <View style={styles.userMsgContainer}>
                    <Text style={styles.userMsg}>
                      {item.type === 'text' ? item.text : ''}
                    </Text>
                    <Image
                      source={require('../../assets/appIcons/userProfile.png')}
                      style={styles.userIcon}
                    />
                  </View>
                );
              }

              // AI messages (all other messages)
              return (
                <View style={styles.aiMsgContainer}>
                  <Animated.Image
                    source={require('../../assets/appIcons/nerveSparkIcon.png')}
                    style={styles.aiIcon}
                  />
                  <View>
                    {item.type === 'text' && (
                      <Text style={styles.aiMsg}>{item.text}</Text>
                    )}
                    {item.type === 'image' && (
                      <Image
                        source={{uri: item.uri}}
                        style={{width: 200, height: 200}}
                      />
                    )}
                    {/* Handle other message types as needed */}
                  </View>
                </View>
              );
            }}
            maintainVisibleContentPosition={{
              autoscrollToTopThreshold: 20,
              minIndexForVisible: isStreaming ? 1 : 0,
            }}
          />
          {showScrollButton && (
            <Animated.View style={{transform: [{translateY}]}}>
              <TouchableOpacity
                style={[
                  styles.scrollToBottomButton,
                  {bottom: bottomComponentHeight + 20},
                ]}
                onPress={scrollToBottom}>
                <Icon
                  name="chevron-down"
                  size={24}
                  color={theme.colors.onPrimary}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        </>
      ),
      [
        styles.chatList,
        styles.flatList,
        styles.scrollToBottomButton,
        styles.userMsgContainer,
        styles.userMsg,
        styles.userIcon,
        styles.aiMsgContainer,
        styles.aiIcon,
        styles.aiMsg,
        chatMessages,
        listPaddingBottom,
        renderListEmptyComponent,
        isLoading,
        renderListFooterComponent,
        renderListHeaderComponent,
        handleScroll,
        flatListProps,
        keyExtractor,
        handleEndReached,
        isStreaming,
        showScrollButton,
        translateY,
        bottomComponentHeight,
        scrollToBottom,
        theme.colors.onPrimary,
      ],
    );

    const renderHomeBackground = React.useCallback(
      () => (
        <>
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
                    source={require('../../assets/appIcons/infoIcon.png')}
                    style={styles.iconMargin}
                  />
                  <Text style={styles.infoText}>{msg}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      ),
      [styles],
    );

    const [_selectedModel, setSelectedModel] = React.useState<string | null>(
      null,
    );
    const [_selectedPal, setSelectedPal] = React.useState<string | undefined>();

    const handleModelSelect = React.useCallback((model: string) => {
      setSelectedModel(model);
      setIsPickerVisible(false);
    }, []);

    const handlePalSelect = React.useCallback((pal: string | undefined) => {
      setSelectedPal(pal);
      setIsPickerVisible(false);
    }, []);

    const inputBackgroundColor = activePal?.color?.[1]
      ? activePal.color?.[1]
      : theme.colors.secondaryContainer;
    return (
      <UserContext.Provider value={user}>
        <LinearGradient
          colors={['#060A15', '#051632']}
          style={styles.gradientBackground}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}>
          <View style={styles.container} onLayout={onLayout}>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={headerHeight}
              style={styles.container}>
              <View style={styles.chatContainer}>
                <ChatHeader />
                {chatMessages.length > 0
                  ? renderChatList()
                  : renderHomeBackground()}

                {chatMessages.length === 0 && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.suggestionContainer}>
                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() =>
                        setInputText(
                          'Explain how to develop a consistent reading habit.',
                        )
                      }>
                      <Text style={styles.suggestionText}>
                        Explain how to develop a consistent reading habit.
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() =>
                        setInputText(
                          'Write an email to your manager requesting leave for a day.',
                        )
                      }>
                      <Text style={styles.suggestionText}>
                        Write an email to your manager requesting leave for a
                        day.
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() =>
                        setInputText(
                          'Suggest time management strategies for handeling multiple deadlines effectively.',
                        )
                      }>
                      <Text style={styles.suggestionText}>
                        Suggest time management strategies for handeling
                        multiple deadlines effectively.
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() =>
                        setInputText(
                          'Draft a proffesional LinkedIn message to connect with a recruiter.',
                        )
                      }>
                      <Text style={styles.suggestionText}>
                        Draft a proffesional LinkedIn message to connect with a
                        recruiter.
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() =>
                        setInputText(
                          'Suggest ways to practice mindfulness in a busy daily schedule.',
                        )
                      }>
                      <Text style={styles.suggestionText}>
                        Suggest ways to practice mindfulness in a busy daily
                        schedule.
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() =>
                        setInputText(
                          'Recommend a 15-minute daily workout routine to stay fit with busy schedule.',
                        )
                      }>
                      <Text style={styles.suggestionText}>
                        Recommend a 15-minute daily workout routine to stay fit
                        with busy schedule.
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() =>
                        setInputText(
                          'Provide a simple and polite spanish translation of `Excuse me, can you help me?` with explation',
                        )
                      }>
                      <Text style={styles.suggestionText}>
                        Provide a simple and polite spanish translation of
                        'Excuse me, can you help me?' with explation.
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() =>
                        setInputText(
                          'Recommend 3 books that can improve communication skills.',
                        )
                      }>
                      <Text style={styles.suggestionText}>
                        Recommend 3 books that can improve communication skills.
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                )}

                <Animated.View
                  onLayout={onLayoutChatInput}
                  style={[
                    styles.inputContainer,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      paddingBottom: insets.bottom,
                      transform: [{translateY}],
                      zIndex: 10,
                    },
                    {backgroundColor: '#000'},
                  ]}>
                  <ChatInput
                    {...{
                      ...unwrap(inputProps),
                      isAttachmentUploading,
                      isStreaming,
                      onAttachmentPress,
                      onSendPress: wrappedOnSendPress,
                      onStopPress,
                      chatInputHeight,
                      inputBackgroundColor,
                      onCancelEdit: handleCancelEdit,
                      onPalBtnPress: () => setIsPickerVisible(!isPickerVisible),
                      isStopVisible,
                      isPickerVisible,
                      sendButtonVisibilityMode,
                      textInputProps: {
                        ...textInputProps,
                        value: inputText,
                        onChangeText: setInputText,
                      },
                    }}
                  />
                </Animated.View>

                <ChatPalModelPickerSheet
                  isVisible={isPickerVisible}
                  onClose={() => setIsPickerVisible(false)}
                  onModelSelect={handleModelSelect}
                  onPalSelect={handlePalSelect}
                  chatInputHeight={chatInputHeight.height}
                  keyboardHeight={keyboardHeight}
                />
              </View>
            </KeyboardAvoidingView>
            <ImageView
              imageIndex={imageViewIndex}
              images={gallery}
              onRequestClose={handleRequestClose}
              visible={isImageViewVisible}
            />
            <Menu
              visible={menuVisible}
              onDismiss={handleMenuDismiss}
              selectable={false}
              anchor={menuPosition}>
              {menuItems.map(renderMenuItem)}
            </Menu>
          </View>
        </LinearGradient>
      </UserContext.Provider>
    );
  },
);
