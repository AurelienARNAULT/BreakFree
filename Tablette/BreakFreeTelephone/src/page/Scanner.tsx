import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native'; // Ajoutez l'importation de Text
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import socket from '../socket/socket';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    socket.emit('scanned');
  }, []);

  const handleBarCodeRead = ({data}: BarCodeReadEvent) => {
    // Naviguer vers une autre page avec les données du code-barres
    navigation.navigate('BienJoue', {barcodeData: data});
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission d’utiliser la caméra',
          message:
            'Nous avons besoin de votre permission pour utiliser votre caméra',
          buttonPositive: 'Ok',
          buttonNegative: 'Annuler',
        }}
        onBarCodeRead={handleBarCodeRead}
      />
    </View>
  );
};

const BienJoueScreen = ({route}: {route: any}) => {
  const {barcodeData} = route.params;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Bien joué !</Text>
      <Text>Code-barres scanné : {barcodeData}</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BienJoue" component={BienJoueScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default App;
