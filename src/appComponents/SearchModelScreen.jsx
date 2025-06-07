import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {ToastAndroid} from 'react-native';

const dummySearchResults = [
  {name: 'Llama-3.2-1B-Instruct-IQ3_M.gguf'},
  {name: 'Llama-3.2-1B-Instruct-IQ4_XS.gguf'},
  {name: 'Llama-3.2-1B-Instruct-Q3_K_L.gguf'},
];

const ModelSearchScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = dummySearchResults.filter(model =>
      model.name.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filtered);
  };

  const renderItem = ({item}) => (
    <View style={styles.resultCard}>
      <Text style={styles.modelName}>{item.name}</Text>
      <TouchableOpacity style={styles.downloadBtn}>
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>
      <Text style={styles.statusText}>Not Downloaded</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/appIcons/backIcon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/appIcons/questionMarkIcon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
        <Text style={styles.exampleText}>
          Example: Llama-3.2-1B-Instruct-IQ3_M.gguf
        </Text>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString('Llama-3.2-1B-Instruct-IQ3_M.gguf');
            ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
          }}>
          <Image
            source={require('../assets/appIcons/copyIcon.png')}
            style={{width: 16, height: 16, marginLeft: 6}}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search Models Online"
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={{color: '#fff', fontWeight: '600'}}>Search Model</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 40}}
      />
    </View>
  );
};

export default ModelSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061529',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  icon: {
    width: 24,
    height: 24,
  },
  exampleText: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#63666f',
  },

  searchButton: {
    backgroundColor: '#282F35',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#0f223b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  modelName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  downloadBtn: {
    backgroundColor: '#2662ea',
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    width: 100,
    height: 40,
    marginLeft: 20,
    marginTop: 5,
  },
  downloadText: {
    color: '#fff',
    fontWeight: '600',
  },
  statusText: {
    color: '#aaa',
    fontSize: 12,
  },
});
