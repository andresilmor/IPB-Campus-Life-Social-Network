import React, { useState, useEffect } from 'react'
import {
    Col, Container, Row, Button,
    Form,
    FormControl,
    InputGroup,
} from 'react-bootstrap'
import * as AiIcons from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function ManageGroup() {
    document.title = global.BASE_TITLE + " - Groups";

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    function handleNewGroup() {
        navigate("new");
    }

    function handleClickGroup(groupId, name) {
        navigate(groupId, { state: { groupName: name } });
    }

    async function handleSearchInput(e) {
        setSearchValue(e.target.value);
        const url = `${global.BASE_API_URL}/groups/search`;
        const response = await axios.post(url, { search_value: e.target.value });
        setItems(response.data);
    }
    function getGroups() {
        fetch("http://localhost:8000/api/groups")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        getGroups();
    }, []);

    async function handleJoinGroup(e, id) {
        e.currentTarget.disabled = true;
        const url = `${global.BASE_API_URL}/groups/${id}/join`;
        await axios.post(url, {
            user_id: user._id.$oid,
            photo: user.profile_image,
            first_name: user.first_name,
            last_name: user.last_name,
        });
        getGroups();
    }

    return (
        <div>
            <Col>
                <h1>Manage Groups</h1>
                <Container className='mb-3'>
                    <Row>
                        <Col>
                            <Button className="forumbtn" onClick={handleNewGroup}>
                                Create New Group
                            </Button>
                        </Col>

                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl
                                    className="search"
                                    placeholder="Or Search About"
                                    aria-label="Or Search About"
                                    value={searchValue}
                                    onChange={handleSearchInput}
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
                            <h5>Group ID</h5>
                        </Col>
                        <Col>
                            <h5>Group Name</h5>
                        </Col>
                        <Col>
                            <h5>Join</h5>
                        </Col>
                        <Col>
                            <h5>Actions</h5>
                        </Col>
                        <hr />
                    </Row>

                </Container>

                <Container>
                    {items.length > 0 &&
                        items.map((item) => {
                            const isMember = item.members
                                .map((o) => o["user_id"])
                                .includes(user._id.$oid);
                            return (
                                <Row key={item.id} className={`group-card ${isMember ? "shadow-background" : ""}`} style={{ height: 70 }}>
                                    <Row className={`${isMember ? "group-name" : ""}`}
                                        onClick={() =>
                                            isMember ? handleClickGroup(item.id, item.name) : null
                                        }>
                                        <Col>
                                            {item.id}
                                        </Col>
                                        <Col>
                                            {item.name}
                                        </Col>
                                        <Col>
                                            {!isMember && (
                                                <div className='edit'>
                                                    <Button
                                                        variant="primary"
                                                        onClick={(e) => handleJoinGroup(e, item.id)}
                                                    >
                                                        Join
                                                    </Button>
                                                </div>
                                            )}
                                        </Col>
                                        <Col>
                                            <div className='action'>
                                                <div className='view' ><Link to={item.id}>View</Link></div>


                                                <div className='delite'>Delete</div>
                                            </div>
                                        </Col>
                                        <hr className='line' />
                                    </Row>
                                </Row>

                            );
                        })
                    }

                </Container>
            </Col>
        </div>
    );
}
