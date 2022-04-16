import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import style from './style.module.scss';

type ControlSectionProps = {
    openModal: () => void; 
}

export default function ControlSection( {openModal}: ControlSectionProps): JSX.Element{
    return(
        <div className={style.controlSection}>
            <Button 
            size={"medium"}
            variant={"contained"}
            startIcon={<AddIcon />}
            onClick={openModal}
            >
            Adicionar Pessoa
            </Button>
        </div>
    )
}