import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import SocketComponent from './SocketComponent';

const About = () => {
  return (
    <View style={styles.container}>
      <Text>About Page</Text>
      <SafeAreaView>
        <SocketComponent />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default About;
