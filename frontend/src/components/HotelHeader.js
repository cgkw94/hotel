import React from "react";
import { Image, Box, Text } from "@chakra-ui/react";

const HotelHeader = (props) => {
  return (
    <Box alignItems='center'>
      <Box
      align="center">
      <Text fontSize="5xl" p='5'><b>{props.hotelName}</b></Text>
    </Box>
    
      <Box align='center'>
        <Image align='center' w="80%" h='500' borderRadius="lg" src={props.src} />
      </Box>
    </Box>
  );
};

export default HotelHeader;
