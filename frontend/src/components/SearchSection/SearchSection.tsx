import { Input } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import style from '../SearchSection/style.module.scss';


export default function SearchSection(): JSX.Element{
    return (
        <div className={style.searchSection}>
            <Input 
            placeholder={"Buscar..."} 
            autoFocus={true} 
            fullWidth={true}
            id={"search_input"}
            >    
            </Input>
            <IconButton aria-label={"search"}>
                <SearchIcon />
            </IconButton>
        </div>
    )
}