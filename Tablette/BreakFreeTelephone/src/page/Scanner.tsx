import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Scanner = () => {
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front} // Modifiez cette ligne
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
