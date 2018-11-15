import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  I18nManager,
  AsyncStorage
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
import Ionicons from "react-native-vector-icons/Ionicons";
// Screen Styles
import styles from "../Theme/Styles/Signin";
import Logo from "../image/qualpros.png";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import Stripe from "react-native-stripe-api";
import "whatwg-fetch";
import { requestOneTimePayment } from 'react-native-paypal';


class Paypaldemo extends Component {
  static navigationOptions = {
    header: null,
    showAlert: false,
    message: ""
  };

  state = {
    data: [],
    number: null,
    expmonth: null,
    expyear: null,
    cvc: null,
    errordata: [],
    payment_token: null
  };

  payme(comp) {
    var cardDetails = {
      grant_type: "client_credentials"
    };

    var formBody = [];
    for (var property in cardDetails) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(cardDetails[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }
    //console.log(formBody);
    formBody = formBody.join("&");

    let { data } = fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {
      body: "grant_type=client_credentials",
      headers: {
        Accept: "application/json",
        Authorization: 'Basic '+btoa('AX1qKvN-2SMBDsYjX3eg5bThLkuiT3V_vgj14GJ1AVTi93P0ETp5b2iW70cNhee5xl5IDAJKD_Q-s6yR:EC--fJXqs4VbfQ5fTrry7LV4izX5J-y3aU_Lz1vNDIQITitNR5-GsPRZfbJconWZhjISkmyxiYEiiqti'),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
      .then(response => {
        console.log(response);
        
        if (response.status == 200) {
          response.json().then(responseJson => {
            // console.log(responseJson.access_token);
            this.state.payment_token = responseJson.access_token;
            const {
              nonce,
              payerId,
              email,
              firstName,
              lastName,
              phone 
          } = requestOneTimePayment(
            this.state.payment_token,
            {
              amount: '5', // required
              // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
              currency: 'GBP',
              // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
              localeCode: 'en_GB', 
              shippingAddressRequired: false,
              userAction: 'commit', // display 'Pay Now' on the PayPal review page
              // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
              intent: 'authorize', 
            }
          );
           

           
          });
        } else {
          response.json().then(responseJson => {
            console.log(responseJson);

            alert(responseJson.error.message);
          });
        }
      })
      .catch(function(err) {
        console.log("came in fail");
        console.log(err);
      });
  }

  constructor(props) {
    super(props);
    this.state = { showAlert: false };
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
              onPress={() => this.props.navigation.navigate("TutorCalender")}
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
              placeholder="number"
              value={"4242 4242 4242 4242"}
              style={styles.inputmain}
              onChangeText={number => {
                this.setState({ number });
              }}
              autoCapitalize="none"
            />
          </Item>
          <Item rounded style={styles.inputStyle}>
            <Input
              textAlign={I18nManager.isRTL ? "right" : "left"}
              placeholder="expmonth"
              value={"09"}
              style={styles.inputmain}
              onChangeText={expmonth => {
                this.setState({ expmonth });
              }}
              autoCapitalize="none"
            />
          </Item>
          <Item rounded style={styles.inputStyle}>
            <Input
              textAlign={I18nManager.isRTL ? "right" : "left"}
              placeholder="expyear"
              value={"18"}
              style={styles.inputmain}
              onChangeText={expyear => {
                this.setState({ expyear });
              }}
              autoCapitalize="none"
            />
          </Item>
          <Item rounded style={styles.inputStyle}>
            <Input
              textAlign={I18nManager.isRTL ? "right" : "left"}
              placeholder="cvc"
              value={"111"}
              style={styles.inputmain}
              onChangeText={cvc => {
                this.setState({ cvc });
              }}
              autoCapitalize="none"
            />
          </Item>

          <TouchableOpacity
            info
            style={styles.signInbtn}
            onPress={this.payme.bind(this)}
          >
            <Text autoCapitalize="words" style={styles.buttongetstarted}>
              Add Card
            </Text>
          </TouchableOpacity>
        </Form>
        <View style={styles.bottomView} />

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
export default Paypaldemo;