import style from '../Header/style.module.scss'
import { AppBar } from '@mui/material';

export default function Header(): JSX.Element{
    return(
        <AppBar position={"relative"}>
            <div className={style.logoSection}>
                Grupo Services Crud
            </div>
        </AppBar>
    )
}