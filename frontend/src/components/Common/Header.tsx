import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';

const Header: React.FC = () => {
    const bg = useColorModeValue('white', 'gray.800');
  
    return (
      <chakra.header>
        <chakra.nav bg={bg} shadow="base">
          <Box mx="auto" px={6} py={3} maxW="full">
            <Box
              display={{ md: 'flex' }}
              alignItems={{ md: 'center' }}
              justifyContent={{ md: 'space-between' }}
            >
              <Flex alignItems="center" justifyContent="space-between">
                <Box fontSize="xl" fontWeight="semibold" color="gray.700">
                  <chakra.a
                    fontSize={['xl', '2xl']}
                    fontWeight="bold"
                    color="gray.800"
                    _dark={{ color: 'white' }}
                    _hover={{
                      color: 'gray.700',
                      _dark: { color: 'gray.300' },
                    }}
                  >
                    Brand
                  </chakra.a>
                </Box>
  
                <Flex display={{ md: 'none' }}>
                  <IconButton
                    aria-label="toggle menu"
                    icon={<AiOutlineMenu />}
                    variant="ghost"
                  />
                </Flex>
              </Flex>
  
              <Box display={['none', 'flex']} alignItems={{ md: 'center' }}>
                {['Web developers', 'Web Designers', 'UI/UX Designers', 'Contact'].map((link) => (
                  <chakra.a
                    key={link}
                    display="block"
                    mx={4}
                    mt={[2, 0]}
                    fontSize="sm"
                    color="gray.700"
                    _dark={{ color: 'gray.200' }}
                    textTransform="capitalize"
                    _hover={{ color: 'brand.400', _dark: { color: 'blue.400' } }}
                  >
                    {link}
                  </chakra.a>
                ))}
              </Box>
            </Box>
          </Box>
        </chakra.nav>
      </chakra.header>
    );
  };
  
  export default Header;
  