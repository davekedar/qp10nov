import React, { Component } from "react";
import {
    StyleSheet,
    ScrollView,
    Platform,
    TouchableOpacity,
    View, Image,
    AsyncStorage,
    TouchableHighlight, I18nManager
} from "react-native";
import {
    Container, Button, Header, Card, CardItem, Content, List, ListItem, Left,
    Body, Right, Thumbnail, Text, Input, Form, Item
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import HTML from 'react-native-render-html';
import StarRating from 'react-native-star-rating';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import Video from "react-native-af-video-player";
import video_img from "../image/qualpros.png";

import AwesomeAlert from 'react-native-awesome-alerts';

import Tutor from '../image/krutika.jpg'



import styles1 from "../Theme/Styles/Signin";


class Chapter_detail extends Component {
    static navigationOptions = {
        header: null,
        showAlert: false,
        message: ''
        
      }
    state = {
        tutor_id: null,
        course_details: [],
        course_lession_details: [],
        course_ratings_details: [],
        course_chapter_array: [],
        course_material_array: [],
        isModalVisible: false,
        comments: null,
        selectedStarcount: null

    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (playload) => {
            console.log(playload);
            this.loading();
        });
    }



    componentWillMount = async () => {
        this.loading();
    }
    loading = async () => {
        const { navigation } = this.props;
        const chapter_id = navigation.getParam('chapter_id');
        const course_id = navigation.getParam('course_id');
        const userid = await AsyncStorage.getItem('user_id');

        try {
            let { data } = await axios.post('https://www.qualpros.com/api/get_course_lesson', {
                chapter_id: chapter_id,
                course_id: course_id,
                student_id: userid
            })
                .then((response) => {
 console.log(response.data.data);
                    if (response.data.data.status === 'success') {

                        this.setState({ course_chapter_array: response.data.data.course_chapter_array })
                        this.setState({ course_lession_details: response.data.data.course_lesson_array })
                        this.setState({ course_details: response.data.data.course_detail_array })
                       





                    } else {
                        // console.log(response.data.data);




                    }
                })
        }
        catch (err) {
            console.log(err)

        }

    }

    render() {
        const {goBack} = this.props.navigation;

        return (

            <Container>
                <Header style={{ backgroundColor: '#d91009' }}>

                    <Left style={styles.left}>
                        <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => goBack()}
                            // onPress={() => this.props.navigation.navigate("SearchScreen")}
                        >
                            <FontAwesome
                                name="angle-left"
                                size={30}
                                color='#fff'
                              />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ alignSelf: Platform.OS == 'android' ? 'center' : null, fontSize: 17, color: '#fff' }}>
                        {this.state.course_chapter_array.chapter_title}</Text>
                    </Body>
                    <Right />
                </Header>
                <ScrollView style={styles.container}>
                <Card>
                        <CardItem header bordered>
                            <Text style={{color:'#d91009' }}>Chapter Lessions</Text>
                        </CardItem>
                        {
                            this.state.course_lession_details.map((course_lession) => {
                                return (
                                    <Content key={course_lession.lesson_id}>
                                        <List >
                                            <ListItem avatar>
                                                <Left>

                                                </Left>
                                                <Body>
                                               
                                     {course_lession.lesson_video_url == "" ? null :             
                    <Video
                            //autoPlay
                            url={course_lession.lesson_video_url}
                            title={course_lession.lesson_title}
                            logo={video_img}
                            placeholder={video_img}
                            onFullScreen={status => this.onFullScreen(status)}
                            rotateToFullScreen
                            lockPortraitOnFsExit
                        />
                                     }
                     
                                                    <Text style={{fontWeight:"bold",fontSize:20}}>
                                                        {course_lession.lesson_title}
                                                    </Text>
                                                    <Text >
                                                        {course_lession.lesson_duration}
                                                    </Text>
                                                    
                                                    <HTML html={ course_lession.lesson_description} />
                                                       
                                                    
                                                    
                                                   
                                                    {/* <Text note>
                                                        {course_lessons.lesson_start_on}</Text> */}
                                                </Body>

                                            </ListItem>

                                        </List>

                                    </Content>
                                    
                                )
                            })
                        }
                    </Card>



                    
                </ScrollView>
            </Container >
        );
    }


}
export default Chapter_detail;

const styles = StyleSheet.create({
    body: {

        paddingLeft: 10,
        paddingRight: 10
    },
    body_txt: {

        textAlign: 'justify'
    },
    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 350
    },
    text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#eee'
    },
    container: {
        flex: 1,
        //backgroundColor: 'gray'
    },
    data: {
        borderColor: '#d91009',
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'space-between'
    },
    dataIn: {

        backgroundColor: 'white',
        padding: 10,

    },
    
});