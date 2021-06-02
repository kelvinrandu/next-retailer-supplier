import React from 'react'
import Link from 'next/link';
import {  useSession } from 'next-auth/client';
import {Box} from '@chakra-ui/react';

export default function User() {
    const [session, loading] = useSession();
    const {user}= session;
    if (!user)
    return (
           <div>
             not signed in
          </div>)
    return (
        <>

            
              {user.isSupplier && <>
                <Link href="/orders">
                  <Box  borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                padding="0.5rem" 
                margin="0.5rem">
                  <a>
                  orders
                </a>
                  </Box>
             

              
              </Link>
              </>}

             {session && (
              <Box 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                padding="0.5rem" 
                margin="0.5rem">
              {session.user.email} 
              </Box>
    )}
            
        </>
    )
}

