import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Image, Text, Badge, Button } from "@chakra-ui/react";

const RoomsCard = (props) => {
  const history = useHistory();

  const handleOnClick = (e) => {
    e.preventDefault();
    history.push("/login");
  };

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
        {props.loggedIn && props.booked ? (
          <Button disabled="disabled">Booked!</Button>
        ) : (
          <Button onClick={props.onClick}>Book!</Button>
        )}
        {props.loggedIn === false && (
          <Button onClick={handleOnClick}>Login!</Button>
        )}
      </Box>
    </Box>
  );
};

export default RoomsCard;
