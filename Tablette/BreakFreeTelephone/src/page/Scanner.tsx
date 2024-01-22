import React, { useState, useEffect } from "react";
import {View, StyleSheet, Text, LogBox} from "react-native";
import {RNCamera, BarCodeReadEvent} from "react-native-camera";
import {createStackNavigator} from "@react-navigation/stack";
import socket from "../socket/socket";


const Stack = createStackNavigator();


const QR_CODE_EXPECTED = "http://breakFree/scan?colors=bleu,blanc,rouge,vert";

const App = ({ navigation }: { navigation: any }) => {
  LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);

  useEffect(() => {
    socket.emit("scanned");
  }, []);

  const [error, setError] = useState<string>("");

  const handleBarCodeRead = (event: BarCodeReadEvent) => {
    const { data, bounds } = event;
    console.log('Barcode Read:', data, bounds);
    if (data === QR_CODE_EXPECTED) {
      navigation.navigate("BienJoue", { barcodeData: data });
    } else {
      setError("QR code incorrect. Veuillez réessayer. ");
    }

  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: "Permission d’utiliser la caméra",
          message: "Nous avons besoin de votre permission pour utiliser votre caméra",
          buttonPositive: "Ok",
          buttonNegative: "Annuler"
        }}
        onBarCodeRead={handleBarCodeRead}
      >
      </RNCamera>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>

  );
};

export const BienJoueScreen = ({ route }: { route: any }) => {
  const { barcodeData } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.text}>Rouge Vert Bleu Blanc</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  error: {
    color: "red",
    fontSize: 16,
    padding: 20,
    textAlign: "center"
  },
  text: {
    fontSize: 30,
    padding: 20,
    textAlign: "center"
  }
});

export default App;

