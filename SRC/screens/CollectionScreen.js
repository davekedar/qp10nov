import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import {
  Button,
  Right,
  Header,
  Left,
  Body,
  Card,
  CardItem,
  Thumbnail,
  Container
} from "native-base";
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Fonts from "../Theme/assets/Fonts";
import AwesomeAlert from "react-native-awesome-alerts";
import Modal from "react-native-modal";

class CollectionScreen extends Component {
  state = {
    tutors: [],
    student_id: null,
    isModalVisible: false
  };
  componentDidMount() {
    this.props.navigation.addListener("willFocus", playload => {
      console.log(playload);
      this.loading();
    });
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  componentWillMount = () => {
    this.loading();
  };

  loading = async () => {
    const userid = await AsyncStorage.getItem("user_id");
    this.state.student_id = userid;

    try {
      let { data } = await axios
        .post("https://www.qualpros.com/api/get_favourite_tutor_list", {
          student_id: userid
        })
        .then(response => {
          if (response.data.data.status === "success") {
            this.setState({ tutors: response.data.data.tutor_list_array });
            console.log(response.data.data.tutor_list_array);
          } else {
            console.log(response.data.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      // <Container>
      //     <Header style={{ backgroundColor: '#d91009' }}>

      //         <Body>
      //             <Text style={{ alignSelf: Platform.OS == 'android' ? 'center' : null, fontSize: 17, color: '#fff' }}>Book A Private Tuition</Text>
      //         </Body>
      //     </Header>
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
              Book A Private Tuition
            </Text>
          </Body>
        </Header>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {this.state.tutors.map(tutor => {
                return (
                  <Card key={tutor.tutor_id} style={{ borderColor: "#d91009" }}>
                    <CardItem
                      style={{ borderBottomWidth: 1, borderColor: "#d91009" }}
                    >
                      <Left>
                        <Thumbnail source={{ uri: tutor.profile_image }} />
                        <Body>
                          <Text style={{ width: 220 }}>
                            {tutor.first_name} {tutor.last_name}
                          </Text>
                          <Button
                            style={{
                              padding: 10,
                              backgroundColor: "#d91009",
                              borderRadius: 40,
                              height: 25
                            }}
                          >
                            <Text
                              style={{
                                fontSize: Fonts.moderateScale(10),
                                color: "#fff"
                              }}
                            >
                              {tutor.tutor_experties_category}
                            </Text>
                          </Button>
                        </Body>
                      </Left>
                      <Right>
                        <Icon2 name="bookmark" size={24} color="#d91009" />
                      </Right>
                    </CardItem>
                    <CardItem
                      cardBody
                      style={{
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ padding: 10 }}>
                        {tutor.tutor_experties}
                      </Text>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Text>Private Tuition £{tutor.price_per_h}</Text>
                      </Left>
                      <Right>
                        <View style={{ flexDirection: "row" }}>
                          {/* <Button
                            style={{ padding: 10, backgroundColor: "#d91009" }}
                            onPress={() => {
                this.props.navigation.navigate("TutorCalender");
              }}
                          >
                            <Text style={{ color: "#fff" }}>Book Now</Text>
                          </Button> */}
                          <Button
                            style={{
                              padding: 10,
                              backgroundColor: "#d91009",
                              marginLeft: 5
                            }}
                            onPress={() =>
                              this.props.navigation.navigate("TutorDetail", {
                                tutor_id: tutor.tutor_id
                              })
                            }
                          >
                            <Text style={{ color: "#fff" }}>View Profile</Text>
                          </Button>
                        </View>
                      </Right>
                    </CardItem>
                  </Card>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Container>
    );
  }
}
export default CollectionScreen;

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: "#eee",
    height: 350
  },
  text: {
    textAlign: "center",
    borderColor: "#bbb",
    padding: 10,
    backgroundColor: "#eee"
  },
  container: {
    flex: 1,
    backgroundColor: "gray"
  }
});
