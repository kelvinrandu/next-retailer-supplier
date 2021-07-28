import React, { useState } from "react";
import Router from "next/router";
import * as yup from "yup";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  HStack,
  useToast,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";


const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSupplier, setisSupplier] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const bgColor = {
    light: "white",
    dark: "#1c1c1c",
  };
  const color = {
    light: "#171717",
    dark: "#171717 ",
  };


  const submitData = async (e: React.SyntheticEvent) => {
    
const user = { name, email, phone, password, isSupplier };
    try {
      const body = { name, email, phone, password, isSupplier };
      const user = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      await Router.push("/dashboard");
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      console.error(error);
    }
    return false;
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
        className="glass"
      >
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(submitData)}>
            <FormControl isRequired>
              <FormLabel>Store Name</FormLabel>
              <Input
                autoFocus
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                variant="filled"
                type="text"
                value={name}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Email</FormLabel>
              <Input
                autoFocus
                {...register("email")}
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="text"
                value={email}
              />
            </FormControl>
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {errors.email?.message}
            </span>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password")}
                variant="filled"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                value={password}
              />
            </FormControl>
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              <p>{errors.password?.message}</p>
            </span>
            <FormControl isRequired mt={6}>
              <FormLabel>Phone</FormLabel>
              <Input
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                type="text"
                variant="filled"
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
              variantcolor="teal"
              variant="outline"
              width="full"
              mt={4}
            >
              Register
            </Button>
          </form>
          <Link href="/signin">or signin</Link>
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
