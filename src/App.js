import './App.css';
import './fonts/OpenSans/OpenSans.css'
import './fonts/SegoeUI/SegoeUI.css'

import React from "react";
import {  Route, BrowserRouter, Routes } 
        from 'react-router-dom'

import SidebarContent from './layout/TwoSections';

import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Forum from './pages/Forum/Forum';
import Groups from './pages/Groups/Groups';
import NewGroup from './pages/Groups/NewGroup';
import Group from './pages/Groups/Group';
import NewDiscussion from './pages/Groups/NewDiscussion';
import Discussion from './pages/Groups/Discussion';
import Events from './pages/Events/Events';
import Eventid from './pages/Events/Eventid';
import Create_event from './pages/Events/Create_event';
import ForumId from './pages/Forum/ForumId';
import ForumNew from './pages/Forum/ForumNew';
import NotFound from './pages/NotFound/NotFound';
import Community from './pages/Community/Community';
import EditProfil from './pages/Profile/EditProfile';
import { useSelector } from "react-redux";



function App() {
  const user = useSelector((state) => state.user);

  

  

  return (
    <>
      <BrowserRouter>
      <Routes>
        {user == undefined
         ? 
         <Route index element={<LandingPage />} />
         : 
         <Route path=""  element={<SidebarContent />} >
          <Route index element={<Home />} />
         </Route>
        }
        <Route path="signup" element={<SignUp />} />

        <Route path="/" element={<SidebarContent />} >
          
          <Route path="home" element={<Home />} />
         
          <Route path="community" element={<Community />} />

          <Route path="profile/:id" element={<EditProfil />}></Route>
          
          <Route path="forum">
            <Route index element={<Forum />} />
            <Route path=":id">
              <Route index element={<ForumId />}  />
            </Route>
            <Route path="new" element={<ForumNew />} />
          </Route>
          
          <Route path="groups">
            <Route index element={<Groups />} />
            <Route path=":id" >
              <Route index element={<Group />} />
              <Route path="discussion/:discussionId" element={<Discussion />} />
              <Route path="discussion/new" element={<NewDiscussion />} />
            </Route>
            <Route path="new" element={<NewGroup />} />
          </Route>

          <Route path="events" >
            <Route index element={<Events />} />
            <Route path=":id" element={<Eventid/>}/>
            <Route path="new" element={<Create_event/>}/>
          </Route>
         
        </Route>
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter >
    </>

  )
}

export default App;
