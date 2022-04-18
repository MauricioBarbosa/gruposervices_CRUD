import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type DeletePersonDialogProps = {
    handleClose: (op: boolean) => void,
    open: boolean
}

export default function DeletePersonAlertDialog({handleClose ,open}:DeletePersonDialogProps){
    return (
        <>
            <Dialog
            open={open}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Tem certeza que deseja deletar esta pessoa?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={()=>{
                        handleClose(true)
                    }}>Sim</Button>
                    <Button onClick={()=>{
                        handleClose(false)
                    }} autoFocus>Não</Button>
                </DialogActions>
            </Dialog>
      </>
    )
}