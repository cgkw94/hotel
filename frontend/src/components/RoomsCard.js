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
    <Box w="90%" borderWidth="1px" borderRadius="lg" overflow="hidden" display='flex' alignItems='justify'>
      <Image src={props.src} alt="hotel-picture" maxW='sm'/>

      <Box p="12">
        <Box display="flex">
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
          mt="5"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.roomType}
        </Box>

        <Box> ${props.price} per night</Box>

        {props.loggedIn ? (
          props.booked ? (
            <Button mt='5' disabled="disabled">Booked!</Button>
          ) : (
            <Button mt='5' onClick={props.onClick}>Book!</Button>
          )
        ) : (
          <Button mt='5' onClick={handleOnClick}>Login to Book!</Button>
        )}
      </Box>
    </Box>
  );
};

export default RoomsCard;
