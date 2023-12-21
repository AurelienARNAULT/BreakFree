import {
    GestureEvent,
    GestureHandlerRootView,
    PanGestureHandler, PanGestureHandlerEventPayload,
    PinchGestureHandler, PinchGestureHandlerEventPayload,
    RotationGestureHandler, RotationGestureHandlerEventPayload, State
} from "react-native-gesture-handler";
import {Animated, Dimensions, View} from "react-native";
import React from "react";

interface position {
    top: number;
    left: number;
    right: number;
    bottom: number;
}

interface ObjectsProps {
    objectName: string; // Add a type to objectName
    containerPosition: position|null;
}

const Objects: React.FC<ObjectsProps> = ({objectName, containerPosition}) => {
    const panRef = React.createRef<PanGestureHandler>();
    const rotationRef = React.createRef<RotationGestureHandler>();
    const pinchRef = React.createRef<PinchGestureHandler>();
    console.log('objectName:', objectName);
    let circleRadius = 70;

    //PAN GESTURE -------------------------------------------
    let _lastOffset = {x: 0, y: 100000};
    let _touchX = new Animated.Value(_lastOffset.x);
    let _touchY = new Animated.Value(_lastOffset.y);
    let firstTouch = true;

    let imagePath = require('../ressources/key.png');
    let newImageHeight = circleRadius * 1.8;
    let newImageWidth = circleRadius * 4;

    if (objectName === "phone") {
        imagePath = require('../ressources/phone.png')
        circleRadius = 75;
        newImageHeight = circleRadius * 4;
        newImageWidth = circleRadius * 2;
    }


    const _onPanGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        if (firstTouch) {
            // Ajustez uniquement lors de la première interaction
            _touchY.setOffset(100000); // Compenser pour la position initiale masquée
        }

        _touchX.setValue(event.nativeEvent.translationX);
        _touchY.setValue(event.nativeEvent.translationY);
    };

    const onPanHandlerStateChange = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
            _lastOffset.x += event.nativeEvent.translationX;
            _lastOffset.y += event.nativeEvent.translationY;
            if (containerPosition !== undefined && containerPosition !== null) {
                if (_lastOffset.x < containerPosition.left) {
                    _lastOffset.x = containerPosition.left;
                }
                if (_lastOffset.x > containerPosition.right) {
                    _lastOffset.x = containerPosition.right;
                }
                if (_lastOffset.y - 100000 < containerPosition.top) {
                    _lastOffset.y = containerPosition.top + 100000;
                }
                if (_lastOffset.y - 100000 > containerPosition.bottom) {
                    _lastOffset.y = containerPosition.bottom + 100000;
                }
            }

            _touchX.setOffset(_lastOffset.x);
            _touchY.setOffset(_lastOffset.y);
            _touchX.setValue(0);
            _touchY.setValue(0);
            firstTouch = false;
            console.log('containerPosition:', containerPosition);
            console.log('_lastOffset:', _lastOffset);
        }
    };
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
        <View style={{
            height: newImageHeight,
            width: newImageWidth,
            top: -100000,
        }}>
            <PinchGestureHandler
                ref={pinchRef}
                onGestureEvent={_onPinchGestureEvent}
                onHandlerStateChange={_onPinchHandlerStateChange}
                simultaneousHandlers={[panRef, rotationRef]}>
                <Animated.View
                    style={{
                        height: newImageHeight,
                        width: newImageWidth,
                    }}>
                    <RotationGestureHandler
                        ref={rotationRef}
                        onGestureEvent={_onRotateGestureEvent}
                        onHandlerStateChange={_onRotateHandlerStateChange}
                        simultaneousHandlers={[pinchRef, panRef]}>
                        <Animated.View
                            style={{
                                height: newImageHeight,
                                width: newImageWidth,
                            }}>
                            <PanGestureHandler onGestureEvent={_onPanGestureEvent}
                                               onHandlerStateChange={onPanHandlerStateChange}
                                               ref={panRef}
                                               simultaneousHandlers={[pinchRef, rotationRef]}>
                                <Animated.View
                                    style={{
                                        height: newImageHeight,
                                        width: newImageWidth,
                                        backgroundColor: 'red',
                                    }}>
                                    <Animated.Image
                                        source={imagePath}
                                        style={[
                                            {
                                                height: newImageHeight,
                                                width: newImageWidth,
                                                backgroundColor: 'blue',
                                            },
                                            {
                                                transform: [
                                                    {
                                                        translateX: Animated.add(_touchX, new Animated.Value(-circleRadius)),
                                                    },
                                                    {
                                                        translateY: Animated.add(_touchY, new Animated.Value(-circleRadius)),
                                                    },
                                                    {perspective: 200}, {rotate: _rotateStr}, {scale: _scale}
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
        </View>
    );
}

export default Objects;