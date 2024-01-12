import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import React from "react";
import logo from "../../assets/logo.png";
import { GoPeople } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";

function Header() {
  return (
    <Flex h="65px" bgColor="#FFFFF" align="center">
      <Image src={logo} maxH="40px" maxW="100px" ml="20px" />
      <Link href="/">
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
      </Link>
      <Flex justify="center">
        <Link href="/donors">
          <GoPeople size={30} style={{ marginRight: "10px" }} />
        </Link>
        <Link href="/">
          <IoHomeOutline size={30} />
        </Link>
      </Flex>
    </Flex>
  );
}

export default Header;
