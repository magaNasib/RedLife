import { Flex, Link, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import logo from "../../assets/logo.png";
import { GoPeople } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";

function Header() {
 
  return (
    <Flex h="65px" position="fixed" zIndex="10" w="100%" bgColor="#fff" p="0 20px" justify="center" align="center">
      <Link href="/">
        <Flex align="center" >
          <Image src={logo} maxH="25px" maxW="100px" ml="20px" />
          <Text
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing="wide"
            color="green"
            textTransform="uppercase"
            fontFamily="monospace"
          >
            <Text
              color="#e6010b"
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
        </Flex>

      </Link>
      {/* <Flex justify="center">
        <NavLink to="/donors" style={({ isActive }) => ({
          color: isActive ? "#e6010b" : "#000",
        })}>
          <GoPeople size={25} style={{ marginRight: "20px" }} />
        </NavLink>
        <NavLink to="/" style={({ isActive }) => ({
          color: isActive ? "#e6010b" : "#000",
        })}>
          <IoHomeOutline size={25} />
        </NavLink>
      </Flex> */}

    </Flex>
  );
}

export default Header;
