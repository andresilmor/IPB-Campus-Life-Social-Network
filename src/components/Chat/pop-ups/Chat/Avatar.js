import React, { useState } from "react";
import { styles } from './styles';

const Avatar = props => {
    const [hovered, setHovered] = useState(false)

    return (
        <div style={{position:'fixed',bottom:'24px',right:'24px'}}>


            <div 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
                className='transition-3'
                style={{
                    ...styles.chatWithMeButton
                }}
            />
        </div>
    )
}

export default Avatar; 