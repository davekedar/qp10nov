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
  Image
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
    showTheThing: true
  };

  componentWillMount = () => {
    this.loading();
    // <ReactiveBase
    //   app="qp"
    //   credentials="jTlNh5TCo:158f2740-a132-48d8-8ad8-9e3928e4c48a"
    // >
    //   <ScrollView>
    //     <View style={styles.container}>
    //       <DataSearch
    //         componentId="searchbox"
    //         dataField={[
    //           "original_title",
    //           "original_title.search",
    //           "authors",
    //           "authors.search"
    //         ]}
    //         placeholder="Search for books"
    //         autosuggest={false}
    //       />
    //       <ReactiveList
    //         componentId="results"
    //         dataField="original_title"
    //         size={7}
    //         showResultStats={false}
    //         pagination={true}
    //         react={{
    //           and: "searchbox"
    //         }}
    //         onData={res => {
    //           // <View style={styles.result}>
    //           //     {/* <Image source={{ uri: res.image }} style={styles.image} /> */}
    //           //     <View style={styles.item}>
    //           //         <Text style={styles.title}>{res.first_name}</Text>
    //           //         <Text>{res.last_name}</Text>
    //           //         {/* <Text>{console.log(res)}</Text> */}

    //           //     </View>
    //           // </View>
    //           return (
    //             <Card key={res.tutor_id} style={{ borderColor: "#d91009" }}>
    //               <CardItem
    //                 style={{ borderBottomWidth: 1, borderColor: "#d91009" }}
    //               >
    //                 <Left>
    //                   <Thumbnail source={{ uri: res.profile_image }} />
    //                   <Body>
    //                     <Text style={{ width: 220 }}>
    //                       {res.first_name} {res.last_name}
    //                     </Text>
    //                     <Button
    //                       style={{
    //                         padding: 10,
    //                         backgroundColor: "#d91009",
    //                         borderRadius: 40,
    //                         height: 25
    //                       }}
    //                     >
    //                       <Text
    //                         style={{
    //                           fontSize: Fonts.moderateScale(10),
    //                           color: "#fff"
    //                         }}
    //                       >
    //                         {res.tutor_experties_category}
    //                       </Text>
    //                     </Button>
    //                   </Body>
    //                 </Left>
    //                 <Right>
    //                   <TouchableOpacity
    //                     onPress={() =>
    //                       this.bookmark(res.tutor_id, this.state.student_id)
    //                     }
    //                   >
    //                     <Icon2
    //                       name={
    //                         res.is_favourite_tutor == 1
    //                           ? "bookmark"
    //                           : "bookmark-o"
    //                       }
    //                       size={24}
    //                       color="#d91009"
    //                     />
    //                   </TouchableOpacity>
    //                 </Right>
    //               </CardItem>
    //               <CardItem
    //                 cardBody
    //                 style={{
    //                   justifyContent: "center",
    //                   alignItems: "center"
    //                 }}
    //               >
    //                 <Text style={{ padding: 10 }}>{res.tutor_experties}</Text>
    //               </CardItem>
    //               <CardItem>
    //                 <Left>
    //                   <Text>Private Tuition £{res.price_per_h}</Text>
    //                 </Left>
    //                 <Right>
    //                   <View style={{ flexDirection: "row" }}>
    //                     <Button
    //                       style={{ padding: 10, backgroundColor: "#d91009" }}
    //                       onPress={() =>
    //                         this.props.navigation.navigate(
    //                           "SearchScreenCalender",
    //                           {}
    //                         )
    //                       }
    //                     >
    //                       <Text style={{ color: "#fff" }}>Book Now</Text>
    //                     </Button>
    //                     <Button
    //                       style={{
    //                         padding: 10,
    //                         backgroundColor: "#d91009",
    //                         marginLeft: 5
    //                       }}
    //                       onPress={() =>
    //                         this.props.navigation.navigate("TutorDetail", {
    //                           tutor_id: res.tutor_id
    //                         })
    //                       }
    //                     >
    //                       <Text style={{ color: "#fff" }}>View Profile</Text>
    //                     </Button>
    //                   </View>
    //                 </Right>
    //               </CardItem>
    //             </Card>
    //           );
    //         }}
    //       />
    //     </View>
    //   </ScrollView>
    // </ReactiveBase>;
  };

  loading = async () => {
    const userid = await AsyncStorage.getItem("user_id");
    this.state.student_id = userid;
    try {
      let { data } = await axios
        .post("https://chat.qualpros.com/api/get_tutor_list", {
          tutor_id: "0",
          student_id: userid
        })
        .then(response => {
          if (response.data.data.status === "success") {
            this.setState({ tutors: response.data.data.tutor_list_array });
          } else {
            console.log(response.data.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  bookmark = async (tutor_id, student_id) => {
    try {
      let { data } = await axios
        .post("https://chat.qualpros.com/api/make_as_favourite_tutor", {
          tutor_id,
          student_id
        })
        .then(response => {
          if (response.data.data.status === "success") {
            this.setState({
              message: response.data.data.message,
              showAlert: true
            });
            //this.props.navigation.navigate('CollectionScreen')
          } else {
            console.log(response.data.data);

            alert(response.data.data.message);
          }
        });
    } catch (err) {
      console.log(err);
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
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ReactiveBase
            app="qp"
            credentials="jTlNh5TCo:158f2740-a132-48d8-8ad8-9e3928e4c48a"
          >
            <DataSearch
              componentId="searchbox"
              dataField={["first_name", "last_name", "tutor_experties"]}
              placeholder="Search for Tutors"
              autosuggest={false}
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
                        <Icon2
                          name={
                            res.is_favourite_tutor == 1
                              ? "bookmark"
                              : "bookmark-o"
                          }
                          size={24}
                          color="#d91009"
                        />
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
                          style={{ padding: 10, backgroundColor: "#d91009" }}
                          onPress={() =>
                            this.props.navigation.navigate(
                              "SearchScreenCalender",
                              {}
                            )
                          }
                        >
                          <Text style={{ color: "#fff" }}>Book Now</Text>
                        </Button>
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
            this.hideAlert();
          }}
        />
      </SafeAreaView>
      //   {/* <SafeAreaView style={{ flex: 1 }}>
      //     <View style={{ flex: 1 }}>
      //       <ReactiveBase
      //         app="qp"
      //         credentials="jTlNh5TCo:158f2740-a132-48d8-8ad8-9e3928e4c48a"
      //       >
      //         <DataSearch
      //           componentId="searchbox"
      //           dataField={["first_name", "last_name", "tutor_experties"]}
      //           placeholder="Search for Tutors"
      //           autosuggest={false}
      //         />
      //         <ReactiveList
      //           style={{ height: 1400 }}
      //           componentId="results"
      //           dataField="first_name"
      //           showResultStats={false}
      //           pagination={false}
      //           loader="Loading Results.."
      //           react={{
      //             and: "searchbox"
      //           }}
      //           onData={res => (
      //             <Card key={res.tutor_id} style={{ borderColor: "#d91009" }}>
      //               <CardItem
      //                 style={{ borderBottomWidth: 1, borderColor: "#d91009" }}
      //               >
      //                 <Left>
      //                   <Thumbnail source={{ uri: res.profile_image }} />
      //                   <Body>
      //                     <Text style={{ width: 220 }}>
      //                       {res.first_name} {res.last_name}
      //                     </Text>
      //                     <Button
      //                       style={{
      //                         padding: 10,
      //                         backgroundColor: "#d91009",
      //                         borderRadius: 40,
      //                         height: 25
      //                       }}
      //                     >
      //                       <Text
      //                         style={{
      //                           fontSize: Fonts.moderateScale(10),
      //                           color: "#fff"
      //                         }}
      //                       >
      //                         {res.tutor_experties_category}
      //                       </Text>
      //                     </Button>
      //                   </Body>
      //                 </Left>
      //                 <Right>
      //                   <TouchableOpacity
      //                     onPress={() =>
      //                       this.bookmark(res.tutor_id, this.state.student_id)
      //                     }
      //                   >
      //                     <Icon2
      //                       name={
      //                         res.is_favourite_tutor == 1
      //                           ? "bookmark"
      //                           : "bookmark-o"
      //                       }
      //                       size={24}
      //                       color="#d91009"
      //                     />
      //                   </TouchableOpacity>
      //                 </Right>
      //               </CardItem>
      //               <CardItem
      //                 cardBody
      //                 style={{
      //                   justifyContent: "center",
      //                   alignItems: "center"
      //                 }}
      //               >
      //                 <Text style={{ padding: 10 }}>{res.tutor_experties}</Text>
      //               </CardItem>
      //               <CardItem>
      //                 <Left>
      //                   <Text>Private Tuition £{res.price_per_h}</Text>
      //                 </Left>
      //                 <Right>
      //                   <View style={{ flexDirection: "row" }}>
      //                     <Button
      //                       style={{ padding: 10, backgroundColor: "#d91009" }}
      //                       onPress={() =>
      //                         this.props.navigation.navigate(
      //                           "SearchScreenCalender"
      //                         )
      //                       }
      //                     >
      //                       <Text style={{ color: "#fff" }}>Book Now</Text>
      //                     </Button>
      //                     <Button
      //                       style={{
      //                         padding: 10,
      //                         backgroundColor: "#d91009",
      //                         marginLeft: 5
      //                       }}
      //                       onPress={() =>
      //                         this.props.navigation.navigate("TutorDetail", {
      //                           tutor_id: res.tutor_id
      //                         })
      //                       }
      //                     >
      //                       <Text style={{ color: "#fff" }}>View Profile</Text>
      //                     </Button>
      //                   </View>
      //                 </Right>
      //               </CardItem>
      //             </Card>
      //           )}
      //         />
      //       </ReactiveBase>
      //       }
      //     </View>

      //   </SafeAreaView> */}
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
