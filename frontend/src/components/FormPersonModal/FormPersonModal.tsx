import { useContext, useState } from "react";
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
import CircularProgress from '@mui/material/CircularProgress';
import { useForm, Controller } from 'react-hook-form';

import style from './style.module.scss';
import CreatePersonData from "../../types/CreatePersonData";
import { PersonContext } from "../../context/PersonContext";

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

export default function FormPersonModal({open, handleClose} : FormPersonModalData):JSX.Element{

    const {register, handleSubmit, control, setError} = useForm<any>();
    const [ imageUrl, setImageUrl ] = useState<string>("");
    const [ loading, setLoading] = useState<boolean>(false);
    const { postPerson } = useContext(PersonContext); 

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
        if(!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf)){
            setError("cpf", {
                message: "Invalid CPF format"
            })
        }

        setLoading(true);

        console.log("Fazendo requisição")

        try{
            const { status, response } = await postPerson({
                name,
                cpf,
                nick,
                gender, 
                phone, 
                address, 
                observations
            })

            console.log({ status, response });
            handleClose();
        }catch(e: any){
            console.log(e);
        }
        setLoading(false);
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
    )
}