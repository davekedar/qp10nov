import React, { Component } from "react";
import { StyleSheet,TouchableOpacity, Platform, ScrollView, AsyncStorage } from "react-native";
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
import group_img from "../image/group_img.png";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class Groupmembers extends Component {
    static navigationOptions = {
        header: null
      };
  state = {
    group_members: [],
    student_id: null
  };
  componentWillMount = () => {
    this.loading();
    const { navigation } = this.props;
    groupName = navigation.getParam("groupName");
    group_id = navigation.getParam("group_id");
  };

  loading = async () => {
    const userid = await AsyncStorage.getItem("user_id");
    this.state.student_id = userid;

    try {
      let { data } = await axios.get('https://www.qualpros.com/chat/imApi/getMembers?groupId=40&userId=4').then(response => {
        //    console.log(response)
          if (response.status == 200) {
             this.setState({ group_members: response.data.response.memberList });
              console.log(response.data.response.memberList)
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
        <Left style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("ChatScreen")}
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
              Members
            </Text>
          </Body>
          <Right>

          </Right>
        </Header>
        <ScrollView>
          {this.state.group_members.map(group => {
            return (
              <Content key={group.userId}>
                <List>
                  <ListItem
                    avatar
                    
                  >
                    <Left>
                    <Thumbnail source={{uri : group.profilePictureUrl}} />
                     
                    </Left>
                    <Body>
                      <Text> {group.firstName}{group.lastName}</Text>
                      <Text note>
                        Yes I am available on Weekends for personal Tuitions
                      </Text>
                    </Body>
                    <Right>
                      <Text note>3:43 pm</Text>
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
export default Groupmembers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});