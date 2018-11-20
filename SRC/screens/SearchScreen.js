import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  Image,RefreshControl
} from "react-native";
import {
  Button,
  Right,
  Left,
  Body,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList
} from "@appbaseio/reactivesearch-native"; // 0.5.0
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import in_array from "in_array";
import Fonts from "../Theme/assets/Fonts";
import AwesomeAlert from "react-native-awesome-alerts";

class SearchScreen extends Component {
  state = {
    tutors: [],
    student_id: null,
    bookmark: "bookmark-o",
    showAlert: false,
    message: "",
    onData: null,
    showTheThing: true,
    fav_tutors:[],
    fav_tutors_array:[],
  };

  // constructor(){
  //   super();
  //       this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  // };

  // forceUpdateHandler(){
  //   this.forceUpdate();
  // };


  // componentWillMount = () => {
  
  //   this.loading();
    
  // };

  componentDidMount = () => {
    this.props.navigation.addListener("willFocus", playload => {
      console.log(playload);
      this.loading();
    });
  }

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
            this.setState({ fav_tutors: response.data.data.tutor_list_array });
            {
              this.state.fav_tutors.map(ftutor => {
            this.state.fav_tutors_array.push(ftutor.tutor_id)
              })}
            console.log(this.state.fav_tutors_array);
          } else {
            // console.log(response.data.data);
          }
        });
    } catch (err) {
      console.log(err.response);
    }




  };

  bookmark = async (tutor_id, student_id) => {
    const userid = await AsyncStorage.getItem("user_id");
    this.state.student_id = userid;
    try {
      let { data } = await axios
        .post("https://www.qualpros.com/api/make_as_favourite_tutor", {  
          tutor_id,
          student_id : userid
        })
        .then(response => {
          if (response.data.data.status === "success") {
            this.setState({
              message: response.data.data.message,
              showAlert: true
            });
            this.forceUpdateHandler
            //this.props.navigation.navigate('CollectionScreen')
          } else {
            console.log(response.data.data);

            alert(response.data.data.message);
          }
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
    this.props.navigation.navigate('CollectionScreen')
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ReactiveBase
            app="qp_tutors_list1"
            credentials="S1LjqbHr0:e50993cb-fd1b-4534-9b26-afe293473db1"
          >
         
            <DataSearch
              componentId="searchbox"
              dataField={["first_name", "last_name", "tutor_experties"]}
              placeholder="Search for Tutors"
              autosuggest={false}
              showIcon={false}
            />
             

        
            <ReactiveList
              style={{ height: 1400 }}
              componentId="results"
              dataField="first_name"
              //size={25}
              showResultStats={false}
              pagination={false}
              loader="Loading Results.."
              react={{
                and: "searchbox"
              }}
              onData={res => (
                <Card key={res.tutor_id} style={{ borderColor: "#d91009" }}>
                  <CardItem
                    style={{ borderBottomWidth: 1, borderColor: "#d91009" }}
                  >
                    <Left>
                      <Thumbnail source={{ uri: res.profile_image }} />
                      <Body>
                        <Text style={{ width: 220 }}>
                          {res.first_name} {res.last_name}
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
                            {res.tutor_experties_category}
                          </Text>
                        </Button>
                      </Body>
                    </Left>
                    <Right>
                      <TouchableOpacity
                        onPress={() =>
                          this.bookmark(res.tutor_id, this.state.student_id)
                        }
                      >
                       <Icon2 name =  {in_array(res.tutor_id,this.state.fav_tutors_array)? "bookmark" : "bookmark-o"} size={24} color="#d91009"/>
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                  <CardItem
                    cardBody
                    style={{
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ padding: 10 }}>{res.tutor_experties}</Text>
                    </CardItem>
                  <CardItem>
                    <Left>
                      <Text>Private Tuition £{res.price_per_h}</Text>
                    </Left>
                    <Right>
                      <View style={{ flexDirection: "row" }}>
                        <Button
                          style={{
                            padding: 10,
                            backgroundColor: "#d91009",
                            marginLeft: 5
                          }}
                          onPress={() =>
                            this.props.navigation.navigate("TutorDetail", {
                              tutor_id: res.tutor_id
                            })
                          }
                        >
                          <Text style={{ color: "#fff" }}>View Profile</Text>
                        </Button>
                      </View>
                    </Right>
                  </CardItem>
                </Card>
              )}
            />
          </ReactiveBase>
        </View>

        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="QualPros!"
          message={this.state.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#d91009"
          onConfirmPressed={() => {
            this.hideAlert()
            
          }}
        />
      </SafeAreaView>
    );
  }
}
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 25
  },
  image: {
    width: 100
    //height: 100,
  },
  result: {
    flexDirection: "row",
    width: "100%",
    margin: 5,
    alignItems: "center"
  },
  item: {
    flexDirection: "column",
    paddingLeft: 10
  },
  title: {
    fontWeight: "bold"
  }
});