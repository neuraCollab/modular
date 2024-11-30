import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure, Button, Icon
} from "@chakra-ui/react";
import { FiChevronsLeft } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query"
import { FiLogOut, FiMenu } from "react-icons/fi"

import Logo from "/assets/images/fastapi-logo.svg"
import type { UserPublic } from "../../client"
import useAuth from "../../hooks/useAuth"
import SidebarItems from "./SidebarItems"
import { useState } from "react"

const Sidebar = () => {
  const queryClient = useQueryClient()
  const bgColor = useColorModeValue("ui.light", "ui.dark")
  const textColor = useColorModeValue("ui.dark", "ui.light")
  const secBgColor = useColorModeValue("ui.secondary", "ui.darkSlate")
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { logout } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLogout = async () => {
    logout()
  }

  return (
    <>

      {/* Mobile */}
      <IconButton
        onClick={onOpen}
        display={{ base: "flex", md: "none" }}
        aria-label="Open Menu"
        position="absolute"
        fontSize="20px"
        m={4}
        icon={<FiMenu />}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="250px">
          <DrawerCloseButton />
          <DrawerBody py={8}>
            <Flex flexDir="column" justify="space-between">
              <Box>
                <Image src={Logo} alt="logo" p={6} />
                <SidebarItems onClose={onClose} />
                <Flex
                  as="button"
                  onClick={handleLogout}
                  p={2}
                  color="ui.danger"
                  fontWeight="bold"
                  alignItems="center"
                >
                  <FiLogOut />
                  <Text ml={2}>Log out</Text>
                </Flex>
              </Box>
              {currentUser?.email && (
                <Text color={textColor} noOfLines={2} fontSize="sm" p={2}>
                  Logged in as: {currentUser.email}
                </Text>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop */}
      <Box
      bg={isExpanded ? "transparent" : "gray.800"} // Изменяем фон, если свернуто
      p={3}
      h="100vh"
      position="sticky"
      top="0"
      display={{ base: "none", md: "flex" }}
      transition="width 0.3s ease" // Плавная анимация изменения ширины
      w={isExpanded ? "60px" : "250px"} // Ширина сайдбара
    >
      <Flex
        flexDir="column"
        justify="space-between"
        bg={isExpanded ? "none" : "gray.700"}
        p={4}
        borderRadius={12}
        position="relative"
        h="100%"
      >
        {/* Кнопка-стрелочка */}
        <IconButton
          aria-label="Toggle sidebar"
          icon={<FiChevronsLeft  />}
          position="absolute"
          top="10px"
          right="-15px"
          onClick={toggleSidebar}
          bg="gray.600"
          color="white"
          borderRadius="full"
          _hover={{ bg: "gray.500" }}
          transition="transform 0.5s ease"
          transform={`rotate(${isExpanded ? "180deg" : "0deg"})`} // Вращение стрелки
        />

        {/* Логотип и пункты меню */}
        {!isExpanded && (
          <Box
          opacity={!isExpanded ? 1 : 0} // Управление прозрачностью
          visibility={!isExpanded ? "visible" : "hidden"} // Управление видимостью
          transition="opacity 0.7s ease, visibility 0.3s ease"
          >
            <Image src={Logo} alt="Logo" w="180px" maxW="2xs" p={6} />
            <SidebarItems />
          </Box>
        )}

        {/* Почта текущего пользователя */}
        {!isExpanded && currentUser?.email && (
          <Text
            color="white"
            noOfLines={2}
            fontSize="sm"
            p={2}
            maxW="180px"
          >
            Logged in as: {currentUser.email}
          </Text>
        )}
      </Flex>
    </Box>
    </>
  )
}

export default Sidebar
