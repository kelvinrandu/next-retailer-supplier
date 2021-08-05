import React, { ReactNode, useState } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,

} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
} from "react-icons/fi";
import { IconType } from "react-icons";

import SidebarContent from "../components/SidebarContent";
import MobileNav from "../components/MobileNav";
interface ItemProps {
  name: string;
  icon: IconType;
}
const items: Array<ItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Orders", icon: FiTrendingUp },
  { name: "Items", icon: FiCompass },
];

const App = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="lg"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default App;
