import React from "react";
import { Image, Box } from "@chakra-ui/react";

const HotelHeader = (props) => {
  return (
    <Box>
      <Box>
        <Image src={props.src} boxSize="sm" />
      </Box>
      <h1>{props.hotelName}</h1>
    </Box>
  );
};

export default HotelHeader;
