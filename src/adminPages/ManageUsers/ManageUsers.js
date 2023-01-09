import React, { useState, useEffect } from 'react'
import {
    Col, Container, Row, Button,
    Form,
    FormControl,
    InputGroup,
} from 'react-bootstrap'
import * as AiIcons from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import "./ManageUsers.css"
export default function ManageUsers() {
    document.title = global.BASE_TITLE + " -Manage Users";

    const navigate = useNavigate();
    function NewUser() {
        navigate("new");
    }
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/api/users")
            .then((res) => res.json())
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
            );
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        console.log(items);
        return (
            <div>
                <Col>
                    <h1>Manage Users</h1>
                    <Container className='mb-3'>
                        <Row>
                            <Col>
                                <Button className="forumbtn" onClick={NewUser}>
                                    Create New User
                                </Button>
                            </Col>

                            <Col>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        className="search"
                                        placeholder="Or Search About"
                                        aria-label="Or Search About"
                                        onChange={(event) => {
                                            setSearch(event.target.value);
                                        }}
                                    />
                                    <InputGroup.Text id="basic-addon2">
                                        {" "}
                                        <AiIcons.AiOutlineSearch />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                    <Container >
                        <Row>
                            <Col>
                                <h5>ID</h5>
                            </Col>
                            <Col>
                                <h5>Full Name</h5>
                            </Col>
                            <Col>
                                <h5>Degree</h5>
                            </Col>
                            <Col>
                                <h5>Actions</h5>
                            </Col>
                            <hr />
                        </Row>

                    </Container>

                    <Container>
                        {items
                            .filter((item) => {
                                if (search == "") {
                                    return item;
                                } else if (
                                    item.first_name
                                        .toLocaleLowerCase()
                                        .includes(search.toLocaleLowerCase())
                                ) {
                                    return item;
                                }
                            })
                            .map((item) => (
                                <Row style={{ height: 70 }}>
                                    <Col>
                                        {item.id}
                                    </Col>
                                    <Col>
                                        {item.first_name} {item.last_name}
                                    </Col>
                                    <Col>
                                        {item.degree}
                                    </Col>
                                    <Col>
                                        <div className='action'>
                                            <div className='view'>View</div>
                                            <div className='edit'>Edit</div>
                                            <div className='delite'>Delete</div>
                                        </div>
                                    </Col>
                                    <hr className='line' />
                                </Row>

                            ))}
                    </Container>
                </Col>
            </div>
        )
    }
}
