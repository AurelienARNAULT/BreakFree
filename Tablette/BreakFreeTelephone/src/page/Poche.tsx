import React, {useRef, useEffect} from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Animated,
    Dimensions,
    LayoutChangeEvent,
    TouchableWithoutFeedback, Text
} from 'react-native';
import Objects from '../composant/Objects';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useList} from '../context/ListContext';
import socket from '../socket/socket'

const {width, height} = Dimensions.get('window');

interface position {
    top: number;
    left: number;
    right: number;
    bottom: number;
}


const Poche = () => {
    const {objectInPoche, removeObjectAtIndex} = useList();
    const baseObjectNames = ["piece", "piece", "piece1", "piece1", "piece1", "ticket", "wallet"];
    let objectNames = [...baseObjectNames, ...objectInPoche];
    const [containerPosition, setContainerPosition] = React.useState<position | null>(null);
    const globalRef = useRef<View>(null);

    const onContainerLayout = (event: LayoutChangeEvent) => {
        globalRef.current?.measure((fx, fy, width, height, px, py) => {
            setContainerPosition({
                top: py + 70,
                left: px + 70,
                right: px + width - 70,
                bottom: py + height - 70,
            });
        });
    };

    const [selectedObject, setSelectedObject] = React.useState<number | null>(null);

    const handleSelect = (id: number) => {
        setSelectedObject(id);
    };

    const handleBackgroundPress = () => {
        setSelectedObject(null);
    };

    useEffect(() => {
        socket.off('onRemoveObject', onRemoveObject);
        socket.off('onWrongObject', onWrongObject);

        socket.on('onWrongObject', onWrongObject);
        socket.on('onRemoveObject', onRemoveObject)

        // Nettoyage : Supprime l'écouteur lorsque le composant est démonté
        return () => {
            socket.off('onRemoveObject', onRemoveObject);
            socket.off('onWrongObject', onWrongObject);
        };
    }, [selectedObject]);

    const onWrongObject = (data: any) => {
        try {
            const contentObject = JSON.parse(data.content);
            console.log(selectedObject);
            if (selectedObject !== null) {
                console.log(contentObject.name);
                console.log(objectNames[selectedObject]);
                setSelectedObject(null);
            }
        } catch (error) {
            console.error("Erreur lors de la conversion de data.content en objet :", error);
        }
    }

    const onRemoveObject = (data: any) => {
        console.log("onRemoveObject");
        try {
            const contentObject = JSON.parse(data.content);
            console.log(selectedObject);
            if (selectedObject !== null) {
                console.log(contentObject.name);
                console.log(objectNames[selectedObject]);
                if (contentObject.name == objectNames[selectedObject]) {
                    console.log("remove");
                    removeObjectAtIndex(selectedObject - baseObjectNames.length);
                    setSelectedObject(null);
                }
            }
        } catch (error) {
            console.error("Erreur lors de la conversion de data.content en objet :", error);
        }
    };

    useEffect(() => {
        console.log("objectUsed " + selectedObject);
        if (selectedObject !== null)
            socket.emit('objectUsed', JSON.stringify({name: objectNames[selectedObject]}));
    }, [selectedObject]);

    let getSelectedObject = () => {
        let obj = objectNames.filter((objectName, index) => index === selectedObject)[0]
        switch (obj) {
            case "key":
                return "La clé";
            case "piece":
                return "Une piece";
            case "ticket":
                return "Le ticket";
            case "wallet":
                return "Le portefeuille";
            case "dice":
                return "Le dé";
        }
    }
    return (
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
            <ImageBackground
                source={require('../ressources/mallete.jpg')}
                style={styles.backgroundImage}
                resizeMode="stretch">
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
                        <View style={styles.boxContainer} onLayout={onContainerLayout} ref={globalRef}>
                            <ImageBackground
                                source={require('../ressources/valise.png')}
                                style={styles.boxImage}
                                resizeMode="cover">
                                <GestureHandlerRootView style={{height: '100%'}}>
                                    {objectNames.map((objectName, index) => (
                                        <Objects
                                            key={`${objectName}-${index}`} // Crée une clé unique
                                            id={index}
                                            objectName={objectName}
                                            containerPosition={containerPosition}
                                            isSelected={selectedObject === index}
                                            onSelect={handleSelect}/>
                                    ))}
                                </GestureHandlerRootView>

                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Text
                    style={[styles.textBottom, {display: selectedObject === null ? "none" : "flex"}]}>
                    {getSelectedObject()} est
                    sélectionné</Text>
            </ImageBackground>
        </TouchableWithoutFeedback>
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
    textBottom: {
        fontSize: 25,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'white',
    },
});

export default Poche;