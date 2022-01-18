import React from "react";
import { Button, Badge, Box, Container } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

function ReviewsCard(props) {
  const userRating = props.userRating;
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Badge borderRadius="full" px="2" colorScheme="teal">
        {props.username}
      </Badge>

      <p>{props.userRating}</p>
      <Box display="flex" mt="2" alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < userRating ? "teal.500" : "gray.300"}
            />
          ))}
      </Box>
      <Container>{props.userFeedback}</Container>
      <Button
        size="xs"
        onClick={props.onClick}
        varian="solid"
        colorScheme="blue"
      >
        Delete
      </Button>
    </Box>
  );
}

export default ReviewsCard;
