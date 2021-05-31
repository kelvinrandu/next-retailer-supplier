import React, { useState } from 'react'
import Router from 'next/router'
import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  HStack,
} from "@chakra-ui/react"
import { 
    Box, 
    Center, 
    Heading
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useSession } from 'next-auth/client';


const First: React.FC = () => {

  const [session, loading] = useSession();
  const [isSupplier, setisSupplier] = useState(false)
  const [email, setEmail] = useState(session.user.email)


  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
 
      const body = { password,email}
      await fetch(`http://localhost:3000/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/')
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
                            <Heading>Register</Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form onSubmit={submitData}>
        
                             <FormControl as="fieldset">
                            <FormLabel as="legend">Sign me up as</FormLabel>
                            <RadioGroup   
                            defaultValue="false">
                                <HStack spacing="24px">
                                <Radio name="isSupplier" onChange={e => setisSupplier(true)} value="true">supplier</Radio>
                                <Radio name="isSupplier" onChange={e => setisSupplier(false)} value="false">retail</Radio>
                    
                                </HStack>
                            </RadioGroup>
                            
                            </FormControl> 
                            <Button
                           
                                type="submit" 
                                variantColor="teal" 
                                variant="outline" 
                                width="full" mt={4}>
                                Register
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