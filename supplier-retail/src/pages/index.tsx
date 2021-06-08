import React from 'react'
import Link from 'next/link';
import { 
  Button
  } from "@chakra-ui/react";

export default function index() {
  return (
    <div>
                <Link href="/api/auth/signin">
              <Button>Sign in</Button>
            </Link>
    </div>
  )
}
