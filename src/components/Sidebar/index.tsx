import { Avatar, Flex, Spinner } from "@chakra-ui/react";
import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { GoPeople } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
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
      align="center"
      pl="30px"
      mt="90px"
    >
      <Flex
        fontSize="md"
        fontWeight="600"
        color="white"
        direction="column"
        h="100vh"
        mt="80px"
        pt="150px"
      >
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#e6010b" : "#fff",
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          })}
        >
          <IoHomeOutline size={25} style={{ marginRight: "10px" }} /> HOME
        </NavLink>
        <NavLink
          to="/donors"
          style={({ isActive }) => ({
            color: isActive ? "#e6010b" : "#fff",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
          })}
        >
          <GoPeople size={25} style={{ marginRight: "10px" }} /> DONORS
        </NavLink>

        {!authChecked && <Spinner size="xs" />}
        {authChecked && auth.currentUser && (
          <NavLink
            to="/profile"
            style={({ isActive }) => ({
              color: isActive ? "#790b18" : "#fff",
              paddingRight: "15px",
              display: "flex",
              alignItems: "center",
            })}
          >
            <CgProfile size={25} style={{ marginRight: "10px" }} />
            Profile
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
