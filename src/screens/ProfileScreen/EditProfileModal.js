import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { textBlk } from '../../components/baseStyleSheet';
import { handleUpdateUser, scale } from '../../utilityFunctions/utilityFunctions';
import { useAuth } from '../../context/AuthContext';

const AddSkillModal = ({ addSkillType = '', setAddSkillType, onClose, onAddSkill }) => {
  const [skillName, setSkillName] = useState('');
  const [skillsList, setSkillList] = useState([]);

  const { user, userData, updateUserData, logout, login } = useAuth();

  const handleAddSkill = () => {
    if (userData.email) {
      const updatedData =
        addSkillType === 'skills'
          ? { ...userData, skills: skillsList }
          : { ...userData, skillToLearn: skillsList };
      handleUpdateUser(userData.email, updatedData, () => updateUserData());
    }
    setSkillList([]);
    setAddSkillType('');
  };

  useEffect(() => {
    if (addSkillType === 'skills') {
      setSkillList(userData?.skills || []);
    } else if (addSkillType === 'interestedSkills') {
      setSkillList(userData?.skillToLearn || []);
    }
  }, [addSkillType]);

  const removeSkill = (i) => {
    setSkillList((prev) => prev.filter((_, idx) => idx !== i));
  };

  const addSkill = (skill = '') => {
    if (!skill) return;
    setSkillList((prev) => [...prev, skill]);
    setSkillName('');
  };

  return (
    <Modal
      onRequestClose={() => setAddSkillType('')}
      visible={addSkillType === 'skills' || addSkillType === 'interestedSkills'}
      transparent
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Skill</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter skill name..."
              value={skillName}
              onChangeText={setSkillName}
            />
            <TouchableOpacity
              style={styles.addSkillButton}
              onPress={() => addSkill(skillName)}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.skillsContainer}
            contentContainerStyle={styles.skillsContent}
          >
            {skillsList.map((item, i) => (
              <View key={i} style={styles.skillChip}>
                <Text style={styles.skillText}>{item}</Text>
                <TouchableOpacity onPress={() => removeSkill(i)}>
                  <Text style={styles.removeText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.updateButton} onPress={handleAddSkill}>
            <Text style={styles.buttonText}>Update Skills</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setAddSkillType('')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
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
    width: '80%',
    maxHeight: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  addSkillButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  skillsContainer: {
    width: '100%',
    maxHeight: 200,
  },
  skillsContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEFF2',
    padding: 8,
    borderRadius: 4,
    marginRight: 0,
    marginBottom: 10,
  },
  skillText: {
    marginRight: 8,
  },
  removeText: {
    color: '#000',
  },
  updateButton: {
    backgroundColor: '#00bfff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddSkillModal;
