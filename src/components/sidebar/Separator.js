import React from 'react'
import classes from "./Separator.module.css"
import {Col } from 'react-bootstrap'

const Separator = () => {


    return (
        <>
            <Col md={1} className={classes.separatorCol}>
              <div className={classes.separator}></div>
            </Col>
        </>
    )
  }

  export default Separator

