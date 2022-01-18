import React from "react";
import { Input, Button, Select } from "@chakra-ui/react";

const FeedbackForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <Input
          onChange={props.handleUsernameChange}
          placeholder="username"
          type="text"
          name="username"
          value={props.username}
        ></Input>
        <Select
          onChange={props.handleRatingChange}
          value={props.userRating}
          placeholder="Rating"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </Select>
        <Input
          onChange={props.handleFeedbackChange}
          placeholder="feedback"
          type="text"
          name="feedback"
          value={props.userFeedback}
        ></Input>
        <Button size="xs" varian="solid" colorScheme="blue">
          Delete
        </Button>
      </form>
    </>
  );
};

export default FeedbackForm;
