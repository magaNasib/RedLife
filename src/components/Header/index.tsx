import { Avatar, Box, Container, Flex, Heading, Link, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

function Header() {
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (!authChecked) {
  }
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
      <Link href="/">
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
      </Link>
      <Box fontSize="md" fontWeight="800" color="white" display={'flex'} alignItems={'center'}>
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
          DONORS
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
        {
          !authChecked && <Spinner size='xs' />
        }
        {authChecked && auth.currentUser && <NavLink
          to="/profile"
          style={({ isActive }) => ({
            color: isActive ? "#790b18" : "#fff",
            paddingRight: "15px",
          })}
        >
          <Avatar
            src="https://bit.ly/broken-link"
            borderColor="green.500"
            borderWidth="2px"
          />
        </NavLink>}
        {authChecked && !auth.currentUser && <NavLink
          to="/login"
          style={({ isActive }) => ({
            color: isActive ? "#790b18" : "#fff",
            paddingRight: "15px",
          })}
        >
          LOGIN
        </NavLink>}
      </Box>
    </Flex>
  );
}

export default Header;
