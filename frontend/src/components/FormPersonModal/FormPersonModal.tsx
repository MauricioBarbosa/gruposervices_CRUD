import { useState } from "react";
import Image from 'next/image';

import { Modal } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ClearIcon from '@mui/icons-material/Clear';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import style from './style.module.scss';

type FormPersonModalData = {
    open: boolean,
    handleClose: () => void 
}

export default function FormPersonModal({open, handleClose} : FormPersonModalData):JSX.Element{

    const [ imageUrl, setImageUrl ] = useState<string>("");

    function checkImageSelected(){
        if(imageUrl){
            return  <Image
            src={imageUrl}
            width={206}
            height={192}
            alt={"test image"}
            className={style.imageSelected}
            priority
            ></Image>
        }
        return <div className={style.imageNotSelected}>
            <CameraAltIcon 
            fontSize='large'
            />   
        </div>
    }

    const handleImageChange = (e: any) =>{
        e.target.files ? setImageUrl(URL.createObjectURL(e.target.files[0])) : setImageUrl("");
    }

    const handleImageRemove = () =>{
        if(imageUrl)
            setImageUrl("");
    }

    return(
        <Modal
        open={open}
        onClose={handleClose}
        keepMounted
        >
        <div className={style.addPersonModal}>
            <div className={style.closeModalSection}>
                <IconButton aria-label="close" size="large" color="error"
                onClick={handleClose}
                >
                    <CloseRoundedIcon fontSize="medium"/>
                </IconButton>
            </div>
            <div className={style.outerformModalSection}>
                <div className={style.formSection}>
                    <form>
                        <Box className={style.imageSection}>
                            {checkImageSelected()}
                            <div className={style.imageControl}>
                                <IconButton color="error" aria-label="delete picture" component="span"
                                onClick={handleImageRemove}
                                >
                                    <ClearIcon />
                                </IconButton>     
                                <label htmlFor="contained-button-file">
                                    <input accept="image/jpg" id="contained-button-file" type="file" className={style.inputImageHidden}
                                    onChange={handleImageChange}
                                    />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>                             
                            </div>           
                        </Box>
                        <Box
                         className={style.formSectionRow}
                         sx={{
                            '& .MuiTextField-root': { m: 1},
                          }}
                        >
                            <TextField 
                            id="person_name" 
                            label="Nome" 
                            variant="standard"
                            className={style.w50}
                            />
                            <TextField 
                            id="person_cpf" 
                            label="CPF" 
                            variant="standard" 
                            className={style.w20}
                            />
                        </Box>
                        <Box
                        className={style.formSectionRow}
                        sx={{
                           '& .MuiTextField-root': { m: 1},
                         }}
                        >
                            <TextField 
                            id="person_nickname" 
                            label="Nickname" 
                            variant="standard"
                            className={style.w50}
                            />
                            <TextField 
                            id="person_gender" 
                            label="Gender" 
                            variant="standard"
                            className={style.w20}
                            />
                        </Box>
                        <Box
                        className={style.formSectionRow}
                        sx={{
                           '& .MuiTextField-root': { m: 1},
                         }}
                        >
                            <TextField 
                            id="person_phonenumber" 
                            label="Phone" 
                            variant="standard"
                            className={style.w20}
                            />
                            <TextField 
                            id="person_address" 
                            label="Address" 
                            variant="standard"
                            className={style.w50}
                            />
                        </Box>
                        <Box
                        className={style.formSectionRow}
                        >
                        <TextField 
                            id="person_observations" 
                            label="Observations" 
                            variant="standard"
                            multiline
                            rows={6}
                            className={style.w95}
                        />
                        </Box>
                        <Box
                        className={style.formSectionRowButton}
                        >
                            <Button
                            variant="contained"
                            fullWidth
                            className={style.buttonSubmit}
                            
                            >Cadastrar / Alterar</Button>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
        </Modal>
    )
}