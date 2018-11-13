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

class Stripedemo extends Component {
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
    payment_token: null,
    duration:null
  };

  componentWillMount = async () => {
    //this._showDateTimePicker;
    const { navigation } = this.props;
    duration = navigation.getParam("duration");
   
  };

  payme(comp) {
    // var cardDetails = {
    //   "card[number]": "4242424242424242",
    //   "card[exp_month]": "12",
    //   "card[exp_year]": "2023",
    //   "card[cvc]": "123"
    // };

    var cardDetails = {
      "card[number]": this.state.number,
      "card[exp_month]": this.state.expmonth,
      "card[exp_year]": this.state.expyear,
      "card[cvc]": this.state.cvc
    };

    var formBody = [];
    for (var property in cardDetails) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(cardDetails[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }
    console.log(formBody);
    formBody = formBody.join("&");

    let { data } = fetch("https://api.stripe.com/v1/tokens", {
      method: "post",
      body: formBody,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + "sk_test_cRS06cF3af9DShvPKWGdPwlu"
      }
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(responseJson => {
            //onsole.log(responseJson);
            this.state.payment_token = responseJson.id;
            var cardcharges = {
              amount: duration*100*55,
              currency: "gbp",
              source: this.state.payment_token,
              // source:"",
              receipt_email: "vishal.nathani17@gmail.com",
              description: "terst payment"
            };

            var formcardBody = [];
            for (var property in cardcharges) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(cardcharges[property]);

              formcardBody.push(encodedKey + "=" + encodedValue);
            }
            //console.log(formBody);
            formcardBody = formcardBody.join("&");

            fetch("https://api.stripe.com/v1/charges", {
              method: "post",
              body: formcardBody,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + "sk_test_cRS06cF3af9DShvPKWGdPwlu"
              }
            })
              .then(cardresponce => {
                if (cardresponce.status == 200) {
                  console.log(cardresponce);
                  alert("payment completed");
                } else {
                  cardresponce.json().then(cardresponseJson => {
                    console.log(cardresponseJson);
                    
        
                    alert(cardresponseJson.error.message);
                  });
                  // console.log(cardresponce);
                }
              })
              .catch(function(carderror) {
                console.log("came in fail 2");
                console.log(carderror);
              });
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
          {/* <Image source={Logo} style={styles.logostyle} /> */}
          <Text style={{fontWeight:"bold",fontSize:30,color:"#d91009"}}>Pay £{duration*55}</Text>
          <Text style={{fontWeight:"bold",fontSize:30,color:"#d91009"}}>Enter Card Details</Text>
        </View>
        <Form style={styles.form}>
          <Item rounded style={styles.inputStyle}>
            <Input
              textAlign={I18nManager.isRTL ? "right" : "left"}
              placeholder="Card Number"
              //value={"4242 4242 4242 4242"}
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
              placeholder="Exp Month"
              //value={"09"}
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
              placeholder="Exp Year"
              //value={"18"}
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
              placeholder="CVC"
              //value={"111"}
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
export default Stripedemo;
