import React from 'react'
import classes from "./ButtonUserIcon.module.css"
import { Link } from 'react-router-dom';
import { Avatar } from "@mui/material"

const ButtonUserIcon = ({goTo, avatar, plusClasses = ""}) => {

   
    return (
      <>
        <Link to={goTo} className={[classes.userIcon, plusClasses].join(' ')}>
             <Avatar src={avatar} className="user-image" /></Link>

      </>
    )
  }

  export default ButtonUserIcon