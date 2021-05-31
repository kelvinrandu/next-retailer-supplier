import React, { useState } from 'react'
import Router from 'next/router'
import {
  FormControl,
  FormLabel,

} from "@chakra-ui/react"
import { 
    Box, 
    Center, 
    Heading
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";



const First: React.FC = () => {


  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')


  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
 
      const body = { password,email}
      await fetch(`http://localhost:3000/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    
    } catch (error) {
      console.error(error)
    }
  }

  return (
 
        <Center height="100vh">  
                <Box 
                p={8} 
                my={"15"}  
                maxWidth="500px" 
                borderWidth={1} 
                borderRadius={8} 
                boxShadow="lg">
                    <Box textAlign="center">
                            <Heading>Login</Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form onSubmit={submitData}>
                        <FormControl isRequired mt={6}>
                                <FormLabel>Email</FormLabel>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="email"
                                    type="text"
                                    value={email}
                                />
                            </FormControl>  
                            <FormControl isRequired mt={6}>
                                <FormLabel>Password</FormLabel>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Password"
                                    type="text"
                                    value={password}
                                />
                            </FormControl>  
                            <Button
                           
                                type="submit" 
                                variantColor="teal" 
                                variant="outline" 
                                width="full" mt={4}>
                                Login
                            </Button>

                    
                        </form>
                        </Box>
                            <Box textAlign="center">
                                <div className="bg-gray-100">
                                    <div className="bg-gray-100 container mx-auto px-6 pt-10 pb-6" >
                                                
                                                © codesmithsAfrica. All rights reserved
                                    </div>
                                </div>
                            </Box>
                    </Box>
            </Center>
   
  )
}

export default First;