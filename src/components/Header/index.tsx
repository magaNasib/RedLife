import { Flex, Link, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
