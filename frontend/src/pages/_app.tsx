import '../styles/global.scss';
import type { AppProps } from 'next/app'
import { PersonContextProvider } from '../context/PersonContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PersonContextProvider>
      <Component {...pageProps} />
    </PersonContextProvider>
  )
}

export default MyApp
