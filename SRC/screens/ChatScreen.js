import React, { Component } from "react";
import { StyleSheet, Platform, ScrollView, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import Tutor from "../image/krutika.jpg";
import axios from "axios";
import group_img from "../image/group_img.png";

class ChatScreen extends Component {
  state = {
    groups: [],
    student_id: null
  };
  componentWillMount = () => {
    this.loading();
  };

  loading = async () => {
    const userid = await AsyncStorage.getItem("user_id");
    this.state.student_id = userid;

    try {
      let { data } = await axios
        .get(
          "https://www.qualpros.com/chat/imApi/getGroups?limit=10&start=0&userId=62",
          {
            params: {
              limit: 10,
              start: 0,
              iserid: 62
            }
          }
        ) 
        .then(response => {
          if (response.status == 200) {
            this.setState({ groups: response.data.response });
              console.log(response)
          } else {
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#d91009" }}>
          <Body>
            <Text
              style={{
                alignSelf: Platform.OS == "android" ? "center" : null,
                fontSize: 17,
                color: "#fff"
              }}
            >
              Chat
            </Text>
          </Body>
        </Header>
        <ScrollView>
          {this.state.groups.map(group => {
            return (
              <Content key={group.groupId}>
                <List>
                  <ListItem
                    avatar
                    onPress={() => {
                      this.props.navigation.navigate("ChatBox", {
                      group_id:group.groupId,
                     groupName:group.groupName,
                     groupType:group.groupType,
                    });
                      
                    }}
                  >
                    <Left>
                    {group.group_type === '1' ?
                    <Thumbnail source={{uri : group.groupImage}} /> :
                      <Thumbnail source={group_img} /> }
                    </Left>
                    <Body>
                      <Text> {group.groupName}</Text>
                      {<Text note>
                        Yes I am available on Weekends for personal Tuitions
                      </Text> }
                    </Body>
                    <Right>
                      <Text>3:43 pm</Text>
                    </Right>
                  </ListItem>
                </List>
              </Content>
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}
export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});