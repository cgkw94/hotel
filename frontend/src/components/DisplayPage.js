import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Input,
  Select,
  HStack,
  Box,
  Text,
  Wrap,
  WrapItem,
  Image,
  Center,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const DisplayPage = (props) => {
  let searchTitle = "";
  let hotelDisplay = <div></div>;

  //const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [fetchedAgain, setFetchedAgain] = useState(false);

  const fetchHotels = async (url) => {
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        throw new Error("something went wrong");
      }

      const hotelResults = await res.json();

      console.log(hotelResults);
      setHotelData(hotelResults);
    } catch (err) {
      console.log(err);
    }

    setFetchedAgain(false);
    console.log("fetch done");
  };

  useEffect(() => {
    const url = `http://127.0.0.1:5005/hotel?location=${props.location}&inDate=${props.inDate}&outDate=${props.outDate}&roomType=${props.roomType}`;

    if (props.fetchedResults) {
      fetchHotels(url);
    }
  }, [props.fetchedResults]);

  useEffect(() => {
    const url = `http://127.0.0.1:5005/hotel?location=${props.location}&inDate=${props.inDate}&outDate=${props.outDate}&roomType=${props.roomType}`;

    console.log(props.location);
    if (fetchedAgain) {
      console.log("fetching again");
      fetchHotels(url);
    }
  }, [fetchedAgain]);

  if (props.fetchedResults || fetchedAgain) {
    searchTitle = <h4 id="search-title">Search Results</h4>;

    console.log(hotelData);
    hotelDisplay = hotelData?.map((hotel, index) => {
      return (
        <WrapItem>
          <Box maxW="sm" m="10px" borderRadius="lg" overflow="hidden">
            <Link
              className="link"
              to={{
                pathname: `/hotel/${hotel.hotelId}`,
              }}
            >
              <Image
                borderRadius="lg"
                h="260"
                w="300"
                src={`${hotel.hotelImg}`}
                alt=""
              ></Image>
              <Text
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
                id={hotel.hotelId}
              >
                {hotel.hotelName}
              </Text>
              <Text color="gray.500" isTruncated>
                {hotel.address}
              </Text>
              <Text color="gray.700" fontSize="18px">
                <StarIcon /> {hotel.hotelRating}
              </Text>
            </Link>
          </Box>
        </WrapItem>
      );
    });
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    setFetchedAgain(true);
  };

  const handleLocationChange = (e) => {
    props.setLocation(e.target.value);
  };

  const handleInDateChange = (e) => {
    props.setInDate(e.target.value);
  };

  const handleOutDateChange = (e) => {
    props.setOutDate(e.target.value);
  };

  const handleRoomTypeChange = (e) => {
    props.setRoomType(e.target.value);
  };

  return (
    <>
      <form>
        <Box m={[2, 3]}>
          <HStack spacing="10px">
            <Select
              className="userInput"
              name="location"
              onChange={handleLocationChange}
              value={props.location}
            >
              <option value="Orchard">Orchard</option>
              <option value="Marina Bay">Marina Bay</option>
              <option value="Jurong East">Jurong East</option>
            </Select>
            <Box>
              <Input
                type="date"
                name="inDate"
                className="userInput"
                value={props.inDate}
                min="2022-01-20"
                max="2022-01-29"
                onChange={handleInDateChange}
              ></Input>
            </Box>
            <Box>
              <Input
                type="date"
                name="outDate"
                className="userInput"
                value={props.outDate}
                min="2022-01-21"
                max="2022-01-30"
                onChange={handleOutDateChange}
              ></Input>
            </Box>
            <Select
              className="userInput"
              name="roomType"
              value={props.roomType}
              onChange={handleRoomTypeChange}
            >
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
      {hotelData.length > 0 ? (
        <Box ml='100px'>
          <Center>
            <Wrap>{hotelDisplay}</Wrap>
          </Center>
        </Box>
      ) : (
        <Text m='5'>
          Oops! We've run out of available hotels. Please change the search
          parameters and try again.
        </Text>
      )}
    </>
  );
};

export default DisplayPage;
