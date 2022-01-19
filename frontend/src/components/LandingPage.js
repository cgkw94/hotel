import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Input,
  Select,
  HStack,
  Box,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";

const LandingPage = (props) => {
  const history = useHistory();

  const [locationInput, setLocationInput] = useState("");
  const [inDateInput, setInDateInput] = useState("2022-01-20");
  const [outDateInput, setOutDateInput] = useState("2022-01-20");
  const [roomTypeInput, setRoomTypeInput] = useState("");

  const handleOnClick = (event) => {
    event.preventDefault();

    props.setLocation(locationInput);
    props.setInDate(inDateInput);
    props.setOutDate(outDateInput);
    props.setRoomType(roomTypeInput);

    console.log("clicked");

    history.push("/search");

    props.setFetchedResults(true);
  };

  const handleLocationChange = (event) => {
    setLocationInput(event.target.value);
  };

  const handleInDateChange = (event) => {
    console.log(event.target.value);
    setInDateInput(event.target.value);
  };

  const handleOutDateChange = (event) => {
    setOutDateInput(event.target.value);
  };

  const handleRoomTypeChange = (event) => {
    setRoomTypeInput(event.target.value);
  };

  return (
    <div className="header">
      <Box mb="30px" align="center">
        <Text fontSize="6xl">
          <b>Welcome</b>
        </Text>
        <Text fontSize="md">
          <i>Have a warm and welcoming stay with us.</i>
        </Text>
      </Box>

      <form>
        <Box m={[2, 3]}>
          <HStack spacing="10px">
            <Select
              variant="filled"
              className="userInput"
              name="location"
              onChange={handleLocationChange}
            >
              <option value="Orchard" selected>
                Please choose a location
              </option>
              <option value="Orchard">Orchard</option>
              <option value="Marina Bay">Marina Bay</option>
              <option value="Jurong East">Jurong East</option>
            </Select>
            <Box>
              <Input
                type="date"
                name="inDate"
                className="userInput"
                value={inDateInput}
                min="2022-01-20"
                max="2022-02-01"
                onChange={handleInDateChange}
                variant="filled"
              ></Input>
            </Box>
            <Box>
              <Input
                type="date"
                name="outDate"
                className="userInput"
                value={outDateInput}
                min="2022-01-21"
                max="2022-02-04"
                onChange={handleOutDateChange}
                variant="filled"
              ></Input>
            </Box>
            <Select
              variant="filled"
              className="userInput"
              name="roomType"
              onChange={handleRoomTypeChange}
            >
              <option value="Deluxe" selected>
                Please choose a room type
              </option>
              <option value="Deluxe">Deluxe</option>
              <option value="Grand Deluxe">Grand Deluxe</option>
              <option value="Suite">Suite</option>
            </Select>
            <Button
              variant="solid"
              colorScheme="blue"
              width="100px"
              size="md"
              onClick={handleOnClick}
            >
              Find
            </Button>
          </HStack>
        </Box>
      </form>
      <Box align="center">
        <Image
          htmlHeight="90%"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1472148439583-1f4cf81b80e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80"
        />
      </Box>
    </div>
  );
};

export default LandingPage;
