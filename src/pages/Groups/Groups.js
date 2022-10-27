import React, { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Row } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import {
  CardActions,
  CardContent,
  Chip,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import "./Groups.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Groups() {
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
    <>
    <Col md={9}>
    <Container>
      <Row className="groups-top-row">
        <Col sm={7}>
          <Button className="btn-primary-ipb" onClick={handleNewGroup}>
            Create New Group
          </Button>
        </Col>
        <Col sm={5}>
          <OutlinedInput
            className="search-input"
            value={searchValue}
            placeholder="Or for search new ones"
            onChange={handleSearchInput}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Col>
      </Row>
      {items.length > 0 &&
        items.map((item) => {
          const isMember = item.members
            .map((o) => o["user_id"])
            .includes(user._id.$oid);
          return (
            <Row key={item.id} className="group-row-card">
              <Card
                sx={{ minWidth: 275 }}
                className={`group-card ${isMember ? "shadow-background" : ""}`}
              >
                <CardContent>
                  <Row
                    className={`${isMember ? "group-name" : ""}`}
                    onClick={() =>
                      isMember ? handleClickGroup(item.id, item.name) : null
                    }
                  >
                    <Col sm={10}>
                      <Typography
                        sx={{
                          fontSize: "1.5em !important",
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Col>
                    {item.official && (
                      <Col sm={2}>
                        <Chip label="Official Group" />
                      </Col>
                    )}
                  </Row>
                  <Typography sx={{ fontSize: 14 }} color="text.primary">
                    {item.description}
                  </Typography>
                  <Row style={{ marginTop: "1em" }}>
                    <Col sm={10}>
                      <Typography sx={{ fontSize: 14 }} color="text.primary">
                        {item.members.length} members
                      </Typography>
                    </Col>
                    {!isMember && (
                      <Col sm={2}>
                        <Button
                          variant="primary"
                          onClick={(e) => handleJoinGroup(e, item.id)}
                        >
                          Join
                        </Button>
                      </Col>
                    )}
                  </Row>
                </CardContent>
              </Card>
            </Row>
          );
        })}
    </Container>
    </Col>
    <Col md={2}>

        </Col>
    </>
  );
}
