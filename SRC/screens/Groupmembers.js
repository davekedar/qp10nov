import React, { Component } from "react";
import { StyleSheet,TouchableOpacity, Platform, ScrollView, AsyncStorage, FlatList, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import group_img from "../image/group_img.png";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {ListItem, List} from 'react-native-elements';

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
      let { data } = await axios.get('https://www.qualpros.com/chat/imApi/getMembers?groupId='+group_id+'&userId='+userid).then(response => {
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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
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
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                      <FlatList
                        data={this.state.group_members}
                        renderItem={({ item }) => (
                          <ListItem
                            roundAvatar
                            title={item.firstName + " " +item.lastName}
                            subtitle={item.mainRecentMessage}
                            avatar = {item.profilePictureUrl}
                            containerStyle={{ borderBottomWidth: 0 }}
                            chevronColor="white"
                          />
                        )}
                        keyExtractor={item => item.userId.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        // onRefresh={this.loading()}
                      />
                    </List>
          {/* {this.state.group_members.map(group => {
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
                      <Text> {group.firstName} {group.lastName}</Text>
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
          })} */}
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