import Link from "next/link";
import { useSession } from "next-auth/client";
import Logo from "./Logo";
import User from "./User";
import {
  Container,
  Box,
  Flex,
  Spacer,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = (props) => {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex justify="center">
        <Container
          centerContent
          maxW="xl"
          pos="fixed"
          borderBottom="1px"
          borderColor="gray.200"
          overflow="hidden"
          zIndex={2}
        >
          <Flex direction="row" justify="center" align="center" wrap="wrap">
            <Logo />
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
                  <Flex
                    direction="row"
                    justify="center"
                    align="center"
                    wrap="wrap"
                  >
                    {/* user component */}
                    <User />
                    {session.user.isSupplier && (
                      <>
                        <Link href="/orders">
                          <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            padding="0.5rem"
                            margin="0.5rem"
                          >
                            orders
                          </Box>
                        </Link>
                      </>
                    )}

                    <Link href="/api/auth/signout">
                      <Button>Sign out</Button>
                    </Link>
                    <Button onClick={toggleColorMode} margin={3}>
                      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                  </Flex>
                </>
              )}
            </Box>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default Header;
