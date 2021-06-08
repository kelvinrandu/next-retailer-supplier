import React from 'react'
import Link from 'next/link';
import {Box } from '@chakra-ui/react'

export default function Logo() {
    return (
       
      // <Box borderWidth="1px" w='25vw' borderRadius="lg" overflow="hidden" padding="0.5rem" margin="0.5rem">     
      <Link href="/">
          <>
            <span style={{ color: '#f06292' }}>supplier</span>
            <span style={{ color: '#29b6f6' }}>~</span>
            <span style={{ color: '#8bc34a' }}>Retail</span>
          </>
        </Link>
        // </Box>
      
    )
    
}


