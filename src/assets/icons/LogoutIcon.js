import * as React from "react"
import { View } from "react-native"
import Svg, { Path } from "react-native-svg"
const SvgComponent = () => (
  <View style={{height:20, width:20 }} >
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 384.971 384.971"
  >
    <Path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
    <Path d="m381.481 184.088-83.009-84.2a11.942 11.942 0 0 0-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0 0 17.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
  </Svg>
  </View>
)
export { SvgComponent as LogoutIcon }
