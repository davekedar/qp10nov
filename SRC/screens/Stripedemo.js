import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  I18nManager,
  AsyncStorage,
  StyleSheet
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
import Spinner from 'react-native-loading-spinner-overlay';



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
    duration:null,
    user:[],
    final_tution_price:null,
    tution_ids:null,
    student_id : null,
    spinner: null,
    full_name : null
  };



  componentWillMount = async () => {
   
    //this._showDateTimePicker;
    const { navigation } = this.props;
    this.state.final_tution_price = navigation.getParam("final_tution_price");
    this.state.tution_ids = navigation.getParam("tution_ids");
    console.log( this.state.tution_ids);
    console.log( this.state.final_tution_price);
    const userid = await AsyncStorage.getItem('user_id');
    const user_full_name = await AsyncStorage.getItem('user_full_name');
    this.state.student_id = userid
    this.state.full_name = user_full_name

        try {
            let { data } = await axios.post('https://www.qualpros.com/api/get_student_profile', {
                student_id: userid
            })
                .then((response) => {

                    if (response.data.data.status === 'success') {

                        this.setState({ user: response.data.data.student_info })

                    } else {
                        console.log(response.data.data);

                        alert(response.data.data.message)


                    }
                })
        } catch (err) {
            console.log(err);
        }

   
  };

  payme(comp) {
    // var cardDetails = {
    //   "card[number]": "4242424242424242",
    //   "card[exp_month]": "12",
    //   "card[exp_year]": "2023",
    //   "card[cvc]": "123"
    // };
    this.setState({ spinner: true })
  
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
    // console.log(formBody);
    formBody = formBody.join("&");

    let { data } = fetch("https://api.stripe.com/v1/tokens", {
      method: "post",
      body: formBody,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + "sk_live_qfFaSkOKeuTNXNDn5VKthYsb"
      }
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(responseJson => {
            // console.log(this.state.user.email);
            this.state.payment_token = responseJson.id;
            var cardcharges = {
              amount: this.state.final_tution_price*100,
              currency: "gbp",
              source: this.state.payment_token,
              // source:"",
              receipt_email: this.state.user.email,
              description: "Charge for private tuition from "+this.state.full_name
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
                Authorization: "Bearer " + "sk_live_qfFaSkOKeuTNXNDn5VKthYsb"
              }
            })
              .then(cardresponce => {
                if (cardresponce.status == 200) {
                  cardresponce.json().then(responseJson => {
                    console.log(responseJson)
                 
                   
                 
                  try {
                    let { data } =  axios.post('https://www.qualpros.com/api/store_stripe_paymet_response', {
                      payment_type: "private",
                      tution_id: this.state.tution_ids,  
                      student_id: this.state.student_id,
                      funding: responseJson.source.funding,
                      brand: responseJson.source.brand,
                      id: responseJson.source.id,
                      created: responseJson.created,
                      currency: responseJson.currency,
                      country:responseJson.source.country,
                      amount: responseJson.amount,
                      description: responseJson.description,
                      receipt_email: responseJson.receipt_email,
                    })
                      .then((response) => {
                        
                        this.setState({ spinner: false })
                        if (response.data.data.status === 'success') {
                          this.setState({
                            message: response.data.data.message,
                            showAlert: true,
                        })
                        
                        } else {
                          
                          // this.setState({ spinner: false })
                          this.setState({
                            message: response.data.data.message,
                            showAlert: true,
                            spinner:false
                        })
              
              
                        }
                      })
                  } catch (err) {
                    console.log(err);
                  }  
                });

                //   this.setState({
                //     message: "Payment Completedß",
                //     showAlert: true,
                // })
                  // alert("payment completed");
                } else {
                  this.setState({ spinner: false })
                  cardresponce.json().then(cardresponseJson => {
                    
                    
                  
                    
                    this.setState({
                      message: cardresponseJson.error.message,
                      showAlert: true,
                  })
        
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
            this.setState({ spinner: false })
            // alert(responseJson.error.message);
            this.setState({
              message: responseJson.error.message,
              showAlert: true,
          })          });
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
    const {goBack} = this.props.navigation;

    return (
      <Container>
       <Spinner
          color={"black"}
          visible={this.state.spinner}
          textContent={'Please wait...'}
          textStyle={styles1.spinnerTextStyle}
          animation={'slide'}
        />
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              // onPress={() => this.props.navigation.navigate("TutorCalender")}
              onPress={() => goBack()}
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
          <Text style={{fontWeight:"bold",fontSize:30,color:"#d91009"}}>Pay £{this.state.final_tution_price}</Text>
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
            this.props.navigation.navigate("CalenderView")
          }}
        />
      </Container>
    );
  }
}
export default Stripedemo;
const styles1 = StyleSheet.create({
  spinnerTextStyle: {
    color: "black"
  },

}); 