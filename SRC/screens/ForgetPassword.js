import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import {
  Container,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Form
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Screen Styles
import styles from "../Theme/Styles/Signin";
import Logo from "../image/qualpros.png";
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';




class ForgetPassword extends Component {
    static navigationOptions = {
        header : null,
        showAlert: false,
        message: ''
    }   
    state = {
        showAlert : false,
        email:null
    }
  
    forgetPassword = async () => {
     
      
      try {
        let { data } = await axios.post('https://www.qualpros.com/api/forgot_password', {
         
          email: this.state.email,
        
        })
          .then((response) => {
           
            if (response.data.data.status === 'success') {
              //alert(response.data.data.message)
              this.setState({
                message: response.data.data.message,
                showAlert: true,
            })
              
              //this.props.navigation.navigate("Welcome")
            } else {
              this.setState({
                message: response.data.data.message,
                showAlert: true,
            })
              //console.log(response.data.data);
             
              //alert(response.data.data.message)
  
  
            }
          })
      } catch (err) {
        console.log(err);
      }
    
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

  close = () => {
    this.setState({showAlert:false});
    this.props.navigation.navigate('Welcome')
  }

  render() {
    return (
      <Container>
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
          <View style={styles.logosec}>
            <Image source={Logo} style={styles.logostyle} />
          </View>
          <Form style={styles.form}>
            <Item rounded style={styles.inputStyle}>
              <Input
                //placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Email"
                style={styles.inputmain}
                autoCapitalize='none'
                onChangeText={(email) => { this.setState({ email }) }}
              />
            </Item>
            <TouchableOpacity
              info
              style={styles.signInbtn}
              onPress={this.forgetPassword}
            >
              <Text autoCapitalize="words" style={styles.buttongetstarted}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </Form>
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
                      this.props.navigation.navigate("Welcome")
                    }}
                    />    
         
      </Container>
    );
  }
}
export default ForgetPassword;