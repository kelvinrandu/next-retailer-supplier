import React from 'react'
import Link from 'next/link';
import { signin, signout, useSession } from 'next-auth/client';
import {Box} from '@chakra-ui/react';

export default function User() {
    const [session, loading] = useSession();
    return (
        <>
            {/* <Link href="/profile">
                <a>
                  <span
                    style={{ backgroundImage: `url(${session.user.image})` }}
                    className="avatar"
                  />
                </a>

                <span>{session.user.email}</span>
              </Link> */}
              {/* {session.user.image} */}
              {session.user.isSupplier ? 'supplier': 'retail'}
              <Box 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                padding="0.5rem" 
                margin="0.5rem">
              {session.user.email} 
              </Box>
              
              
            
        </>
    )
}

