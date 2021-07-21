import React from "react";
import { useColorModeValue } from "@chakra-ui/react";

const SearchBar = ({searchQuery, updateInput}) => {
    const bg = useColorModeValue("#F2F1F9", "rgb(103 101 113 / 4%)");
    const color = useColorModeValue("black", "white");
  const BarStyling = {
    width: "20rem",
    color: color,
    background: bg,
    border: "none",
    padding: "0.5rem",
  };
 
  return (
    <input
      style={BarStyling}
      key="random1"
      value={searchQuery}
      placeholder={"search item"}
      onChange={(e) => updateInput(e.target.value)}
    />
  );
};

export default SearchBar;
