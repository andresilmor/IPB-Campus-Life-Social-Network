import React, { useState, useEffect } from 'react'
import useFetch from "react-fetch-hook";
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import user from '../../../../images/user.png'
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import * as AiIcons from 'react-icons/ai'
import './Chat.css'
import { useSelector } from 'react-redux'


////////////////////////////////////

const Chat = ({action,onChange, onSearch, ...props}) => {
    const [search, setSearch] = useState('');
    const [searchPlaceholder, setSearchPlaceholder] = useState('Search');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState({
        user: {
            first_name: '',
            last_name: ''
        },

    });
    const user = useSelector((state) => state.user);


/////////////////////////////////////


    // const [forumModal, setForumModal] = useState(false)
    // let navigate = useNavigate();
    // function handleClose() {
    //     setForumModal(false);
    // }

    // function onItemSelected() {
    //     //setSelectedItem(item)
    //     //setForumModal(true);
    // }
//im here

      
    useEffect(() => {
        fetch("http://localhost:8000/api/chats/list/" + user.user_id)
      .then(res => res.json())
            .then((result) => {
                setItems(result);
              
            });

    }, [])
console.log(items)

        return (

            <div className='chat' >
                {items.filter((item)=>{
                                if (search==""){
                                    return item
                                }else if (item.user.user_id.toLocaleLowerCase().includes(search) || (item.user.first_name + " " + item.user.last_name).toLocaleLowerCase().includes(search)){
                                    return item
                                }
                            }).map(item => (
                 
                 <Card key={item.id} className='chat border-0' >
                     <Card.Body onClick={() => action(item.id,item.user,true)}  >
                         <Container>
                             <Row>
                                 <Col xs={2}>
                                     <Image src={user.photo} width="40" height="40" roundedCircle /></Col>
                                 <Col>
                                     <p> {item.user.first_name} {item.user.last_name}</p>
                                 </Col>
                             </Row>

                         </Container>
                     </Card.Body>
                 </Card>
                 
                 ))}
            
                <div style={{position:'fixed',bottom:'120px',right:'80px',width:'330px'}}>
                
                <Row className='chatsearch' >
                        <Col>
                            <div {...props}>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control className='rounded-pill' type="text"
                                     placeholder={searchPlaceholder} onChange={(event)=>{
                                        setSearch(event.target.value.toLocaleLowerCase())
                                     }} />
                                </Form.Group>
                            </Form>
                            </div>
                            
            
                        </Col>
                        <Col xs={1}>
                            <AiIcons.AiFillPlusCircle size={40} className='back' onClick={() => { 
                                var chatTemp = null;
                                
                                if (search.match(/[a,m]+[0-9]{5}/g) != null) {
                                    items.filter((item)=>{
                                        if (item.user.user_id==search){
                                            chatTemp = item
                                    }})

                                    if (chatTemp != null) 
                                        action(chatTemp.id,chatTemp.user,true)
                                    else 
                                         action(search,null,false)
                                
                                } else {   
                                    setSearchPlaceholder("Insert Student Number")
                                }
                                
                                }}/>
                        </Col>
                    </Row>
                
                </div>
                
                 
            </div >

        )
    }


export default Chat
  

/////////////////////////////////////////////
