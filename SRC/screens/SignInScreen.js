import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  I18nManager,
  AsyncStorage,
  Platform
} from "react-native";
import {
  Container,
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
import AwesomeAlert from 'react-native-awesome-alerts';
import OneSignal from 'react-native-onesignal';

class SignInScreen extends Component {
  
  static navigationOptions = {
    header: null,
    showAlert: false,
    message: '',
    
  }

  state = {
    data: [],
    email: null,
    password: null,
    //device_id: null,    
  }

componentWillMount() {
  //alert('test')
  OneSignal.init("0fc8bf31-ee8e-4916-8b50-475c7cdf6538");

  OneSignal.addEventListener("received", this.onReceived);
  OneSignal.addEventListener("opened", this.onOpened);
  OneSignal.addEventListener("ids", this.onIds);
  
}
componentWillUnmount() {
  OneSignal.removeEventListener("received", this.onReceived);
  OneSignal.removeEventListener("opened", this.onOpened);
  OneSignal.removeEventListener("ids", this.onIds);
}

onReceived(notification) {
  console.log("Notification received: ", notification);
}

onOpened(openResult) {
  console.log("Message: ", openResult.notification.payload.body);
  console.log("Data: ", openResult.notification.payload.additionalData);
  console.log("isActive: ", openResult.notification.isAppInFocus);
  console.log("openResult: ", openResult);
}

onIds = async (device) => {
  console.log("Device info: ", device.userId);
  let playerid = device.userId;
  //await AsyncStorage.setItem('playerid', playerid);
  this.setState({device_id: playerid})
  //alert(playerid);
}

  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };

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
    let device_type = (Platform.OS === 'ios') ? 'ios' : 'android' 
    try {
      let { data } = await axios.post('https://chat.qualpros.com/api/login', {
        email: this.state.email,
        password: this.state.password,
        //device_id: this.state.device_id,
        device_id: '123test',
        device_type: device_type
      })
        .then((response) => {
          
          
          if (response.data.data.status === 'success') {
            this.setState({ data: response.data.data })
            AsyncStorage.setItem('username', response.data.data.user_info.username);
            AsyncStorage.setItem('user_id', response.data.data.user_info.user_id.toString());
            this.props.navigation.navigate("SearchScreen")
          } else {
            
           
            this.setState({
              message: response.data.data.message,
              showAlert: true,
          })


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
             
              textAlign={I18nManager.isRTL ? "right" : "left"}
              placeholder="Email"
              style={styles.inputmain}
              onChangeText={(email) => { this.setState({ email }) }}
              autoCapitalize='none'
            />
          </Item>
          <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
            <Input
              
              placeholder="Password"
              secureTextEntry={true}
              textAlign={I18nManager.isRTL ? "right" : "left"}
              style={styles.inputmain}
              onChangeText={(password) => { this.setState({ password }) }}
              autoCapitalize='none'
            />
          </Item>
          <TouchableOpacity
            info
            style={styles.signInbtn}
            onPress={this.signIn}
          >
            <Text autoCapitalize="words" style={styles.buttongetstarted}>
              Sign In
              </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')}>
            <Text autoCapitalize="words" style={styles.buttongettext}>
              Forgot your password?
              </Text>
          </TouchableOpacity>
        </Form>
        <View style={styles.bottomView}>
        


          <TouchableOpacity
            style={styles.fbButton}
            onPress={() => alert("Facebook button Clicked")}
          >
            <View iconRight style={styles.fbview}>
              <Ionicons name="logo-linkedin" size={30} color="white" />
              <Text autoCapitalize="words" style={styles.fbButtonText}>
                Sign in with LinkedIn
                </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomText}
            onPress={() => { this.props.navigation.navigate('SignUp') }}>
            <Text style={styles.bottomText01}>
              Don&apos;t have an account?{" "}
              <Text style={styles.bottomText02}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>

        
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
                    }}
                    />   
      </Container>
    );
  }
}
export default SignInScreen;