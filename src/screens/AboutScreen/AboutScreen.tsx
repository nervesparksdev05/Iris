import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export const AboutScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#060A15', '#051632']}
      style={styles.gradientBackground}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/appIcons/backIcon.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
        </View>

        <ScrollView style={styles.wrapper}>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to Iris</Text>
            <Text style={styles.description}>
              Iris is an offline Android chat application powered by the
              llama.cpp framework. Designed to operate entirely offline, it
              ensures privacy and independence from external servers. Whether
              you're a developer exploring AI applications or a
              privacy-conscious user, this app provides a seamless and secure
              way to experience conversational AI. Please note that the app may
              occasionally generate inaccurate results.
            </Text>

            <Text style={styles.sectionTitle}>Features</Text>

            <FeatureItem
              icon={require('../../assets/appIcons/correctIcon.png')}
              title="Offline Functionality"
              description="Runs without the need for an internet connection."
            />
            <FeatureItem
              icon={require('../../assets/appIcons/correctIcon.png')}
              title="Privacy First"
              description="All data is processed locally on your device."
            />
            <FeatureItem
              icon={require('../../assets/appIcons/correctIcon.png')}
              title="Customizable Models"
              description="Download and use your preferred AI model with ease."
            />
            <FeatureItem
              icon={require('../../assets/appIcons/correctIcon.png')}
              title="Open Source"
              description="Built on the foundations of the llama.cpp Android example, enabling developers to contribute and modify."
            />

            <Text style={styles.sectionTitle}>FAQs</Text>

            <FAQItem text="What is llama.cpp?" />
            <FAQItem text="How does offline mode work?" />
            <FAQItem text="Can I use custom AI models?" />
            <FAQItem text="Is my data secure?" />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const FeatureItem = ({icon, title, description}) => (
  <View style={styles.featureItem}>
    <Image source={icon} style={styles.featureIcon} />
    <View style={{flex: 1}}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const FAQItem = ({text}) => (
  <TouchableOpacity style={styles.faqItem}>
    <View style={styles.faqLeft}>
      <Image
        source={require('../../assets/appIcons/starIcon.png')}
        style={styles.starIcon}
      />
      <Text style={styles.faqText}>{text}</Text>
    </View>
    <Image
      source={require('../../assets/appIcons/rightIcon.png')}
      style={styles.arrowIcon}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a35',
    marginTop: height * 0.04,
  },
  headerTitle: {
    fontSize: width * 0.055,
    color: 'white',
    fontWeight: '600',
    width: '85%',
  },
  headerIcon: {
    width: width * 0.05,
    height: width * 0.05,
  },
  container: {
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.070,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: height * 0.01,
  },
  description: {
    color: '#f9f5f5',
    fontSize: width * 0.040,
    lineHeight: height * 0.03,
    marginBottom: height * 0.015,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    color: 'white',
    marginTop: height * 0.025,
    marginBottom: height * 0.01,
    fontWeight: '600',
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: height * 0.015,
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.03,
    marginTop: 3,
  },
  featureTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: width * 0.045,
    marginBottom: height * 0.005,
  },
  featureDescription: {
    color: '#aaa',
    fontSize: width * 0.037,
    lineHeight: height * 0.025,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  faqLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: width * 0.045,
    height: width * 0.045,
    marginRight: width * 0.025,
    tintColor: 'white',
  },
  faqText: {
    color: 'white',
    fontSize: width * 0.045,
  },
  arrowIcon: {
    width: width * 0.045,
    height: width * 0.045,
    tintColor: 'white',
  },
});
