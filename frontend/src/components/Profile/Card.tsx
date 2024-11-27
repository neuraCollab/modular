import React from "react";
import { Box, Flex, Icon, Image, chakra, useColorModeValue } from "@chakra-ui/react";
import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import Rating from "./Rating";

const Card = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedColor = useColorModeValue("gray.700", "gray.400");
  const iconColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Flex
      justify="center"
      align="center"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      h="100vh"
      w="100vw"
      p={4}
    >
      <Box
        w={{ base: "90vw", md: "60vw", lg: "40vw" }}
        h={{ base: "70vh", md: "60vh" }}
        bg={bgColor}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        maxW="500px"
        maxH="700px"
      >
        <Image
          w="100%"
          h="40%"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />

        <Flex alignItems="center" px={6} py={3} bg="gray.900">
          <Icon as={MdHeadset} h={6} w={6} color="white" />
          <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
            Focusing
          </chakra.h1>
        </Flex>

        <Box py={4} px={6} h="60%" overflowY="auto">
          <chakra.h1 fontSize="xl" fontWeight="bold" color={textColor}>
            Patterson Johnson
          </chakra.h1>

          <chakra.p py={2} color={mutedColor}>
            Full Stack maker & UI / UX Designer, love hip hop music. Author of Building UI.
          </chakra.p>

          <Flex alignItems="center" mt={4} color={iconColor}>
            <Icon as={BsFillBriefcaseFill} h={5} w={5} mr={2} />
            <chakra.h1 px={2} fontSize="sm">
              Choc UI
            </chakra.h1>
          </Flex>

          <Flex alignItems="center" mt={4}>
            <Rating defaultValue={4} size="24px" onChange={() => {}} />
            <chakra.span ml={2} color={mutedColor} fontSize="sm">
              4.0
            </chakra.span>
          </Flex>

          <Flex alignItems="center" mt={4} color={iconColor}>
            <Icon as={MdLocationOn} h={5} w={5} mr={2} />
            <chakra.h1 px={2} fontSize="sm">
              California
            </chakra.h1>
          </Flex>

          <Flex alignItems="center" mt={4} color={iconColor}>
            <Icon as={MdEmail} h={5} w={5} mr={2} />
            <chakra.h1 px={2} fontSize="sm">
              patterson@example.com
            </chakra.h1>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Card;
