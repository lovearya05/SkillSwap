const { View, Image, Text, ScrollView } = require('react-native');
const { textBlk, textGry } = require('./baseStyleSheet');
const { scale } = require('../utilityFunctions/utilityFunctions');

const Post = ({data={}, }) => {
  console.log('data --- >', data)

  // {"createdAt": {"nanoseconds": 689000000, "seconds": 1731773544}, "email": "bbb@gmail.com", "id": "xlZEylkimzFvIZ24v0pX", "postDesc": "tex", "postImage": ["https://res.cloudinary.com/daznasbt0/image/upload/v1731773543/vjotjbdry9ermsgfi6h6.jpg"], "userName": "Indrashekar"}
  
  const profileImage = require('../assets/icons/userProfileIcon.png')
  const userNAme = data?.userName || '';
  const creationDate = '2023-11-11 13:00'
  const postDescription = data?.postDesc || ''
  const postImages = data?.postImage

  return (
    <View style={{ paddingTop: scale(16), marginTop: scale(16), backgroundColor: '#fff', paddingHorizontal: scale(16) }} >
      <View style={{ flexDirection: 'row' }} >
        <Image source={profileImage} style={{ height: scale(40), width: scale(40) }} />
        <View style={{ paddingStart: scale(8) }} >
          <Text style={textBlk(16, 600)} >{userNAme}</Text>
          <Text style={textGry(12, 400)} >{creationDate}</Text>
        </View>
      </View>

      <View style={{ paddingVertical: scale(12) }} >
        <Text style={textBlk(14, 400)} >{postDescription}</Text>
      </View>

      <ScrollView style={{ paddingBottom: scale(16) }} horizontal showsHorizontalScrollIndicator={false} >
      {postImages && postImages.map((item, i)=>{
        return(
          <Image key={i} source={{uri: item}} style={{ height: scale(260), width: scale(postImages.length ==1 ? 320 : 270),marginRight: scale(12) }} resizeMode={'contain'} />
        )
      })}
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: scale(12) }} >
        <Image style={{ height: scale(30), width: scale(30) }} source={require('../assets/icons/Like_Icon.png')} />
        <Image style={{ height: scale(30), width: scale(30) }} source={require('../assets/icons/Comment_Icon.png')} />
        <Image style={{ height: scale(30), width: scale(30) }} source={require('../assets/icons/Share_Icon.png')} />
      </View>
    </View>
  )
}

export default Post;