import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import ImageButton from "../composant/ImageButton";

const App = () => {
  const [orientation, setOrientation] = useState("portrait");
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;
      setWindowWidth(width);
      setWindowHeight(height);
      setOrientation(width > height ? "landscape" : "portrait");
    };

    const subscription = Dimensions.addEventListener("change", updateLayout);
    updateLayout();

    return () => subscription.remove();
  }, []);


  const [parentViewSize, setParentViewSize] = useState({ width: 0, height: 0 });

  // Calcul dynamique des dimensions du bouton en fonction de l'orientation et de la taille de la fenêtre
  const buttonWidth = parentViewSize.width / 1.3; // pour une grille 2x2
  const buttonHeight = parentViewSize.height / 1.3;
  const finalsize = buttonWidth > buttonHeight ? buttonHeight : buttonWidth;
  const margindin = orientation === "landscape" ? 30 : 40;

  const buttons = [
    {
      source: require("../ressources/Poche.png"),
      onPress: () => console.log("Bouton Poche cliqué")
    },
    {
      source: require("../ressources/Enigme.png"),
      onPress: () => console.log("Bouton Enigme cliqué")
    },
    {
      source: require("../ressources/histoire_bouton.png"),
      onPress: () => console.log("Bouton Histoire cliqué")
    },
    {
      source: require("../ressources/Scanner.png"),
      onPress: () => console.log("Bouton Scanner cliqué")
    }
  ];

  return (
    <ImageBackground
      source={require("../ressources/1599665227fond_parchemin.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View
        style={
          orientation === "landscape"
            ? styles.containerLandscape
            : styles.container
        }>
        <View style={styles.grid}>
          {buttons.map((button, index) => (
            <View style={styles.gridItem} key={index}
                  onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setParentViewSize({ width, height });
                  }}>
              <ImageButton
                key={index}
                source={button.source}
                onPress={button.onPress}
                size={finalsize}
              />
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerLandscape: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 100
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  gridItem: {
    width: "50%",
    padding: 40,
    justifyContent: "center"
  },
  buttonImage: {
    width: "95%",
    height: "45%",
    resizeMode: "contain"
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});

export default App;
