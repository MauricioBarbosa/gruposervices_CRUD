import { useContext, useState } from "react";
import Image from 'next/image';
import React from "react";

import { Modal } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ClearIcon from '@mui/icons-material/Clear';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { useForm, Controller } from 'react-hook-form';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import style from './style.module.scss';
import CreatePersonData from "../../types/CreatePersonData";
import { PersonContext } from "../../context/PersonContext";
import { PictureContext } from "../../context/PictureContext";


type FormPersonModalData = {
    open: boolean,
    handleClose: () => void 
}

type IFormInputs = {
    name: string,
    cpf: string,
    nick: string,
    gender: string, 
    phone: string, 
    address: string, 
    observations: string,
    picture: FileList
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function FormPersonModal({open, handleClose} : FormPersonModalData):JSX.Element{

    const {register, handleSubmit, control, setError, setValue} = useForm<any>();
    const [ imageUrl, setImageUrl ] = useState<string>("");
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const [ loading, setLoading] = useState<boolean>(false);
    const { postPerson } = useContext(PersonContext); 
    const { postPicture } = useContext(PictureContext);

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

    async function handlePostSubmit({
        name,
        cpf,
        nick,
        gender,
        phone,
        address,
        observations,
        picture
    }: IFormInputs){

        setLoading(true);

        console.log("Fazendo requisição")

        try{

            if(!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf.trim())){
                setError("cpf", {
                    message: "Invalid CPF format"
                })
                return; 
            }
    
            if(picture[0]){
                if(picture[0].name.length > 100){
                    throw new Error("picture name is too long")
                }
            }

            console.log(picture[0]);

            const { status, response } = await postPerson({
                name: name.trim(),
                cpf: cpf.trim(),
                nick: nick.trim(),
                gender: gender.trim(),
                phone: phone.trim(),
                address: address.trim(),
                observations: observations.trim()           
            })

            if(status === 400){
                throw new Error(response.message);
            }

            console.log(response); 

            if(picture[0]){
                const formData = new FormData(); 
                formData.append('picture', picture[0]); 

                const responsePicture = await postPicture(
                    response.id, 
                    formData
                ); 

                if(responsePicture.status === 400){
                    throw new Error(response.message);
                }
            }

            handleModalClose();
        }catch(error: any){
            setErrorMessage(error.message); 
            setTimeout(() =>{
                setErrorMessage(""); 
            }, 6000);
        }
        setLoading(false);
    }

    const handleImageChange = (e: any) =>{
        console.log(e.target.files[0]);
        e.target.files ? setImageUrl(URL.createObjectURL(e.target.files[0])) : setImageUrl("");
    }

    const handleImageRemove = () =>{
        if(imageUrl)
            setImageUrl("");
    }

    const handleCloseSnackBar = () =>{
        setErrorMessage(""); 
    }

    const handleModalClose = () =>{
        setErrorMessage("");
        setImageUrl(""); 
        setValue('picture', undefined); 
        handleClose();
    }

    return(
        <>
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
        <Modal
        open={open}
        onClose={handleModalClose}
        >
        <div className={style.addPersonModal}>
            <div className={style.closeModalSection}>
                <IconButton aria-label="close" size="large" color="error"
                onClick={handleModalClose}
                >
                    <CloseRoundedIcon fontSize="medium"/>
                </IconButton>
            </div>
            <div className={style.outerformModalSection}>
                <div className={style.formSection}>
                    <form onSubmit={handleSubmit(handlePostSubmit)}>
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
                                    {...register("picture")}
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
                            <Controller
                            control={control}
                            name="name"
                            defaultValue={""}
                            rules={{
                                required: "This field is required",
                                minLength: {
                                    value: 3, 
                                    message: "Name is too small"
                                },
                                maxLength: {
                                    value: 80, 
                                    message: "Name is too big"
                                }
                            }}
                            render={({ field: { onChange, value },fieldState:{error}}) =>(
                                <TextField 
                                id="name" 
                                label="Nome" 
                                variant="standard"
                                className={style.w50}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                />
                            )}
                            />
                            <Controller
                            control={control}
                            name="cpf"
                            defaultValue={""}
                            rules={{
                                required: "This field is required",
                                minLength: {
                                    value: 14, 
                                    message: "Invalid CPF size"
                                },
                                maxLength: {
                                    value: 14, 
                                    message: "Invalid CPF size"
                                }
                            }}
                            render={({ field: { onChange, value },fieldState:{error}}) =>(
                                <TextField 
                                id="cpf" 
                                label="CPF" 
                                variant="standard"
                                className={style.w20}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : "CPF must be in xxx.xxx.xxx-xx format"}
                                />
                            )}
                            />
                        </Box>
                        <Box
                        className={style.formSectionRow}
                        sx={{
                           '& .MuiTextField-root': { m: 1},
                         }}
                        >
                            <Controller
                            control={control}
                            name="nick"
                            defaultValue={""}
                            rules={{
                                maxLength: {
                                    value: 80, 
                                    message: "Nick is too big"
                                }
                            }}
                            render={({ field: { onChange, value },fieldState:{error}}) =>(
                                <TextField 
                                id="nick" 
                                label="Nickname" 
                                variant="standard"
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null }
                                className={style.w50}
                                />
                            )}
                            />
                            <Controller
                            control={control}
                            name="gender"
                            defaultValue={""}
                            rules={{
                                maxLength: {
                                    value: 20, 
                                    message: "Gender is too big"
                                }
                            }}
                            render={({ field: { onChange, value },fieldState:{error}}) =>(
                                <TextField 
                                id="nick" 
                                label="Gender" 
                                variant="standard"
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null }
                                className={style.w20}
                                />
                            )}
                            />
                        </Box>
                        <Box
                        className={style.formSectionRow}
                        sx={{
                           '& .MuiTextField-root': { m: 1},
                         }}
                        >
                            <Controller
                            control={control}
                            name="phone"
                            defaultValue={""}
                            rules={{
                                maxLength: {
                                    value: 15, 
                                    message: "Phone number is too big"
                                }
                            }}
                            render={({ field: { onChange, value },fieldState:{error}}) =>(
                                <TextField 
                                id="phone" 
                                label="Phone" 
                                variant="standard"
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null }
                                className={style.w20}
                                />
                            )}
                            />
                            <Controller
                            control={control}
                            name="address"
                            defaultValue={""}
                            rules={{
                                maxLength: {
                                    value: 80, 
                                    message: "Address is too big"
                                }
                            }}
                            render={({ field: { onChange, value },fieldState:{error}}) =>(
                                <TextField 
                                id="address" 
                                label="Address" 
                                variant="standard"
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null }
                                className={style.w50}
                                />
                            )}
                            />
                        </Box>
                        <Box
                        className={style.formSectionRow}
                        >
                        <Controller
                        control={control}
                        name="observations"
                        rules={{
                            maxLength: {
                                value: 100, 
                                message: "Observation is too big"
                            }
                        }}
                        defaultValue={""}
                        render={({ field: { onChange, value },fieldState:{error}}) =>(
                            <TextField 
                            id="observations" 
                            label="Observations" 
                            variant="standard"
                            multiline
                            rows={6}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null }
                            className={style.w95}
                            />
                        )}
                        />
                        </Box>
                        <Box
                        className={style.formSectionRowButton}
                        >
                            <Button
                            variant="contained"
                            fullWidth
                            className={style.buttonSubmit}
                            type="submit"
                            disabled={loading ? true : false}
                            >{
                                loading? <CircularProgress 
                                color="inherit" 
                                size={25}
                                /> : 'Cadastrar'
                            }</Button>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
        </Modal>
        </>
    )
}