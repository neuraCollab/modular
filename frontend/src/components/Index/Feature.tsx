import React from 'react';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Button,
  chakra,
} from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';


const Feature: React.FC = () => {
  return (
    <Box
      w="full"
      h="container.sm"
      backgroundImage="url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
      bgPos="center"
      bgSize="cover"
    >
      <Flex
        align="center"
        pos="relative"
        justify="center"
        boxSize="full"
        bg="blackAlpha.700"
      >
        <Stack textAlign="center" alignItems="center" spacing={6}>
          <Heading
            fontSize={['2xl', '3xl']}
            fontWeight="semibold"
            color="white"
            textTransform="uppercase"
          >
            Найдите дедушку на {' '}
            <chakra.span color="blue.400" textDecor="underline">
              Час
            </chakra.span>
          </Heading>
          <Link to="/signup">
            <Button
              colorScheme="blue"
              textTransform="uppercase"
              w="fit-content"
            >
              Зарегестрироваться
            </Button>
          </Link>

        </Stack>
      </Flex>
    </Box>
  );
};


export default Feature;