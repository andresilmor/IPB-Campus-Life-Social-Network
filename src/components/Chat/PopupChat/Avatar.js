import React, { useState } from "react";
import { styles } from './styles';

const Avatar = props => {
    const [hovered, setHovered] = useState(false)
    const [BTNPopup,setBTNPopup]=useState(false)
 
    return (
        <div style={{position:'fixed',bottom:'24px',right:'24px'}}>


            <div 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
                className='transition-3'
                style={{
                    ...styles.chatWithMeButton,
                    ...{ border: hovered ? '1px solid #f9f0ff' : '4px solid #7a39e0' }
                }}
            />
        </div>
    )
}

export default Avatar; 