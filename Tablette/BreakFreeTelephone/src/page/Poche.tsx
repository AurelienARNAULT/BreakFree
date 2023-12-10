import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Animated, Dimensions } from 'react-native';
import Objects from '../composant/Objects';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('window');

const Poche = () => {
    return (
        <ImageBackground
            source={require('../ressources/mallete.jpg')}
            style={styles.backgroundImage}
            resizeMode="stretch">
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <ImageBackground
                        source={require('../ressources/valise.png')}
                        style={styles.boxImage}
                        resizeMode="cover">
                        <GestureHandlerRootView>
                            <Animated.View style={{ position: 'relative', left: Math.floor(Math.random() * (400 + 400 + 1)) - 400, top: Math.floor(Math.random() * (100 + 100 + 1)) - 100}}>
                                <Objects objectName={"piece"} />
                            </Animated.View>
                            <Animated.View style={{ position: 'relative', left: Math.floor(Math.random() * (400 + 400 + 1)) - 400, top: Math.floor(Math.random() * (100 + 100 + 1)) - 100}}>
                                <Objects objectName={"phone"} />
                            </Animated.View>
                        </GestureHandlerRootView>
                    </ImageBackground>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 60,
    },
    boxContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 40,
        borderColor: '#4c1914',
        borderWidth: 10,
        overflow: 'hidden',
    },
    boxImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default Poche;