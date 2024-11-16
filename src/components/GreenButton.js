import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { textwhite } from './baseStyleSheet'

const GreenButton = ({ text = '',  isDisabled = false, onPress = () => { } }) => {
    return (
        <View style={{ paddingVertical: 16, marginRight: 8 }} >
            <TouchableOpacity onPress={isDisabled ? null : onPress}
                style={[{
                    flex:1,
                    width:'100%',
                    alignItems:'center',
                     paddingVertical: 12,
                    alignSelf: 'flex-start', borderRadius: 10,
                    paddingHorizontal: 16, backgroundColor:isDisabled ? 'rgb(76,130,252)': 'rgba(47,112,254,255)'
                }]} >
                <Text style={[textwhite(14,500),{opacity:isDisabled?0.4 : 1}]} >{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GreenButton
