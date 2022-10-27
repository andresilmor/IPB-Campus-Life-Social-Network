import React, { useEffect } from "react";
import classes from "./LandingPage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import imag1 from "../../images/1.png";
import imag2 from "../../images/2.png";
import imag3 from "../../images/3.png";
import imag4 from "../../images/4.png";
import NavBar from "../../components/header/NavBar";
import { ButtonBlock } from "../../components/buttons";
import { useSelector } from "react-redux";

export default function LandingPage() {
  document.title = global.BASE_TITLE;
  const user = useSelector((state) => state.user);


  return (
    <>
      <NavBar login={user !== undefined} />

      <Container>
        <Row className={classes.hero_image}>
          <Col xl={8}></Col>
          <Col xl={4}>
            <Row>
              <div className={classes.first}>
                <h2>
                  Join <span>the</span> IPB
                  <br />
                  <span>Campus</span>
                  <br />
                  community!
                </h2>
              </div>
            </Row>
            <Row>
              <ButtonBlock
                textToDisplay={"Find More"}
                goTo={"#" + classes.about}
                plusClasses={"mt-5"}
              ></ButtonBlock>
            </Row>
          </Col>
        </Row>

        <Row className={classes.about} id={classes.about}>
          <Col md={3}>
            <div>
              <div className="icon mb-3">
                <img src={imag1} width="60" height="60" />
              </div>
              <div className="icon mb-3">
                <img src={imag2} width="60" height="60" />
              </div>
              <div className="icon mb-3">
                <img src={imag3} width="60" height="60" />
              </div>
              <div className="icon ">
                <img src={imag4} width="60" height="60" />
              </div>
            </div>
          </Col>
          <Col md={6} className={[classes.text, "ps-4", "py-5"].join(" ")}>
            <h2 className="mb-5">Find colleagues with same interests</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare neque ac ipsum fringilla, in facilisis nibh volutpat.
              Phasellus et placerat mi, eget egestas purus. Quisque sed varius
              urna. Vestibulum eget erat non lectus ultrices auctor id eget dui.
              Phasellus viverra augue quis justo venenatis ullamcorper. Fusce
              venenatis consectetur arcu, in sodales ex efficitur sit amet. Ut
              rhoncus tempor erat, ac luctus eros bibendum eu
            </p>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
      <div className={classes.image} />
    </>
  );
}
