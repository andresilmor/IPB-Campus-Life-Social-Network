import React from 'react'
import classes from "./ButtonIconText.module.css"

const ButtonIconText = ({textToDisplay, icon, goTo ="#", plusClasses ="", action="", selected = false, Icon}) => {
  
  
    return (
      <>
        <button className={[classes.button, selected ? classes.selected : ""].join(' ')}>
            {icon}
            <p>{textToDisplay}</p>
        </button>        
      </>
    )
  }

export default ButtonIconText
