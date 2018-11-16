import React, { Component } from "react";
import {
    View, 
    TouchableOpacity, Platform,
    StyleSheet
} from "react-native";
import {
    Container, Button, Header, CardItem, Left, Card, Content,
    Body, Right, Text,
} from 'native-base';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fonts from '../Theme/assets/Fonts';
import axios from 'axios';
import Modal from "react-native-modal";
import Icon1 from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';

class TutorCalender extends Component {
    static navigationOptions = {
        header: null
    }
        state = {
            final_array: {},
            tution_array: [],
            unavailable_array: [],
            isModalVisible: false,
            isDateTimePickerVisible: false,
        }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    componentWillMount = async () => {
        try {
            let { data } = await axios
                .post("https://chat.qualpros.com/api/get_tutor_calendar", {
                    tutor_id: 200
                })
                .then(response => {
                    //console.log(response.data.data.tutor_private_tution_date_array);
                    if (response.data.data.status === "success") {
                        this.setState({
                            tution_array: response.data.data.tutor_private_tution_date_array,
                            unavailable_array: response.data.data.tutor_schedule_unavailable_date_array,
                        });
                    } else {
                        alert("Something went wrong");
                    }
                });
        } catch (err) {
            console.log(err);
        }
        console.log(this.state.tution_array.length);
        //console.log(this.state.tution_array);
        if (this.state.tution_array.length !== 0) {
            if (this.state.unavailable_array.length !== 0) {
                console.log('tution available')
                var objP = Object.assign(
                    ...this.state.tution_array.map(o => ({
                        [o]: { selected: true, selectedColor: "green", type: "present" }
                    }))
                );
                var objU = Object.assign(
                    ...this.state.unavailable_array.map(o => ({
                        [o]: { selected: true, selectedColor: "#d91009", type: "unavailable" }
                    }))
                );
                var merged = { ...objP, ...objU };
                this.setState({ final_array: merged });
                console.log(this.state.final_array)
            }

        } else {
            console.log('tution available')
            var objP = Object.assign(
                ...this.state.tution_array.map(o => ({
                    [o]: { selected: true, selectedColor: "#d91009", type: "unavailable" }
                }))
            );
            this.setState({ final_array: objP });
            console.log(this.state.final_array)
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
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
                            // onPress={() => this.props.navigation.navigate("ChatBox")}
                        >
                            <FontAwesome
                                name="angle-left"
                                size={30}
                                color='#fff'
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ alignSelf: Platform.OS == 'android' ? 'center' : 'center' }}>Tutor calender</Text>
                    </Body>
                    <Right />
                </Header>

                {/*     <Text style={styles.text}>Calendar with marked dates and hidden arrows</Text> */}
                <Calendar
                        style={styles.calendar}
                        firstDay={1}
                        markedDates={this.state.final_array}
                    //onDayPress={(day) => { this._showDateTimePicker }}
                    onDayPress={(day) => {
                        (this._showDateTimePicker)

                        this.props.navigation.navigate('BookTutionScreen', {
                            date: day.dateString,
                            day: day.day,
                            month: day.month,
                            year: day.year,

                        });
                    }}
                    //hideArrows={true}
                />
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    is24Hour={true}
                    mode={'datetime'}
                />

            </Container>
        );
    }
}
export default TutorCalender;

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