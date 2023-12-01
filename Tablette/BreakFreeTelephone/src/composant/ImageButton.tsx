import React from "react";
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet
} from "react-native";

interface ImageButtonProps {
  source: ImageSourcePropType;
  onPress: () => void;
  size: number;
}

const ImageButton: React.FC<ImageButtonProps> = ({
                                                   source,
                                                   onPress,
                                                   size
                                                 }) => {
  return (
    <TouchableOpacity onPress={onPress}
                      style={{
                        width: size, // Assurez-vous que cette taille correspond à la largeur de l'image
                        height: size, // Même hauteur que la largeur pour garder l'aspect carré
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center" // Centre le TouchableOpacity sans étendre sa largeur
                      }}>
      <Image
        source={source}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ImageButton;
