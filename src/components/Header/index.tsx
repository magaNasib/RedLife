import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <Flex
      w="100%"
      h="100px"
      bgGradient="linear(to-l, #af4a7d, #160f0f)"
      align="center"
      justify="space-between"
      pr="150px"
      pl="150px"
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        letterSpacing="wide"
        color="white"
        textTransform="uppercase"
        fontFamily="monospace"
      >
        <Text
          color="#790b18"
          display="inline"
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="wide"
          textTransform="uppercase"
          fontFamily="monospace"
        >
          RED
        </Text>
        LIFE
      </Text>
      <Box fontSize="md" fontWeight="800" color="white">
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#490527" : "#fff",
            paddingRight: "20px",
          })}
        >
          HOME
        </NavLink>
        <NavLink
          to="/donors"
          style={({ isActive }) => ({
            color: isActive ? "#790b18" : "#fff",
            paddingRight: "20px",
          })}
        >
          DONARS
        </NavLink>
        <NavLink
          to="/blogs"
          style={({ isActive }) => ({
            color: isActive ? "#790b18" : "#fff",
            paddingRight: "20px",
          })}
        >
          BLOGS
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            color: isActive ? "#790b18" : "#fff",
            paddingRight: "15px",
          })}
        >
          LOGIN
        </NavLink>
      </Box>
    </Flex>
  );
}

export default Header;
