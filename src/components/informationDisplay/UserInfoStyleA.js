import React from 'react'
import classes from "./UserInfoStyleA.module.css"
import { Avatar } from "@mui/material"
import { Link } from 'react-router-dom'

const UserInfoStyleA = ({name, degree, studentNumber, userID, avatar}) => {


    return (
        <>
        <Link to={"/profile/" + userID} className={classes.user}>
        <Avatar src={avatar} className={classes.user_avatar} 
        sx={{ width: 88, height: 88 }}/>
        <div className={classes.user_info}>
          <h6>{name}</h6>
          <p>{degree}</p>
          <p>{studentNumber}</p>
        </div></Link>
        </>
    )
  }

  export default UserInfoStyleA