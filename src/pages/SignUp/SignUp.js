import React, { useEffect, useState } from "react";
import Link from "react-scroll/modules/components/Link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../../components/header/NavBar";
import classes from "./SignUp.module.css";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import { Card, CardContent, Chip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  document.title = global.BASE_TITLE + " - SignUp";

  const [firstColumn, setFirstColumn] = useState("6");
  const [secondColumn, setSecondtColumn] = useState("3");
  const [thirdtColumn, setThirdColumn] = useState("3");
  const [styleColumnClosed, setStyleColumnClosed] = useState("");
  const [styleColumnTwoClosed, setStyleColumnTwoClosed] = useState(
    classes.inactiveColumn
  );
  const [styleColumnThreeClosed, setStyleColumnthreeClosed] = useState(
    classes.inactiveColumn
  );

  const [user, setUser] = useState();

  function updateColumnOne() {
    setFirstColumn("3");
    setSecondtColumn("6");
    setThirdColumn("3");
    setStyleColumnClosed(classes.inactiveColumn);
    setStyleColumnTwoClosed("");
  }
  function updateColumnTwo() {
    setFirstColumn("3");
    setSecondtColumn("3");
    setThirdColumn("6");
    setStyleColumnClosed(classes.inactiveColumn);
    setStyleColumnTwoClosed(classes.inactiveColumn);
    setStyleColumnthreeClosed("");
  }
  function backColumnOne() {
    setFirstColumn("6");
    setSecondtColumn("3");
    setThirdColumn("3");
    setStyleColumnClosed("");
    setStyleColumnTwoClosed(classes.inactiveColumn);
    setStyleColumnthreeClosed(classes.inactiveColumn);
  }
  function backColumnTwo() {
    setFirstColumn("3");
    setSecondtColumn("6");
    setThirdColumn("3");
    setStyleColumnClosed(classes.inactiveColumn);
    setStyleColumnTwoClosed("");
    setStyleColumnthreeClosed(classes.inactiveColumn);
  }

  const [visibility, setVisibility] = useState("Public");
  const [type, setType] = useState("S");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email_address, setEmail_address] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [degree, setDegree] = useState("");
  const [school, setSchool] = useState("");
  const [profile_image, setProfileImage] = useState();
  const [token, setToken] = useState("");
  const [interests, setInterests] = useState([]);
  const [groups, setGroups] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = `${email_address}@alunos.ipb.pt`;
    const formData = new FormData();
    const user = {
      visibility,
      type,
      first_name,
      last_name,
      email_address: email,
      password,
      birthdate,
      degree,
      school,
      token,
      interests,
    };
    formData.append("file", profile_image, profile_image.name);
    formData.append("user_info", JSON.stringify(user));
    const r = await axios.post("http://localhost:8000/api/users", formData);
    setUser(r.data);
    // fetch("http://localhost:8000/api/users", {
    //   method: "POST",
    //   // headers: { "Content-Type": "application/json" },
    //   body: formData,
    // }).then((r) => {
    //   console.log(r);
    // });
  };
  const handleClick = (item, event) => {
    if (interests.includes(item)) {
      const index = interests.indexOf(item);
      interests.splice(index, 1);
    } else {
      interests.push(item);
    }
    event.currentTarget.classList.toggle(classes.selected);
    console.log(interests);
  };

  function getGroups() {
    fetch("http://localhost:8000/api/groups?limit=3")
      .then((res) => res.json())
      .then(
        (result) => {
          setGroups(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const navigate = useNavigate();

  useEffect(() => {
    getGroups();
  }, []);

  async function handleJoinGroup(e, id) {
    e.currentTarget.style.display = "none";

    const url = `${global.BASE_API_URL}/groups/${id}/join`;
    await axios.post(url, {
      user_id: user._id.$oid,
      photo: user.profile_image,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  }

  return (
    <>
      <NavBar />

      <div>
        <Form onSubmit={handleSubmit}>
          <Container className={classes.signupForm}>
            <Row>
              <Col xs={firstColumn} id="active">
                <Row
                  className={[
                    classes.personalInformation,
                    "border",
                    "border-dark",
                    "rounded",
                    "align-items-center",
                    "text-center",
                    styleColumnClosed,
                  ].join(" ")}
                >
                  <div>
                    <h3>Account Data</h3>
                    <p>Just some basic data to create your account.</p>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>Full Name</InputGroup.Text>
                      <FormControl
                        aria-label="First name"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                      />
                      <FormControl
                        aria-label="Last name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                      />
                    </InputGroup>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="file"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                      />
                    </Form.Group>
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Student number"
                        value={email_address}
                        onChange={(e) => setEmail_address(e.target.value)}
                      />
                      <InputGroup.Text id="basic-addon2">
                        @alunos.ipb.pt
                      </InputGroup.Text>
                    </InputGroup>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Select
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                          >
                            <option disabled>Scool</option>
                            <option value="EsACT">EsACT</option>
                            <option value="ESTiG">ESTiG</option>
                            <option value="ESA">ESA</option>
                            <option value="ESE">ESE</option>
                            <option value="ESSa">ESSa</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Select
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                          >
                            <option value="1" disabled>
                              Degree
                            </option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Master">Master</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Row>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="password"
                              placeholder="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="password"
                              placeholder="Confirm password"
                            />
                          </Form.Group>
                        </Row>
                      </Col>
                      <Col>
                        <AiIcons.AiFillLock size={100} />
                      </Col>
                    </Row>

                    <Link onClick={updateColumnOne}>Continue</Link>
                  </div>
                </Row>
              </Col>
              <Col xs={secondColumn} id="next">
                <Row
                  className={[
                    classes.personalInformation,
                    "border",
                    "border-dark",
                    "rounded",
                    "align-items-center",
                    "text-center",
                    styleColumnTwoClosed,
                  ].join(" ")}
                >
                  <div>
                    <h3>
                      Tell us what you <br />
                      Like!
                    </h3>
                    <p>which topics you like more!</p>
                    <div className={classes.topics}>

                      <Chip label="java" onClick={(e) => handleClick("java", e)} />
                      <Chip
                        label="python"
                        onClick={(e) => handleClick("python", e)}
                      />
                      <Chip
                        label="matlab"
                        onClick={(e) => handleClick("matlab", e)}
                      />
                      <br />
                      <Chip label="music" onClick={(e) => handleClick("music", e)} />
                      <Chip
                        label="dance"
                        onClick={(e) => handleClick("dance", e)}
                      />
                      <Chip
                        label="art"
                        onClick={(e) => handleClick("art", e)}
                      />
                      <br />
                      <Chip label="animals" onClick={(e) => handleClick("animals", e)} />
                      <Chip
                        label="cats"
                        onClick={(e) => handleClick("cats", e)}
                      />
                      <Chip
                        label="dogs"
                        onClick={(e) => handleClick("dogs", e)}
                      />
                    </div>

                    <div className={classes.btnForm}>
                      <Button type="submit" onClick={updateColumnTwo}>
                        Register
                      </Button>
                    </div>
                    <div>
                      <Link onClick={updateColumnTwo}>Continue</Link>
                    </div>
                    <div>
                      <Link onClick={backColumnOne}>Back</Link>
                    </div>
                  </div>
                </Row>
              </Col>
              <Col xs={thirdtColumn} id="next1">
                <Row
                  className={[
                    classes.personalInformation,
                    "border",
                    "border-dark",
                    "rounded",
                    "align-items-center",
                    "text-center",
                    styleColumnThreeClosed,
                  ].join(" ")}
                >
                  <div>
                    <h3>Choose your</h3>
                    <h3>Groups !</h3>
                    <p>Start joining your colleagues right know!</p>
                    {groups.map((group) => {
                      return (
                        <Card sx={{ minWidth: 275 }} style={{ margin: "1em" }}>
                          <CardContent style={{ padding: 0 }}>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              <Row>
                                <Col>{group.name}</Col>
                                <Col>
                                  <Button
                                    variant="primary"
                                    onClick={(e) =>
                                      handleJoinGroup(e, group.id)
                                    }
                                    style={{ marginTop: "0.2em" }}
                                  >
                                    Join
                                  </Button>
                                </Col>
                              </Row>
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    })}
                    {/* <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <div className="registration-group group shadow-lg p-3 mb-5 bg-white ">
                          <h4> Word of art</h4>
                          <p>Theres a whole w
                          orld to explore with us!</p>
                          <p>+25 members</p>
                        </div>
                      </Col>
                    </Row> 
                    
                    */}
                    <div>
                    <input className="sub" onClick={(e) => { navigate("/")}} value="Submit" />
                    </div>
                    <div>
                      <Link onClick={backColumnTwo}>Back</Link>
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </>
  );
}
