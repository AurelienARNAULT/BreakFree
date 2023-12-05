import React, {useState} from 'react';
import {Animated, View, Dimensions, StyleSheet, ImageBackground} from 'react-native';
import {
    Gesture, GestureEvent,
    GestureHandlerRootView,
    PanGestureHandler, PinchGestureHandlerEventPayload,
    RotationGestureHandler, RotationGestureHandlerEventPayload, State,
    PinchGestureHandler
} from 'react-native-gesture-handler';

const circleRadius = 50;

const Poche = () => {

    //PAN GESTURE -------------------------------------------
    const {width} = Dimensions.get('window');
    const {height} = Dimensions.get('window');
    let _touchX = new Animated.Value(width / 2 - circleRadius);
    let _touchY = new Animated.Value(height / 2 - circleRadius);

    let _onPanGestureEvent = Animated.event([{nativeEvent: {x: _touchX, y: _touchY}}], {
        useNativeDriver: true,
    });

    //ROTATION GESTURE -------------------------------------------
    const _rotate = new Animated.Value(0);
    let _lastRotate = 0;

    let _rotateStr = _rotate.interpolate({
        inputRange: [-100, 100],
        outputRange: ['-100rad', '100rad'],
    });

    const _onRotateGestureEvent = Animated.event(
        [{nativeEvent: {rotation: _rotate}}],
        {useNativeDriver: true}
    );
    const _onRotateHandlerStateChange = (event: GestureEvent<RotationGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            _lastRotate += event.nativeEvent.rotation;
            _rotate.setOffset(_lastRotate);
            _rotate.setValue(0);
        }
    };


    //PINCH GESTURE -------------------------------------------
    const _baseScale = new Animated.Value(1);
    const _pinchScale = new Animated.Value(1);
    const _scale = Animated.multiply(_baseScale, _pinchScale);
    let _lastScale = 1;

    const _onPinchGestureEvent = Animated.event(
        [{nativeEvent: {scale: _pinchScale}}],
        {useNativeDriver: true}
    );

    const _onPinchHandlerStateChange = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            _lastScale *= event.nativeEvent.scale;
            _baseScale.setValue(_lastScale);
            _pinchScale.setValue(1);
        }
    };

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
                            <PinchGestureHandler
                                onGestureEvent={_onPinchGestureEvent}
                                onHandlerStateChange={_onPinchHandlerStateChange}>
                                <Animated.View
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}>
                                    <RotationGestureHandler
                                        onGestureEvent={_onRotateGestureEvent}
                                        onHandlerStateChange={_onRotateHandlerStateChange}>
                                        <Animated.View
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                            }}>
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
                                                                    {perspective: 200}, {rotate: _rotateStr}, { scale: _scale }
                                                                ],
                                                            },
                                                        ]}
                                                    />
                                                </Animated.View>
                                            </PanGestureHandler>
                                        </Animated.View>
                                    </RotationGestureHandler>
                                </Animated.View>
                            </PinchGestureHandler>
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