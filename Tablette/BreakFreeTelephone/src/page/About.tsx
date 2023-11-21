import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text>About Page</Text>
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
