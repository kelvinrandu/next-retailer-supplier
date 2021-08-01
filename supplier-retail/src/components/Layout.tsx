import Head from "next/head";
import Header from "../components/Header";

import { useColorMode, Box } from "@chakra-ui/react";



const Layout = ({ children,...rest }) => {
  const {colorMode} = useColorMode();
  return (
    <>
      <Head>
        <title>supplier retail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Box>
<main>{children}</main>
      </Box>
    </>
  )
  };

export default Layout;
