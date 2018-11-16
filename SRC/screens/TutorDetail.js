import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import {
  Container,
  Button,
  Header,
  Card,
  CardItem,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Icon2 from "react-native-vector-icons/FontAwesome";
//import {ReadMore, RegularText} from 'react-native-read-more-text';
import ViewMoreText from "react-native-view-more-text";
import Modal from "react-native-modal";

import Video from "react-native-af-video-player";
import video_img from "../image/qualpros.png";

class TutorDetail extends Component {
  static navigationOptions = {
    header: null
  };
  // static navigationOptions = ({ navigation }) => {
  //   const { state } = navigation;
  //   // Setup the header and tabBarVisible status
  //   const header = state.params && (state.params.fullscreen ? undefined : null);
  //   const tabBarVisible = state.params ? state.params.fullscreen : true;
  //   return {
  //     // For stack navigators, you can hide the header bar like so
  //     header,
  //     // For the tab navigators, you can hide the tab bar like so
  //     tabBarVisible
  //   };
  // };
  state = {
    tutor_id: null,
    tutors: [],
    tutor_courses: [],
    experties_category_array: [],
    qualification: "angle-down",
    experties: "angle-down",
    courses: "angle-down",
    isModalVisible: false
  };
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  componentDidMount() {
    this.props.navigation.addListener("willFocus", playload => {
      console.log(playload);
      this.loading();
    });
  }

  componentWillMount = async () => {
    this.loading();
  };
  loading = async () => {
    const { navigation } = this.props;
    const tutor_id = navigation.getParam("tutor_id");
    await this.setState({
      tutor_id
    });
    try {
      let { data } = await axios
        .post("https://chat.qualpros.com/api/get_one_tutor", {
          tutor_id: this.state.tutor_id
        })
        .then(response => {
          console.log(response.data.data);
          if (response.data.data.status === "success") {
            this.setState({ tutors: response.data.data.tutor_detail_array });
            this.setState({
              tutor_courses: response.data.data.tutor_course_array
            });
            this.setState({
              experties_category_array:
                response.data.data.tutor_experties_category_array
            });
          } else {
            console.log(response.data.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  qualification = arrow => {
    this.setState({
      qualification: arrow === "angle-down" ? "angle-up" : "angle-down"
    });
  };
  experties = arrow => {
    this.setState({
      experties: arrow === "angle-down" ? "angle-up" : "angle-down"
    });
  };
  courses = arrow => {
    this.setState({
      courses: arrow === "angle-down" ? "angle-up" : "angle-down"
    });
  };

  renderViewMore(onPress) {
    return (
      //   <Text onPress={onPress} style={{color: '#d91009', textAlign: 'center'}}>Read more</Text>
      //   <Icon2 onPress={onPress} style={{textAlign: 'center'}} name='angle-down' size={30} color='#d91009' />
      <Button
        onPress={onPress}
        style={{
          alignSelf: "center",
          padding: 10,
          marginTop: 10,
          backgroundColor: "#d91009",
          borderRadius: 80,
          height: 35
        }}
      >
        <Icon2 name="angle-down" size={24} color="#fff" />
      </Button>
    );
  }
  renderViewLess(onPress) {
    return (
      //   <Text onPress={onPress} style={{color: '#d91009', textAlign: 'center'}}>Read less</Text>
      // <Icon2 onPress={onPress} name='angle-up' size={30} style={{ textAlign: 'center' }} color='#d91009' />
      <Button
        onPress={onPress}
        style={{
          alignSelf: "center",
          padding: 10,
          marginTop: 10,
          backgroundColor: "#d91009",
          borderRadius: 80,
          height: 35
        }}
      >
        <Icon2 name="angle-up" size={24} color="#fff" />
      </Button>
    );
  }
  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
    });
  }

  onMorePress() {
    Alert.alert("Boom", "This is an action call!", [{ text: "Aw yeah!" }]);
  }

  render() {
    
    const logo = 
    "../image/qualpros.png";
    const placeholder =
    "../image/qualpros.png";
    const title = "Profile Video";

    return (
      <Container>
        <Header style={{ backgroundColor: "#d91009" }}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("SearchScreen")}
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
              Tutor Detail
            </Text>
          </Body>
          <Right />
        </Header>

        <ScrollView style={styles.container}>
          {this.state.tutors.map(tutor => {
            return (
              <Card key="1">
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: tutor.profile_image }} />
                    <Body>
                      <Text style={{ width: 220 }}>
                        {tutor.first_name} {tutor.last_name}
                      </Text>
                      <Text note style={{ width: 220 }}>
                        {tutor.tutor_experties_category}
                      </Text>
                    </Body>
                  </Left>
                  <Right />
                </CardItem>
                <View> 
                {tutor.tutor_profile_video === "" ? null :
                <Video
                        //autoPlay
                        url={tutor.tutor_profile_video}
                        title={tutor.first_name}
                        logo={tutor.profile_image}
                        placeholder={tutor.profile_image}
                        //onMorePress={() => this.onMorePress()}
                        onFullScreen={status => this.onFullScreen(status)}
                        //fullScreenOnly
                        rotateToFullScreen
                        lockPortraitOnFsExit
                      />
                }
                  
                  
                </View>
                <CardItem />
                <CardItem cardBody>
                  <View style={styles.body}>
                    <ViewMoreText
                      numberOfLines={3}
                      renderViewMore={this.renderViewMore}
                      renderViewLess={this.renderViewLess}
                    >
                      <Text style={styles.body_txt}>{tutor.tutor_profile}</Text>
                    </ViewMoreText>
                  </View>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text>Private Tuition £{tutor.price_per_h}</Text>
                  </Left>
                  <Right>
                    <Button
                      style={{ padding: 10, backgroundColor: "#d91009" }}
                      onPress={() => {
                this.props.navigation.navigate("TutorCalender");
              }}
                    >
                      <Text>Book Now</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            );
          })}
          <View style={styles.data} flexDirection="row">
            <Text>Qualifications</Text>
            <TouchableOpacity
              onPress={() => this.qualification(this.state.qualification)}
            >
              <FontAwesome name={this.state.qualification} size={24} />
            </TouchableOpacity>
          </View>

          {this.state.qualification == "angle-up" ? (
            <View style={styles.dataIn}>
              {this.state.tutors.map(tutor => {
                return <Text key="1">{tutor.qualifications}</Text>;
              })}
            </View>
          ) : null}
          <View style={styles.data} flexDirection="row">
            <Text>Expertise</Text>
            <TouchableOpacity
              onPress={() => this.experties(this.state.experties)}
            >
              <FontAwesome name={this.state.experties} size={24} />
            </TouchableOpacity>
          </View>
          {this.state.experties == "angle-up" ? (
            <View style={styles.dataIn}>
              {this.state.experties_category_array.map(experties_category => {
                return (
                  <ListItem key={experties_category.category_id}>
                    <Text>{experties_category.category_name}</Text>
                  </ListItem>
                );
              })}
            </View>
          ) : null}
          <View style={styles.data} flexDirection="row">
            <Text>Courses</Text>
            <TouchableOpacity onPress={() => this.courses(this.state.courses)}>
              <FontAwesome name={this.state.courses} size={24} />
            </TouchableOpacity>
          </View>

          {this.state.courses == "angle-up" ? (
            <View style={styles.dataIn}>
              {this.state.tutor_courses.map(tutor_course => {
                return (
                  <ListItem
                    key={tutor_course.course_id}
                    onPress={() => {
                      this.props.navigation.navigate("CourseDetail", {
                        courseId: tutor_course.course_id
                      });
                    }}
                  >
                    <Text>{tutor_course.course_title}</Text>
                  </ListItem>
                );
              })}
            </View>
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}
export default TutorDetail;

const styles = StyleSheet.create({
  body: {
    paddingLeft: 10,
    paddingRight: 10
  },
  body_txt: {
    textAlign: "justify"
  },
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
    flex: 1
    //backgroundColor: 'gray'
  },
  data: {
    borderColor: "#d91009",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between"
  },
  dataIn: {
    backgroundColor: "white",
    padding: 10
  }
});