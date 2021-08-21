import React from "react";
import {
  IconButton,
  Icon,
  AvatarBadge,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Link,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Badge,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { useUser } from "@auth0/nextjs-auth0";
import { BellIcon } from "@chakra-ui/icons";



interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const  MobileNav: React.FC<MobileProps> = ({ onOpen, ...rest }) => {
  const { user, error, isLoading } = useUser();

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
        {/* <Avatar
          as="button"
          aria-label="notifications"
          icon={<BellIcon />}
          children={<AvatarBadge boxSize="1rem" bg="red.500" />}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Badge badgeContent={2}>3</Badge> */}

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
                  {/* <MenuItem>Profile</MenuItem>
                  <MenuDivider /> */}

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
