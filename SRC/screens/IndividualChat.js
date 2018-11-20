import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {
    Container,
    Header,
    Left,
    Input,
    Body,
    Right,
    Thumbnail,
    Button
  } from "native-base";
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  import Ionicons from "react-native-vector-icons/Ionicons";

class IndividualChat extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
      friends : []
  }

  componentWillMount = async () => {
    const {
        friends
      } = this.props.navigation.state.params;
      await this.setState({
        friends : friends
      });
      console.log(this.state.friends)
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#d91009" }}>
          <Left style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("AddMemberToChat")}
            >
              <FontAwesome name="angle-left" size={30} color="#fff" />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{color: 'white'}}>Start Chat</Text>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid="transparent"
                onChangeText={typedText =>
                  this.setState({
                    typedText
                  })
                }
                value={this.state.typedText}
              />

              <Ionicons
                name="md-send"
                size={30}
                color="#d91009"
                onPress={this.onSubmitEditing}
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
export default IndividualChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
      },
      list: {
        paddingHorizontal: 17
      },
      footer: {
        flexDirection: "row",
        height: 60,
        backgroundColor: "#eeeeee",
        paddingHorizontal: 10,
        padding: 5
      },
      btnSend: {
        //color: "#d91009",
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: "center",
        justifyContent: "center"
      },
      iconSend: {
        width: 30,
        height: 30,
        alignSelf: "center"
      },
      inputContainer: {
        borderBottomColor: "#F5FCFF",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 10
      },
      inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: "#FFFFFF",
        flex: 1
      },
      balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20
      },
      itemIn: {
        alignSelf: "flex-start",
        backgroundColor: "#eeeeee"
      },
      itemOut: {
        alignSelf: "flex-end",
        backgroundColor: "#DCF8C5"
      },
      time: {
        alignSelf: "flex-end",
        margin: 15,
        fontSize: 12,
        color: "#808080"
      },
      item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: "row",
    
        borderRadius: 300,
        padding: 1
      },
      thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 30 / 2,
        marginLeft: 8
      }
});
