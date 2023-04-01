import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Router from "next/router";
import Wobble from "react-reveal/Wobble";
import Jump from "react-reveal/Jump";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Spin from "react-reveal/Spin";

interface Props {}

export const Container = (props) => (
  <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />
);

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box as="header" width="full" height="4rem">
      <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
        <Flex
          size="100%"
          p={[0, 6]}
          pl={[0, 4]}
          align="center"
          justify="space-between"
        >
          <Box d="block" aria-label="supplier index page">
            <Heading as="h1" size="lg" fontWeight="black">
              Alternative~Feeds
            </Heading>
          </Box>
          <Flex align="center">
            <Wobble>
              <NextLink href="/api/auth/login" passHref>
                <Button variant="ghost">{"Sign In"}</Button>
              </NextLink>
            </Wobble>
            <Spin>
              <Button onClick={toggleColorMode} margin={3}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Spin>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
const HomePage: React.FC<Props> = () => {
  const { user, error, isLoading } = useUser();

    useEffect(() => {
      if (user) Router.push("/dashboard");
    }, [user]);

  return (
    <Box h="100vh">
      <Header />
      <Box as="section" pt={40} pb={24}>
        <Container>
          <Box maxW="xl" mx="auto" textAlign="center">
            <Heading as="h1" size="xl" fontWeight="black">
              post . get order . sell
            </Heading>

            <Text opacity="0.7" fontSize="lg" mt="6">
              Supplier retail helps you connect to potential customers , just
              post your item and await orders from interested customers.
            </Text>
            <Jump>
              <Box mt="6">
                <NextLink href="/api/auth/login" passHref>
                  <Button size="lg" as="a" colorScheme="teal">
                    Let's Get Started
                  </Button>
                </NextLink>
              </Box>
            </Jump>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
