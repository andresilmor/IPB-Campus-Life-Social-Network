import React, { useState, useEffect } from 'react'

//import ChatSearch from "../search/search";
import { styles } from "../styles";
import Chat from "./Chat"
import ChatId from "./ChatId"
//change names 
const Window = props => {
    function itemf(testw, user){
        console.log(testw) 
        setItems(
            testw != "back"?<ChatId action={itemf} chat_id={testw} user={user}/>:<Chat action={itemf}/>

        )

      }

    const [itemses, setItems] = useState(<Chat action={itemf}/>);

    
    return (
        <div 
            className='transition-5'
            style={{
                ...styles.Window,
                ...{ display: props.visible ? 'block' : 'none' }
            }}
        >
        
        

        {itemses}
        </div>

    )
}

export default Window;