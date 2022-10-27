import React, { useState } from 'react'
import classes from "./TextWithImage.module.css"
import { Avatar } from "@mui/material"
import { Row, Card, Container, Col, InputGroup, FormControl, Form } from 'react-bootstrap'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ImageIcon } from '../icons';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TextWithImage = ({setContent, content, setAttachment, attachment, plusClasses=""}) => {

    //setAttachment(e.target.value)

    const [fileTemp, setTempFile] = useState(attachment)

    const uploadImage = async (e) => {
            const file = e.target.files[0]
            const base64 = await toBase64(file)
            setAttachment(String(base64))
            console.log(String(base64))
    }

    const onLoad = fileString => {
        console.log(fileString);
        this.base64code = fileString
      };

    const toBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          onLoad(reader.result);
        };
      };

    return (
        <>
            <InputGroup className={[classes.inputGroup, plusClasses].join(' ')}>
                
                <InputGroup.Text id="basic-addon2">
                    <input
                    id="icon-button-photo"
                    type="file"
                    style={{ display: 'none' }}
                    value={""}
                    onChange={(e) => uploadImage(e)}
                    />
                            
                    <FormControl
                    value={content}
                    placeholder="What you want to share ?"
                    aria-label="Username"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setContent(e.target.value)}
                    ></FormControl>
                        
                    <label htmlFor="icon-button-photo">
                        <ImageIcon></ImageIcon>
                    </label>
                    
                        <IconButton aria-label="delete" type="submit" className={"ms-2"}>
                        <AddCircleIcon fontSize='large' />
                        </IconButton>
                    </InputGroup.Text>

                </InputGroup>

        </>
    )
}

export default TextWithImage