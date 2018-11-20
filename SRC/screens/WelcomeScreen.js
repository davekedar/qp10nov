import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
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
import Hyperlink from 'react-native-hyperlink'

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
            {/* <Hyperlink linkStyle={ { color: '#2980b9', fontSize: 20 } }>
      <Text style={ { fontSize: 15 } }>
        Make clickable strings like https://github.com/obipawan/hyperlink stylable
      </Text>
    </Hyperlink> */}


          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.bottomText}
              onPress={() => Linking.openURL('https://www.qualpros.com/')}>
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