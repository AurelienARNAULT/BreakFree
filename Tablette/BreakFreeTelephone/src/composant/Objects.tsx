import {
    GestureEvent,
    GestureHandlerRootView,
    PanGestureHandler,
    PinchGestureHandler, PinchGestureHandlerEventPayload,
    RotationGestureHandler, RotationGestureHandlerEventPayload, State
} from "react-native-gesture-handler";
import {Animated, Dimensions, View} from "react-native";
import React from "react";


interface ObjectsProps {
    objectName: string; // Add a type to objectName
}

const Objects: React.FC<ObjectsProps> = ({objectName}) => {
    const panRef = React.createRef<PanGestureHandler>();
    const rotationRef = React.createRef<RotationGestureHandler>();
    const pinchRef = React.createRef<PinchGestureHandler>();
    console.log('objectName:', objectName);
    let circleRadius = 70;

    //PAN GESTURE -------------------------------------------
    const {width} = Dimensions.get('window');
    const {height} = Dimensions.get('window');
    let _touchX = new Animated.Value(width / 4 - circleRadius);
    let _touchY = new Animated.Value(height / 1.8 - circleRadius);


    let imagePath = require('../ressources/key.png');
    let newImageHeight = circleRadius * 1.8;
    let newImageWidth = circleRadius * 4;

    if (objectName === "phone") {
        imagePath = require('../ressources/phone.png')
        circleRadius = 75;
        newImageHeight = circleRadius * 4;
        newImageWidth = circleRadius * 2;
        _touchX = new Animated.Value(width / 2 - circleRadius);
        _touchY = new Animated.Value(height / 4 - circleRadius);
    }


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
        <View style={{
            height: newImageHeight,
            width: newImageWidth,
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
                                               ref={panRef}
                                               simultaneousHandlers={[pinchRef, rotationRef]}>
                                <Animated.View
                                    style={{
                                        height: newImageHeight,
                                        width: newImageWidth,
                                    }}>
                                    <Animated.Image
                                        source={imagePath}
                                        style={[
                                            {
                                                height: newImageHeight,
                                                width: newImageWidth,
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