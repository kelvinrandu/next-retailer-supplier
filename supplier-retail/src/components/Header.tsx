
import Link from 'next/link';
import { signin, signout, useSession } from 'next-auth/client';
import Logo from './Logo';
import User from './User';
import { useColorMode ,useColorModeValue} from '@chakra-ui/react';

import { Button } from "@chakra-ui/react";
import { Container, Box, Flex, Spacer} from "@chakra-ui/react"

const Header = (props) => {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode()

  // const color = useColorModeValue("white", "gray.800");
  // const bg = useColorModeValue("red.500", "red.200");

  return (
    <>
    <Container  > 
      <Flex  direction="row" 
              justify="center"
              align="center"
              > 
      <Logo/>
      
      <Spacer />
        <Box>
        {!session && (
           <>
            <a href="/api/auth/signin">
              <Button>Sign in</Button>
            </a>
            </>
          )}
          {session && (
             
            <>
        <Flex direction="row"
                  justify="space-evenly"
                  align="center">
            <User />
          
            <a href="/api/auth/signout">
              <Button>Sign out</Button>
            </a>
            
            <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "Dark" : "Light"}
            </Button>
        </Flex>
            </>
          )}
        </Box>
    </Flex>
      </Container>
</>

    
  );
};

export default Header;