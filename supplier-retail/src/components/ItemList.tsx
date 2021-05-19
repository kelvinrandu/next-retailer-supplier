import { Box, Stack,Heading,Text,Flex, Container, Center } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import ItemSingle from "./ItemSingle"

// function Feature({ name, price, ...rest }) {
//   return (
//     <Box 
//     p={5} 
//     shadow="md" 
//     borderWidth="1px" 
//     w="30%" >
//       <Heading fontSize="xl">{name}</Heading>
//       <Text mt={4}>@</Text> 
//       <Text mt={4}> Ksh{price} </Text>

//       <Button 
//         colorScheme="teal" 
//         variant="outline" 
//         alignSelf="right" 
//         float="right">
//          view
//       </Button>
     
//     </Box>
//   )
// }

export default function ItemList(props) {
    
    return (
      <Flex 
      direction="column"
      justify="center"
      align="center"
      >
        {/* <Stack spacing={3}  > */}

          {props.items.map(e =>(
                    //   <Feature
                    //   name={e.name}
                    //   price={e.price}
                      
                    // />
                   <ItemSingle item={e} user={e.user.phone} />
                   

          ))}
      {/* </Stack> */}
      </Flex>
      
    
  )
}

