import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { scale } from '../utilityFunctions/utilityFunctions'

const InputBox = ({ placeholderText = '', multiline=false, height = 0, value = '', setValue = () => { }, isPassword = false, useLightTheme = false }) => {
  return (
    <View style={{ marginVertical: 4 }} >
      <TextInput
        placeholderTextColor={useLightTheme ? 'rgba(207, 204, 204, 0.5)' : 'rgba(207, 204, 204, 0.5)'}
        placeholder={placeholderText}
        value={value}
        secureTextEntry={isPassword}
        onChangeText={(txt) => setValue(txt)}
        multiline={multiline}
        style={[{
          fontSize: 14,
          height: scale(height ? height : 40),
          color: 'black',
          paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderColor: useLightTheme ? 'rgba(242, 233, 233, 1)' : 'rgba(131, 131, 131, 1)', width: '100%', borderWidth: 1
        }]} />
    </View>
  )
}

export default InputBox
