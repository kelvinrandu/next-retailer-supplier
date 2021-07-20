import Head from 'next/head';
import Header from '../components/Header';
import Navigation from '../components/Navigation';


const Layout = ({ children }) => (
  <>
    <Head>
      <title>supplier retail</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header  /> 
    {/* <Navigation/> */}
    <main >{children}</main>

  </>
);

export default Layout;