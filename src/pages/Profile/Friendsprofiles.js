import React, { useState, useEffect } from 'react'
import './EditProfile.css'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/user_store";
import Figure from 'react-bootstrap/Figure'


export default function Friendsprofiles() {
    const navigate = useNavigate();

    const [user_id, setUserId] = useState('')
    const [photo, setPhoto] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')



    const dispatch = useDispatch();
    const { id } = useParams();


    const [item, setItem] = useState({

        user_id: "",
        photo: "",
        first_name: "",
        last_name: ""

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { user_id, photo, first_name, last_name };
        fetch("http://localhost:8000/api/users/friend/" + "62aa1a6e4ec1f2cb1aab5aef", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log(blog);
            navigate('/home')
        })



    }


    useEffect(() => {
        fetch("http://localhost:8000/api/users/public/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setItem(result);
                    console.log(result)
                    setPhoto(result.profile_image)
                    setUserId("dqsdqs")
                    setFirstName(result.first_name)
                    setLastName(result.last_name)

                },
            );
    }, []);
    console.log(id)





    return (
        <>

            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Figure>
                            <Figure.Image
                                roundedCircle
                                width={171}
                                height={180}
                                alt="171x180"
                                src={item.profile_image}
                            />
                        </Figure>

                    </Col>
                    <Col> </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <h3> {item.first_name} {item.last_name} </h3>
                    </Col>
                    <Col> </Col>
                </Row>
                <Row></Row>
                <Row>
                    <Col><h4>Email: {item.email_address}</h4></Col>
                    <Col><h4>Date of borth: {item.birthdate}</h4></Col>
                </Row>
                <Row></Row>
                <Row>
                    <Col><h4>Degree: {item.degree}</h4></Col>
                    <Col><h4>Nationality: {item.nationality}</h4></Col>
                </Row>
                <Row></Row>
                <Row>
                    <Col><h4>School: {item.school}</h4></Col>
                    <Col><h4>Organization: {item.organization}</h4></Col>
                </Row>
                <Row></Row>
                <Row>
                    <Col></Col>
                    <Col> <Button variant="primary" onClick={handleSubmit}>Add friend</Button> </Col>
                    <Col></Col>
                </Row>
            </Container>











        </>


    )

}