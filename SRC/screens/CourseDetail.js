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

import AwesomeAlert from 'react-native-awesome-alerts';

import Tutor from '../image/krutika.jpg'



import styles1 from "../Theme/Styles/Signin";


class CourseDetail extends Component {
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
        course_lesson_array: [],
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
        const course_id = navigation.getParam('courseId');
        const userid = await AsyncStorage.getItem('user_id');

        try {
            let { data } = await axios.post('https://chat.qualpros.com/api/get_one_course', {
                course_id: course_id,
                student_id: userid
            })
                .then((response) => {

                    if (response.data.data.status === 'success') {

                        this.setState({ course_details: response.data.data.course_detail_array })
                        this.setState({ course_lession_details: response.data.data.course_lesson_array })
                        this.setState({ course_ratings_details: response.data.data.course_reviews })
                        this.setState({ course_lesson_array: response.data.data.course_lesson_array })
                        this.setState({ course_material_array: response.data.data.course_material_array })





                    } else {
                        // console.log(response.data.data);




                    }
                })
        }
        catch (err) {
            console.log(err)

        }

    }



    onStarRatingPress = async (rating) => {
        const { navigation } = this.props;
        const course_id = navigation.getParam('courseId');
        const userid = await AsyncStorage.getItem('user_id');

        try {
            let { data } = await axios.post('https://chat.qualpros.com/api/post_course_rating', {
                course_id: course_id,
                student_id: userid,
                point: this.state.selectedStarcount,
                comment: this.state.comments
            })
                .then((result) => {
                    console.log(result.data.data.status);
                    if (result.data.data.status === 'success') {

                            this.setState({
                                message: result.data.data.message,
                                showAlert: true,
                                isModalVisible: false
                            })



                    } else {
                        // console.log(response.data.data);

                        this.setState({
                            message: result.data.data.message,
                            showAlert: true,
                            isModalVisible: false
                        })


                    }
                })
        }
        catch (err) {
            // console.log(err)
            // this.setState({
            //     message: response.data.data.message,
            //     showAlert: true,
            //     isModalVisible: false
            // })
        }

    }

    onStarRating(rating) {
        this.setState({
            selectedStarcount: rating

        });
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
        this.loading();
    };

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
                        <Text style={{ alignSelf: Platform.OS == 'android' ? 'center' : null, fontSize: 17, color: '#fff' }}>Book a Course</Text>
                    </Body>
                    <Right />
                </Header>
                <ScrollView style={styles.container}>




                    <Card key="1">
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: this.state.course_details.tutor_image_url }} />
                                <Body>
                                    <Text style={{ width: 220 }}>{this.state.course_details.tutor_name}</Text>
                                  

                                        <StarRating
                                        style={{ width: 220 }}
                                            disabled={false}
                                            maxStars={5}
                                            rating={this.state.course_details.final_rating}
                                            starSize={13}
                                            fullStarColor='#d91009'

                                        //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        />
                                   
                                </Body>
                            </Left>
                            <Right>

                            </Right>
                        </CardItem>
                        <CardItem style={{ marginRight: 10 }}>
                            <Left>
                                <Image source={{ uri: this.state.course_details.course_image }} style={{ height: 120, width: 150 }} />
                                <Body>
                                    <Text style={{ width: 220, fontSize: 17, fontWeight: "bold" }}>{this.state.course_details.course_title}</Text>

                                    <Text style={{ width: 220, color: '#d91009', fontSize: 25, fontWeight: "bold" }}>£{this.state.course_details.course_price}</Text>



                                   
                                        <StarRating
                                        style={{ width: 220 }}
                                            disabled={false}
                                            maxStars={5}
                                            rating={this.state.course_details.final_rating}
                                            starSize={13}
                                            fullStarColor='#d91009'
                                        //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        />
                                  

                                </Body>
                            </Left>
                            <Right>

                            </Right>
                        </CardItem>
                        <CardItem>

                            <View>
                                <HTML html={this.state.course_details.course_description} />

                                {/* {this.state.course_details.is_rating == '1' ? */}
                                    <View>
                                        <TouchableOpacity onPress={this._toggleModal}>
                                            <Text style={{ color: '#d91009' }}>Rate Here</Text>
                                        </TouchableOpacity>
                                        <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
                                            <View style={{ flex: 1, justifyContent: 'center'}}>

                                                <Card style={{ borderColor: '#d91009' }}>


                                                    <CardItem style={{ borderBottomWidth: 1, borderColor: '#d91009' }}>
                                                        <Left>

                                                            <Body>
                                                                <Text style={{ width: 220, color: '#d91009' }}>
                                                                    Course Rating
                                                                </Text>

                                                            </Body>
                                                        </Left>
                                                        <Right>

                                                            <TouchableOpacity onPress={this._toggleModal}>
                                                                <Text>
                                                                    <Icon1 active name="close" size={24} color='#d91009' />
                                                                </Text>
                                                            </TouchableOpacity>


                                                        </Right>
                                                    </CardItem>
                                                    <CardItem>
                                                        <Left >

                                                            <Body>
                                                                {this.state.course_details.is_rated == '0' ?
                                                                    <Form>

                                                                        

                                                                            <StarRating
                                                                            style={{ marginLeft: 24, width: 220 }}
                                                                                disabled={false}
                                                                                //maxStars={}
                                                                                rating={this.state.selectedStarcount}
                                                                                starSize={25}
                                                                                halfStarEnabled
                                                                                fullStarColor='#d91009'
                                                                                //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                                                selectedStar={(rating) => this.onStarRating(rating)}
                                                                            />
                                                                        


                                                                        <Item>
                                                                            <Input
                                                                                onChangeText={(comments) => { this.setState({ comments }) }}
                                                                                style={{ marginRight: 60 }} placeholder="Comments" />
                                                                        </Item>

                                                                        <Button style={{ marginTop: 5, marginLeft: 7 }} bordered danger small onPress={this.onStarRatingPress}>
                                                                            <Text>Rate Now</Text>
                                                                        </Button>



                                                                    </Form>
                                                                    : <Text style={{ color: '#d91009' }}>Already Rated</Text>
                                                                }
                                                            </Body>
                                                        </Left>

                                                    </CardItem>


                                                </Card>

                                            </View>
                                        </Modal>
                                    </View>
                                 
                                 
                            </View>



                            {/* <Text style={{fontSize: 12, fontWeight: "bold", textAlign: 'justify' }}>{this.state.course_details.course_description}</Text> */}


                        </CardItem>
                        <CardItem>
                            <Left>

                                <Body>
                                    <Text style={{ width: 220, fontSize: 17, fontWeight: "bold" }}>{this.state.course_details.course_duration}</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Button bordered danger>
                                    <Text>Buy Now</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header bordered>
                            <Text style={{color:'#d91009' }}>Course Lessions</Text>
                        </CardItem>
                        {
                            this.state.course_lesson_array.map((course_lessons) => {
                                return (
                                    <Content key={course_lessons.lesson_id}>
                                        <List >
                                            <ListItem avatar>
                                                <Left>

                                                </Left>
                                                <Body>
                                                    <Text >
                                                        {course_lessons.lesson_title}
                                                    </Text>

                                                    <Text note>
                                                        {/* <HTML html={course_lessons.lesson_description} /> */}

                                                    </Text>
                                                    <Text note>
                                                        {course_lessons.lesson_start_on}</Text>
                                                </Body>

                                            </ListItem>

                                        </List>

                                    </Content>
                                )
                            })
                        }
                    </Card>
                    <Card>
                    <CardItem header bordered>
                            <Text style={{color:'#d91009' }}>Materials</Text>
                        </CardItem>
                        {
                            this.state.course_material_array.map((course_material) => {
                                return (
                                    <Content key={course_material.material_id}>
                                        <List >
                                            <ListItem>
                                                <Left>
                                                <Text >
                                                        {course_material.material_name}
                                                    </Text>
                                                </Left>
                                               
                                                <Right>
                                                    <Button style={{ backgroundColor: "#fff" }} onPress={()=>{course_material.material_file}}>
                                                        <FontAwesome active name="file-pdf-o" size={24} color='#d91009' />
                                                    </Button>
                                                </Right>

                                            </ListItem>

                                        </List>

                                    </Content>
                                )
                            })
                        }
                    </Card>
                    <Card>
                    <CardItem header bordered>
                            <Text style={{color:'#d91009' }}>Reviews</Text>
                        </CardItem>
                        {
                            this.state.course_ratings_details.map((course_rate) => {
                                return (
                                    <Content key={course_rate.review_id}>

                                        <List >
                                            <ListItem avatar>
                                                <Left>
                                                    <Thumbnail source={{ uri: course_rate.profile_picture }} />
                                                </Left>
                                                <Body>
                                                    <Text >
                                                        {course_rate.name}
</Text>
<StarRating
                                        style={{ width: 220 }}
                                        disabled={false}
                                                            maxStars={5}
                                                            rating={course_rate.point}
                                                            starSize={12}
                                                            halfStarEnabled='true'
                                                            fullStarColor='#d91009'
                                        //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        />
                                                        {/* <StarRating
                                                         style={{ width: 100 }}
                                                            disabled={false}
                                                            maxStars={5}
                                                            rating={course_rate.point}
                                                            starSize={12}
                                                            halfStarEnabled='true'
                                                            fullStarColor='#d91009'

                                                        /> */}
                                                      
                                                    
                                                    <Text note>{course_rate.comment}</Text>
                                                </Body>

                                            </ListItem>

                                        </List>

                                    </Content>
                                )
                            })
                        }
                        {/* <CardItem>
                            <View>
                               

                                <Image source={{ uri: this.state.course_details.course_image }} style={{ height: 200, width: 350 }} />
                            </View>
                        </CardItem> */}



                    </Card>



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


                </ScrollView>
            </Container >
        );
    }


}
export default CourseDetail;

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