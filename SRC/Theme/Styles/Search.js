import { Platform, StyleSheet, Dimensions } from 'react-native';

import Fonts from '../assets/Fonts';
import Metrics from '../assets/Metrics';
import Colors from '../assets/Colors';
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "#fff",
    flexDirection: 'column'
  },
  left:{
    flex:1
  },
  leftbtn:{
    width:30
  },
  body:{
    flex:2,
    alignItems:'center',
    justifyContent: 'center'
  },
  title:{
    color: "#fff",
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.SFUIDisplaySemibold,
    textAlign: 'center'
  },
  right:{
    flex:1
  },
  rightbtn:{
    width:30,
    alignItems: 'flex-end'
  },
  searchicon:{
    marginRight: 10,
    color: '#fff',
    fontSize:24
  },
  header: {
    backgroundColor: '#2d324f',
    height: 65,
    width: Metrics.WIDTH,
    flexDirection: 'row',
    borderBottomColor: '#2d324f',
    ...Platform.select({
        ios: {
          paddingTop: 12,
        },
        android: {
          paddingTop: 15
        }
    }),
  },
  mainview:{
    width: Metrics.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  close:{
    position: 'absolute',
    top:30,
    left: 30
  },
  bgimage:{
    height: (Metrics.HEIGHT) * 0.33,
    width: (Metrics.WIDTH) * 0.79,
    borderRadius: 5,
    resizeMode: 'cover'
  },
  proimage:{
    position:'absolute',
    zIndex:10,
    width: (Metrics.WIDTH) * 0.30,
    height: (Metrics.WIDTH) * 0.30,
    borderRadius: (Metrics.WIDTH)* 0.15,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignSelf: 'center',
    marginTop: (Metrics.WIDTH) * 0.15,
  },
  prouser:{
    height: (Metrics.HEIGHT) * 0.33,
    width: (Metrics.WIDTH) * 0.79,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  followcount:{
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  modalmain:{
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    backgroundColor: "#0006"
  },
  ShowProfileTxt: {
    color: "#fff",
    backgroundColor: "#2d324f",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.SFUIDisplaySemibold,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.40
  },

  modal: {
      width: (Metrics.WIDTH) * 0.80,
      height: (Metrics.HEIGHT) * 0.66,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (Metrics.HEIGHT)  * 0.15,
      flexDirection: 'column'
   },

   followerFollowingBg: {
     width: (Metrics.WIDTH) * 0.25,
     marginTop: 15,
     backgroundColor: 'transparent',
     flexDirection: 'column'
   },

   followerFollowingCountTxt: {
     color: "#363636",
     fontSize: Fonts.moderateScale(15),
     fontFamily: Fonts.type.SFUIDisplayMedium,
     textAlign: 'center',
   },

   followerFollowingTxt: {
     color: "#959595",
     fontSize: Fonts.moderateScale(12),
     fontFamily: Fonts.type.SFUIDisplayRegular,
     textAlign: 'center',
   },

   nameTxt: {
     color: "#6f6f6f",
     fontSize: Fonts.moderateScale(18),
     fontFamily: Fonts.type.SFUIDisplayMedium,
     alignSelf: 'center',
     ...Platform.select({
   		ios: {
   			 marginTop: 30
   		},
   		android: {
        marginTop: 15
      }
   	}),
   },

   designationTxt: {
     color: "#b7b7b7",
     fontSize: Fonts.moderateScale(12),
     fontFamily: Fonts.type.SFUIDisplayRegular,
     alignSelf: 'center',
   },

   followTxtBg: {
     backgroundColor: "#0691ce",
     borderRadius: 20,
     width: (Metrics.WIDTH) * 0.45,
     alignSelf: 'center',
     marginTop: 20
   },

   followTxt: {
     color: "#fff",
     fontSize: Fonts.moderateScale(18),
     fontFamily: Fonts.type.SFUIDisplayMedium,
     alignSelf: 'center',
     paddingTop: 5,
     paddingBottom: 5,
   },

   closeIconBg: {
     height:(Metrics.HEIGHT * 0.040),
     width:(Metrics.HEIGHT * 0.040),
     borderRadius: (Metrics.HEIGHT * 0.02),
     backgroundColor: Colors.black,
     borderWidth: 2,
     borderColor: Colors.snow,
     marginTop: (Metrics.HEIGHT * 0.135),
     marginLeft: (Metrics.WIDTH * 0.075),
     position: 'absolute',
     alignSelf: 'flex-start',
     justifyContent: 'center',
     alignItems: 'center',
     paddingBottom: (Metrics.HEIGHT * 0.001)
   }


});

export default styles;