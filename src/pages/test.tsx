import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import { Image } from 'react-native';

const Test = async (imageUri, quality = 85) => {
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    maxWidth: 800,
    maxHeight: 600,
    quality: quality / 100,
  };

  const response = await ImagePicker.showImagePicker(options);

  if (response.didCancel) {
    console.log('User cancelled image picker');
    return;
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
    return;
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
    return;
  }

  const { uri } = response;

  Image.getSize(uri, async (width, height) => {
    const aspectRatio = width / height;
    const maxWidth = 800;
    const maxHeight = 600;

    let newWidth = width;
    let newHeight = height;

    if (newWidth > maxWidth || newHeight > maxHeight) {
      if (aspectRatio < 1) {
        newWidth = Math.min(width, maxWidth);
        newHeight = newWidth / aspectRatio;
      } else {
        newHeight = Math.min(height, maxHeight);
        newWidth = newHeight * aspectRatio;
      }
    }

    const resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: width, height: height },
          displaySize: { width: newWidth, height: newHeight },
          resizeMode: 'contain',
        },
        (uri) => {
          resolve(uri);
        },
        (error) => {
          console.error('ImageEditor cropImage error:', error);
          reject(error);
        });
    });

    const image = await ImageResizer.createResizedImage(
      resizedUri,
      newWidth,
      newHeight,
      'JPEG',
      quality
    );

    const compressedUri = image.uri;

    console.log('Compressed image uri:', compressedUri);
  });
};

export default Test
