import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import ImageButton from '../composant/ImageButton';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
    Main2: undefined;
    Scanner: undefined;
    Histoire: undefined;
    Poche: undefined;
    Enigme: undefined;
};

type Main2NavigationProp = StackNavigationProp<RootStackParamList, 'Main2'>;

const App = ({navigation}: { navigation: Main2NavigationProp }) => {
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

    const [parentViewSize, setParentViewSize] = useState({width: 0, height: 0});

    // Calcul dynamique des dimensions du bouton en fonction de l'orientation et de la taille de la fenêtre
    const buttonWidth = parentViewSize.width / 1.3; // pour une grille 2x2
    const buttonHeight = parentViewSize.height / 1.3;
    const finalsize = buttonWidth > buttonHeight ? buttonHeight : buttonWidth;
    const margindin = orientation === 'landscape' ? 30 : 40;

    const buttons = [
        {
            source: require('../ressources/image/acceuil/Poche.png'),
            onPress: () => navigation.navigate('Poche'),
        },
        /*
        {
            source: require('../ressources/image/acceuil/Enigme.png'),
            onPress: () => navigation.navigate('Enigme'),
        },
        {
            source: require('../ressources/image/acceuil/histoire_bouton.png'),
            onPress: () => navigation.navigate('Histoire'),
        },
        */
        {
            source: require('../ressources/image/acceuil/Scanner.png'),
            onPress: () => navigation.navigate('Scanner'),
        },
    ];

    return (
        <ImageBackground
            source={require('../ressources/image/1599665227fond_parchemin.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover">
            <View
                style={
                    orientation === 'landscape'
                        ? styles.containerLandscape
                        : styles.container
                }>
                <View style={styles.grid}>
                    {buttons.map((button, index) => (
                        <View
                            style={styles.gridItem}
                            key={index}
                            onLayout={event => {
                                const {width, height} = event.nativeEvent.layout;
                                setParentViewSize({width, height});
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerLandscape: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 100,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    gridItem: {
        width: '50%',
        padding: 40,
        justifyContent: 'center',
    },
    buttonImage: {
        width: '95%',
        height: '45%',
        resizeMode: 'contain',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export default App;
