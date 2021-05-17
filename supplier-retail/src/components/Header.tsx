
import Link from 'next/link';
import { signin, signout, useSession } from 'next-auth/client';
import Logo from './Logo';
import User from './User';
import { useColorMode ,useColorModeValue} from '@chakra-ui/react';

import { Button } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import { Container, Box, Flex, Spacer} from "@chakra-ui/react"

const Header = (props) => {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode()

  const color = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("red.500", "red.200");

  return (
    <>
    <Container  bg={bg} color={color}> 
      <Flex  direction="row" 
              justify="center"
              align="center"
              position="sticky"> 
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
        <Box>
        <a href="/api/auth/signout">
          <Button>Sign out</Button>
        </a>
        </Box>  
        <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>

            </Flex>
            
            </>
          )}
        </Box>
    
      
      </Flex>
        
    
   

      <style jsx>{`
        .avatar {
          border-radius: 2rem;
          float: left;
          height: 2.2rem;
          width: 2.2rem;
          background-color: white;
          background-size: cover;
          border: 2px solid #ddd;
        }
        
      `}</style>
      </Container>
</>

    
  );
};

export default Header;