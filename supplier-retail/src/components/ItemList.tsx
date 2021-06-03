import { Flex } from "@chakra-ui/layout"
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
      pt={40}
      >
          {props.items.map(e =>(

          <ItemSingle item={e} />
        
          ))}
      </Flex>
  )
}

export default  ItemList