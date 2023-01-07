import React, { useRef, useState, useEffect } from 'react'
import useFetch from "react-fetch-hook";
import ScrollableFeed from 'react-scrollable-feed'
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { FormText, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { Container, Row, Col, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import * as TiIcons from 'react-icons/ti'
import * as AiIcons from 'react-icons/ai'
import './Chatid.css'
import SendMsg from './sendMsg'
import user from '../../../../images/user.png'
import Paper from '@mui/material/Paper';
const ChatId = ({ action, chat_id, user,user_creator, exist = false }) => {
    const { id } = useParams();
    const retriveMessages = () => {
        console.log('.....');
        fetch("http://localhost:8000/api/chats/" + chat_id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log({ result })
                    setItems(result["messages"]);
                },
            );
    }

    const [items, setItems] = useState([]);
    useEffect(() => {
        if (exist) {
            retriveMessages();
        } else {
        }
    }, []);

    console.log(chat_id)
    console.log(user)
    console.log(user_creator)

    return (
        <Card key={items.id}>
            <div className='chatid'>





                {/* <Scrollbars style={{height:'100%',width:'100%'}}> */}



                <div className='carte ' style={{ position: 'fixed', bottom: '600px', right: '380px' }}>

                    <TiIcons.TiArrowBack size={40} className='back' onClick={() => action('back')} />

                </div>



                <Container>
                    <Row>
                        <Col>

                            <Paper style={{ maxHeight: "26.5em", overflow: 'auto', marginTop: '2em', borderColor: "white" }}>
                                <ScrollableFeed>
                                    {items.map(item => {

                                        return (
                                            <div className={user.user_id === item.sender_id?'message_receiver':"message_sender"}>

                                                {/*items.map(item=>{
                                                     if (user.user_id===item.sender_id){
                                                    return (
                                                        <p className='name'>{user.first_name} {user.last_name}</p>

                                                    )

                                                }else{
                                                    return (
                                                        <p className='name'>{user_creator.first_name} {user_creator.last_name}</p>
                                                    )
                                                }})*/}
                                                    {/*<p className='name'>{user.first_name} {user.last_name}</p>*/}
                                                <Card className='rounded-pill' >
                                                    <Card.Body style={{}}>

                                                        {item.content}

                                                    </Card.Body>
                                                </Card>
                                            </div>)


                                    })}</ScrollableFeed>



                            </Paper>
                        </Col>
                    </Row>
                </Container>
                <Card.Footer style={{ position: 'fixed', bottom: '111px', right: '38px', backgroundColor: 'white', borderColor: 'white', width: '400px' }}>
                    <SendMsg chat_id={chat_id} exist={exist} retriveMessages={retriveMessages} />
                </Card.Footer>
            </div></Card>
    )
}

export default ChatId;