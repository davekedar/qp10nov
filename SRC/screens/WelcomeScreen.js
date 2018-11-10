import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Right,
  Header,
  Left,
  Body,
  Form
} from "native-base";
// Screen Styles
import styles from "../Theme/Styles/Signin";
import Logo from "../image/qualpros.png";

class WelcomeScreen extends Component {
    static navigationOptions = {
        header : null
    }   
  render() {
    return (
      <Container>
        
          <Header style={styles.header}>
            <Left style={styles.left}>
              
            </Left>
            <Body style={styles.body} />
            <Right style={styles.right} />
          </Header>
          <View style={styles.logosec}>
            <Image source={Logo} style={styles.logostyle} />
          </View>
          <Form style={styles.form}>
            <TouchableOpacity
              info
              style={styles.signInbtn}
              onPress={()=>{this.props.navigation.navigate('SignIn')}}
            >
              <Text autoCapitalize="words" style={styles.buttongetstarted}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              info
              style={styles.signInbtn}
              onPress={()=>{this.props.navigation.navigate('SignUp')}}
            >
              <Text autoCapitalize="words" style={styles.buttongetstarted}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Form>
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.bottomText}
              onPress={()=>{this.props.navigation.navigate('Intro')}}>
              <Text style={styles.bottomText01}>
                Find out more about QualPros
              </Text>
            </TouchableOpacity>
          </View>
        
      </Container>
    );
  }
}
export default WelcomeScreen;