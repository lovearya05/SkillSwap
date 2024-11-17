import { View, Text, Modal, Image, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { createdAt, createNewDocument, requestStoragePermission, scale, showToast } from '../../utilityFunctions/utilityFunctions'
import { textBlk, textwhite } from '../../components/baseStyleSheet'
import InputBox from '../../components/InputBox'
import * as ImagePicker from 'react-native-image-picker';
import { useAuth } from '../../context/AuthContext'
import LoadingScreen from '../../components/LoadingScreen'


const CreatePostModal = ({ showCreatePost = false, setShowCreatePost = () => { } }) => {
  const [postDesc, setPostDesc] = useState('');
  const [images, setImages] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user, userData, logout, login, updateUserData } = useAuth();


  console.log('userData', userData)

  const postPost = (uploadedUrls = []) => {
    if ((images && images.lenght > 0) || postDesc) {

      createNewDocument('posts', {
        email: userData?.email,
        userName: userData?.userName,
        postDesc: postDesc,
        postImage: uploadedUrls,
        createdAt: createdAt()
      })
      setUploading(false)
      setPostDesc('')
      setImages(null)
      setShowCreatePost(false)
    } else {
      showToast('Please write something')
    }
  }

  const YOUR_CLOUD_NAME = 'daznasbt0';
  const YOUR_UPLOAD_PRESET = 'skillSwap';

  const uploadImages = async () => {
    console.log('uplading')
    if (!images || images.length === 0) {
      setUploading(true);
      postPost()
      return
    }

    setUploading(true);
    const uploadedUrls = [];

    try {
      console.log('img ---> 1', images)
      for (const img1 of images) {
        console.log('img ---> 2')
        const img = img1.uri;
        console.log('img --->', img)
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
        console.log('uplading ...',)
        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      }

      postPost(uploadedUrls)
      console.log('All images uploaded successfully:', uploadedUrls);

    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload some images');
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    const response = await requestStoragePermission();
    if (!response) return;
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
          setImages(images);
          // uploadImages(images)
        }
      });

    } catch (error) {
      setImages([])
      console.log('image pic error', error)
    }

  };

  if (uploading && showCreatePost) {
    return (
      <View style={{ height: '100%', flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }} >
        <LoadingScreen />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <Modal
        visible={showCreatePost}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCreatePost(false)}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>New Post</Text>
            <TouchableOpacity onPress={() => setShowCreatePost(false)} style={styles.closeButton}>
              <Image source={require('../../assets/icons/closeIcon.png')} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <InputBox
              placeholderText="What's on your mind?"
              height={150}
              value={postDesc}
              setValue={setPostDesc}
              multiline
              useLightTheme={false}
              style={styles.input}
            />

            {/* Images Preview */}
            <View style={styles.imagePreviewContainer}>
              {images && images.map((item, i) => (
                <View key={i} style={styles.previewImage}>
                  <Image source={{ uri: item.uri.uri }} style={styles.imageThumb} />
                </View>
              ))}
            </View>
          </View>

          {/* Bottom Action Bar */}
          <View style={styles.actionBar}>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={pickImage} style={styles.actionButton}>
                <Image source={require('../../assets/icons/gallery.png')} style={styles.actionIcon} />
                <Text style={styles.actionCount}>Upload Images</Text>
              </TouchableOpacity>
            </View>

            {/* Post Button */}
            <TouchableOpacity onPress={uploadImages} style={styles.postButton}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </SafeAreaView>
  )
}

export default CreatePostModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    height: scale(24),
    width: scale(24),
  },
  inputContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  previewImage: {
    marginRight: 8,
    marginBottom: 8,
  },
  imageThumb: {
    height: scale(80),
    width: scale(80),
    borderRadius: 8,
  },
  actionBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    height: scale(24),
    width: scale(24),
    marginRight: 4,
  },
  actionCount: {
    fontSize: 14,
    color: '#666',
  },
  postButton: {
    backgroundColor: '#0066ff',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
