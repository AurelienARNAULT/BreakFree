import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

const App = () => {
  const [orientation, setOrientation] = useState('portrait');
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const updateLayout = () => {
      const width = Dimensions.get('window').width;
      const height = Dimensions.get('window').height;
      setWindowWidth(width);
      setWindowHeight(height);
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    updateLayout();

    return () => subscription.remove();
  }, []);

  // Calcul dynamique des dimensions du bouton en fonction de l'orientation et de la taille de la fenêtre
  const buttonWidth =
    orientation === 'landscape' ? windowWidth * 0.2 : windowWidth * 0.3;
  const buttonHeight =
    orientation === 'landscape' ? windowHeight * 0.4 : windowHeight * 0.7;
  const finalsize = buttonWidth > buttonHeight ? buttonHeight : buttonWidth;
  const margindin = orientation === 'landscape' ? 30 : 40;

  return (
    <ImageBackground
      source={require('../ressources/1599665227fond_parchemin.jpg')} // Remplacez par votre image de fond
      style={styles.backgroundImage}
      resizeMode="cover">
      <View
        style={
          orientation === 'landscape'
            ? styles.containerLandscape
            : styles.container
        }>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <TouchableOpacity
              style={{padding: 0}}
              onPress={() => console.log('Bouton 1 cliqué')}>
              <Image
                source={require('../ressources/Poche.png')}
                style={{
                  width: finalsize,
                  height: finalsize,
                  resizeMode: 'contain',
                  margin: margindin,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity
              style={{padding: 0}}
              onPress={() => console.log('Bouton 2 cliqué')}>
              <Image
                source={require('../ressources/Enigme.png')}
                style={{
                  width: finalsize,
                  height: finalsize,
                  resizeMode: 'contain',
                  margin: margindin,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity
              style={{padding: 0}}
              onPress={() => console.log('Bouton 3 cliqué')}>
              <Image
                source={require('../ressources/histoire_bouton.png')}
                style={{
                  width: finalsize,
                  height: finalsize,
                  resizeMode: 'contain',
                  margin: margindin,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.gridItem}>
            <TouchableOpacity
              style={{padding: 0}}
              onPress={() => console.log('Bouton 4 cliqué')}>
              <Image
                source={require('../ressources/Scanner.png')}
                style={{
                  width: finalsize,
                  height: finalsize,
                  resizeMode: 'contain',
                  margin: margindin,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  containerLandscape: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonImage: {
    width: '95%',
    height: '45%',
    margin: 50,
    resizeMode: 'contain',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default App;
