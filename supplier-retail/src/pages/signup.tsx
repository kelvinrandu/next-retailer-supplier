import React, { useState } from 'react'
import Router from 'next/router'
import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormHelperText,
  HStack,
} from "@chakra-ui/react"



const SignUp: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSupplier, setisSupplier] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const body = { name, email, phone ,isSupplier}
      await fetch(`http://localhost:3000/api/user`, {
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
 
      <div className="page">
        <form
          onSubmit={submitData}>
          <h1>Signup user</h1>
          <input
            autoFocus
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <input
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            type="text"
            value={email}
          />
          <input
            onChange={e => setPhone(e.target.value)}
            placeholder="Phone"
            type="text"
            value={phone}
          />
            <FormControl as="fieldset">
              <FormLabel as="legend">Favorite Naruto Character</FormLabel>
              <RadioGroup   
              defaultValue="false">
                <HStack spacing="24px">
                  <Radio name="isSupplier" onChange={e => setisSupplier(true)} value="true">supplier</Radio>
                  <Radio name="isSupplier" onChange={e => setisSupplier(false)} value="false">retail</Radio>
      
                </HStack>
              </RadioGroup>
             
            </FormControl>
          <input
            disabled={!name || !email || !phone}
            type="submit"
            value="Signup"
          />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
        </a>
        </form>
      </div>
  
 
   
  )
}

export default SignUp;