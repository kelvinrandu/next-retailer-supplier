import React from "react";
import { useColorModeValue,Input,InputGroup,InputLeftElement,Flex} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";

const SearchBar = ({searchQuery, updateInput}) => {
    const bg = useColorModeValue("#F2F1F9", "rgb(103 101 113 / 4%)");
    const color = useColorModeValue("black", "white");
 
  return (
    <Flex align={"center"}>
      <InputGroup
        display={["block", "block", "block"]}
        width="100%"
        ml={16}
        mr={16}
      >
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="teal" />}
        />
        <Input
          placeholder="search item"
          color="teal"
          focusBorderColor="red"
          size="md"
          variant="filled"
          // w={[200, 200, 600]}
          key="random1"
          value={searchQuery}
          onChange={(e) => updateInput(e.target.value)}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
