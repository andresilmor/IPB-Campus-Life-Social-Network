import React from 'react'
import classes from "./UserInfoStyleB.module.css"
import { Avatar } from "@mui/material"
import { Link } from 'react-router-dom'

const UserInfoStyleB = ({name, studentNumber, avatar}) => {


    return (
        <>
        <Link to={"/profile/" + studentNumber} className={[classes.user].join(' ')}>
        <Avatar src={avatar} className={classes.user_avatar} />
        <div className={classes.user_info}>
          <h6>{name}</h6>
          <p>{studentNumber}</p>
        </div></Link>
        </>
    )
  }

  export default UserInfoStyleB