
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import Logo from './Logo';
import User from './User';
import { 
  Container,
  Box,
  Flex, 
  Spacer,
  useColorMode ,
  Button
  } from "@chakra-ui/react";
  import { 
    MoonIcon,
    SunIcon

  } from '@chakra-ui/icons'

const Header = (props) => {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode()


  return (
    <>
    <Container maxW="xl" >

      <Flex  direction="row" justify="center" align="center" wrap="wrap"> 
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
        <Flex direction="row" justify="space-between" align="center">


          {/* user component */}
            <User />
            
          
            <Link href="/api/auth/signout">
              <Button>Sign out</Button>
            </Link>
            
            
            <Button onClick={toggleColorMode} margin={3}>
            {colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
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