import { Avatar, Flex, Spinner } from "@chakra-ui/react";
import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Sidebar = () => {
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
      w="200px"
      h="100vh"
      position="fixed"
      bgColor="#38454C"
      pl="50px"
      mt="90px"
    >
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
        {!authChecked && <Spinner size="xs" />}
        {authChecked && auth.currentUser && (
          <NavLink
            to="/profile"
            style={({ isActive }) => ({
              color: isActive ? "#790b18" : "#fff",
              paddingRight: "15px",
            })}
          >
            Profile
            {/* <Avatar
            src="https://bit.ly/broken-link"
            borderColor="green.500"
            borderWidth="2px"
          /> */}
          </NavLink>
        )}
        {authChecked && !auth.currentUser && (
          <NavLink
            to="/login"
            style={({ isActive }) => ({
              color: isActive ? "#790b18" : "#fff",
              paddingRight: "15px",
            })}
          >
            LOGIN
          </NavLink>
        )}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
