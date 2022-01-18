import React from "react";
import { Image, Box } from "@chakra-ui/react";

const RoomsDetails = () => {
  return (
    <Box>
      <Box>
        <Image src={props.src} maxW="120ch" />
      </Box>
      <Box>Amenities</Box>
    </Box>
  );
};

export default RoomsDetails;
