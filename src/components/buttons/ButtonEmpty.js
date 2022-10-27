import React from 'react'
import classes from "./ButtonEmpty.module.css"
import { Link } from 'react-router-dom';


const ButtonEmpty = ({textToDisplay, goTo, plusClasses = ""}) => {
  
    return (
      <>
        <Link className={[classes.button, plusClasses].join(' ')} to={goTo}>{textToDisplay}</Link>
      </>
    )
  }

export default ButtonEmpty