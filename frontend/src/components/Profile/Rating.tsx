import React, { useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Image,
  chakra,
  Stack,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import {
  MdEmail,
  MdHeadset,
  MdLocationOn,
  MdStar,
  MdStarBorder,
} from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";

interface RatingProps {
  defaultValue?: number;
  max?: number;
  size?: IconButtonProps["size"];
  onChange?: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  defaultValue = 0,
  max = 5,
  size = "md",
  onChange,
}) => {
  const [rating, setRating] = useState<number>(defaultValue);
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (value: number) => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Stack direction="row">
      {Array.from({ length: max }, (_, index) => {
        const value = index + 1;
        return (
          <IconButton
            key={value}
            icon={
              <Icon
                as={value <= (hover ?? rating) ? MdStar : MdStarBorder}
                boxSize={size}
                color={value <= (hover ?? rating) ? "yellow.400" : "gray.300"}
              />
            }
            variant="ghost"
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(null)}
            aria-label={`Rate ${value}`}
          />
        );
      })}
    </Stack>
  );
};

export default Rating;
