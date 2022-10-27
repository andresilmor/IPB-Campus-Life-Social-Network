import React from 'react'
import classes from "./ButtonSidebar.module.css"
import { Link } from 'react-router-dom';

const ButtonSidebar = ({textToDisplay, goTo ="#", plusClasses ="", action="", selected = false, Icon}) => {
  
  
    return (
      <>
      <Link onClick={action} to={goTo} className={[classes.button, selected == true ? classes.selected : "", "py-3", "ps-3"].join(' ')}>
        <Icon className={classes.icon} />
        <h6 className={[classes.title,  "ps-4"].join(' ')}>{textToDisplay}</h6>
      </Link>
        
      </>
    )
  }

export default ButtonSidebar
  