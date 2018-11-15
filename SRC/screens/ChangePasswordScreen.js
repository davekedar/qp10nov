import React, { Component } from "react";
import {
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    I18nManager,
    StyleSheet,
    AsyncStorage,
    KeyboardAvoidingView,

} from "react-native";
import {
    Container,
    Button,
    Icon,
    Right,
    Item,
    Input,
    Header,
    Left,
    Body,
    Title,
    Form
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screen Styles
import styles from "../Theme/Styles/Signin";
import Logo from "../image/qualpros.png";
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class SignUpScreen extends Component {
    static navigationOptions = {
        header: null
    }


    signIn = async () => {
        const userid = await AsyncStorage.getItem('user_id');
        try {
            let { data } = await axios.post('https://chat.qualpros.com/api/student_change_password', {

                student_id: userid,
                password: this.state.password,
                confirmation_password: this.state.confirm_password,

            })
                .then((response) => {
                    if (response.data.data.status === 'success') {
                        this.setState({ data: response.data.data })
                        alert(response.data.data.message)
                        this.props.navigation.navigate("WelcomeScreen")
                        AsyncStorage.clear()
                        this.props.navigation.navigate('AuthLoading')
                    } else {
                        console.log(response.data.data);
                        alert(response.data.data.message)

                    }
                })
        } catch (err) {
            console.log(err);
        }
        console.log(this.state.data)
    }



    render() {
        return (
            <Container>
                <KeyboardAwareScrollView>
                    <Header style={styles.header}>
                        <Left style={styles.left}>
                            <TouchableOpacity
                                style={styles.backArrow}
                                onPress={() => this.props.navigation.navigate("ProfileScreen")}
                            >
                                <FontAwesome
                                    name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                                    size={30}
                                    color="#6f6f6f"
                                />
                            </TouchableOpacity>
                        </Left>
                        <Body style={styles.body} />
                        <Right style={styles.right} />
                    </Header>

                    <View style={styles.signuplogosec}>
                        <Image source={Logo} style={styles.signuplogostyle} />
                    </View>

                    <Form
                        style={Platform.OS == 'android' ? styles.androidform : styles.form}
                    >

                        <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
                            <Input

                                placeholder="Password"
                                secureTextEntry={true}
                                textAlign={I18nManager.isRTL ? "right" : "left"}
                                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                                onChangeText={(password) => { this.setState({ password }) }}
                                returnKeyType='next'
                            />
                        </Item>
                        <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
                            <Input

                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                textAlign={I18nManager.isRTL ? "right" : "left"}
                                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                                onChangeText={(confirm_password) => { this.setState({ confirm_password }) }}
                                returnKeyType='done'
                            />
                        </Item>
                        <TouchableOpacity
                            info
                            style={styles.signInbtn}
                            onPress={this.signIn}
                        >
                            <Text autoCapitalize="words"
                                style={styles.buttongetstarted}
                            >
                                Change Password
              </Text>
                        </TouchableOpacity>
                    </Form>



                </KeyboardAwareScrollView>
            </Container>
        );
    }
}
export default SignUpScreen;