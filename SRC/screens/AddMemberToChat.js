import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, AsyncStorage, FlatList } from "react-native";
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Thumbnail,
  Button
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';


class AddMemberToChat extends Component {
    static navigationOptions = {
        header: null
      };
      state = {
          student_id : null,
          friendlist : [],
          checked : [],
          spinner: null,
      }
      componentWillMount = () => {
        this.loading();

      };
    
      loading = async () => {
        const userid = await AsyncStorage.getItem("user_id");
        this.state.student_id = userid;
        this.setState({ spinner: true })
        try {
          let { data } = await axios
            .get(
              "https://www.qualpros.com/chat/user/filterFriendList?userId="+userid,
              {
                params: {
                  
                }
              }
            ) 
            .then(response => {
              if (response.status == 200) {
                this.setState({ friendlist: response.data.response });
                this.setState({ spinner: false })
              } else {
              }
            });
        } catch (err) {
          console.log(err);
        }
      };

      checkItem = (item) => {
        const { checked } = this.state;
        var newArr = [];
    
        if (!checked.includes(item)) {
            newArr = [...checked, item];
        } else {
          newArr = checked.filter(a => a !== item);
        }
        this.setState({ checked: newArr }, () => console.log('updated state', newArr))
    };

    groupCreate = async () => {
        this.setState({ spinner: true })
        var formcardBody = [];
        this.state.checked.map((data) => {
            
                formcardBody.push( "memberId[]=" + data)
                console.log(data)
            
          })
          try {
            formcardBody.push( "userId=" + this.state.student_id);
            formcardBody = formcardBody.join("&");
            let {data} = await fetch("https://www.qualpros.com/chat/imApi/createGroupByMember", {
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
                  this.setState({ spinner: false })
                } else {
                }
              });
          } catch (error) {
            //alert('Something Went Wrong')
            console.log(error.response);
          }
          this.props.navigation.navigate('ChatScreen');
    }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#d91009" }}>
          <Left>
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
                fontSize: 16,
                color: "#fff"
              }}
            >
              Select Members
            </Text>
          </Body>
          <Right>
          {this.state.checked.length !== 0 ? <Button transparent onPress={()=> this.groupCreate()}>
                                <Text style={{color:'white'}}>Start Chat</Text>
                            </Button> : null}
          </Right>
        </Header>
        <View>
        <Spinner
          color={"#d91009"}
          visible={this.state.spinner}
          textContent={''}
          textStyle={styles1.spinnerTextStyle}
          animation={'slide'}
        />
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                        data={this.state.friendlist}
                        extraData={this.state.checked}
                        renderItem={({ item }) => (
                        <ListItem
                            title={<CheckBox
                            title={item.role_id === '3' ? item.firstName + ' ' + item.lastName + ' ' + 'Tutor' : item.firstName + ' ' + item.lastName}
                            checkedColor='#d91009'
                            avatar = {item.profilePictureUrl}
                            onPress={() => this.checkItem(item.userId)}
                            checked={this.state.checked.includes(item.userId)}
                            containerStyle={styles.checkBox}
                            />}
                            chevronColor="white"
                            
                            onPress={()=>alert('Click on "Start Chat" on Top bar')}
                        />
                        )}
                        containerStyle={styles.list}
                        keyExtractor={item => item.userId.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                    </List>
                    </View>
      </Container>
    );
  }
}
export default AddMemberToChat;
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
  checkBox: {
      backgroundColor: 'white',
      borderWidth: 0,
      padding: 1
  },
  list: {
      padding : 1,
  }
});
