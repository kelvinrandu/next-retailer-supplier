import Link from "next/link";
import { useSession,signOut } from "next-auth/client";
import Logo from "./Logo";
import User from "./User";
import {
  Container,
  Box,
  Flex,
  IconButton,
  useDisclosure,
  useColorMode,
  Stack,
  Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = [
  { path: "/orders", exact: true, name: "orders" },
  { path: "/items", exact: true, name: "items" },
];

const Header = (props) => {
  const [session, loading] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div style={{zIndex:10,backdropFilter:"blur(40px)",position:"fixed",width:"100vw"}}>
        <Container
          centerContent
          maxW="xl"
          borderBottom="1px"
          borderColor="gray.200"
          overflow="hidden"

        >
          <Flex direction="row" justify="center" align="center" wrap="wrap">
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />

            <Logo />
            <Button
              display={{ base: "flex", md: "none" }}
              onClick={toggleColorMode}
              margin={3}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Box display={{ base: "none", md: "flex" }}>
              {!session && (
                <>
                  <Link href="/signin">
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
                          <Button
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            padding="0.5rem"
                            margin="0.5rem"
                          >
                            orders
                          </Button>
                        </Link>
                        <Link href="/items">
                          <Button
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            padding="0.5rem"
                            margin="0.5rem"
                          >
                            items
                          </Button>
                        </Link>
                      </>
                    )}

                    <Button onClick={()=>signOut()}>Sign out</Button>

                    <Button onClick={toggleColorMode} margin={3}>
                      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                  </Flex>
                </>
              )}
            </Box>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {!session && <Link href="/signin">signin</Link>}
                {session && (
                  <>
                    {Links.map((link) => (
                      <Link href={link.path} key={link.name}>
                        {link.name}
                      </Link>
                    ))}
                    <Button onClick={()=>signOut()}>Sign out</Button>
                  </>
                )}
              </Stack>
            </Box>
          ) : null}
        </Container>
    </div>
  );
};

export default Header;
