import {
    GestureEvent,
    GestureHandlerRootView,
    PanGestureHandler, PanGestureHandlerEventPayload,
    PinchGestureHandler, PinchGestureHandlerEventPayload,
    RotationGestureHandler, RotationGestureHandlerEventPayload, State
} from "react-native-gesture-handler";
import {Animated, Dimensions, LayoutChangeEvent, View} from "react-native";
import React, {useRef} from "react";

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
    const globalRef = useRef<View>(null);
    let top = 0;
    let margeTop = 200;
    let margeLeft = 145;

    console.log('objectName:', objectName);
    let circleRadius = 70;
    let trueTop = containerPosition?.top || 0;
    let trueBottom = containerPosition?.bottom || 0;
    let trueLeft = containerPosition?.left || 0;
    let trueRight = containerPosition?.right || 0;
    let randomTop = 0;

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

    const [containerPosition2, setContainerPosition] = React.useState<position | null>(null);
    const onContainerLayout = (event: LayoutChangeEvent) => {
        const layout = event.nativeEvent.layout;
        setContainerPosition({
            top: 0,
            left:  0,
            right: layout.width,
            bottom: layout.height,
        });
    };

    React.useEffect(() => {

        globalRef.current?.measure((fx, fy, width, height, px, py) => {
            console.log('height:', height);
            top = 100000 + py;
            console.log('top:', top);
            margeTop -= height/2;
            margeLeft -= width/2 + 20;
            trueTop = trueTop - (top || 0) + margeTop ;
            trueBottom = trueBottom - (top || 0) + margeTop ;
            trueLeft = trueLeft - px + margeLeft;
            trueRight = trueRight - px + margeLeft;
            randomTop = Math.floor(Math.random() * (trueBottom - trueTop + 1)) + trueTop;
            _lastOffset.y  = _lastOffset.y + randomTop;
            _lastOffset.x = _lastOffset.x  + Math.floor(Math.random() * (trueRight - trueLeft + 1)) + trueLeft ;
            _touchX.setOffset(_lastOffset.x);
            _touchY.setValue(_lastOffset.y)
        });

        console.log('containerPosition:', containerPosition);
    }, [containerPosition2, _touchY, _lastOffset.y]);

    const _onPanGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        if (firstTouch) {
            // Ajustez uniquement lors de la première interaction
            _touchY.setOffset(100000 + randomTop); // Compenser pour la position initiale masquée
        }

        _touchX.setValue(event.nativeEvent.translationX);
        _touchY.setValue(event.nativeEvent.translationY);
    };

    const onPanHandlerStateChange = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
            _lastOffset.x += event.nativeEvent.translationX;
            _lastOffset.y += event.nativeEvent.translationY;
            if (containerPosition !== undefined && containerPosition !== null) {
                if (_lastOffset.x < trueLeft) {
                    _lastOffset.x = trueLeft;
                }
                if (_lastOffset.x > trueRight) {
                    _lastOffset.x = trueRight;
                }
                if (_lastOffset.y - 100000 < trueTop) {
                    _lastOffset.y = trueTop + 100000;
                }
                if (_lastOffset.y - 100000 > trueBottom) {
                    _lastOffset.y = trueBottom + 100000;
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
        }} onLayout={onContainerLayout} ref={globalRef}>
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