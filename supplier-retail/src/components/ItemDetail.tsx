import React from 'react';
import { Box, Stack,Heading,Text,Flex, HStack } from "@chakra-ui/layout"

export default function ItemDetail(props) {
    console.log(props);
    return (
        <Heading>
            {props.item.name} @ {props.item.price }by {props.item.user.name}
        
     

        </Heading>
    )
}
