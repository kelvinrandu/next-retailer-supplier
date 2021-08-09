import React from "react";
import { useColorModeValue,Input,InputGroup,InputLeftElement} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";

const SearchBar = ({searchQuery, updateInput}) => {
    const bg = useColorModeValue("#F2F1F9", "rgb(103 101 113 / 4%)");
    const color = useColorModeValue("black", "white");
 
  return (
    <InputGroup>
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
  );
};

export default SearchBar;
