import React, { Component } from "react";
import {
    StyleSheet,
    Platform
} from "react-native";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Tutor from '../image/krutika.jpg'

class ChatScreen extends Component {
    render() {
        return (
            <Container>
               <Header style={{backgroundColor:'#d91009'}}>
                
                <Body>
                    <Text style={{ alignSelf: Platform.OS == 'android' ? 'center' : null,fontSize:17,color:'#fff' }}>Chat</Text>
                </Body>
            </Header>
                <Content>
                    <List>
                        <ListItem avatar onPress={()=>{this.props.navigation.navigate('ChatBox')}}>
                            <Left>
                                <Thumbnail source={Tutor} />
                            </Left>
                            <Body>
                                <Text>Krutika Adatiya</Text>
                                <Text note>Yes I am available on Weekends for personal Tuitions</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        
                    </List>
                </Content>
            </Container>
        );
    }
}
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});