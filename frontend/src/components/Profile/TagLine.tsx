import React from "react";
import Marquee from "react-marquee-slider";
import { Box, Tag, useColorModeValue } from "@chakra-ui/react";

interface TaglineProps {
  tags: string[];
}

const Tagline: React.FC<TaglineProps> = ({ tags }) => {
  const tagColors = [
    "blue.500",
    "green.500",
    "red.500",
    "purple.500",
    "orange.500",
    "teal.500",
  ];

  // Average tag width (including padding and margin) in pixels
  const averageTagWidth = 100;
  const screenWidth = window.innerWidth; // Get the screen width
  const requiredTags = Math.ceil(screenWidth / averageTagWidth); // Calculate required tags

  // Duplicate tags array until it fills the required length
  const repeatedTags = Array.from(
    { length: requiredTags },
    (_, index) => tags[index % tags.length]
  );

  return (
    <Box
      mt={2}
      px={4}
      py={2}
      bg={useColorModeValue("gray.100", "gray.700")}
      borderRadius="md"
      shadow="sm"
      maxW="full"
    >
      <Marquee velocity={20} direction="ltr" scatterRandomly={false}>
        {repeatedTags.map((tag, index) => (
          <Box
            key={index}
            mx={5} // Add space between tags
            display="inline-block"
          >
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              bg={tagColors[index % tagColors.length]}
              color="white"
            >
              {tag}
            </Tag>
          </Box>
        ))}
      </Marquee>
    </Box>
  );
};

export default Tagline;
