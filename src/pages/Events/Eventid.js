import React, { useState, useEffect, forwardRef, Component } from 'react'
import useFetch from "react-fetch-hook";
import Card from 'react-bootstrap/Card';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { IconName } from "react-icons/bs";
import { Form, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import user from '../../images/user.png'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import * as AiIcons from 'react-icons/ai';
import * as TiIcons from 'react-icons/ti';
import Dropdown from 'react-bootstrap/Dropdown';
import './Events.css'
import { useSelector } from "react-redux";



export default function Eventid() {

    const { id } = useParams();

    const [Eventitem, setEventItem] = useState({
        location: "",
        author: [],
        title: "",
        address: "",
        event_day: "",
        event_hours: "",
        description: "",
        content: " ",
        attachment: "",
        offcial: Boolean,
        date_created: "",
        comments: [
        ],
        participants: [
        ]
    });
    useEffect(() => {
        fetch("http://localhost:8000/api/events/" + id)
            .then(res => res.json())
            .then((result) => {
                setEventItem(result);
            });
    }, []);

    const user = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);

    const [author, setAuthor] = useState({
        user_id: "",
        photo: "",
        first_name: user.first_name,
        last_name: user.last_name,
    });
    const [content, setContent] = useState("");

    const commentSubmit = (e) => {
        e.preventDefault();
        const blog = { author, content };
        fetch("http://localhost:8000/api/events/comment/" + id, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
        }).then(() => {
            console.log(blog);
            setContent("");
            setComments([...comments, blog]);
            Navigate("events/" + id)
        });
    };

    if (user.type == "S") {
        return (
            <>
                <Col md={9}>
                    <Container>
                        <Row>
                            <Col>
                                <p style={{ fontWeight: "bold" }}>{Eventitem.title}</p> </Col>
                            <Col xs={1}>

                                <Link to={'/events'} >
                                    <TiIcons.TiArrowBack size={40} className='back' />
                                </Link>
                            </Col>

                        </Row>
                        <Row>
                            <Col xs={12}>
                                <p>{Eventitem.description}</p>
                                <h5>Published by :</h5>
                                <p>{Eventitem.author.first_name} {Eventitem.author.last_name}</p>
                            </Col>

                        </Row>
                        <Row>
                            <Col xs={9}>
                                <div className='content' >
                                    <p>{Eventitem.content}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <p className='TextButton'>{Eventitem.location}</p>
                            </Col>
                            <Col md="3"><p >{Eventitem.address}</p></Col>
                        </Row>
                        <Row>
                            <Col md="2"><p>{Eventitem.event_day}</p></Col>
                            <Col md="3"><p>{Eventitem.date_created}</p></Col>
                            <Col md="3"><p>Check presence</p></Col>
                        </Row>
                    </Container>

                    {Eventitem.comments.length > 0 &&
                        Eventitem.comments.map((comment) => {
                            return (
                                <div >
                                    <Container>
                                        <Row>
                                            <Col md="10">
                                                <p ><span style={{ fontWeight: "bold" }}>{comment.author.first_name} {comment.author.last_name}</span> {comment.author.user_id}</p>
                                                <Card className='rounded-pill' >

                                                    <Card.Body>{comment.content}</Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>

                                    </Container>

                                </div>
                            )
                        })
                    }

                    <Form onSubmit={commentSubmit}>
                        <Container>
                            <Row className="mt-5">

                                <Col xs={9}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                            className="rounded-pill"
                                            type="text"
                                            placeholder="Add Comment"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={1}>
                                    <button class="btn" type="submit">
                                        <AiIcons.AiFillPlusCircle size={40} className="back" />
                                    </button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    </Form>
                </Col>

                <Col xs={2}>
                    <p>Presences</p>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">
                            participants
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#">
                                Abdelkadir Elarbi
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                Yahia Becetti
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                Faycal Hennani
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                André Moreira
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                Adel trabelssi
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </>
        );

    } else {
        return (
            <>
                <Col md={9}>
                    <Container>
                        <Row>
                            <Col>
                                <p style={{ fontWeight: "bold" }}>{Eventitem.title}</p> </Col>
                            <Col xs={1}>

                                <Link to={'/Manageevents'} >
                                    <TiIcons.TiArrowBack size={40} className='back' />
                                </Link>
                            </Col>

                        </Row>
                        <Row>
                            <Col xs={12}>
                                <p>{Eventitem.description}</p>
                                <h5>Published by :</h5>
                                <p>{Eventitem.author.first_name} {Eventitem.author.last_name}</p>
                            </Col>

                        </Row>
                        <Row>
                            <Col xs={9}>
                                <div className='content' >
                                    <p>{Eventitem.content}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <p className='TextButton'>{Eventitem.location}</p>
                            </Col>
                            <Col md="3"><p >{Eventitem.address}</p></Col>
                        </Row>
                        <Row>
                            <Col md="2"><p>{Eventitem.event_day}</p></Col>
                            <Col md="3"><p>{Eventitem.date_created}</p></Col>
                            <Col md="3"><p>Check presence</p></Col>
                        </Row>
                    </Container>

                    {Eventitem.comments.length > 0 &&
                        Eventitem.comments.map((comment) => {
                            return (
                                <div >
                                    <Container>
                                        <Row>
                                            <Col md="10">
                                                <p ><span style={{ fontWeight: "bold" }}>{comment.author.first_name} {comment.author.last_name}</span> {comment.author.user_id}</p>
                                                <Card className='rounded-pill' >

                                                    <Card.Body>{comment.content}</Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>

                                    </Container>

                                </div>
                            )
                        })
                    }

                    <Form onSubmit={commentSubmit}>
                        <Container>
                            <Row className="mt-5">

                                <Col xs={9}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                            className="rounded-pill"
                                            type="text"
                                            placeholder="Add Comment"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={1}>
                                    <button class="btn" type="submit">
                                        <AiIcons.AiFillPlusCircle size={40} className="back" />
                                    </button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    </Form>
                </Col>

                <Col xs={2}>
                    <p>Presences</p>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">
                            participants
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#">
                                Abdelkadir Elarbi
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                Yahia Becetti
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                Faycal Hennani
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                André Moreira
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                Adel trabelssi
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </>
        );
    }
}








