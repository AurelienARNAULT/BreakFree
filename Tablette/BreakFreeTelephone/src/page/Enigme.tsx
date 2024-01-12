import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView, Image, ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ListItemProps = {
    id: string;
    title: string;
    subTitle: string;
    onSelect: () => void;
    isSelected: boolean;
    img: ImageSourcePropType;
};


const ListItem: React.FC<ListItemProps> = (listItemProps) => {
    return (
        <TouchableOpacity onPress={listItemProps.onSelect} style={styles.TouchableOpacity}>
            <View style={[styles.verticalBar, {backgroundColor: listItemProps.isSelected ? '#a6600f' : '#413906'}]}/>
            <LinearGradient
                colors={listItemProps.isSelected ? ['rgba(78, 50, 0, 0.8)', 'rgba(0, 78, 50, 0)'] : ['rgba(78, 50, 0, 0.2)', 'rgba(78, 50, 0, 0)']} // Utilisez les props ici
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientBackground}
            >
                <Image source={listItemProps.img} style={styles.img}></Image>
                <View style={styles.content}>
                    <Text
                        style={[styles.title, listItemProps.isSelected ? styles.selectedTitle : styles.unselectedTitle]}>{listItemProps.title}</Text>
                    <Text
                        style={[styles.subTitle, listItemProps.isSelected ? styles.selectedText : styles.unselectedText]}>{listItemProps.subTitle}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const Enigme = () => {

    const items: ListItemProps[] = [];
    const numberOfItems = 13; // Le nombre d'éléments que vous voulez créer

    const imgs = [
        require('../ressources/image/loupe.png'),
        require('../ressources/image/nuit.jpg')
    ];

    for (let i = 1; i <= numberOfItems; i++) {
        const randomImgIndex = i % 2 === 0 ? 0 : 1;
        let id = `item${i}`;
        items.push({
            id: id,
            title: `Titre ${i}`,
            subTitle: `Sous-titre ${i}`,
            isSelected: false,
            onSelect: () => {
                const foundItem = items.find(item => item.id === id);
                if (foundItem) {
                    setSelectedItem(foundItem);
                }
            },
            img: imgs[randomImgIndex]

        });
    }

    let [selectedItem, setSelectedItem] = useState<ListItemProps>(items[0] || '');


    return (
        <ImageBackground
            source={require('../ressources/image/1599665227fond_parchemin.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover">
            <View style={styles.overlay}/>
            <View style={styles.container}>
                <View style={styles.listSection}>
                    <ScrollView persistentScrollbar={true}>
                        {items.map((item) => (
                            <ListItem
                                {...item}
                                key={item.id}
                                isSelected={selectedItem.id === item.id}
                                onSelect={() => setSelectedItem(item)}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.detailSection}>
                    {selectedItem && (
                        <>
                            <View style={styles.detailTitleContent}>
                                <Text style={styles.detailTitle}>{selectedItem.title}</Text>
                                <Image source={selectedItem.img} style={styles.imgTitle}></Image>
                            </View>
                            <Text style={styles.detailDescription}>
                                Description de {selectedItem.subTitle}
                            </Text>
                        </>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    listSection: {
        flex: 1,
        margin: '3%',
        marginRight: 5,
        maxWidth: 450,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: 'rgba(84,84,84,0.5)',
        padding: 10,
    },
    detailSection: {
        flex: 1,
        position: 'relative',
        margin: '3%',
        marginLeft: 10,
        padding: 20,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: 'rgba(84,84,84,0.5)',
        elevation: 3,
        overflow: 'hidden',
    },
    TouchableOpacity: {
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        color: 'white',
        fontSize: 20,
    },
    subTitle: {
        fontSize: 18,

    },
    icon: {
        // Style pour l'icône
    },
    detailTitle: {
        color: 'white',
        fontSize: 40,
    },
    detailDescription: {
        color: 'white',
        fontSize: 18,
    },
    bar: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: 5, // Hauteur du trait
    },
    content: {
        zIndex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Noir avec 50% d'opacité
    },
    gradientBackground: {
        padding: 10,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    verticalBar: {
        width: 5, // Largeur de la barre
        height: '100%',
        backgroundColor: '', // Couleur de la barre
    },
    selectedText: {
        color: 'rgba(255,255,255,1)',
        fontWeight: '900',
    },
    selectedTitle: {
        color: 'rgba(255,255,255,1)',
        fontWeight: '900',
    },
    unselectedText: {
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '100',
    },
    unselectedTitle: {
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '100',
    },
    img: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    imgTitle : {
        width: 85,
        height: 85,
        marginRight: 10,
    },
    detailTitleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
});

export default Enigme;
