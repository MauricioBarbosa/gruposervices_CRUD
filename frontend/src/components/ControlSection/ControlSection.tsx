import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import style from './style.module.scss';

export default function ControlSection(): JSX.Element{
    return(
        <div className={style.controlSection}>
            <Button 
            size={"medium"}
            variant={"contained"}
            startIcon={<AddIcon />}
            >
            Adicionar Pessoa
            </Button>
        </div>
    )
}