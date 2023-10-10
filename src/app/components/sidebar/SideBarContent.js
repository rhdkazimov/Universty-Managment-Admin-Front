import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiUsers,
  FiBell,
  FiFileText,
  FiFilter,
  FiList,
  FiAward,
  FiBook,
  FiPenTool,
  FiUserCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const LinkItems = [
  { name: "Əsas Səhifə", icon: FiHome, route: "/admin/home" },
  { name: "Müəllimlər", icon: FiPenTool, route: "/admin/teachers" },
  { name: "Tələbələr", icon: FiUserCheck, route: "/admin/students" },
  { name: "Qruplar", icon: FiUsers, route: "/admin/groups" },
  { name: "Qrup Dərsləri", icon: FiList, route: "/admin/group-lessons" },
  { name: "Elanlar", icon: FiBell, route: "/admin/announces" },
  { name: "Dərslər", icon: FiFileText, route: "/admin/lessons" },
  { name: "İxtisaslar", icon: FiAward, route: "/admin/specialtys" },
  { name: "Fakültələr", icon: FiBook, route: "/admin/facultys" },
  { name: "Types", icon: FiFilter, route: "/admin/types" },
  { name: "Ayarlar", icon: FiSettings, route: "/admin/settings" },
  // { name: "Admin yarat", icon: FiSettings, route: "/admin/create" },
];

export const SidebarContent = ({ onClose, ...rest }) => {
  const NavItem = ({ icon, children, ...rest }) => {
    return (
      <Box
        as="a"
        href="#"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
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
      </Box>
    );
  };

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
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link key={link.name} to={link.route}>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </Link>
      ))}
    </Box>
  );
};
