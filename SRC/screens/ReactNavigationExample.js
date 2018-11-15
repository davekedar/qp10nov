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

import Video from "react-native-af-video-player";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class ReactNavigationExample extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    // Setup the header and tabBarVisible status
    const header = state.params && (state.params.fullscreen ? undefined : null);
    const tabBarVisible = state.params ? state.params.fullscreen : true;
    return {
      // For stack navigators, you can hide the header bar like so
      header,
      // For the tab navigators, you can hide the tab bar like so
      tabBarVisible
    };
  };

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
    const url =
      "https://qualpros-bucket.s3.eu-west-2.amazonaws.com/profiles/Krutika-Adatia.mp4";
    const logo =
      "https://chat.qualpros.com/images/profiles/thumb/t5PEQwWMgXXa5OVH9ZOa.jpg";
    const placeholder =
      "https://chat.qualpros.com/images/profiles/thumb/t5PEQwWMgXXa5OVH9ZOa.jpg";
    const title = "My video title";

    return (
      <Container>
        
        <View style={styles.container}>
          <ScrollView>
            <Text />
          </ScrollView>
          <Video
            //autoPlay
            url={url}
            title={title}
            logo={logo}
            placeholder={placeholder}
            onMorePress={() => this.onMorePress()}
            onFullScreen={status => this.onFullScreen(status)}
            //fullScreenOnly
          />
          <ScrollView>
            <Text />
          </ScrollView>
        </View>
      </Container>
    );
  }
}

export default ReactNavigationExample;