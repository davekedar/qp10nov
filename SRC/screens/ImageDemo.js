import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  Image
} from "react-native";
import PhotoUpload from "react-native-photo-upload";

class ImageDemo extends Component {
  render() {
    return (
        
      <PhotoUpload
        onPhotoSelect={avatar => {
          if (avatar) {
            console.log("Image base64 string: ", avatar);
          }
        }}
      >
        <Image
          style={{
            paddingVertical: 30,
            width: 150,
            height: 150,
            borderRadius: 75
          }}
          resizeMode="cover"
          source={{
            uri:
              "https://chat.qualpros.com/images/profiles/thumb/t5PEQwWMgXXa5OVH9ZOa.jpg"
          }}
        />
      </PhotoUpload>
    );
  }
}
export default ImageDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});