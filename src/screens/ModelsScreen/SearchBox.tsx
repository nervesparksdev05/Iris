import { View, TextInput, Image, StyleSheet } from 'react-native';

const SearchBox = ({ searchQuery, setSearchQuery }) => (
  <View style={styles.searchBox}>
    <Image
      source={require('../../assets/appIcons/searchIcon.png')}
      style={styles.searchIcon}
    />
    <TextInput
      placeholder="Search Hugging-Face Models"
      placeholderTextColor="#ffffff"
      value={searchQuery}
      onChangeText={setSearchQuery}
      style={styles.searchInput}
    />
    <Image
      source={require('../../assets/appIcons/rightArrowIcon.png')}
      style={styles.searchIcon}
    />
  </View>
);

export default SearchBox

const styles = StyleSheet.create({
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
    tintColor: '#ffffff',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
  },
});
