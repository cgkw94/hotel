import React from "react";
import { Image, Box } from "@chakra-ui/react";

const HotelHeader = (props) => {
  return (
    <Box>
      <Box>
        <Image src={props.src} maxW="120ch" />
      </Box>
      <h1>{props.hotelName}</h1>
    </Box>
  );
};

export default HotelHeader;
