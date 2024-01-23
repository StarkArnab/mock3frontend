import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { AuthContext } from "../authContext/AuthContext";
import axios from "axios";
import { backendApi } from "../../api";
import { useNavigate } from "react-router-dom";

const logurl = `${backendApi}/user/login`;
const sigurl = `${backendApi}/user/signup`;

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  //   console.log(user.token);
  const handleLogin = async () => {
    try {
      const res = await axios.post(logurl, {
        email,
        password,
      });
      //   console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      login(res.data.token);
      navigate("/doctors");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    if (confirmPassword !== password) {
      alert("Confirmed password does not match with the password");
      return;
    }
    try {
      const res = await axios.post(sigurl, {
        email,
        password,
        confirmPassword,
      });

      alert(
        "User signed in successfully, please login now using the same credentials"
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box bg="blue.500" minH="100vh" py="12" px={{ base: "4", lg: "8" }}>
      <Box maxW="md" mx="auto">
        <Box
          bg="white"
          py="8"
          px={{ base: "4", md: "10" }}
          shadow="base"
          rounded={{ sm: "lg" }}
        >
          <Tabs>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <FormControl id="email">
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="password" mt="4">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
                <Link color="blue.500" alignSelf="start" mt="2">
                  Forgot password?
                </Link>
                <Button
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  mt="4"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Text mt="4">
                  Not a member? <Link color="blue.500">Signup now</Link>
                </Text>
              </TabPanel>
              <TabPanel>
                <FormControl id="email">
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="password" mt="4">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="confirmPassword" mt="4">
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </FormControl>

                <Button
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  mt="4"
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
