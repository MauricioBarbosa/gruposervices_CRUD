import type { NextPage } from 'next'
import { useState } from 'react';

import ControlSection from '../components/ControlSection/ControlSection';
import Header from '../components/Header/Header';
import TableSection from '../components/TableSection/TableSection';
import SearchSection from '../components/SearchSection/SearchSection';
import FormPersonModal from '../components/FormPersonModal/FormPersonModal';


const Home: NextPage = () => {

  const [openFormPersonModal, setOpenFormPersonModal] = useState(false);
  const handleOpen = () =>{
    setOpenFormPersonModal(true);
  }
  const handleClose = () =>{
    setOpenFormPersonModal(false);
  }

  return (
    <>
      <Header />
      <FormPersonModal handleClose={handleClose} open={openFormPersonModal}/>
      <SearchSection />
      <ControlSection openModal={handleOpen}/>
      <TableSection />
    </>
  )
}

export default Home; 
