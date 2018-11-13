//libraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

//importing assets
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Logo from "./SRC/image/qpicon.png";
import AuthLoadingScreen from "./SRC/screens/AuthLoadingScreen";
import WelcomeScreen from "./SRC/screens/WelcomeScreen";
import SignInScreen from "./SRC/screens/SignInScreen";
import SignUpScreen from "./SRC/screens/SignUpScreen";
import HomeScreen from "./SRC/screens/HomeScreen";
import SettingsScreen from "./SRC/screens/SettingsScreen";
import SearchScreen from "./SRC/screens/SearchScreen";
import CollectionScreen from "./SRC/screens/CollectionScreen";
import ChatScreen from "./SRC/screens/ChatScreen";
import ChatBox from "./SRC/screens/ChatBox";
import ProfileScreen from "./SRC/screens/ProfileScreen";
import ProfileEditScreen from "./SRC/screens/ProfileEditScreen";
import ChangePasswordScreen from "./SRC/screens/ChangePasswordScreen";
import CalenderView from "./SRC/screens/CalenderView";
import ForgetPassword from "./SRC/screens/ForgetPassword";
import TutorCalender from "./SRC/screens/TutorCalender";
import ImageDemo from "./SRC/screens/ImageDemo";
import TutorDetail from "./SRC/screens/TutorDetail";
import ReactNavigationExample from "./SRC/screens/ReactNavigationExample";
import CourseDetail from "./SRC/screens/CourseDetail";
import Stripedemo from "./SRC/screens/Stripedemo";
import BookTutionScreen from "./SRC/screens/BookTutionScreen";
import Paypaldemo from "./SRC/screens/Paypaldemo";
import GroupMember from "./SRC/screens/GroupMember";

const AuthStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  ForgetPassword: ForgetPassword,
  ChatBox: ChatBox,
  ProfileEditScreen: ProfileEditScreen,
  SettingsScreen: SettingsScreen,
  ChangePasswordScreen: ChangePasswordScreen,
  // ImageDemo: ImageDemo,
  CalenderView: CalenderView,
  TutorCalender:TutorCalender,
  ImageDemo:ImageDemo,
  TutorDetail:TutorDetail,
  ReactNavigationExample:ReactNavigationExample,
  CourseDetail:CourseDetail,
  Stripedemo:Stripedemo,
  BookTutionScreen:BookTutionScreen,
  Paypaldemo:Paypaldemo,
  GroupMember:GroupMember,
  
});



const AppTabNavigator = createBottomTabNavigator({
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-search" color={tintColor} size={24} />
      )
    }
  },
  CollectionScreen: {
    screen: CollectionScreen,
    navigationOptions: {
      tabBarLabel: 'CollectionScreen',
      tabBarIcon: ({tintColor}) => (
        <Icon1 name="bookmark-o" color={tintColor} size={24} />
      )
    }

  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Image source={Logo} style={{height:45,width:45, tintColor:tintColor}}/>
      )
    },

  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      tabBarLabel: 'ChatScreen',
      tabBarIcon: ({tintColor}) => (
        <Icon1 name="comment-o" color={tintColor} size={24} />
      )
    }

  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'ProfileScreen',
      tabBarIcon: ({tintColor}) => (
        <Icon1 name="user-o" color={tintColor} size={24} />
      )
    }

  },
  
}, {
tabBarOptions: {
  showLabel: false,
  activeTintColor : '#d91009',
  inactiveTintColor : 'black'
}
})


export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppTabNavigator
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  

  // logo:{
    
  // }
});