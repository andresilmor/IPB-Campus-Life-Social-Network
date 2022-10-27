import React, { useState, useEffect } from 'react'
import classes from './Sidebar.module.css';
import { UserInfoStyleA } from '../informationDisplay';
import { HomeIcon, GroupIcon, ForumIcon, EventIcon } from '../icons';
import { ButtonUserIcon, ButtonSidebar } from '../buttons';
import { useSelector } from 'react-redux'




export default function Sidebar() {

  const user = useSelector((state) => state.user);

  var tempPathname = window.location.pathname.substring(1).split("/")[0];
  
  const [active, setActive] = useState(tempPathname);
  
  


  console.log(user);

    return (
      <>
        <UserInfoStyleA name={user.first_name + " " + user.last_name} degree={user.degree} studentNumber={user.user_id} avatar={user.profile_image} userID={user.user_id}></UserInfoStyleA>

        <div className='my-5'>
          <ButtonSidebar action={() => setActive("home")} textToDisplay={"Home"} Icon={HomeIcon} goTo="/home" selected={active == "home"}></ButtonSidebar>
          <ButtonSidebar action={() => setActive("forum")} textToDisplay={"Fórum"} Icon={ForumIcon} goTo="/forum" selected={active == "forum"}></ButtonSidebar>
          <ButtonSidebar action={() => setActive("groups")} textToDisplay={"Groups"} Icon={GroupIcon} goTo="/groups" selected={active == "groups"}></ButtonSidebar>
          <ButtonSidebar action={() => setActive("events")} textToDisplay={"Events"} Icon={EventIcon} goTo="/events" selected={active == "events"}></ButtonSidebar>
        </div>

        {user.friends.length > 0 &&
        <>
          <div className={classes.friends}>
            <p>Friends</p>
          </div>
          <div className='user-list-sidebar'>
              
            {user.friends.map(userFriend => (
              <ButtonUserIcon goTo={"/profile/" + userFriend.user_id} avatar={userFriend.photo} plusClasses="mb-1 me-1"></ButtonUserIcon>
            ))
            }
          </div>
        </>
        }
      </>
    )

  }

