import React,{useEffect} from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Box,
  Container,
} from "@chakra-ui/react";
import Router from "next/router";
import { useSession } from 'next-auth/client';

export default function index() {
  const [session, loading] = useSession();
  if (session)
  useEffect(() => { 
    const {pathname} = Router
    if(pathname == '/' ){
      Router.push('/dashboard');
    }  
  }
  , []);

  return (
    <Center h="100vh" w="100vw">
      <Container>
        <Flex align="center" justify="space-between">
          <Container>
            <Box>
              <Logo />
            </Box>
            <Box>Supplier retail helps connect suppliers to retailers!!</Box>
          </Container>
          <Container>
            <ButtonGroup isAttached variant="outline">
              <Link href="/api/auth/signin">
                <Button>Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </ButtonGroup>
          </Container>
        </Flex>
      </Container>
    </Center>
  );
}
