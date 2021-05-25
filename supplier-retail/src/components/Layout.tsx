import Head from 'next/head';
import Header from '../components/Header';


const Layout = ({ children }) => (
  <>
    <Head>
      <title>supplier retail</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header  />

    
    <main >{children}</main>
    
   


  </>
);

export default Layout;