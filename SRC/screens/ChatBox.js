import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
    Platform
} from 'react-native';
import Tutor from '../image/krutika.jpg'
import { Container, Header, Left, Input,Body, Right, Thumbnail,Button } from "native-base"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';


export default class ChatBox extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: '1', date: "9:50 am", type: 'out', message: "Hello Krutika, can you help me with a tricky past paper question? " },
                { id: '2', date: "9:51 am", type: 'in', message: "Hello Michael, yes of course. Which paper are you struggling with and when would you like to start?" },
                { id: '3', date: "9:55 am", type: 'out', message: "Please can we start this weekend? I would like you to help me with the 2018 paper. " },
                { id: '4', date: "9:57 am", type: 'in', message: "Yes. I am available on weekends. Please book a private tuition session." },
            ]
        };
    }

    renderDate = (date) => {
        return (
            <Text style={styles.time}>
                {date}
            </Text>
        );
    }

    render() {

        return (
            <Container>
                <Header style={{ backgroundColor: '#d91009' }}>
                
                    <Left style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => this.props.navigation.navigate("ChatScreen")}
                        >
                            <FontAwesome
                                name="angle-left"
                                size={30}
                                color='#fff'
                            />
                        </TouchableOpacity>
                    
                    <Thumbnail source={Tutor} style={{marginLeft:8,width: 30, height: 30, borderRadius: 30/2}}/>
                    </Left>
                    <Body>
                        <Text style={{ alignSelf: Platform.OS == 'android' ? 'center' : null,fontSize:17,color:'#fff' }}>Krutika Adatiya</Text>
                    </Body>
                    <Right>
                    <Button style={{backgroundColor:'#d91009'}} 
                    onPress={()=>{this.props.navigation.navigate('TutorCalender')}}>
                    <Icon1 active name="calendar" size={24} color='#FFF' />
                    </Button>
                               
                            
                        </Right>
                </Header>
                <View style={styles.container}>
                    <FlatList style={styles.list}
                        data={this.state.data}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        renderItem={(message) => {
                            console.log(item);
                            const item = message.item;
                            let inMessage = item.type === 'in';
                            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
                            return (
                                <View style={[styles.item, itemStyle]}>
                                    <View style={[styles.balloon]}>
                                        <Text>{item.message}</Text>
                                    </View>
                                </View>
                            )
                        }} />
                    <View style={styles.footer}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Write a message..."
                                underlineColorAndroid='transparent'
                                onChangeText={(name_address) => this.setState({ name_address })} />
                        </View>

                        {/* <TouchableOpacity style={styles.btnSend}>
                            <Ionicons name="md-send" size={36} color='#d91009' /> style={styles.iconSend} />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        paddingHorizontal: 17,
    },
    footer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 10,
        padding: 5,
    },
    btnSend: {
        //color: "#d91009",
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSend: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
    },
    itemIn: {
        alignSelf: 'flex-start',
        backgroundColor: '#eeeeee'
    },
    itemOut: {
        alignSelf: 'flex-end',
        backgroundColor: "#DCF8C5",
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize: 12,
        color: "#808080",
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',

        borderRadius: 300,
        padding: 1,
    },
});