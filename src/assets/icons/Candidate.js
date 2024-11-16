import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Candidate = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    
    fill="none"
    {...props}
  >
    <Path
      fill="#00955F"
      d="M14.796 12.541a.4.4 0 0 0-.224.068c-1.732 1.18-3.412 1.18-5.144 0a.41.41 0 0 0-.224-.068 4.794 4.794 0 0 0-4.788 4.788v4.072c0 .22.18.4.4.4h14.368c.22 0 .4-.18.4-.4v-4.072a4.794 4.794 0 0 0-4.788-4.788Zm3.988 8.46H16.28v-1.316c0-.22-.18-.4-.4-.4-.22 0-.4.18-.4.4v1.316H8.52v-1.316c0-.22-.18-.4-.4-.4-.22 0-.4.18-.4.4v1.316H5.212v-3.672a3.99 3.99 0 0 1 3.868-3.984c1.936 1.272 3.896 1.272 5.832 0a3.993 3.993 0 0 1 3.868 3.984v3.672h.004ZM16.808 7.01A4.812 4.812 0 0 0 12 2.2 4.812 4.812 0 0 0 7.192 7.01 4.812 4.812 0 0 0 12 11.817a4.812 4.812 0 0 0 4.808-4.808Zm-8.816 0C7.992 4.8 9.792 3 12 3c2.212 0 4.008 1.8 4.008 4.008s-1.8 4.008-4.008 4.008A4.013 4.013 0 0 1 7.992 7.01Z"
    />
    <Path
      fill="#00955F"
      d="M14.02 5.488a.398.398 0 0 0-.564 0L11.26 7.684l-.716-.716a.398.398 0 1 0-.564.564l1 1a.396.396 0 0 0 .284.116.413.413 0 0 0 .284-.116l2.48-2.48a.406.406 0 0 0-.008-.564Z"
    />
  </Svg>
)
const CandidateBlack = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    
    fill="none"
    {...props}
  >
    <Path
      fill="black" 
      d="M14.796 12.541a.4.4 0 0 0-.224.068c-1.732 1.18-3.412 1.18-5.144 0a.41.41 0 0 0-.224-.068 4.794 4.794 0 0 0-4.788 4.788v4.072c0 .22.18.4.4.4h14.368c.22 0 .4-.18.4-.4v-4.072a4.794 4.794 0 0 0-4.788-4.788Zm3.988 8.46H16.28v-1.316c0-.22-.18-.4-.4-.4-.22 0-.4.18-.4.4v1.316H8.52v-1.316c0-.22-.18-.4-.4-.4-.22 0-.4.18-.4.4v1.316H5.212v-3.672a3.99 3.99 0 0 1 3.868-3.984c1.936 1.272 3.896 1.272 5.832 0a3.993 3.993 0 0 1 3.868 3.984v3.672h.004ZM16.808 7.01A4.812 4.812 0 0 0 12 2.2 4.812 4.812 0 0 0 7.192 7.01 4.812 4.812 0 0 0 12 11.817a4.812 4.812 0 0 0 4.808-4.808Zm-8.816 0C7.992 4.8 9.792 3 12 3c2.212 0 4.008 1.8 4.008 4.008s-1.8 4.008-4.008 4.008A4.013 4.013 0 0 1 7.992 7.01Z"
    />
    <Path
      fill="black"
      d="M14.02 5.488a.398.398 0 0 0-.564 0L11.26 7.684l-.716-.716a.398.398 0 1 0-.564.564l1 1a.396.396 0 0 0 .284.116.413.413 0 0 0 .284-.116l2.48-2.48a.406.406 0 0 0-.008-.564Z"
    />
  </Svg>
)
export {CandidateBlack, Candidate}
