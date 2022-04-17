import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import style from './style.module.scss';
import ReadPersonData from '../../types/ReadPersonData';


const columns: GridColDef[] = [
    {
        field: 'picture',
        headerName: 'Picture', 
        width: 160,
        renderCell: (params)=>{
            if(params.value.pictureData){
                return <Avatar 
                alt={params.value.pictureData.alt}
                src={params.value.pictureData.src}
                />
            }   
            return <Avatar sx={{ bgcolor: deepOrange[500] }}>{params.value.name}</Avatar>
        }
    }, 
    {
        field: "name",
        headerName: "Nome", 
        width: 440,
        sortable: true
    },
    {
        field: 'cpf', 
        headerName: 'CPF',
        width: 200
    }, 
    {
        field: 'gender', 
        headerName: 'Genero',
        width: 150
    }, 
    {
        field: 'phone', 
        headerName: 'Telefone',
        width: 150
    },
    {
        field: 'edit', 
        headerName: '',
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params)=>{
            return <IconButton aria-label="delete" size="small" >
                <EditIcon fontSize="inherit" />
            </IconButton>
        }
    },
    {
        field: 'delete', 
        headerName: '',
        width: 50,
        sortable: false,
        filterable: false,
        renderCell: (params)=>{
            return <IconButton aria-label="delete" size="small">
            <DeleteIcon fontSize="inherit" />
        </IconButton>
        }
    }
]

const rows = [
    {
        id: 1,
        picture: {
            name: "MB",
        },
        name: "Mauricio Barbosa Dos Santos Júnior", 
        cpf: "442.736.598-16",
        gender: "Male",
        phone: "18997002172",
        edit: "edit",
        delete: "delete"
    },
    {
        id: 2,
        picture: {
            name: "MB",
            pictureData : {
                src: "https://observatoriodocinema.uol.com.br/wp-content/uploads/2021/10/dwayne-johnson-the-rock.webp", 
                alt: "Dwayne Johson"
            }
        },
        name: "Dwayne Johnson", 
        cpf: "442.736.598-16",
        gender: "Male",
        phone: "18997002172",
        edit: "edit",
        delete: "delete"
    }
    
]

type TableSectionProps = {
    personList: Array<ReadPersonData>
}

export default function TableSection({personList}: TableSectionProps):JSX.Element{
    return(
        <div className={style.personTable}>
            <DataGrid 
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5]}
            />
        </div>
    )
}