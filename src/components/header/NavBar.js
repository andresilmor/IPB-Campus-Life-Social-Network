import React, { useState } from "react";
import classes from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import Login from "../pop-ups/Login/Login";

import { ButtonEmpty, ButtonFilled } from "../buttons";
import { useDispatch } from "react-redux";
import { cleanUser } from "../../store/user_store";

const NavBar = ({ login = false }) => {
  const [loginModal, setLoginModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClose() {
    setLoginModal(false);
  }

  function openLoginModal() {
    setLoginModal(true);
  }
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }

  function handleLogOut() {
    dispatch(cleanUser(undefined));
    navigate("/");
  }

  if (login == false) {
    return (
      <>
        <header>
          <Navbar>
            <Container>
              <Navbar.Brand>
                <Link to={"/"}>
                  <img
                    src={logo}
                    width="100"
                    height="40"
                    className="d-inline-block align-top"
                  />{" "}
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <ButtonEmpty
                  goTo={"/signup"}
                  textToDisplay={"Register"}
                ></ButtonEmpty>
                <ButtonFilled
                  textToDisplay={"Login"}
                  goTo={"#"}
                  plusClasses={""}
                  action={() => {
                    setLoginModal(true);
                  }}
                ></ButtonFilled>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <Modal className={classes.login} show={loginModal} onHide={handleClose}>
          <Modal.Body>
            <Login />
          </Modal.Body>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <header>
          <Navbar>
            <Container>
              <Navbar.Brand>
                <Link to={"/"}>
                  <img
                    src={logo}
                    width="100"
                    height="40"
                    className="d-inline-block align-top"
                  />{" "}
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <ButtonEmpty
                  goTo={"/community"}
                  textToDisplay={"Community"}
                ></ButtonEmpty>
                <ButtonEmpty
                  goTo={"/mentoryAcademy"}
                  textToDisplay={"Mentory Academy"}
                ></ButtonEmpty>
                <Button onClick={handleLogOut}>Log out</Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
};

export default NavBar;
