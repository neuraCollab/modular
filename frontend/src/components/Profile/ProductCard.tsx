import React from 'react';
import {
  chakra,
  Box,
  SimpleGrid,
  Flex,
  Text,
  Image,
  Container,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsTelephoneX } from 'react-icons/bs';

interface ProductCardProps {
  id: number;
  title: string;
  detail: string[];
  location: string;
  updated_at: string;
  price: string;
  image: string;
  isFeatured?: boolean;
}

const productsList: ProductCardProps[] = Array.from({ length: 10 }).map((_, idx) => ({
  id: idx + 1,
  title: `Ford F-150 SUV 202${idx % 2}`,
  location: 'Paris',
  detail: ['2021', 'Petrol', '4500 cc', 'Automatic'],
  updated_at: '17 days ago',
  price: `$${400 + idx * 10}k`,
  isFeatured: idx % 3 === 0,
  image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
}));

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  detail,
  location,
  updated_at,
  price,
  image,
  isFeatured,
}) => (
  <Box
    border="1px solid"
    borderColor="gray.300"
    rounded="md"
    overflow="hidden"
    bg="white"
    shadow="md"
    pos="relative"
  >
    {isFeatured && (
      <Flex
        pos="absolute"
        top={2}
        left={2}
        bg="red.400"
        color="white"
        px={2}
        py={1}
        rounded="sm"
        fontSize="sm"
        fontWeight="bold"
        zIndex={1}
      >
        Featured <Icon as={AiOutlineExclamationCircle} ml={1} />
      </Flex>
    )}
    <Image src={image} alt={title} objectFit="cover" h={48} w="100%" />
    <Stack p={4} spacing={3}>
      <Flex justify="space-between" align="center">
        <chakra.h3 fontSize="lg" fontWeight="bold" isTruncated>
          {title}
        </chakra.h3>
        <chakra.span fontSize="lg" fontWeight="bold" color="green.500">
          {price}
        </chakra.span>
      </Flex>
      <Text fontSize="sm" color="gray.500" isTruncated>
        {location}
      </Text>
      <Flex wrap="wrap" gap={2}>
        {detail.map((item, idx) => (
          <chakra.span key={idx} fontSize="sm" color="gray.600">
            {item}
            {idx < detail.length - 1 && <chakra.span mx={1}>|</chakra.span>}
          </chakra.span>
        ))}
      </Flex>
      <Text fontSize="xs" color="gray.400">
        Updated {updated_at}
      </Text>
      <Flex mt={3} justify="space-between">
        <Flex
          as="button"
          align="center"
          border="1px solid"
          borderColor="gray.300"
          rounded="md"
          px={3}
          py={1}
          fontSize="sm"
        >
          <Icon as={AiOutlineHeart} mr={2} />
          Add to Favorites
        </Flex>
        <Flex
          as="button"
          align="center"
          bg="blue.500"
          color="white"
          rounded="md"
          px={3}
          py={1}
          fontSize="sm"
          _hover={{ bg: 'blue.600' }}
        >
          <Icon as={BsTelephoneX} mr={2} />
          Contact Seller
        </Flex>
      </Flex>
    </Stack>
  </Box>
);

const Index: React.FC = () => (
  <Container maxW="7xl" py={8}>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      {productsList.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </SimpleGrid>
  </Container>
);

export default Index;
