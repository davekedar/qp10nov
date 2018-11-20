import React, { Component } from "react";
import {
    View,
    TouchableOpacity, Platform,
    StyleSheet,ScrollView, AsyncStorage
} from "react-native";
import {
    Container, Button, Header, CardItem, Left,
    Body, Right, Text, Card,
} from 'native-base';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fonts from '../Theme/assets/Fonts';
import axios from 'axios';


class CalenderView extends Component {

    static navigationOptions = {
        header: null
    }
    state = {
        final_array: {},
        tution_array: [],
        tution_detail_array: [],
        isModalVisible: false,
        isDateTimePickerVisible: false,
        colorcode : null,
        status_title : null,
        tution_ids:null,
        total_payment_amount:null,
        to_show :null
    }
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
        const userid = await AsyncStorage.getItem('user_id');
        try {
            let { data } = await axios
                .post("https://www.qualpros.com/api/get_student_calendar", {
                    student_id: userid,
                })
                .then(response => {
                    //console.log(response.data.data.private_tution_date_array);
                    if (response.data.data.status === "success") {
                        this.setState({
                            tution_array: response.data.data.private_tution_date_array,
                            tution_detail_array: response.data.data.private_tution_array,
                            tution_ids: response.data.data.tution_ids,
                            total_payment_amount: response.data.data.total_payment_amount,
                            //unavailable_array: response.data.data.tutor_schedule_unavailable_date_array,
                        });
                    } else {
                        console.log(err);
                    }


                });
        } catch (err) {
            console.log(err);
        }
        //console.log(this.state.tution_array.length);
        //console.log(this.state.tution_array);
        if (this.state.tution_array.length !== 0) {
            var objP = Object.assign(
                ...this.state.tution_array.map(o => ({
                    [o]: { selected: true, selectedColor: "green", type: "present" }
                }))
            );
            //var merged = { ...objP, ...objU };
            this.setState({ final_array: objP });
            //console.log(this.state.tution_array.length);
        }

    }

    
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#d91009' }}>

                    <Left style={styles.left}>
                        <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => this.props.navigation.navigate("ProfileScreen")}>
                            <FontAwesome
                                name="angle-left"
                                size={30}
                                color='#fff'
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ alignSelf: Platform.OS == 'android' ? 'center' : 'center' }}>Calendar View</Text>
                    </Body>
                    <Right />
                </Header>
                <Text style={styles.text1}>Upcoming Bookings</Text>
                <ScrollView>
                {
                        this.state.tution_detail_array.map((tutor_dtl) => {
                           
                            console.log(tutor_dtl.status_color)
                            return (
                                <Card key={tutor_dtl.id}>
                                <CardItem>
                                        <Left>
                                            <Text style={{ fontSize: Fonts.moderateScale(15), fontWeight: 'bold' }}> {tutor_dtl.title}</Text>
                                        </Left>
                                        <Right>
                                        {tutor_dtl.status == '1' ? 
                                                                (tutor_dtl.payment_status == '0' ? 
                                                            
                                                                <Button 
                                                                // onPress={()=>{this.props.navigation.navigate('Stripedemo')}} 
                                                               
                                                                style={{ padding: 10, backgroundColor: '#563d7c', borderRadius: 40, height: 25 }}>
                                                            <Text style={{ fontSize: Fonts.moderateScale(10), fontWeight: 'bold' }}>Approved</Text> 
                                                            
                                                        </Button> : <Button style={{ padding: 10, backgroundColor: tutor_dtl.status_color, borderRadius: 40, height: 25 }}>
                                                            <Text style={{ fontSize: Fonts.moderateScale(10), fontWeight: 'bold' }}>{tutor_dtl.status_name}</Text>
                                                            
                                                        </Button>) : <Button style={{ padding: 10, backgroundColor: tutor_dtl.status_color, borderRadius: 40, height: 25 }}>
                                                            <Text style={{ fontSize: Fonts.moderateScale(10), fontWeight: 'bold' }}>{tutor_dtl.status_name}</Text> 
                                                            
                                                        </Button>}
                                            
                                            
                                        </Right>
                                    </CardItem>
                                </Card>
                            )
                        })
                    }

                    {this.state.total_payment_amount > 0 ?
                    <Button 
                                                                // onPress={()=>{this.props.navigation.navigate('Stripedemo')}} 
                                                                onPress={() => {
                      this.props.navigation.navigate("Stripedemo", {
                        final_tution_price :this.state.total_payment_amount,
                        tution_ids    :this.state.tution_ids,
                       
                     
                    });
                      
                    }}
                                                                style={{ padding: 10, backgroundColor: 'green', borderRadius: 40, height: 25,marginLeft:150,marginBottom:15,marginTop:15 }}>
                                                            <Text style={{ fontSize: Fonts.moderateScale(10), fontWeight: 'bold' }}>Pay Now</Text> 
                                                            
                                                        </Button>
                                                        : null }
                   
                    <Calendar
                        style={styles.calendar}
                        firstDay={1}
                        markedDates={this.state.final_array}
                    />
                </ScrollView>
            </Container>
        );
    }
}
export default CalenderView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#eee'
    },
    text1: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#FFF',

    },
    lable: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 10,


    },
    lableText: {
        color: '#fff',


    }

});