import React, { useState, useEffect } from 'react'
import {
    Col, Container, Row, Button,
    Form,
    FormControl,
    InputGroup,
} from 'react-bootstrap'
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import "./ManageForum.css"


export default function ManageForum() {
    document.title = global.BASE_TITLE + " -Manage Fórums";

    const navigate = useNavigate();
    function NewForum() {
        navigate("new");
    }
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/api/forums")
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
                        <h1>Manage Forums</h1>
                        <Container className='mb-3'>
                            <Row>
                                <Col>
                                    <Button className="forumbtn" onClick={NewForum}>
                                        Create New Forum
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
                                    <h5>Forum ID</h5>
                                </Col>
                                <Col>
                                    <h5>Forum Title</h5>
                                </Col>
                                <Col>
                                    <h5>Creation date</h5>
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
                                        item.title
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
                                            {item.title}
                                        </Col>
                                        <Col>
                                            {item.date_created}
                                        </Col>
                                        <Col>
                                            <div className='action'>
                                                <div className='view'>
                                                    <Link to={item.id}>
                                                        View
                                                    </Link>
                                                </div>

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