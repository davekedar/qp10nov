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
    Right,
    Item,
    Input,
    Header,
    Left,
    Body,

    Form
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Screen Styles
import styles from "../Theme/Styles/Signin";
import Logo from "../image/qualpros.png";
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class ProfileEditScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        user: [],

    }

    componentWillMount = async () => {

        const userid = await AsyncStorage.getItem('user_id');

        try {
            let { data } = await axios.post('https://chat.qualpros.com/api/get_student_profile', {
                student_id: userid
            })
                .then((response) => {

                    if (response.data.data.status === 'success') {

                        this.setState({ user: response.data.data.student_info })

                    } else {
                        console.log(response.data.data);

                        alert(response.data.data.message)


                    }
                })
        } catch (err) {
            console.log(err);
        }


    }

    edtiprofile = async () => {


        const userid = await AsyncStorage.getItem('user_id');
        try {
            let { data } = await axios.post('https://chat.qualpros.com/api/change_student_profile', {
                student_id: userid,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,


            })
                .then((response) => {
                    console.log(response.data.data.status)

                    if (response.data.data.status === 'success') {
                        this.setState({ data: response.data.data })
                        alert(response.data.data.message)
                        this.props.navigation.navigate("ProfileScreen")
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

                    <Form style={Platform.OS == 'android' ? styles.androidform : styles.form} >

                        <Item rounded style={styles.inputStyle}>
                            <Input

                                textAlign={I18nManager.isRTL ? "right" : "left"}
                                placeholder="First Name"
                                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                                returnKeyType='next'
                                value={this.state.user.first_name}
                                onChangeText={(first_name) => { this.setState({ first_name }) }}
                            />
                        </Item>
                        <Item rounded style={[styles.inputStyle, , { marginTop: 10 }]}>
                            <Input

                                textAlign={I18nManager.isRTL ? "right" : "left"}
                                placeholder="Last Name"
                                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                                returnKeyType='next'
                                value={this.state.user.last_name}
                                onChangeText={(last_name) => { this.setState({ last_name }) }}
                            />
                        </Item>
                        <Item rounded style={[styles.inputStyle, , { marginTop: 10 }]}>
                            <Input

                                textAlign={I18nManager.isRTL ? "right" : "left"}
                                placeholder="Email"
                                style={Platform.OS == 'android' ? styles.inputandroid : styles.inputmain}
                                autoCapitalize='none'
                                returnKeyType='next'
                                value={this.state.user.email}
                                onChangeText={(email) => { this.setState({ email }) }}
                            />
                        </Item>
                       


                        <TouchableOpacity info
                            style={styles.signInbtn}
                            onPress={this.edtiprofile} >
                            <Text autoCapitalize="words"
                                style={styles.buttongetstarted}
                            >
                                Edit Profile
              </Text>
                        </TouchableOpacity>

                    </Form>




                    <View
                        style={Platform.OS == 'android' ? styles.signupbottomViewandroid : styles.signupbottomView}
                    >


                    </View>
                </KeyboardAwareScrollView>
            </Container>
        );
    }
}
export default ProfileEditScreen;

