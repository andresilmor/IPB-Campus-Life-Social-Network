import React, { useRef,useState, useEffect } from 'react'
import useFetch from "react-fetch-hook";
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { FormText, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { Container, Row, Col, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import * as TiIcons from 'react-icons/ti'
import * as AiIcons from 'react-icons/ai'
import './Chat.css'
import SendMsg from './sendMsg'
import user from '../../../../images/user.png'
import Paper from '@mui/material/Paper';
const ChatId = ({action, chat_id, user,exist=false}) =>{
    const {id}= useParams();
    
    const [items, setItems] = useState([]);
    useEffect(() => {
        if(exist){


            fetch("http://localhost:8000/api/chats/" + chat_id)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        setItems(result["messages"]);
                    },
                );
        } else {
        }

    }, []);
    console.log(chat_id)
   
    return (
        <Card key={items.id}>
        <div className='chatid'>
        
                  
        
            
            
            {/* <Scrollbars style={{height:'100%',width:'100%'}}> */}
            
            
                    
                                    <div className='carte 'style={{position:'fixed',bottom:'600px',right:'380px'}}>
                                        
                                            <TiIcons.TiArrowBack size={40} className='back' onClick={() => action('back')}/>
                                       
                                    </div>
                                
                    
              
            <Container>
                <Row>
                    <Col>
                    <Paper style={{maxHeight: "26.5em", overflow: 'auto',marginTop:'2em', borderColor: "white"}}>
                            {items.map(item => (
                                        <div className='message'style={{}}>
                                            
                                                <p className='name'>{item.date_created}</p>
                                                
                                                    <Card className='rounded-pill' >
                                                        <Card.Body >
                                                            {item.content}
                                                        </Card.Body>
                                                    </Card>
                                                
                                            </div>
                            ))}
                        


                        </Paper>
                    </Col>
                </Row>
            </Container>
            <Card.Footer style={{position:'fixed',bottom:'111px',right:'38px',backgroundColor:'white',borderColor:'white',width:'400px'}}>
            <SendMsg chat_id={chat_id} exist={exist}  />
            </Card.Footer>
        </div></Card>
    )
}

export default ChatId;