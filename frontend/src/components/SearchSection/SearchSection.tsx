import { Dispatch, SetStateAction } from "react";

import { Input } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import style from '../SearchSection/style.module.scss';


type SearchSectionProps = {
    setSearchPerson: Dispatch<SetStateAction<string>>
}

export default function SearchSection({ setSearchPerson }: SearchSectionProps): JSX.Element{
    return (
        <div className={style.searchSection}>
            <Input 
            onChange={(e)=>{
               setSearchPerson(e.target.value)
            }}
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