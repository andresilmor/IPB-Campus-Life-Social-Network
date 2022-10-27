import React, { useState, useEffect } from 'react'
import useFetch from "react-fetch-hook";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import user from '../../images/user.png'
import { Container, Row, Col } from 'react-bootstrap';
import "./Community.css"

export default function Community() {
    document.title = global.BASE_TITLE + " - Community"

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);


    const [forumModal, setForumModal] = useState(false)
    let navigate = useNavigate();
    function handleClose() {
        setForumModal(false);
    }

    function openForumModal() {
        setForumModal(true);
    }

    useEffect(() => {
        fetch("http://localhost:8000/api/users")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
        
            <Col md={8}>
            <div className='user' >
                {items.map(item => (
                    <Card key={item.id} className='user' >
                        <Card.Body onClick={openForumModal}>
                            <Container>
                                <Row>
                                    <Col xs={2}>
                                        <Image src={item.profile_image} width="40" height="40" roundedCircle /></Col>
                                    <Col>
                                        <p> {item.first_name} {item.last_name}</p>
                                    </Col>
                                </Row></Container>
                        </Card.Body>
                        <Modal show={forumModal} onHide={handleClose} >
                            <Modal.Body>
                                <Container>
                                    <Row>
                                        <Col xs={2}>
                                            <Image src={item.profile_image} width="40" height="40" roundedCircle /></Col>
                                        <Col>
                                            <p> {item.first_name} {item.last_name}</p>
                                        </Col>
                                    </Row></Container>
                                <p>Visibility : {item.visibility}</p>
                                <p>Degree: {item.degree} </p>

                                <p>birthdate : {item.birthdate} </p>
                                <p>nationality: {item.nationality} </p>
                                <p>school: {item.school} </p>
                            </Modal.Body>
                        </Modal>

                    </Card>
                ))
                }

            </div >
            </Col>
            </>

        )
    }
}

