import React from 'react';
import { Box, Stack,Heading,Text,Flex, HStack } from "@chakra-ui/layout"

export default function ItemDetail(props) {

    return (
        <Heading>
         {props.user.phone}

        </Heading>
    )
}
