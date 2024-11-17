import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { handleUpdateUser } from '../../utilityFunctions/utilityFunctions';

const EditProfileModalDetails = ({  addSkillType = '', setAddSkillType, }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const { user, userData, logout, login, updateUserData } = useAuth();


  useEffect(() => {
    if (userData) {
      setName(userData.userName || '');
      setBio(userData.bio || '');
    }
  }, [userData]);

  const handleSave = () => {
    const updatedData = {...userData, userName: name, bio: bio };
    handleUpdateUser(userData.email, updatedData, () => updateUserData());
    setBio('')
    setName('')
    setAddSkillType('')
  };

  return (
    <Modal
      visible={addSkillType == 'editName'}
      onRequestClose={()=> setAddSkillType('')}
      transparent
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="Write something about yourself"
            value={bio}
            onChangeText={setBio}
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={()=> setAddSkillType('')}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#00bfff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfileModalDetails;