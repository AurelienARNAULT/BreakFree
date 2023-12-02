import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ListItemProps = {
  title: string;
  subTitle: string;
  onSelect: () => void;
};

const ListItem: React.FC<ListItemProps> = ({title, subTitle, onSelect}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.listItem}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Histoire = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <ImageBackground
      source={require('../ressources/1599665227fond_parchemin.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.listSection}>
          <ListItem
            title="Titre 1"
            subTitle="Sous-titre 1"
            onSelect={() => setSelectedItem('Element1')}
          />
          <ListItem
            title="Titre 2"
            subTitle="Sous-titre 2"
            onSelect={() => setSelectedItem('Element2')}
          />
          {/* Ajoutez plus d'éléments ici */}
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
    maxWidth: 450,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FF5733',
  },
  detailSection: {
    flex: 1,
    position: 'relative',
    maxWidth: 700,
    margin: 20,
    marginLeft: 10,
    padding: 20,
    borderRadius: 4,
    backgroundColor: 'white',
    elevation: 3,
    overflow: 'hidden',
  },
  listItem: {
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  title: {
    // Style pour le titre
  },
  subTitle: {
    // Style pour le sous-titre
  },
  icon: {
    // Style pour l'icône
  },
  detailTitle: {
    // Style pour le titre des détails
  },
  detailDescription: {
    // Style pour la description des détails
  },
  bar: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 5, // Hauteur du trait
  },
  content: {
    padding: 16,
    zIndex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Histoire;
