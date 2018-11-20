import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  StyleSheet,
  AsyncStorage,
  KeyboardAvoidingView,

} from "react-native";
import {
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title,
  Form
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screen Styles
import styles from "../Theme/Styles/Signin";
import Logo from "../image/qualpros.png";
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';



class SignUpScreen extends Component {
  static navigationOptions = {
    header: null,
    showAlert: false,
    message: '',
  }
  state = {
   
    spinner: null
  
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  signIn = async () => {
    this.state.spinner=true
    try {
      let { data } = await axios.post('https://www.qualpros.com/api/student_register', {
       
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        confirmation_password: this.state.confirm_password,

      })
        .then((response) => {
          this.state.spinner=false
          if (response.data.data.status === 'success') {
            this.setState({ data: response.data.data })
            this.setState({
              message: response.data.data.message,
              showAlert: true,
          })
           
          } else {
            console.log(response.data.data); 
             this.setState({
              message: response.data.data.message,
              showAlert: true,
          })
            //alert(response.data.data.message)

          }
        })
    } catch (err) {
      console.log(err);
    }
    console.log(this.state.data)
  }

  

  render() {
    return (
      <Container>
        <KeyboardAwareScrollView>
          <Header style={styles.header}>
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => this.props.navigation.navigate("Welcome")}
              >
                <FontAwesome
                  name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                  size={30}
                  color="#6f6f6f"
                />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body} />
            <Right style={styles.right} />
          </Header>

          <View style={styles.signuplogosec}>
            <Image source={Logo} style={styles.signuplogostyle} />
          </View>
          <Spinner
              color={"black"}
          visible={this.state.spinner}
          textContent={'Please wait...'}
          textStyle={styles1.spinnerTextStyle}
          animation={'slide'}
        />
          <Form
            style={Platform.OS == 'android' ? styles.androidform : styles.form}
          >

            <Item rounded style={styles.inputStyle}>
              <Input
              
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="First Name"
                onChangeText={(first_name) => { this.setState({ first_name }) }}

                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                returnKeyType='next'
              />
            </Item>
            <Item rounded style={[styles.inputStyle, , { marginTop: 10 }]}>
              <Input
               
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Last Name"
                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                onChangeText={(last_name) => { this.setState({ last_name }) }}
                returnKeyType='next'
              />
            </Item>
            <Item rounded style={[styles.inputStyle, , { marginTop: 10 }]}>
              <Input
               
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Email"
                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                autoCapitalize='none'
                onChangeText={(email) => { this.setState({ email }) }}
                returnKeyType='next'
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
               
                placeholder="Password"
                secureTextEntry={true}
                textAlign={I18nManager.isRTL ? "right" : "left"}
                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                onChangeText={(password) => { this.setState({ password }) }}
                returnKeyType='next'
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
               
                placeholder="Confirm Password"
                secureTextEntry={true}
                textAlign={I18nManager.isRTL ? "right" : "left"}
                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                onChangeText={(confirm_password) => { this.setState({ confirm_password }) }}
                returnKeyType='done'
              />
            </Item>
            <TouchableOpacity
              info
              style={styles.signInbtn}
              onPress={this.signIn}
            >
              <Text autoCapitalize="words"
                style={styles.buttongetstarted}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </Form>


          <View
            style={Platform.OS == 'android' ? styles.signupbottomViewandroid : styles.signupbottomView}
          >
            {/* <TouchableOpacity
              style={styles.fbButton}
              onPress={this.signIn}
            >
              <View iconRight style={styles.fbview}>
                <Ionicons name="logo-linkedin" size={30} color="white" />
                <Text autoCapitalize="words" style={styles.fbButtonText}>
                  Sign Up with LinkedIn
                </Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.signupbottomText}
              onPress={() => { this.props.navigation.navigate('SignIn') }}>
              <Text style={styles.bottomText01}>
                Do you have an account?{" "}
                <Text style={styles.bottomText02}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="QualPros!"
                    message={this.state.message}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Ok"
                    confirmButtonColor="#d91009"
                    onConfirmPressed={() => {
                      this.hideAlert();
                      // this.props.navigation.navigate("WelcomeScreen")
                    }}
                    />
      </Container>
      
    );
  }
}
export default SignUpScreen;
const styles1 = StyleSheet.create({
  spinnerTextStyle: {
    color: "black"
  },

});