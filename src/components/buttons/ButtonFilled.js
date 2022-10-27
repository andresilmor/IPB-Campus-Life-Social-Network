import React from 'react'
import classes from "./ButtonFilled.module.css"
import { Link } from 'react-router-dom';

const ButtonFilled = ({textToDisplay, goTo ="#", plusClasses = "", action = ""}) => {
  
  
    return (
      <>
        <Link className={[classes.button, plusClasses].join(' ')} to={goTo} onClick={action}>{textToDisplay}</Link>
      </>
    )
  }

export default ButtonFilled
  