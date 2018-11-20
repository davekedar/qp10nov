import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  AsyncStorage
} from "react-native";
import Tutor from "../image/krutika.jpg";
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
import Icon1 from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import group_img from "../image/group_img.png";
import Spinner from 'react-native-loading-spinner-overlay';

export default class ChatBox extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    group_msgs: [],
    student_id: null,
    groupType: null,
    typedText: null,
    groupId: null,
    group_img1: null,
    groupName: null,
    group_type: null,
    spinner: null,
  };

  renderDate = date => {
    return <Text style={styles.time}>{date}</Text>;
  };

  componentWillMount = async () => {
    this.loading();
    const {
      groupId,
      group_im,
      groupName,
      group_type
    } = this.props.navigation.state.params;
    await this.setState({
      groupId: groupId,
      group_img1: group_im,
      groupName: groupName,
      group_type: group_type
    });
    //console.log(group_img1);
  };

  loading = async () => {
    const userid = await AsyncStorage.getItem("user_id");
    this.state.student_id = userid;

    try {
      let { data } = await axios
        .get(
          "https://www.qualpros.com/chat/imApi/getMessage?groupId=" +
            this.state.groupId +
            "&limit=10&start=0&userId="+userid
        )
        .then(response => {
          //  console.log(response)
          if (response.status == 200) {
            this.setState({ group_msgs: response.data.response });
            console.log(this.state.group_msgs.sender);
          } else {
          }
        });
    } catch (err) {
      console.log(err);
    }
    console.log(this.state.group_img1);
  };
  reset = async () => {
    this.setState({ searchText: "" });
  };
  getInitialState = function() {
    return {
      searchText: ""
    };
  };

  onSubmitEditing = async () => {
    this.setState({ spinner: true })
    try {
      var formcardBody = [];
      formcardBody.push( "groupId=" + this.state.groupId);
      formcardBody.push( "message=" + this.state.typedText);
      formcardBody.push( "userId=" + this.state.student_id);
      formcardBody = formcardBody.join("&");
      let {data} = await fetch("https://www.qualpros.com/chat/imApi/sendMessage", {
        method: "post",
        body: formcardBody,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
      
        .then(response => {
          console.log(response)
          if (response.status == 200) {
           
            this.loading();
            this.setState({ spinner: false })
          } else {
          }
        });
    } catch (error) {
      console.log(error.response);
    }
    console.log(this.state.groupId);
    console.log(this.state.typedText);
    console.log(this.state.student_id);
    this.setState({
      typedText: ""
    });
  };
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#d91009" }}>
          <Left style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("ChatScreen")}
            >
              <FontAwesome name="angle-left" size={30} color="#fff" />
            </TouchableOpacity>

            {this.state.group_type == "0" ? (
              <Thumbnail style={styles.thumbnail} source={group_img} />
            ) : (
              <Thumbnail
                style={styles.thumbnail}
                source={{ uri: this.state.group_img1 }}
              />
            )}
          </Left>
          <Body>
            {this.state.group_type == "0" ? 
            <Text
              onPress={() => {
                this.props.navigation.navigate("Groupmembers", {
                  group_id: this.state.groupId,
                  groupName: this.state.groupName,
                });
              }}
              style={{
                alignSelf: Platform.OS == "android" ? "center" : null,
                fontSize: 17,
                color: "#fff"
              }}
            >
              {this.state.groupName}
            </Text>
            : <Text>{this.state.groupName}</Text> }
          </Body>
          <Right>
            {this.state.group_type == "1" ? (
              <Button
                style={{ backgroundColor: "#d91009" }}
                onPress={() => {
                  this.props.navigation.navigate("TutorCalender");
                }}
              >
                <Icon1
                  active
                  name="calendar"
                  size={24}
                  color="#FFF"
                  onPress={this.clearText}
                />
              </Button>
            ) : null}
          </Right>
        </Header>
        <View style={styles.container}>
          <FlatList
            ref={ref => this.flatList = ref}
            onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
            onLayout={() => this.flatList.scrollToEnd({animated: true})}
            style={styles.list}
            data={this.state.group_msgs}
            keyExtractor={item => {
              return item.message.m_id.toString();
            }}
            renderItem={message => {
              const item = message.item;
              console.log(item.message.sender);
              let inMessage = item.message.sender === this.state.student_id ? "out" : "in";
              let itemStyle =
                inMessage === "in" ? styles.itemIn : styles.itemOut;
              return (
                <View style={[styles.item, itemStyle]}>
                  {item.message.type === "text" ? (
                    <View style={[styles.balloon]}>
                      <Text>{item.message.message}</Text>
                    </View>
                  ) : null}
                </View>
              );
            }}
          />
          <Spinner
          color={"#d91009"}
          visible={this.state.spinner}
          textContent={'Sending Message...'}
          textStyle={styles1.spinnerTextStyle}
          animation={'slide'}
        />
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
                value={
                  this.state.typedText
                }
              />

              <Ionicons
                name="md-send"
                size={30}
                color="#d91009"
                onPress={this.onSubmitEditing}
              />
            </View>

            {/* <TouchableOpacity style={styles.btnSend}>
                            <Ionicons name="md-send" size={36} color='#d91009' /> style={styles.iconSend} />
                        </TouchableOpacity> */}
          </View>
        </View>
      </Container>
    );
  }
}
const styles1 = StyleSheet.create({
  spinnerTextStyle: {
    color: "#d91009"
  },

}); 
const styles = StyleSheet.create({
  container: {
    flex: 1
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
