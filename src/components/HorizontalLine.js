import { View } from 'react-native'
import React from 'react'
const HorizontalLine = ({borderWidth=5}) => {
  return (
    <View style={{borderColor:'#e8e6de', borderWidth:borderWidth, opacity:0.4}}></View>
  )
}
export default HorizontalLine
