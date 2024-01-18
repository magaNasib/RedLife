import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <Flex
      w="20%"
      h="100vh"
      bgGradient="linear(to-l, #0a7a5b, #0f1316)"
      pl="50px"
    >
      <Flex
        fontSize="md"
        fontWeight="800"
        color="white"
        direction="column"
        h="100vh"
        mt="150px"
      >
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#490527" : "#fff",
            paddingBottom: "80px",
          })}
        >
          HOME
        </NavLink>
        <NavLink
          to="/donors"
          style={({ isActive }) => ({
            color: isActive ? "#790b18" : "#fff",
            paddingBottom: "80px",
          })}
        >
          DONORS
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            color: isActive ? "#790b18" : "#fff",
          })}
        >
          LOGIN
        </NavLink>
      </Flex>
    </Flex>
  );
}

export default Navbar;
