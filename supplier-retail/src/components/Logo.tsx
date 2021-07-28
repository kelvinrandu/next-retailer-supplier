import React from "react";
import Link from "next/link";
import { Box} from "@chakra-ui/react";

export default function Logo() {

  return (
    <>
      <Link href="/dashboard">
        <Box
          borderWidth="1.5px"
          borderColor="#29b6f6"
          borderRadius="lg"
          overflow="hidden"
          padding="0.5rem"
          margin="0.5rem"
        >
          <span style={{ color: "#f06292" }}>Supplier</span>
          <span style={{ color: "#29b6f6" }}>~</span>
          <span style={{ color: "#8bc34a" }}>Retail</span>
        </Box>
      </Link>
    </>

    //
  );
}
