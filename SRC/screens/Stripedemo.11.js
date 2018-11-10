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



class Stripedemo extends Component {
  static navigationOptions = {
    header: null,
    showAlert: false,
    message: ""
  };

  
  

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("ProfileScreen")}
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
        <View>
          <Text>Stripe</Text>
        </View>

        
      </Container>
    );
  }
}
export default Stripedemo;
