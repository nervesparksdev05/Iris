import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';

type Model = {
  name: string;
  totalSize: number;
};

const models: {[key: string]: Model} = {
  stablelm: {
    name: 'stablelm-2-1_6b-chat.Q4_K_M.imx.gguf',
    totalSize: 983,
  },
  llama: {
    name: 'Llama-3.2-1B-Instruct-Q6_K_L_gguf',
    totalSize: 1035,
  },
};

type Props = {
  onDownloadComplete: () => void;
}

const DownloadModelScreen = ({ onDownloadComplete }: Props) => {
  const [downloadingModel, setDownloadingModel] = useState<Model | null>(null);
  const [progress, setProgress] = useState(0);
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (downloadingModel !== null) {
      let interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            onDownloadComplete();
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [downloadingModel]);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const handleDownload = (model: Model) => {
    setDownloadingModel(model);
    setProgress(0);
    animatedProgress.setValue(0);
  };

  const stopDownload = () => {
    setDownloadingModel(null);
    setProgress(0);
    animatedProgress.setValue(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>Download Required</Text>
        <Text style={styles.subtitle}>Don't close or minimize the app!</Text>
        <Text style={styles.prompt}>Download at least 1 model</Text>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {Object.keys(models).map(key => {
            const model = models[key];
            const isDownloading = downloadingModel?.name === model.name;

            return (
              <View key={key} style={styles.modelCard}>
                <Text style={styles.modelLabel}>{model.name}</Text>

                {isDownloading ? (
                  <>
                    <Text style={styles.downloadingText}>
                      Downloading{' '}
                      <Text style={{color: '#39e6eb'}}>{progress}%</Text>
                    </Text>
                    <TouchableOpacity
                      style={styles.stopButton}
                      onPress={stopDownload}>
                      <Text style={styles.stopButtonText}>Stop Download</Text>
                    </TouchableOpacity>
                    <Text style={styles.fileSize}>
                      File size: {model.totalSize} MB
                    </Text>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => handleDownload(model)}>
                    <Text style={styles.downloadText}>Download</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default DownloadModelScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // modal overlay background
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  modal: {
    backgroundColor: '#2D3E50',
    borderRadius: 10,
    width: '90%',
    maxHeight: '60%',
    padding: 20,
  },
  scrollContainer: {
    maxHeight: 300,
  },
  title: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  prompt: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '900',
  },
  modelCard: {
    backgroundColor: '#1B2A3C',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    paddingBottom: 20,
  },
  modelLabel: {
    color: '#babdc2',
    marginBottom: 10,
    textAlign: 'center',
  },
  fileSize: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: '#2662ea',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    height: 50,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  downloadText: {
    color: '#eafeff',
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 15,
  },
  stopButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  downloadingText: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 12,
    fontWeight: 'bold',
  },
});
