import React, { useRef, useEffect } from 'react';
import {View, StyleSheet, ImageBackground, Animated, Dimensions, LayoutChangeEvent} from 'react-native';
import Objects from '../composant/Objects';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('window');

interface position {
    top: number;
    left: number;
    right: number;
    bottom: number;
}


const Poche = () => {
    const [containerPosition, setContainerPosition] = React.useState<position | null>(null);

    const onContainerLayout = (event: LayoutChangeEvent) => {
        const layout = event.nativeEvent.layout;
        console.log('width:', width);
        console.log('height:', height);
        setContainerPosition({
            top: 0,
            left:  0,
            right: layout.width,
            bottom: layout.height,
        });
        console.log(layout);
    };


    return (
        <ImageBackground
            source={require('../ressources/mallete.jpg')}
            style={styles.backgroundImage}
            resizeMode="stretch">
            <View style={styles.container}>
                <View style={styles.boxContainer} onLayout={onContainerLayout}>
                    <ImageBackground
                        source={require('../ressources/valise.png')}
                        style={styles.boxImage}
                        resizeMode="cover">
                        <GestureHandlerRootView style={{height:'100%'}}>
                                <Objects objectName={"piece"} containerPosition={containerPosition} />
                                <Objects objectName={"phone"} containerPosition={containerPosition}/>
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