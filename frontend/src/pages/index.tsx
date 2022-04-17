import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react';

import ControlSection from '../components/ControlSection/ControlSection';
import Header from '../components/Header/Header';
import TableSection from '../components/TableSection/TableSection';
import SearchSection from '../components/SearchSection/SearchSection';
import FormPersonModal from '../components/FormPersonModal/FormPersonModal';

import { appConfig } from '../config/appConfig';
import AxiosApiProvider from '../providers/axios/AxiosApiProvider';


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
      {/* <TableSection /> */}
    </>
  )
}

export default Home; 

// export const getServerSideProps: GetServerSideProps = async (ctx) =>{
//     // const api = new AxiosApiProvider(appConfig.backendUrlContainer).getInstanceJson();

//     // const personList_resp = await api.get('/person/'); 

//     // console.log(personList_resp); 

//     return {
//       props: {

//       }
//     }
// }
