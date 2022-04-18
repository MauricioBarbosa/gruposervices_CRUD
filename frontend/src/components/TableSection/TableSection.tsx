import { useState } from 'react';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';

import style from './style.module.scss';
import ReadPersonData from '../../types/ReadPersonData';
import DeletePersonAlertDialog from '../DeletePersonAlertDialog/DeletePersonAlertDialog';



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
            return <IconButton aria-label="delete" size="small" 
            onClick={()=>{
                params.value.setIdToDelete(params.value.id);
                params.value.openDeleteDialogFunction(true);
            }}>
            <DeleteIcon fontSize="inherit" />
        </IconButton>
        }
    }
]

type TableSectionProps = {
    personList: Array<ReadPersonData>
    listLoading: boolean, 
    deletePerson: (id: number) => void
}

export default function TableSection({personList, listLoading, deletePerson}: TableSectionProps):JSX.Element{
    
    const [deletePersonDialogOpen, setDeletePersonDialogOpen] = useState<boolean>(false);
    const [idToDelete, setIdtoDelete ] = useState<number>(0)

    return(
        <>
        <DeletePersonAlertDialog
        handleClose={async (op: boolean)=>{
            setDeletePersonDialogOpen(false)
            if(op){
                await deletePerson(idToDelete); 
            }
            setIdtoDelete(0);
        }}
        open={deletePersonDialogOpen}
        />
        <div className={style.personTable}>
            <DataGrid 
            loading={listLoading}
            components={{
                LoadingOverlay: LinearProgress,
            }}
            columns={columns}
            rows={personList.map(person=>{
                return {
                    id: person.id, 
                    picture: {
                        name: person.name.substring(0,2).toUpperCase(), 
                        pictureData : person.picture ? {
                            src: person.picture.url, 
                            alt: person.name
                        } : null, 
                    },
                    name: person.name, 
                    cpf: person.cpf, 
                    gender: person.gender, 
                    phone: person.phone, 
                    edit: "edit",
                    delete: {
                        openDeleteDialogFunction : setDeletePersonDialogOpen,
                        setIdToDelete: setIdtoDelete,
                        id: +person.id
                    }
                }
            })}
            pageSize={5}
            rowsPerPageOptions={[5]}
            />
        </div>
        </>
    )
}