import React from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Container
} from '@chakra-ui/react';
import { useQuery, UseQueryResult } from '@tanstack/react-query'; // Tanstack Query for data fetching
import { MotionBox } from './Motion';
import { CommentIcon, HeartIcon } from './icons';

const BASE_URL = 'https://mahmad.me';

// Define types for the Post data structure
interface Post {
  description: string;
  title: string;
  slug: string;
  positive_reactions_count: string;
  comments_count: string;
  published_at: string;
}

// Fetch posts function
const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts'); // Replace with your API endpoint
  const data = await response.json();
  return data.posts; // Assuming the posts are in `data.posts`
};

const FeaturedArticles: React.FC = () => {
  const { data: posts, isLoading, error }: UseQueryResult<Post[], Error> = useQuery(['posts'], fetchPosts); // Fetching posts using Tanstack Query
  const linkColor = 'blue.400';
  const textColor = useColorModeValue('gray.500', 'gray.200');

  // Error handling
  if (isLoading) return <Text>Loading...</Text>;
  if (error instanceof Error) return <Text>Error loading posts: {error.message}</Text>;

  return (
    <Container maxW="4xl" p={{ base: 5, md: 12 }}>
      <VStack align="start" spacing={8} width="100%">
        <SimpleGrid columns={1} spacing={4} w="100%">
          {posts &&
            posts.map(
              (
                {
                  description,
                  title,
                  slug,
                  positive_reactions_count,
                  comments_count,
                  published_at
                },
                i
              ) => (
                <MotionBox whileHover={{ y: -5 }} key={i}>
                  <VStack
                    spacing={1}
                    p={4}
                    _hover={{ shadow: 'md', textDecoration: 'none' }}
                    borderWidth="1px"
                    position="relative"
                    rounded="md"
                    bg={useColorModeValue('white', 'gray.800')}
                    align="left"
                  >
                    <HStack justifyContent="space-between" isInline>
                      <Heading fontSize="lg" align="left" mt={0}>
                        <Link href={`${BASE_URL}/blog/${slug}`} color={linkColor}>
                          {title}
                        </Link>
                      </Heading>
                      <HStack spacing={2} isInline d={['none', 'flex', 'flex']}>
                        <Flex alignItems="center">
                          <Text
                            fontSize="sm"
                            noOfLines={1}
                            fontWeight="400"
                            align="left"
                            color={textColor}
                          >
                            {positive_reactions_count}
                          </Text>
                          &nbsp;
                          <HeartIcon />
                        </Flex>

                        <Flex alignItems="center">
                          <Text
                            fontSize="sm"
                            noOfLines={1}
                            fontWeight="400"
                            align="left"
                            color={textColor}
                          >
                            {comments_count}
                          </Text>
                          &nbsp;
                          <CommentIcon />
                        </Flex>
                      </HStack>
                    </HStack>
                    <HStack spacing={2} isInline>
                      <Text fontSize="sm" fontWeight="600" color={textColor}>
                        {published_at}
                      </Text>
                      <Flex alignItems="center" d={['flex', 'none', 'none']}>
                        <Text
                          fontSize="sm"
                          noOfLines={1}
                          fontWeight="400"
                          align="left"
                          color={textColor}
                        >
                          {positive_reactions_count}
                        </Text>
                        &nbsp;
                        <HeartIcon />
                      </Flex>

                      <Flex alignItems="center" d={['flex', 'none', 'none']}>
                        <Text
                          fontSize="sm"
                          noOfLines={1}
                          fontWeight="400"
                          align="left"
                          color={textColor}
                        >
                          {comments_count}
                        </Text>
                        &nbsp;
                        <CommentIcon />
                      </Flex>
                    </HStack>
                    <Text align="left" fontSize="md" noOfLines={1} color={textColor}>
                      {description}
                    </Text>
                  </VStack>
                </MotionBox>
              )
            )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default FeaturedArticles;
