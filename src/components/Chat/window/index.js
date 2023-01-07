import React, { useState, useEffect } from 'react'

//import ChatSearch from "../search/search";
import { styles } from "../styles";
import Chat from "./Chat"
import ChatId from "./startchat"
//change names 
//add back botton
const Window = props => {
    function itemf(testw){
        console.log(testw)//its statique need to change 
        setItems(
            <ChatId/>

        )
      }

      const [test, setTest] = useState("test");

    const [itemse, setItems] = useState(<Chat action={itemf}/>);
    
    return (
        <div 
            className='transition-5'
            style={{
                ...styles.Window,
                ...{ display: props.visible ? 'block' : 'none' }
            }}
        >
        
        
        {itemse}
        </div>

    )
}

export default Window;