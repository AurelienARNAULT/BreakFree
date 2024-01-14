import {
    GestureEvent,
    GestureHandlerRootView, HandlerStateChangeEvent, LongPressGestureHandler, LongPressGestureHandlerEventPayload,
    PanGestureHandler, PanGestureHandlerEventPayload,
    PinchGestureHandler, PinchGestureHandlerEventPayload,
    RotationGestureHandler, RotationGestureHandlerEventPayload, State
} from "react-native-gesture-handler";
import {Animated, Dimensions, LayoutChangeEvent, TouchableWithoutFeedback, View} from "react-native";
import React, {useRef, useState} from "react";

interface position {
    top: number;
    left: number;
    right: number;
    bottom: number;
}

interface ObjectsProps {
    id: number;
    objectName: string;
    containerPosition: position | null;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

const Objects: React.FC<ObjectsProps> = ({id, objectName, containerPosition, isSelected, onSelect}) => {
    const panRef = React.createRef<PanGestureHandler>();
    const rotationRef = React.createRef<RotationGestureHandler>();
    const pinchRef = React.createRef<PinchGestureHandler>();
    const globalRef = useRef<View>(null);
    let top = useRef(0).current;
    let margeTop = useRef(200).current;
    let margeLeft = useRef(145).current;

    let circleRadius = 70;
    const trueTop = useRef(containerPosition?.top || 0);
    const trueBottom = useRef(containerPosition?.top || 0);
    const trueLeft = useRef(containerPosition?.left || 0);
    const trueRight = useRef(containerPosition?.right || 0);
    let randomTop = 0;
    let randomLeft = 0;

    //PAN GESTURE -------------------------------------------
    const _lastOffset = useRef({x: 0, y: 100000});
    let _touchX = new Animated.Value(_lastOffset.current.x);
    let _touchY = new Animated.Value(_lastOffset.current.y);
    let firstTouch = true;


    let newImageHeight = circleRadius * 2;
    let newImageWidth = circleRadius * 2;

    let imagePath = require('../ressources/image/poche/piece.png');
    switch (objectName) {
        case "piece":
            imagePath = require('../ressources/image/poche/piece.png');
            break;
        case "piece1":
            imagePath = require('../ressources/image/poche/piece1.png');
            break;
        case "key":
            imagePath = require('../ressources/image/poche/key.png');
            newImageHeight = circleRadius * 2;
            newImageWidth = circleRadius * 4.6;
            break;
        case "dice":
            imagePath = require('../ressources/image/poche/dice.png');
            newImageHeight = circleRadius * 2;
            newImageWidth = circleRadius * 2;
            break;
        case "ticket":
            imagePath = require('../ressources/image/poche/ticket.png');
            newImageHeight = circleRadius * 7.6;
            newImageWidth = circleRadius * 3.4;
            break;
        case "wallet":
            imagePath = require('../ressources/image/poche/wallet.png');
            newImageHeight = circleRadius * 4.7;
            newImageWidth = circleRadius * 3;
            break;
        case "paint":
            imagePath = require('../ressources/image/poche/paint.png');
            newImageHeight = circleRadius * 7;
            newImageWidth = circleRadius * 4.4;
            break;
    }


    const [containerPosition2, setContainerPosition] = React.useState<position | null>(null);
    const onContainerLayout = (event: LayoutChangeEvent) => {
        const layout = event.nativeEvent.layout;
        setContainerPosition({
            top: 0,
            left: 0,
            right: layout.width,
            bottom: layout.height,
        });
    };

    React.useEffect(() => {

        globalRef.current?.measure((fx, fy, width, height, px, py) => {
            _lastOffset.current.x = 0;
            _lastOffset.current.y = 100000;
            firstTouch = true;
            top = 0;
            trueTop.current = containerPosition?.top || 0;
            trueBottom.current = containerPosition?.bottom || 0;
            trueLeft.current = containerPosition?.left || 0;
            trueRight.current = containerPosition?.right || 0;
            top = 100000 + py;
            trueTop.current = trueTop.current - (top || 0) - newImageHeight/2;
            trueBottom.current = trueBottom.current - (top || 0) - (newImageHeight - circleRadius * 2) + newImageHeight/2;
            trueLeft.current = trueLeft.current - px - newImageWidth/2
            trueRight.current = trueRight.current - px - (newImageWidth - circleRadius * 2) + newImageWidth/2
            randomTop = Math.floor(Math.random() * ((trueBottom.current - 10) - (trueTop.current + 10) + 1)) + trueTop.current + 10;
            _lastOffset.current.y = _lastOffset.current.y + randomTop;
            randomLeft = Math.floor(Math.random() * ((trueRight.current - 10) - (trueLeft.current + 10) + 1)) + trueLeft.current + 10;
            _lastOffset.current.x = _lastOffset.current.x + randomLeft;
            if (_lastOffset.current.x < trueLeft.current) {
                _lastOffset.current.x = trueLeft.current;
            }
            if (_lastOffset.current.x > trueRight.current) {
                _lastOffset.current.x = trueRight.current;
            }
            if (_lastOffset.current.y - 100000 < trueTop.current) {
                _lastOffset.current.y = trueTop.current + 100000;
            }
            if (_lastOffset.current.y - 100000 > trueBottom.current) {
                _lastOffset.current.y = trueBottom.current + 100000;
            }
            _touchX.setValue(_lastOffset.current.x);
            _touchY.setValue(_lastOffset.current.y)

        });
    }, [containerPosition]);

    const _onPanGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        if (firstTouch) {
            // Ajustez uniquement lors de la première interaction
            _touchY.setOffset(_lastOffset.current.y); // Compenser pour la position initiale masquée
            _touchX.setOffset(_lastOffset.current.x); // Compenser pour la position initiale masquée
        }

        _touchX.setValue(event.nativeEvent.translationX);
        _touchY.setValue(event.nativeEvent.translationY);
    };

    const onPanHandlerStateChange = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
            _lastOffset.current.x += event.nativeEvent.translationX;
            _lastOffset.current.y += event.nativeEvent.translationY;
            if (containerPosition !== undefined && containerPosition !== null) {
                if (_lastOffset.current.x < trueLeft.current) {
                    _lastOffset.current.x = trueLeft.current;
                }
                if (_lastOffset.current.x > trueRight.current) {
                    _lastOffset.current.x = trueRight.current;
                }
                if (_lastOffset.current.y - 100000 < trueTop.current) {
                    _lastOffset.current.y = trueTop.current + 100000;
                }
                if (_lastOffset.current.y - 100000 > trueBottom.current) {
                    _lastOffset.current.y = trueBottom.current + 100000;
                }
            }

            _touchX.setOffset(_lastOffset.current.x);
            _touchY.setOffset(_lastOffset.current.y);
            _touchX.setValue(0);
            _touchY.setValue(0);
            firstTouch = false;
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

    const onLongPress = (event: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            onSelect(id)
        }
    };


    return (
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
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
                                        }}>
                                        <LongPressGestureHandler onHandlerStateChange={onLongPress} minDurationMs={600}>
                                            <Animated.View
                                                style={[{
                                                    height: newImageHeight,
                                                    width: newImageWidth,

                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }, {
                                                    transform: [
                                                        {
                                                            translateX: Animated.add(_touchX, new Animated.Value(-circleRadius)),
                                                        },
                                                        {
                                                            translateY: Animated.add(_touchY, new Animated.Value(-circleRadius)),
                                                        },
                                                        {perspective: 200}, {rotate: _rotateStr}, {scale: _scale}
                                                    ],
                                                }]}>
                                                <Animated.Image
                                                    source={imagePath}
                                                    style={[
                                                        {
                                                            height: newImageHeight,
                                                            width: newImageWidth,
                                                            backgroundColor:isSelected ? 'rgba(251, 255, 0, 0.4)' : 'transparent',
                                                            borderRadius: 20,
                                                        },{
                                                            transform: [
                                                                {rotate: objectName==="ticket" ? "0.3rad" : objectName==="wallet" ? "0.8rad" : "0rad"},
                                                            ],
                                                        }]}
                                                />
                                            </Animated.View>
                                        </LongPressGestureHandler>
                                    </Animated.View>
                                </PanGestureHandler>
                            </Animated.View>
                        </RotationGestureHandler>
                    </Animated.View>
                </PinchGestureHandler>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default React.memo(Objects);
