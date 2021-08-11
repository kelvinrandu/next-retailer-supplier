import React, { useEffect } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Box,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Fade from "react-reveal/Fade";
import Wobble from "react-reveal/Wobble";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";


interface Props {}

 const index: React.FC<Props> = () => {
  const { user, error, isLoading } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  if (user)
    useEffect(() => {
      const { pathname } = Router;
      if (pathname == "/") {
        Router.push("/dashboard");
      }
    }, []);

  return (
    <>
      <Box top="0" mr={10} float="right">
        <Wobble>
          {" "}
          <Button onClick={toggleColorMode} margin={3}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Wobble>
      </Box>
      <Center h="100vh" w="100vw">
        <Container>
          <Fade bottom>
            <Flex align="center" justify="space-between">
              <Container>
                <Box>
                  <Logo />
                </Box>
                <Box>
                  Supplier retail helps connect suppliers to retailers!!
                </Box>
              </Container>
              <Container>
                <ButtonGroup isAttached variant="outline">
                  <Link href="/api/auth/login">
                    <Button>Sign in</Button>
                  </Link>
                  <Link href="/api/auth/login">
                    <Button>Sign up</Button>
                  </Link>
                </ButtonGroup>
              </Container>
            </Flex>
          </Fade>
        </Container>
      </Center>
    </>
  );
};
export default index;
