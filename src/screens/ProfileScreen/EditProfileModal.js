// import { View, Text } from 'react-native'
// import React from 'react'

// const EditProfileModal = () => {
//   return (
//     <View>
//       <Text>EditProfileModal</Text>
//     </View>
//   )
// }

// export default EditProfileModal

import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { textBlk } from '../../components/baseStyleSheet';
import { handleUpdateUser, scale } from '../../utilityFunctions/utilityFunctions';
import { useAuth } from '../../context/AuthContext';

const AddSkillModal = ({ addSkillType='', setAddSkillType, onClose, onAddSkill }) => {
  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState('Beginner');
  const [skillsList, setSkillList] = useState([]);

  const { user, userData, updateUserData, logout, login } = useAuth();


  const handleAddSkill = () => {
    if(userData.email){
      const updatedData = (addSkillType == 'skills') ? {...userData,skills : skillsList} : {...userData, skillToLearn: skillsList}
      handleUpdateUser(userData.email,  updatedData, ()=>  updateUserData());
    }
    setSkillList([])
    setAddSkillType('')
  };

  useEffect(()=>{
    if(addSkillType == 'skills'){
      setSkillList(userData?.skills || [])
    }else if(addSkillType == 'interestedSkills'){
      setSkillList(userData?.skillToLearn || [])
    }
  },[addSkillType])

  const removeSkill = (i)=>{
    setSkillList(p=>{
      return p.filter((_, idx)=> idx != i)
    });
  }

  const addSkill = (skill='')=>{
    if(!skill) return;
    setSkillList(p=> [...p, skill]);
    setSkillName('')
  }

  return (
    <Modal
     onRequestClose={()=> setAddSkillType('')}
     visible={
      (addSkillType == 'skills') || 
      (addSkillType == 'interestedSkills')
    } transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Skill</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter skill name..."
            value={skillName}
            onChangeText={setSkillName}
            onSubmitEditing={()=>addSkill(skillName)}
          />
          <View style={{paddingVertical: scale(16), flexDirection: 'row', marginRight: scale(8)}} >
            {skillsList.map((item,i)=>{
              return(
                <View style={{flexDirection: 'row', backgroundColor: '#EDEFF2', padding: scale(10), borderRadius: scale(4) }} >
                  <Text key={i} style={[textBlk(14, 400),{ marginRight: scale(8)}]} >{item}</Text>
                  <TouchableOpacity onPress={()=>removeSkill(i)} >
                    {/* <Image source={require('../../assets/icons/')} /> */}
                    <Text style={{color: '#000'}} >X</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddSkill}>
            <Text style={styles.buttonText}>Update Skills</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={()=> setAddSkillType('')}>
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  addButton: {
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
