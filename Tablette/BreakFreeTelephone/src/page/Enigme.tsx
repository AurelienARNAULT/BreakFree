import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ListItemProps = {
    title: string;
    subTitle: string;
    onSelect: () => void;
    isSelected: boolean;
};


const ListItem: React.FC<ListItemProps> = ({title, subTitle, onSelect, isSelected}) => {
    return (
        <TouchableOpacity onPress={onSelect} style={styles.TouchableOpacity}>
            <View style={[styles.verticalBar, { backgroundColor: isSelected ?  '#a6600f' : '#413906'}]} />
            <LinearGradient
                colors={isSelected ? ['rgba(78, 50, 0, 0.8)', 'rgba(0, 78, 50, 0)'] : ['rgba(78, 50, 0, 0.2)', 'rgba(78, 50, 0, 0)']} // Utilisez les props ici
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientBackground}
            >
                <View style={styles.content}>
                    <Text style={[styles.title, isSelected ? styles.selectedTitle : styles.unselectedTitle ]}>{title}</Text>
                    <Text style={[styles.subTitle, isSelected ? styles.selectedText : styles.unselectedText]}>{subTitle}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const Enigme = () => {

    const items = [];
    const numberOfItems = 13; // Le nombre d'éléments que vous voulez créer

    for (let i = 1; i <= numberOfItems; i++) {
        items.push({
            id: `item${i}`,
            title: `Titre ${i}`,
            subTitle: `Sous-titre ${i}`
        });
    }

    const [selectedItem, setSelectedItem] = useState<string>(items[0].id || '');


    return (
        <ImageBackground
            source={require('../ressources/1599665227fond_parchemin.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover">
            <View style={styles.overlay}/>
            <View style={styles.container}>
                <View style={styles.listSection}>
                    <ScrollView persistentScrollbar={true}>
                        {items.map((item) => (
                            <ListItem
                                key={item.id}
                                title={item.title}
                                subTitle={item.subTitle}
                                onSelect={() => setSelectedItem(item.id)}
                                isSelected={selectedItem === item.id}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.detailSection}>
                    {selectedItem && (
                        <>
                            <Text style={styles.detailTitle}>{selectedItem} Titre</Text>
                            <Text style={styles.detailDescription}>
                                Description de {selectedItem}
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
        fontSize: 30,
        paddingBottom: 30,
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
        padding: 10, // Ajustez selon vos besoins
        width: '100%',
        justifyContent: 'flex-start',
        // autres styles pour le LinearGradient
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
});

export default Enigme;
