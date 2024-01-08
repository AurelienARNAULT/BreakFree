import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import socket from '../socket/socket'

const Scanner = () => {

    useEffect(() => {
        socket.emit('scanned')
    }, []);

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back} // Modifiez cette ligne
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission d’utiliser la caméra',
          message:
            'Nous avons besoin de votre permission pour utiliser votre caméra',
          buttonPositive: 'Ok',
          buttonNegative: 'Annuler',
        }}
      />
      {/* Votre bouton et d'autres éléments d'interface utilisateur peuvent être ici */}
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
});

export default Scanner;
