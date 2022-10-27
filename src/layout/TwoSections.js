import React from "react";
import classes from "./TwoSections.module.css";
import Chat from "../components/pop-ups/Chat";

import { Navigate, Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../components/header/NavBar";
import { useSelector } from "react-redux";
import Separator from '../components/sidebar/Separator';


function SidebarContent() {
  const user = useSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className={classes.layout}>
      <NavBar login={true} />
      <Container>
        <Row className="pt-5">
          <Col sm={2} xs={3} className={classes.sidebar}>
        
            <Sidebar />
          </Col>
          <Col sm={10} xs={9} className={classes.app_content}>
          <Container>
          <Row>
            <Separator></Separator>
            <Outlet />
          </Row>
        </Container>
          </Col>
        </Row>
        <Chat/>
      </Container>
      
    </div>
  );
}

export default SidebarContent;
