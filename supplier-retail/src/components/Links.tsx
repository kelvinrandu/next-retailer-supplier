import React from 'react'
import {
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const Links = ({href,children}) => {
    return (
      <Link href={href}>
        <Text
          _hover={{
            transform: "translateY(-3px)",
            cursor: "pointer",
          }}
          align="center"
          fontStyle="italics"
          fontSize="sm"
        >
         {children}
        </Text>
      </Link>
    );
}

export default Links
