import React from "react";
import { Box, Image, Text, Badge } from "@chakra-ui/react";

const RoomsCard = (props) => {
  
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={props.src} alt="hotel-picture" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Available
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Max {props.maxPax} Pax &bull; {props.size}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.roomType}
        </Box>

        <Box> ${props.price} per night</Box>
      </Box>
    </Box>
  );
};

export default RoomsCard;
