import React from 'react'
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
  useColorMode,
  FlexProps,
  Link,
  Icon,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,

} from "react-icons/fi";
import { ReactText } from "react";
import { IconType } from "react-icons";
import Filters from "../components/Filters";
import AddDealModal from "./AddItemModal";

interface NavItemProps {
  icon: IconType;
  path: string;
  children: ReactText;
}
interface LinkItemProps {
  name: string;
  path: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", path: "/dashboard", icon: FiHome },
  { name: "Orders",path: "/orders", icon: FiTrendingUp },
  { name: "Items", path: "/items",icon: FiCompass },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="10"
        mb={10}
        justifyContent="space-between"
      >
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          supplier~retail
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem key={link.name} path={link.path} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Filters />
      <AddDealModal />
    </Box>
  );
};

const NavItem = ({ icon, children, path }: NavItemProps) => {
      const { colorMode } = useColorMode();
      const hoverColor = { light: "gray.900", dark: "whiteAlpha.900" };
  return (
    <Link href={path} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          color: hoverColor[colorMode],
          transform: "translateX(2px)",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
export default SidebarContent
