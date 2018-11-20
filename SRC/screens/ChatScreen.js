import React, { Component } from "react";
import { StyleSheet, Platform, ScrollView, AsyncStorage, FlatList, View, TouchableOpacity } from "react-native";
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
//import Tutor from "../image/krutika.jpg";
import axios from "axios";
import group_img from "../image/group_img.png";
import {ListItem, List} from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import Spinner from 'react-native-loading-spinner-overlay';

class ChatScreen extends Component {
  state = {
    groups: [],
    student_id: null
  };
  componentWillMount = async () => {
    await this.loading();
    
  };

  loading = async () => {
    this.setState({ spinner: true })
    const userid = await AsyncStorage.getItem("user_id");
    this.state.student_id = userid;

    try {
      let { data } = await axios
        .get(
          "https://www.qualpros.com/chat/imApi/getGroups?limit=100&start=0&userId="+userid,
          {
            params: {
              
            }
          }
        ) 
        .then(response => {
          if (response.status == 200) {
            this.setState({ groups: response.data.response });
            this.setState({ spinner: false })
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
        <Left />
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
          <Right>
              <TouchableOpacity
                    style={styles.backArrow}
                    onPress={() => this.props.navigation.navigate("AddMemberToChat", {
                        userid: this.state.student_id
                        })}
                  >
                    <Ionicons
                      name='md-person-add'
                      size={30}
                      color="#fff"
                    />
                  </TouchableOpacity>
          </Right>
        </Header>
        <ScrollView>
            <Spinner
              color={"#d91009"}
              visible={this.state.spinner}
              textContent={''}
              textStyle={styles1.spinnerTextStyle}
              animation={'slide'}
            />
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                  <FlatList
                    data={this.state.groups}
                    renderItem={({ item }) => (
                      <ListItem
                        // roundAvatar
                        title={item.groupName}
                        subtitle={item.mainRecentMessage}
                        avatar={item.groupType == '0' ?
                          <Thumbnail source={group_img} /> : <Thumbnail source={{uri : item.groupImage[0]}} />}
                        containerStyle={{ borderBottomWidth: 0 }}
                        onPress={()=>this.props.navigation.navigate('ChatBox', {
                        groupId: item.groupId.toString(),
                        group_im: item.groupImage[0],
                        groupName: item.groupName,
                        group_type: item.groupType,
                        
                        })}
                      />
                    )}
                    keyExtractor={item => item.groupId.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    // onRefresh={this.loading()}
                  />
                </List>
        </ScrollView>
      </Container>
    );
  }
}
export default ChatScreen;

const styles1 = StyleSheet.create({
  spinnerTextStyle: {
    color: "#d91009"
  },

}); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  chatText: {
    fontSize : 16,
    color: 'grey',
    marginLeft: 5
  }
});