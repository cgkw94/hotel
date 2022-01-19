import React, { useState } from "react";
import Cookies from "universal-cookie";
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Stack,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

const Login = () => {
  const [error, setError] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    rpassword: "",
    email: "",
  });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const cookies = new Cookies();

  const fetchData = async (username, password) => {
    const res = await fetch("http://localhost:5005/users/login", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await res.json();
    if (data.msg === undefined) {
      setError("Yay login successful! Redirecting.....");
      cookies.set("usernameCookie", data.username, {
        path: "/",
        maxAge: 2 * 60 * 60,
      });
      cookies.set("hotelStayedCookie", data.hotelStayed, {
        path: "/",
        maxAge: 2 * 60 * 60,
      });
      window.location.href = "/";
    } else {
      setError(data.msg);
    }
  };

  const handleLoginUsername = (e) => {
    setUsernameInput(e.target.value);
  };

  const handleLoginPassword = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetchData(usernameInput, passwordInput);
  };

  const createUser = async (username, password, email) => {
    const res = await fetch("http://localhost:5005/users/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ username, password, email }),
    });
    const data = await res.json();
    if (data.msg === undefined) {
      setError("Yay welcome newjoiner! Redirecting.....");
      cookies.set("usernameCookie", data.username, {
        path: "/",
        maxAge: 2 * 60 * 60,
      });
      cookies.set("hotelStayedCookie", data.hotelStayed, {
        path: "/",
        maxAge: 2 * 60 * 60,
      });
      history.push("/");
    } else {
      setError(data.msg);
    }
  };

  const handleUsername = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, username: e.target.value };
    });
  };

  const handleEmail = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, email: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, password: e.target.value };
    });
  };

  const handleRPassword = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, rpassword: e.target.value };
    });
  };

  const handleNew = (e) => {
    e.preventDefault();
    if (
      newUser.username.length === 0 ||
      newUser.password.length === 0 ||
      newUser.email.length === 0
    ) {
      setError("All fields are required.");
    } else if (newUser.password !== newUser.rpassword) {
      setError("Passwords do not match.");
    } else if (newUser.email.includes("@") === false) {
      setError("Invalid Email address.");
    } else {
      createUser(newUser.username, newUser.password, newUser.email);
    }
  };

  return (
    <>
      <Container w="75%" mt="10">
        <Tabs w="100%" isFitted variant="enclosed" colorScheme="blue">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack direction="column" spacing={2}>
                <Input
                  value={usernameInput}
                  onChange={handleLoginUsername}
                  placeholder="Enter username"
                  size="md"
                />

                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    value={passwordInput}
                    onChange={handleLoginPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormControl isInvalid={error}>
                  <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={handleLoginSubmit}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack direction="column" spacing={2}>
                <Input
                  value={newUser.username}
                  onChange={handleUsername}
                  placeholder="Enter new username"
                  size="md"
                />

                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    value={newUser.password}
                    onChange={handlePassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Retype password"
                    value={newUser.rpassword}
                    onChange={handleRPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={newUser.email}
                    onChange={handleEmail}
                  />
                </InputGroup>
                <FormControl isInvalid={error}>
                  <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={handleNew}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default Login;
