import React from "react";
import { Image, Box, Text } from "@chakra-ui/react";

const HotelHeader = (props) => {
  return (
    <Box>
      <Box>
        <Image src={props.src} maxW="120ch" />
      </Box>
      <Text fontSize="5xl">{props.hotelName}</Text>
    </Box>
  );
};

export default HotelHeader;
