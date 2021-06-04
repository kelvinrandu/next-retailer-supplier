import React, { useState } from "react";
import Router from "next/router";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSupplier, setisSupplier] = useState(false);
  const toast = useToast();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { name, email, phone, password, isSupplier };
      await fetch('api/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={submitData}>
            <FormControl isRequired>
              <FormLabel>Store Name</FormLabel>
              <input
                autoFocus
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                type="text"
                value={name}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Email</FormLabel>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="text"
                value={email}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="text"
                value={password}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Phone</FormLabel>
              <input
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                type="text"
                value={phone}
              />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Sign me up as</FormLabel>
              <RadioGroup defaultValue="false">
                <HStack spacing="24px">
                  <Radio
                    name="isSupplier"
                    onChange={(e) => setisSupplier(true)}
                    value="true"
                  >
                    supplier
                  </Radio>
                  <Radio
                    name="isSupplier"
                    onChange={(e) => setisSupplier(false)}
                    value="false"
                  >
                    retail
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Button
              disabled={!name || !email || !phone || !password}
              type="submit"
              variantColor="teal"
              variant="outline"
              width="full"
              mt={4}
            >
              Register
            </Button>
          </form>
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
  );
};

export default SignUp;
