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

        <Box pl={[0, null, "18rem"]} mt="4rem">
          <Box
            as="section"
            backgroundColor={colorMode === "light" ? "gray.100" : "gray.900"}
            minHeight="calc(100vh - 4rem)"
          >
            <Box {...rest}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </>
  )
  };

export default Layout;
