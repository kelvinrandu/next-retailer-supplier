import React, { useState } from "react";
import { FormControl,Input, FormLabel, useColorModeValue,Text, useToast } from "@chakra-ui/react";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { getCsrfToken, signIn } from "next-auth/client";
import Link from "next/link";
import Router from "next/router";

const signin = ({ csrfToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
 

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
   
    if (response.error){

        return toast({
          title: "Incorrect credentails.",
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
    }else{
        return await Router.push("/dashboard");
    }

  };
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
            <form onSubmit={onSubmit}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <FormControl isRequired mt={6}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={email}
                  variant="filled"
                  placeholder={"Enter email"}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                ></span>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"Enter password"}
                  variant="filled"
                  name="password"
                  type="password"
                />
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
              <Text
                _hover={{
                  transform: "translateY(-3px)",
              
                }}
                align="center"
                fontStyle="italics"
                fontSize="sm"
              >
                or sign up
              </Text>
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

export default signin;
