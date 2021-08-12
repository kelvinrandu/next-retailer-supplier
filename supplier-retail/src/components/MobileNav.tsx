import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Center,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

import { FaPaperPlane, FaDolly, FaEnvelope } from "react-icons/fa";


interface MobileProps extends FlexProps {
  onOpen: () => void;
}
interface LinkProps {
  name: string;
  path: string;
  icon: IconType;
}
const items: Array<LinkProps> = [
  { name: "Dashboard", path: "/dashboard", icon: FiHome },
  { name: "Inbox", path: "/myOrders", icon: FaEnvelope },
  { name: "Outbox", path: "/orders", icon: FaPaperPlane },
  { name: "My Items", path: "/items", icon: FaDolly },
];

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const { user, error, isLoading } = useUser();
  const router = useRouter();


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Supplier-retail
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {user ? (
                  <Avatar size={"sm"} src={user.picture} alt={user.name} />
                ) : (
                  <Avatar size={"sm"} />
                )}

                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {user ? (
                    <Text fontSize="sm">{user.name}</Text>
                  ) : (
                    <Text fontSize="sm">annonymous</Text>
                  )}

                  <Text fontSize="xs" color="gray.600">
                    Supplier
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {user ? (
                <>
                  <MenuItem>Profile</MenuItem>
                  <MenuDivider />

                  <Link href="/api/auth/logout">
                    <MenuItem>Sign out</MenuItem>
                  </Link>
                </>
              ) : (
                <Link href="/api/auth/login">
                  <MenuItem>Sign in</MenuItem>
                </Link>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
