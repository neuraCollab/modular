import * as React from 'react';
import { Flex, Avatar, Box, Container, Button, IconButton } from '@chakra-ui/react';
import { MotionBox, MotionFlex } from './Motion';
import Header from './Header';
import ChatComponent from '../Chat/ChatComponent';
// import VideoChat from "../Chat/VideoChat"
import { FaHeart, FaBriefcase } from 'react-icons/fa';
import { IoMdCall } from "react-icons/io";
import { FcVideoCall } from "react-icons/fc";

interface IntroSection {
  name?: string
}

const ANIMATION_DURATION = 0.5;

const IntroSection = ({ name }: IntroSection) => {
  const color = 'blue.400';

  return (
    <Container maxW="5xl" p={{ base: 5, md: 12 }}>
      <Flex direction={['column', 'column', 'row']} alignItems={"flex-start"}>
        <Flex direction={['column']}>


          <MotionBox
            opacity="0"
            initial={{
              translateX: -150,
              opacity: 0
            }}
            animate={{
              translateX: 0,
              opacity: 1,
              transition: {
                duration: ANIMATION_DURATION
              }
            }}
            m="auto"
            mb={[16, 16, 'auto']}
          >
            <MotionBox whileHover={{ scale: 1.2 }} rounded="full" shadow="lg">
              <Avatar
                size="2xl"
                showBorder={true}
                borderColor={color}
                src={'https://avatars2.githubusercontent.com/u/37842853?v=4'}
              />
            </MotionBox>

          </MotionBox>
          {/* Buttons in a row */}
          <MotionFlex
            opacity="0"
            initial={{
              translateX: -150,
              opacity: 0
            }}
            animate={{
              translateX: 0,
              opacity: 1,
              transition: {
                duration: ANIMATION_DURATION
              }
            }}
            m="auto"
            mb={[16, 16, 'auto']}
            position="relative"
            direction="row"
            justify="center"
            align="center"
            mt={4} // Space between avatar and buttons
          >
            <Button mr={4} colorScheme="teal"> {/* Margin between buttons */}
              Chat Me
            </Button>
            <Button colorScheme="blue">
              Call Me
            </Button>

          </MotionFlex>


        </Flex>

        <MotionFlex
          position="relative"
          ml={['auto', 'auto', 16]}
          m={['auto', 'initial']}
          w={['90%', '85%', '80%']}
          maxW="800px"
          opacity="0"
          justifyContent="center"
          direction="column"
          initial={{
            opacity: 0,
            translateX: 150
          }}
          animate={{
            opacity: 1,
            translateX: 0,
            transition: {
              duration: ANIMATION_DURATION
            }
          }}
        >
          <Box position="relative">
            <MotionBox whileHover={{ translateY: -5 }} width="max-content">
              <Header underlineColor={color} mt={0} cursor="pointer" width="max-content">
                Hey{name && ", " + String(name)}!
              </Header>

            </MotionBox>
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="400" textAlign="left">
            My name is{' '}
            <Box as="strong" fontWeight="600">
              Ahmad
            </Box>{' '}
            and I&apos;m a{' '}
            <Box as="span" whiteSpace="nowrap">
              Full Stack Developer and
            </Box>{' '}
            <Box as="span" whiteSpace="nowrap">
              an open source lover&nbsp;
            </Box>
            from{' '}
            <Box as="span" whiteSpace="nowrap">
              Pakistan 🇵🇰
            </Box>
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="400" mt={5} textAlign="left">
            This is my digital garden, where I write about the things I&apos;m working on and share
            what I&apos;ve learned. 😊
          </Box>
        </MotionFlex>
        <Box display={"flex"} flexDirection={"column"}>
          <IconButton
            aria-label="Add to Favorites"
            icon={<FaHeart />}
            onClick={() => alert('Added to favorites')}
            colorScheme="teal"
            variant="outline"
          />
          <IconButton
            aria-label="Suggest a Job"
            icon={<FaBriefcase />}
            onClick={() => alert('Job suggestion submitted')}
            colorScheme="blue"
            variant="outline"
          />
          <IconButton
            aria-label="Suggest a Job"
            icon={<IoMdCall />}
            onClick={() => alert('Job suggestion submitted')}
            colorScheme="blue"
            variant="outline"
          />
          <IconButton
            aria-label="Suggest a Job"
            icon={<FcVideoCall />}
            onClick={() => alert('Job suggestion submitted')}
            colorScheme="blue"
            variant="outline"
          />
        </Box>


      </Flex>
    </Container>
  );
};

export default IntroSection;