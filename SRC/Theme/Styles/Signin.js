import { Platform, StyleSheet, Dimensions } from 'react-native';
// Screen Styles
import Fonts from '../assets/Fonts';
import Metrics from '../assets/Metrics';
import Colors from '../assets/Colors';


const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: Metrics.WIDTH,
		height: Metrics.HEIGHT,
	},

	backArrow:{
		backgroundColor: 'transparent',
		width: Metrics.WIDTH,
		height: Metrics.HEIGHT * 0.11,
		justifyContent: 'flex-start',
		alignSelf: 'flex-start',
		left:0,
		marginTop: Fonts.moderateScale(20),
		paddingLeft: Fonts.moderateScale(15)
	},
	header: {
		backgroundColor: Colors.transparent,
		height: Metrics.WIDTH * 0.15,
		borderBottomWidth: 0,
		// ...Platform.select({
		// 	ios: {},
		// 	android: {
		// 		marginTop: Fonts.moderateScale(5)
		// 	}
		// }),
		elevation: 0
	},
	left: {
		flex: 0.5,
		backgroundColor: 'transparent',
	},
	backArrow: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	body: {
		flex: 3,
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	logosec:{
		width: Metrics.WIDTH,
		height: Metrics.WIDTH * 0.50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logostyle: {
		alignSelf:'center',
		width: Metrics.WIDTH * 0.65,
		height: Metrics.WIDTH * 0.40,
	},
	signuplogosec:{
		width: Metrics.WIDTH,
		height: Metrics.WIDTH * 0.50,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	signuplogostyle: {
		alignSelf:'center',
		width: Metrics.WIDTH * 0.65,
		height: Metrics.WIDTH * 0.40,
	},
	form: {
		width: Metrics.WIDTH,
		height: Metrics.HEIGHT * 0.45,
		backgroundColor: 'rgba(255,255,255,0)',
		borderColor: 'transparent',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	androidform: {
		width: Metrics.WIDTH,
		height: Metrics.HEIGHT * 0.48,
		backgroundColor: 'rgba(255,255,255,0)',
		borderColor: 'transparent',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	inputStyle:{
		borderColor: '#d91009',
		justifyContent: 'center',
		alignSelf: 'center',
		width: Metrics.WIDTH * 0.80,
		borderRadius: 5,
	},
	inputmain: {
		//fontFamily: Fonts.type.sfuiDisplayRegular,
		color: Colors.black,
		justifyContent: 'center',
		alignSelf: 'center',
		paddingTop: 12,
		paddingBottom: 10,
		paddingLeft: 20,
		borderRadius: 5,
		width : Metrics.WIDTH * 0.80,
		backgroundColor:'rgba(255,255,255,0.4)'
	},
	inputandroid: {
		//fontFamily: Fonts.type.sfuiDisplayRegular,
		color: Colors.black,
		justifyContent: 'center',
		alignSelf: 'center',
		paddingTop: 6,
		paddingBottom: 2,
		paddingLeft: 20,
		borderRadius: 5,
		width : Metrics.WIDTH * 0.80,
		backgroundColor:'rgba(255,255,255,0.4)',
		height:40
	},
	signInbtn: {
		backgroundColor: '#d91009',
		justifyContent: 'center',
		alignSelf: 'center',
		paddingTop: 12,
		paddingBottom: 12,
		borderRadius: 5,
		width: Metrics.WIDTH * 0.80,
	  marginTop: 15,
	},
	buttongetstarted: {
		alignSelf: 'center',
		justifyContent: 'center',
		//fontFamily: Fonts.type.sfuiDisplaySemibold,
		color: Colors.snow,
	},
	
	buttongettext: {
		alignSelf: 'center',
		justifyContent: 'center',
		//fontFamily: Fonts.type.sfuiDisplaySemibold,
		color: Colors.white,
		marginTop: 25,
	},
	bottomView: {
		marginTop:10,
	},
	signupbottomView: {
		marginTop:40,
	},
	signupbottomViewandroid: {
		marginTop:15,
	},
	fbButton:	{
		backgroundColor: "#3b5998",
		height: (Metrics.HEIGHT * 0.07),
		width: (Metrics.WIDTH * 0.80),
		borderRadius: 40,
		marginLeft: 20,
		marginRight: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	fbview:{
    flexDirection: 'row',
    alignItems: 'center',
	alignSelf: 'center',
	
  },
	fbButtonText:{
		color: "#fff",
		fontSize: Fonts.moderateScale(17),
    left: 10,
		//fontFamily: Fonts.type.sfuiDisplayRegular,
    alignItems: 'center',
    alignSelf: 'center',
	},
	bottomText: {
		width: '100%',
		height: 40,
		alignItems:'center',
		alignSelf:'center',
		justifyContent: 'center',
		marginTop: 20
	},
	signupbottomText: {
		width: '100%',
		height: 40,
		alignItems:'center',
		alignSelf:'center',
		justifyContent: 'center',
		marginTop: 2
	},

	bottomText01: {
		fontSize: Fonts.moderateScale(16),
		color: 'black',
		//fontFamily: Fonts.type.sfuiDisplayRegular
	},

	bottomText02: {
		fontSize: Fonts.moderateScale(16),
		//fontFamily: Fonts.type.sfuiDisplayRegular,
		color: '#d91009'
	},

});
export default styles;