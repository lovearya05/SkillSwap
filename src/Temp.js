import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { requestStoragePermission } from './utilityFunctions/utilityFunctions';

const Temp = () => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');


  const pickImage = async () => {
    const response = await requestStoragePermission();
    if(!response) return;
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 3,
      multiple: true,
    };
    try {

      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response?.assets[0] };
          const source1 = { uri: response?.assets[1] };
          const source2 = { uri: response?.assets[2] };

          const images = [];
          if (source?.uri) images.push(source);
          if (source1?.uri) images.push(source1);
          if (source2?.uri) images.push(source2);

          console.log('images', images)
          setImage(images);
        }
      });

    } catch (error) {
      setImage([])
      console.log('image pic error', error)
    }

  };

  const YOUR_CLOUD_NAME = 'daznasbt0';
  const YOUR_UPLOAD_PRESET = 'skillSwap';

  const uploadImages = async () => {

    if (image.length === 0) return;
    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const img1 of image) {
        const img = img1.uri;
        const formData = new FormData();
        formData.append('upload_preset', YOUR_UPLOAD_PRESET);
        formData.append('file', {
          uri: uri = img.uri.startsWith('file://') ? img.uri : `file://${img.uri}`,
          type: img.type || 'image/jpeg',
          name: img.fileName || `image-${Date.now()}.jpg`,
          width: img.width,
          height: img.height,
        });

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${YOUR_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      }

      console.log('All images uploaded successfully:', uploadedUrls);

      alert(`Successfully uploaded ${uploadedUrls.length} images`);
      // setImages([]); // Clear images after successful upload
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload some images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.uploadButton]}
        onPress={uploadImages}
        disabled={uploading}
      >
        <View  >
          {uploading ? (
            <ActivityIndicator color="red" />
          ) : (
            <Text style={styles.buttonText}>Upload to Cloudinary</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* {image && (
        <View style={styles.imageContainer}>
          {image.map((item, i) => {
            return <Image key={i} source={item} style={styles.image} />
          })}

        </View>
      )} */}

      {uploadedUrl ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Upload Successful!</Text>
          <Text style={styles.urlText}>{uploadedUrl}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default Temp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
  uploadButton: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
  },
  urlText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
    textAlign: 'center',
  },
});

