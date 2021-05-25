
import Link from 'next/link';
import { signin, signout, useSession } from 'next-auth/client';
import Logo from './Logo';
import User from './User';
import { 
  Container,
  Box,
  Flex, 
  Spacer,
  useColorMode ,
  Button,
  } from "@chakra-ui/react"

const Header = (props) => {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode()

  // const color = useColorModeValue("white", "gray.800");
  // const bg = useColorModeValue("red.500", "red.200");

  return (
    <>
    <Container maxW="xl">

      <Flex  direction="row" justify="center" align="center"> 
      <Logo/>
      
      <Spacer />
        <Box>
        {!session && (
           <>
            <Link href="/api/auth/signin">
              <Button>Sign in</Button>
            </Link>
            </>
          )}
          {session && (
             
            <>
        <Flex direction="row" justify="space-evenly" align="center">

          {/* user component */}
            <User />
          
            <Link href="/api/auth/signout">
              <Button>Sign out</Button>
            </Link>
            
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