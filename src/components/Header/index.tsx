import { Flex, Link, Text, Image, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import logo from "../../assets/logo.png";
import { GoPeople } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";

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
    <Box position="fixed" zIndex="10" w="100%">
      <Flex
        bgColor="#D94B3C"
        color="#FFFF"
        p="0 45px"
        justify="space-between"
        align="center"
        h="25px"
        fontSize="sm"
      >
        <Text>blood@smarteyeapps.com </Text>
        <Text>Contact us: +9940556784534</Text>
      </Flex>
      <Flex
        h="65px"
        w="100%"
        bgColor="#fff"
        p="0 20px"
        justify="space-between"
        align="center"
      >
        <Link href="/">
          <Flex align="center">
            <Image src={logo} maxH="25px" maxW="100px" ml="20px" />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="wide"
              color="#D94B3C"
              textTransform="uppercase"
              fontFamily="monospace"
            >
              <Text
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
        <Flex justify="center">
          <NavLink
            to="/donors"
            style={({ isActive }) => ({
              color: isActive ? "#e6010b" : "#000",
            })}
          >
            <GoPeople size={25} style={{ marginRight: "20px" }} />
          </NavLink>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#e6010b" : "#000",
            })}
          >
            <IoHomeOutline size={25} />
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
