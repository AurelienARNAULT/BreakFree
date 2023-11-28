import React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';

interface ImageButtonProps {
  source: ImageSourcePropType;
  onPress: () => void;
  size: number;
  margin: number;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  source,
  onPress,
  size,
  margin,
}) => {
  return (
    <TouchableOpacity style={[styles.button, {padding: 0}]} onPress={onPress}>
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          resizeMode: 'contain',
          margin: margin,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageButton;
