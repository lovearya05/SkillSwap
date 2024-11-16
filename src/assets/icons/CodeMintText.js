import { View, Text } from 'react-native'
import React from 'react'
import baseStyles from '../../components/baseStyleSheet'

const CodeMintText = ({textColor=0}) => {
    return (
        <Text>
            <Text style={[baseStyles.textBlkFs23Fw700, {color : textColor==1 ? '#fff' : null }]} >Skill</Text>
            <Text style={[baseStyles.textGreenFs23Fw700]} >SWAP</Text>
        </Text>
    )
}

export default CodeMintText