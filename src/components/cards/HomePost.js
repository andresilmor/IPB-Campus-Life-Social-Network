import React from 'react'
import classes from "./HomePost.module.css"
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import useFetch from "react-fetch-hook";
import Card from 'react-bootstrap/Card'
import { Form, FormControl, InputGroup, Modal, Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import user from '../../images/user.png'
import imag5 from '../../images/5.png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { IconButton } from '@mui/material';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { UserInfoStyleB } from '../informationDisplay';
import { ClassNames } from '@emotion/react';
import { ButtonIconText } from '../buttons';
import { CommentIcon, LikeIcon } from '../icons';

const HomePost = ({item}) => {
  
    const [forumModal, setForumModal] = useState(false)
    const [PostModal, setPostModal] = useState(false)

    function openForumModal() {
      setForumModal(true);
    }

    function handleClose() {
      setForumModal(false);
    }
  

  
    function openPostModal() {
      setPostModal(true);
    }

    return (
      <>
       <Container>
        <Card key={item.id} className={[classes.post].join(' ')} >
            <Card.Body onClick={openForumModal} >
                <Row>
                  <UserInfoStyleB name={item.author.first_name + " " + item.author.last_name} studentNumber={item.author.user_id} avatar={item.author.photo}></UserInfoStyleB>
                </Row>

                <Row className="mt-4">
                  {item.attachment.length > 0 &&
                    <>
                    {['png', 'jpg', 'jpeg'].includes(item.attachment.split('.').reverse()[0])
                      ? <img src={item.attachment} className={"ms-3 me-3"}></img>
                      : <Link to={"/" + item.attachment}>Attachment: {item.attachment}</Link>
                    }
                    </>
                  }
                  {item.content.length > 0 &&
                    <div className={[classes.content, "mt-3"].join(' ')}>{item.content}</div>
                  }
                </Row>
                
                <Row className="mt-4">
                  <span className={classes.interactions}>
                  <ButtonIconText icon={<LikeIcon></LikeIcon>} textToDisplay={String(item.reactions.length > 99 ? "99+" : item.reactions.length)}></ButtonIconText>
                  <ButtonIconText icon={<CommentIcon></CommentIcon>} textToDisplay={String(item.reactions.length > 99 ? "99+" : item.reactions.length)}></ButtonIconText>
                  </span>
                </Row>
            </Card.Body>


            <Modal show={forumModal} onHide={handleClose} size="lg" >
              <Modal.Body>
                <Container>
                  <Row>
                    <Col xs={7}>
                      <Image src={user} width="40" height="40" roundedCircle />

                      <p> {item.author.first_name} {item.author.last_name}</p>
                      <p> {item.reactions.last_name} {item.reactions.last_name}</p>

                      <hr />
                      <p>Reactions</p>
                      <p>Content: {item.content} </p>
                      <p>Attachement : {item.attachment} </p>
                      <hr />
                      <p>Comment</p>
                      <p> {item.comments.last_name} {item.comments.last_name} {item.comments.contente}</p>
                    </Col>
                    <Col xs={5}>
                      <div className='espace' >

                        <Card style={{ width: '100%', height: '100%' }} className={classes.car}>
                          <Card.Header>
                            <ProgressBar label={`${100}%`} now={100} />
                            <br />
                            <ProgressBar label={`${100}%`} now={100} />

                          </Card.Header>

                          <Card.Body>

                          </Card.Body>
                          <Card.Footer>
                            <Container>
                              <Row>
                                <Col>

                                  <InputGroup className="mb-3">
                                    <FormControl
                                      placeholder="Base Text inpute"
                                      aria-label="Username"
                                      aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Text id="basic-addon2"><ImageIcon /></InputGroup.Text>
                                  </InputGroup>
                                </Col>
                                <Col xs={1}>
                                  <IconButton aria-label="delete" size="small">
                                    <AddCircleIcon fontSize='large' />
                                  </IconButton>
                                </Col>

                              </Row>
                            </Container>

                          </Card.Footer>
                        </Card>
                      </div>

                    </Col>
                  </Row>
                </Container>




              </Modal.Body>
            </Modal>
          </Card>
          </Container>


          </>
            )
          }

  export default HomePost