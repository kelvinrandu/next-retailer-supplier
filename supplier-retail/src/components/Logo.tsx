import React from "react";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

export default function Logo() {
  return (
    <>
      <Link href="/dashboard">
        <Button
          borderWidth="none"
          borderRadius="lg"
          overflow="hidden"
          padding="0.5rem"
          margin="0.5rem"
        >
          <span style={{ color: "#f06292" }}>supplier</span>
          <span style={{ color: "#29b6f6" }}>~</span>
          <span style={{ color: "#8bc34a" }}>Retail</span>
        </Button>
      </Link>
    </>

    //
  );
}
