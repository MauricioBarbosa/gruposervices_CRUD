import type { GetServerSideProps, NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import React from 'react';

import ControlSection from '../components/ControlSection/ControlSection';
import Header from '../components/Header/Header';
import TableSection from '../components/TableSection/TableSection';
import SearchSection from '../components/SearchSection/SearchSection';
import FormPersonModal from '../components/FormPersonModal/FormPersonModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { appConfig } from '../config/appConfig';
import AxiosApiProvider from '../providers/axios/AxiosApiProvider';
import ReadPersonData from '../types/ReadPersonData';
import { PersonContext } from '../context/PersonContext';
import { PictureData, UpdatePersonData } from '../types/UpdatePersonData';


type IndexPageProps = {
  personListPageProps: Array<ReadPersonData>
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home: NextPage = ({personListPageProps}: IndexPageProps) => {

  const { getPersons, searchByName, deletePerson } = useContext(PersonContext); 

  const [searchPerson, setSearchPerson] = useState(''); 
  const [listLoading, setListLoading] = useState(false);
  const [personList, setPersonList] = useState<Array<ReadPersonData>>(personListPageProps); 
  const [personToUpdateData, setPersonToUpdateData] = useState<UpdatePersonData | undefined>(undefined); 
  const [personToUpdatePicture, setPersonToUpdatePicture] = useState<PictureData | undefined>(undefined); 
  const [errorMessage, setErrorMessage] = useState('');

  const [openFormPersonModal, setOpenFormPersonModal] = useState(false);

  const debounced = useDebouncedCallback((value)=>{
    setSearchPerson(value); 
  }, 1000)

  useEffect(()=>{
      const searchData = async ()=>{
        if(searchPerson.length > 0){
            setListLoading(true)
            try {
            const { status, response } = await searchByName(searchPerson);
            if(status != 200){
              throw new Error("an error has occured"); 
            }
      
            console.log(response); 
      
            setPersonList(response); 
          } catch (error: any) {
            setPersonList([]);
          }
          setListLoading(false);
        }else{
          try {
            const { status, response } = await getPersons(); 
            if(status != 200){
              throw new Error("an error has occured"); 
            }
      
            console.log(response); 
      
            setPersonList(response); 
          } catch (error: any) {
            setPersonList([]);
          }
            setListLoading(false);
          }
        }
      searchData();
    }, [searchPerson]); 

  const handlePersonModalOpen = () =>{
    setOpenFormPersonModal(true);
  }

  const handleCloseSnackBar = () =>{
    setErrorMessage(""); 
  }

  const handlePersonModalClose = async () =>{
    setOpenFormPersonModal(false);
    setListLoading(true);
    try {
      const { status, response } = await getPersons(); 
      if(status != 200){
        throw new Error("an error has occured"); 
      }

      console.log(response); 

      setPersonList(response); 
    } catch (error: any) {
      setPersonList([]);
    }
    setListLoading(false);

    if(personToUpdateData){
      setPersonToUpdateData(undefined); 
    }

    if(personToUpdatePicture){
      setPersonToUpdatePicture(undefined);
    }
  }

  const handleDeletePerson = async (id: number) =>{
    try {
      const deleteOp = await deletePerson(id); 
      if(deleteOp.status != 200){
        throw new Error("an error has occured"); 
      }

      const { status, response } = await getPersons(); 

      setPersonList(response);
    } catch (error) {
      setErrorMessage("Erro ao deletar")
    }
    setListLoading(false);
  } 

  return (
    <>
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Header />
      {
        openFormPersonModal ? 
        <FormPersonModal 
      handleClose={handlePersonModalClose} 
      open={openFormPersonModal} 
      dataToUpdate={personToUpdateData}
      pictureToUpdate={personToUpdatePicture}
      /> : <></>
      }
      <SearchSection setSearchPerson={debounced}/>
      <ControlSection openModal={handlePersonModalOpen}/>
      <TableSection 
      personList={personList} 
      listLoading={listLoading}
      deletePerson={handleDeletePerson}
      setPersonToUpdate={setPersonToUpdateData}
      setPersonPictureToUpdate={setPersonToUpdatePicture}
      setOpenFormPersonModal={setOpenFormPersonModal}
      />
    </>
  )
}

export default Home; 

export const getServerSideProps: GetServerSideProps = async (ctx) =>{
    const api = new AxiosApiProvider(appConfig.backendUrlContainer).getInstanceJson();

    const { data } = await api.get('/person/'); 

    console.log(data);

    return {
      props: {
        personListPageProps: data 
      }
    }
}
