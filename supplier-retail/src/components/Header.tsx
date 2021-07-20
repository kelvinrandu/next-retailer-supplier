
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import Logo from './Logo';
import User from './User';
import styled from '@emotion/styled'

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


  const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: height .5s, line-height .5s;
`

const Header = (props) => {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div style={{zIndex:10,backdropFilter:"blur(40px)",position:"fixed",width:'100vw'}}>
    <Container centerContent maxW="xl" borderBottom="1px" borderColor="gray.200" overflow="hidden" >
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
        <Flex direction="row" justify="center" align="center" wrap="wrap">
          {/* user component */}
            <User />

            {/* oders link to orders page if user is supplier */}
            {session.user.isSupplier && <>
                <Link href="/orders">
                <Button 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                padding="0.5rem" 
                margin="0.5rem">
                  orders
                </Button>
              </Link>
              </>}
            
          
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
</div>

    
  );
};

export default Header;