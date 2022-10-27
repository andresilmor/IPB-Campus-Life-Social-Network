import React from 'react'
import classes from "./ButtonBlock.module.css"
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';

const ButtonBlock = ({textToDisplay, goTo, plusClasses = ""}) => {

    const myRef = useRef();

    function scrollToComponent() {
        if (window.location.hash === '#about') {
        myRef.current.scrollIntoView();
        myRef.current.focus();
        }
    }

    useEffect( () => scrollToComponent(), [] )
  
    return (
      <>
        <Link className={[classes.button, plusClasses].join(' ')} onClick={useEffect} to={goTo}>{textToDisplay}</Link>
      </>
    )
  }

  export default ButtonBlock