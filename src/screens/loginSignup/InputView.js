import { View, Text } from 'react-native'
import React from 'react'
import { textOffWhite, textwhite } from '../../components/baseStyleSheet'
import InputBox from '../../components/InputBox'

const InputView = ({inputTitle='', placeholderText='', value='', setValue=()=>{}, isPassword=false}) => {
    return (
        <View style={{marginVertical:8}} >
            <Text style={[textwhite(12, 400)]} >{inputTitle}</Text>
            <InputBox useLightTheme placeholderText={placeholderText} value={value} setValue={setValue} isPassword={isPassword} />
        </View>
    )
}

export default InputView