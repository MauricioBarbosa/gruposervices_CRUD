import type { NextPage } from 'next'
import ControlSection from '../components/ControlSection/ControlSection';
import Header from '../components/Header/Header';
import PersonTable from '../components/PersonTable/PersonTable';
import SearchSection from '../components/SearchSection/SearchSection';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <SearchSection />
      <ControlSection />
      <PersonTable />
    </>
  )
}

export default Home; 
