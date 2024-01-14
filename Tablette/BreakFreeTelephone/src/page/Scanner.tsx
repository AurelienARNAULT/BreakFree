import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {createStackNavigator} from '@react-navigation/stack';
import socket from '../socket/socket';

const Stack = createStackNavigator();

const QR_CODE_EXPECTED = 'https://www.exemple.com'; // Le contenu attendu du QR code

const HomeScreen = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    socket.emit('scanned');
  }, []);

  const [error, setError] = useState(''); // État pour stocker le message d'erreur

  const handleBarCodeRead = ({data}: BarCodeReadEvent) => {
    if (data === QR_CODE_EXPECTED) {
      navigation.navigate('BienJoue', {barcodeData: data});
    } else {
      setError('QR code incorrect. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BienJoue" component={BienJoueScreen} />
      </Stack.Navigator>
    </View>
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
  error: {
    color: 'red',
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  },
});

export default App;
