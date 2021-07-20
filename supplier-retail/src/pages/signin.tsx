import React from 'react'
import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  HStack,
  useToast,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { getCsrfToken } from "next-auth/client";
import Link from "next/link";

const signin = ({ csrfToken }) => {
  return (
    <div>
      <Center height="100vh">
        <Box
          p={8}
          my={"15"}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form method="post" action="/api/auth/callback/credentials">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <FormControl isRequired mt={6}>
                <FormLabel>Email</FormLabel>
                <input name="email" type="text" />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                ></span>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Password</FormLabel>
                <input name="password" type="password" />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                ></span>
              </FormControl>

              <Button
                type="submit"
                variantcolor="teal"
                variant="outline"
                width="full"
                mt={4}
              >
                Login
              </Button>
            </form>
            <Link href="/signup">
              <Text align="center" fontStyle ="italics"fontSize="sm">or sign up</Text>
            </Link>
          </Box>
          <Box textAlign="center">
            <div className="bg-gray-100">
              <div className="bg-gray-100 container mx-auto px-6 pt-10 pb-6">
                © codesmithsAfrica. All rights reserved
              </div>
            </div>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default signin
