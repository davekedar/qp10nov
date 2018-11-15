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
import Hyperlink from 'react-native-hyperlink'

export default class ChatBox extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    group_msgs: [],
    student_id: null,
    groupType:null,
    typedText:null

  };
 
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: [
  //       {
  //         id: "1",
  //         date: "9:50 am",
  //         type: "out",
  //         message:
  //           "Hello Krutika, can you help me with a tricky past paper question? "
  //       },
  //       {
  //         id: "2",
  //         date: "9:51 am",
  //         type: "in",
  //         message:
  //           "Hello Michael, yes of course. Which paper are you struggling with and when would you like to start?"
  //       },
  //       {
  //         id: "3",
  //         date: "9:55 am",
  //         type: "out",
  //         message:
  //           "Please can we start this weekend? I would like you to help me with the 2018 paper. "
  //       },
  //       {
  //         id: "4",
  //         date: "9:57 am",
  //         type: "in",
  //         message:
  //           "Yes. I am available on weekends. Please book a private tuition session."
  //       }
  //     ]
  //   };
  // }

  renderDate = date => {
    return <Text style={styles.time}>{date}</Text>;
  };

  componentWillMount = () => {
    this.loading();
    const { navigation } = this.props;
    groupName = navigation.getParam("groupName");
    group_id = navigation.getParam("group_id");
    groupType = navigation.getParam("groupType");
  };

  loading = async () => {
    const userid = await AsyncStorage.getItem("user_id");
    this.state.student_id = userid;

    try {
      let { data } = await axios.get('https://www.qualpros.com/chat/imApi/getMessage?groupId=6&limit=10&start=0&userId=62').then(response => {
          //  console.log(response)
          if (response.status == 200) {
             this.setState({ group_msgs: response.data.response });
              console.log(response.data.response)
          } else {
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  reset = async () => {
    this.setState({searchText: ''})
}
getInitialState=function () {
  return {
    searchText: ''
  }
}


onSubmitEditing = async () => {
  // console.log('dfd')
    this.setState({
        typedText:"",
    })
}
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

            <Thumbnail
              source={Tutor}
              style={{
                marginLeft: 8,
                width: 30,
                height: 30,
                borderRadius: 30 / 2
              }}
            />
          </Left>
          <Body>
           
              <Text 
               onPress={() => {
                   
                    this.props.navigation.navigate("Groupmembers", {
                      group_id:group_id,
                      groupname:groupName,
                    });
                  }}
                style={{
                  alignSelf: Platform.OS == "android" ? "center" : null,
                  fontSize: 17,
                  color: "#fff"
                }}
              >
                {groupName}
              </Text>
            
          </Body>
          <Right>
          {groupType == '1' ?
            <Button
              style={{ backgroundColor: "#d91009" }}
              onPress={() => {
                this.props.navigation.navigate("TutorCalender");
              }}
            >
         
              <Icon1 active name="calendar" size={24} color="#FFF" onPress={this.clearText} />
            </Button>
            : null 
         }
          </Right>
        </Header>
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            data={this.state.group_msgs}
            keyExtractor={item => {
              return item.message.m_id;
            }}
            renderItem={message => {
              const item = message.item;
              console.log(item.message.sender);
              let inMessage = (item.message.sender === '62') ? 'out' : 'in';
              let itemStyle = (inMessage === 'in') ? styles.itemIn : styles.itemOut;
              return (
                <View style={[styles.item, itemStyle]}>
                  
                  {item.message.type === 'text'? <View style={[styles.balloon]}><Text>{item.message.message}</Text></View>:
                  null
                  }
                  
                </View>
              );
            }}
          />
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid="transparent"
                onChangeText={(typedText)=>this.setState({
                    typedText
                })}
                value={this.state.typedText === ''  ? null : this.state.typedText}

               
              />
              
                 <Ionicons name="md-send" size={30} color='#d91009' onPress={(this.onSubmitEditing)}/>
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
  }
});