import React, {useState} from 'react';
import {Animated, View, Dimensions, StyleSheet, ImageBackground} from 'react-native';
import {
    Gesture,
    GestureHandlerRootView,
    PanGestureHandler,
} from 'react-native-gesture-handler';

const circleRadius = 30;

const Poche = () => {
    const {width} = Dimensions.get('window');
    const {height} = Dimensions.get('window');

    let _touchX = new Animated.Value(width / 2 - circleRadius);

    let _touchY = new Animated.Value(height / 2 - circleRadius);

    let _onPanGestureEvent = Animated.event([{nativeEvent: {x: _touchX, y: _touchY}}], {
        useNativeDriver: true,
    });

    return (
        <ImageBackground
            source={require('../ressources/mallete.jpg')}
            style={styles.backgroundImage}
            resizeMode="stretch">
            <View style={styles.container}>
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        borderRadius: 40,
                        overflow: 'hidden',
                        borderColor: '#4c1914',
                        borderWidth: 10,
                    }}>
                    <ImageBackground
                        source={require('../ressources/valise.png')}
                        style={{flex: 1, width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden'}}
                        resizeMode="cover">
                        <GestureHandlerRootView>
                            <PanGestureHandler onGestureEvent={_onPanGestureEvent}>
                                <Animated.View
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}>
                                    <Animated.View
                                        style={[
                                            {
                                                backgroundColor: '#42a5f5',
                                                borderRadius: circleRadius,
                                                height: circleRadius * 2,
                                                width: circleRadius * 2,
                                            },
                                            {
                                                transform: [
                                                    {
                                                        translateX: Animated.add(_touchX, new Animated.Value(-circleRadius)),
                                                    },
                                                    {
                                                        translateY: Animated.add(_touchY, new Animated.Value(-circleRadius)),
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </Animated.View>
                            </PanGestureHandler>
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
    box: {
        height: 120,
        width: 120,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        marginBottom: 30,
    },
});

export default Poche;