import React, { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import ImageIcon from "@mui/icons-material/Image";
import SearchIcon from "@mui/icons-material/Search";
import {
  CardActions,
  CardContent,
  Chip,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router";
import defaultBackground from "../../images/default-image.jpg";
import axios from "axios";

export default function Group() {
  const { id } = useParams();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [publications, setPublications] = useState([]);
  const [group, setGroup] = useState({});

  function handleNewDiscussion() {
    navigate("/groups/" + id + "/discussion/new");
  }

  function handleClickDisccusion(discussionId) {
    navigate("/groups/" + id + "/discussion/" + discussionId);
  }

  useEffect(() => {
    const url = `${global.BASE_API_URL}/groups/${id}/publications`;
    console.log(url)
    const groupUrl = `${global.BASE_API_URL}/groups/${id}`;
    const fetchData = async () => {
      const r = await axios.get(url);
      const g = await axios.get(groupUrl);
      setGroup(g.data.group);
      setPublications(r.data.publications);
    };
    fetchData();
  }, []);

  async function handleSearchInput(e) {
    setSearchValue(e.target.value);
    const url = `${global.BASE_API_URL}/groups/${id}/discussions/search`;
    const response = await axios.post(url, { search_value: e.target.value });
    setPublications(response.data.publications);
  }
  return (
    <>
    <Col md={12} className={"me-5"}>
      <Row className={"me-5"}>
        <Container>
        <Col>
        <Row
          className="group-header ps-4 ms-1"
          style={{
            backgroundImage: `linear-gradient(transparent, white 95%), url(${
              group.avatar ? group.avatar : defaultBackground
            })`,
          }}
        >
          <h2 className="ps-5">{group.name}</h2>
        </Row>
          </Col>
        </Container>
        </Row>
    <Row className="ms-4">
      <Col md={9} className="ms-3">
      <Container>
      <Row className="groups-top-row">
        <Col sm={7}>
          <Button className="btn-primary-ipb" onClick={handleNewDiscussion}>
            Create New Discussion
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
      {publications.length > 0 &&
        publications.map((item) => {
          return (
            <Row key={item.publication_id} className="discussion-card">
              <Card
                sx={{ minWidth: 275 }}
                className="group-card"
                onClick={() => handleClickDisccusion(item.publication_id)}
              >
                <CardContent>
                  <Row style={{ display: "flex" }}>
                    <Col sm={10}>
                      <Typography
                        sx={{
                          fontSize: "1.5em !important",
                          fontWeight: "bold",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <p>{item.author.code}</p>
                    </Col>
                  </Row>
                  <Typography sx={{ fontSize: 14 }} color="text.primary">
                    {item.content}
                  </Typography>
                  <Row style={{ marginTop: "1em" }}>
                    <Col sm={10}>
                      <Typography sx={{ fontSize: 14 }} color="text.primary">
                        {item.comments.length} comments
                      </Typography>
                    </Col>
                  </Row>
                </CardContent>
              </Card>
            </Row>
          );
        })}
    </Container>
    </Col>
    </Row>
    </Col>
    </>
  );
}
