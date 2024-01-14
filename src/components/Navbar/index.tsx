import { Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex w="200px" h="100vh" position="fixed" bgColor="#027FFE" pl="50px">
      <Flex
        fontSize="md"
        fontWeight="600"
        color="white"
        direction="column"
        h="100vh"
        mt="80px"
      >
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#e6010b" : "#fff",
            marginBottom: "40px",
          })}
        >
          HOME
        </NavLink>
        <NavLink
          to="/donors"
          style={({ isActive }) => ({
            color: isActive ? "#e6010b" : "#fff",
            marginBottom: "40px",
          })}
        >
          DONORS
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            color: isActive ? "#e6010b" : "#fff",
          })}
        >
          LOGIN
        </NavLink>
      </Flex>
    </Flex>
  )
}

export default Navbar