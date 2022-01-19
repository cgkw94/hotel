import React from "react";
import { Button, Input, Box, Select, HStack} from "@chakra-ui/react";

const FeedbackForm = (props) => {
  const loggedIn = props.loggedIn;
  const loggedUsername = props.loggedUsername;

  return (
    <Box align='center'>
      {loggedIn ? (
        <form onSubmit={props.handleSubmit}>
          <Box ml='200' mt='5' mb='5' align='center'>
          <HStack spacing='10px'>
            <Box w='300px'>
          <Input
            variant='filled'
            onChange={props.handleUsernameChange}
            placeholder="username"
            type="text"
            name="username"
            value={loggedUsername}
            disabled="disabled"
          />
          </Box>
          <Box w='300px'>
          <Select onChange={props.handleRatingChange} value={props.userRating}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
          </Box>
          <Box w='300px'>
          <Input
           variant='filled'
            onChange={props.handleFeedbackChange}
            placeholder="feedback"
            type="text"
            name="feedback"
            value={props.userFeedback}
          ></Input>
          </Box>
          <Button>Submit</Button>
          </HStack>
          </Box>
        </form>
      ) : null}

    </Box>
  );
};

export default FeedbackForm;
