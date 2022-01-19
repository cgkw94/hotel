import { React, useEffect, useState } from "react";
import { Button, Badge, Box, Container } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

function ReviewsCard(props) {
  const [userMatch, setUserMatch] = useState(false);

  const userRating = props.userRating;
  const loggedIn = props.loggedIn;
  const loggedUsername = props.loggedUsername;

  useEffect(() => {
    if (loggedIn === true) {
      if (loggedUsername === props.username) {
        setUserMatch(true);
      } else {
        setUserMatch(false);
      }
    } else {
      setUserMatch(false);
    }
  }, []);

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Badge borderRadius="full" px="2" colorScheme="teal">
        {props.username}
      </Badge>

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
      {userMatch ? (
        <Button
          size="xs"
          onClick={props.onClick}
          varian="solid"
          colorScheme="blue"
        >
          Delete
        </Button>
      ) : null}
    </Box>
  );
}

export default ReviewsCard;
