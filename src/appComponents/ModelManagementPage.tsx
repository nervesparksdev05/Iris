import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

const modelData = [
  {
    name: 'Llama-3.2-1B-Instruct-Q6_K_L.gguf',
    status: 'Not Downloaded',
    isDownloaded: false,
  },
  {
    name: 'Llama-3.2-3B-Instruct-Q4_K_L.gguf',
    status: 'Not Downloaded',
    isDownloaded: false,
  },
  {
    name: 'stablelm-2-1_6b-chat.Q4_K_M.imx.gguf',
    status: 'Active Model',
    isDownloaded: true,
    isActive: true,
    size: '983.66 MB',
  },
];

const ModelManagement = ({navigation}) => {
  const [models, setModels] = useState(modelData);

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        {item.isActive && <Text style={styles.activeLabel}>Active Model</Text>}

        <Text style={[styles.modelName]}>{item.name}</Text>

        {item.isDownloaded ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.loadButton}>
              <Text style={styles.buttonText}>Load</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
        )}

        {!item.isDownloaded && (
          <Text style={styles.statusText}>Not Downloaded</Text>
        )}

        {item.isDownloaded && (
          <View style={styles.defaultRow}>
            <View style={styles.radioCircle} />
            <Text style={styles.defaultText}>Set as Default Model</Text>
          </View>
        )}

        {item.size && <Text style={styles.sizeText}>Size: {item.size}</Text>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/appIcons/backIcon.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Models</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../assets/appIcons/refreshIcon.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.searchBox}
        onPress={() => navigation.navigate('ModelSearchScreen')}>
        <Image
          source={require('../assets/appIcons/searchIcon.png')}
          style={styles.searchIcon}
        />
        <Text style={styles.searchInput}>Search Hugging-Face Models</Text>
        <Image
          source={require('../assets/appIcons/rightArrowIcon.png')}
          style={styles.searchIcon}
        />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Suggested Models</Text>

      <FlatList
        data={models}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 30}}
      />
    </SafeAreaView>
  );
};

export default ModelManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061529',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    marginTop: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '500',
    marginRight: 150,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 16,
    borderBottomColor: 'white',
    borderBottomWidth: 0.3,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#aaa',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
  },
  sectionTitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#0f223b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  activeLabel: {
    color: '#18c522',
    fontSize: 12,
    marginBottom: 6,
  },
  modelName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  loadButton: {
    backgroundColor: '#3465ff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  downloadButton: {
    backgroundColor: '#2662ea',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 200,
    height: 40,
    width: 115,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 5,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  statusText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  defaultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 30,
    marginBottom: 15,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 8,
  },
  defaultText: {
    color: '#aaa',
    fontSize: 13,
    marginLeft: 20,
  },
  sizeText: {
    color: '#999',
    fontSize: 12,
    marginTop: 6,
  },
});
