import { Box, Stack,Heading,Text,Flex, Container, Center } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import ItemSingle,{ ItemProps } from "./ItemSingle"

export type Props = {
  items: ItemProps[]
} 
const ItemList: React.FC<Props> = props => {
    
    return (
      <Flex      
      direction="column"
      justify="center"
      align="center"
      >
          {props.items.map(e =>(

          <ItemSingle item={e} />
        
          ))}
      </Flex>
  )
}

export default  ItemList