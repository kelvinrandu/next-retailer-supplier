import Link from "next/link";
import { useSession } from "next-auth/client";
import Logo from "./Logo";
import User from "./User";
import {
  Container,
  Box,
  Flex,
  Spacer,
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
  { path: "/api/auth/signout", name: "signout" },
];

const Header = (props) => {
  const [session, loading] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />

            <Logo />

            <Spacer />
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
                        <Link href="/items">
                          <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            padding="0.5rem"
                            margin="0.5rem"
                          >
                            items
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
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {!session && <Link href="/api/auth/signin">signin</Link>}
                {session && (
                  <>
                    {Links.map((link) => (
                      <Link href={link.path} key={link.name}>
                        {link.name}
                      </Link>
                    ))}
                  </>
                )}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Flex>
    </>
  );
};

export default Header;
