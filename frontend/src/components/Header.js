import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Container,
  Spacer,
  Image,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
import React from "react";
import Cookies from "universal-cookie";

const Header = (props) => {
  const cookies = new Cookies();
  const handleLogout = (e) => {
    e.preventDefault();
    cookies.remove("usernameCookie");
    cookies.remove("hotelStayedCookie");
    window.location.href = "/";
  };
  return (
    <>
      <Flex bg='blue.100'>
        <Box as="a" ml="8" href="/">
          <Image
            src="https://i.ibb.co/68QKWDr/get-Hotel-2-removebg-preview.png"
            alt="logo"
            h="80px"
          />
        </Box>
        <Spacer />
        <Box p="4">
          {props.userInfo.username === undefined && props.hide !== "true" && (
            <LinkBox
              p="1"
              pl="3"
              pr="3"
              borderRadius="xl"
              h="30px"
              bg="#f59f40"
              mt="2"
              mr="6"
              color='white'
            >
              <LinkOverlay href="/login">Login / Sign Up</LinkOverlay>
            </LinkBox>
          )}
          {props.userInfo.username !== undefined && (
            <>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                  colour="white"
                />
                <MenuList>
                  <MenuItem>
                    {" "}
                    <Text fontSize="2xl">
                      Hello {props.userInfo.username}
                    </Text>{" "}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <SmallCloseIcon />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>

            // <Box> hello, {props.userInfo.username}</Box>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Header;
