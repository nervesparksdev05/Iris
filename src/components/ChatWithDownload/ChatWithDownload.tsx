import React from 'react';
import {View, StyleSheet} from 'react-native';
import { ChatScreen } from '../../screens';
import {BlurView} from '@react-native-community/blur';
import { DownloadModelHome } from '../../screens/DownloadModelScreen/DownloadModelsHome';

const ChatWithDownload = ({showDownloadScreen}: any) => {
  return (
    <>
      <ChatScreen />
      {showDownloadScreen && (
        <View style={StyleSheet.absoluteFillObject}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
          <DownloadModelHome />
        </View>
      )}
      {/* <DownloadModelScreen
                                onDownloadComplete={async () => {
                                  setShowDownloadScreen(false);
                                  await autoLoadModel();
                                }}
                                model={modelStore.models}
                                activeModelId={modelStore.activeModel?.id}
                              /> */}
    </>
  );
};

export default ChatWithDownload;
