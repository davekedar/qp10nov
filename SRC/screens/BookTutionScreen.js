import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  View
} from "react-native";
import {
  Container,
  Button,
  Header,
  Card,
  CardItem,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Input,
  Form,
  Item
} from "native-base";
import Tutor from "../image/krutika.jpg";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "react-native-modal-datetime-picker";
var dateFormat = require("dateformat");
import Icon1 from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";

class BookTutionScreen extends Component {
  static navigationOptions = {
    header: null,
    showAlert: false
  };
  state = {
    isDateTimePickerVisible: false,
    intdate: null,
    dd: null,
    mm: null,
    yy: null,
    bookdatetime: null,
    selectedtime: null,
    description: null
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    ///console.log('A date has been picked: ', date);
    date = dateFormat(date, "yyyy-mm-dd HH:MM");
    this.state.bookdatetime = date;
    this._hideDateTimePicker();
  };

  componentWillMount = async () => {
    this._showDateTimePicker;
    const { navigation } = this.props;
    intdate = navigation.getParam("date");
    dd = navigation.getParam("day");
    mm = navigation.getParam("month");
    yy = navigation.getParam("year");
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

  bookNow = async () => {
    const userid = await AsyncStorage.getItem("user_id");
    console.log(this.state.bookdatetime);
    try {
      let { data } = await axios
        .post("https://chat.qualpros.com/api/book_private_tution", {
          student_id: userid,
          tutor_id: 4,
          date_time: this.state.bookdatetime,
          duration: this.state.duration,
          topic: this.state.topic,
          description: this.state.description
        })
        .then(response => {
          if (response.data.data.status === "success") {
            alert(response.data.data.message);
            this.props.navigation.navigate("TutorCalender");
          } else {
            console.log(response.data.data);
            alert(response.data.data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
    console.log(this.state.data);
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#d91009" }}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("TutorCalender")}
            >
              <FontAwesome name="angle-left" size={30} color="#fff" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text
              style={{
                alignSelf: Platform.OS == "android" ? "center" : null,
                fontSize: 17,
                color: "#fff"
              }}
            >
              Book Private Tution
            </Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item>
              <Input
                onChangeText={duration => {
                  this.setState({ duration });
                }}
                style={{ marginRight: 60 }}
                placeholder="Duration"
              />
            </Item>
            <Item>
              <Input
                onChangeText={topic => {
                  this.setState({ topic });
                }}
                style={{ marginRight: 60 }}
                placeholder="Topic"
              />
            </Item>
            <Item>
              <Input
                onChangeText={description => {
                  this.setState({ description });
                }}
                style={{ marginRight: 60 }}
                placeholder="Description"
              />
            </Item>

            <Item>
              <Button
                style={{ backgroundColor: "#fff" }}
                onPress={this._showDateTimePicker}
              >
                <Icon1
                  style={{ marginTop: 5, marginLeft: 11 }}
                  active
                  name="calendar"
                  size={24}
                  color="#d91009"
                />
              </Button>
            </Item>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View>
                <Button
                  style={{ marginTop: 5, marginLeft: 9 }}
                  bordered
                  info
                  // onPress={() => {
                  //     this.showAlert();
                  // }}
                  onPress={() => this.props.navigation.navigate("Paypaldemo")}
                >
                  <Text>
                    <Icon1
                      style={{ marginTop: 5, marginLeft: 11 }}
                      active
                      name="cc-paypal"
                      size={24}
                    />
                  </Text>
                </Button>
              </View>
              <View>
                <Button
                  style={{ marginTop: 5, marginLeft: 9 }}
                  bordered
                  success
                  // onPress={() => {
                  //     this.showAlert();
                  // }}
                  //onPress={() => this.props.navigation.navigate("Stripedemo")}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate("Stripedemo", {
                      duration:this.state.duration
                    });
                  }}
                >
                  <Text>
                    <Icon1
                      style={{ marginTop: 5, marginLeft: 11 }}
                      active
                      name="cc-stripe"
                      size={24}
                    />
                  </Text>
                </Button>
              </View>
            </View>
            {/* <Button style={{ marginTop: 5, marginLeft: 9 }} bordered danger
                       onPress={this.bookNow}
                        >
                            <Text>Send Request</Text>
                        </Button> */}
          </Form>

          <View style={{ flex: 1 }}>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              is24Hour={true}
              mode={"datetime"}
              date={new Date(yy, mm - 1, dd)}
            />
          </View>
        </Content>

        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="QualPros!"
          message="Thank you for payment"
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
export default BookTutionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
