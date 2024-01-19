import { Flex, Text, Image, Box, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import logo from "../../assets/logo.png";
import { useTranslation } from 'react-i18next';

function Header() {
  const {t} = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const languageOptions = [  
    { value: "AZ", label: "AZE" },
    { value: "EN", label: "ENG" },
    { value: "RU", label: "RUS" },

  ];

  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
    i18n.changeLanguage(event.target.value); 
  };

  return (
    <Box position="fixed" zIndex="10" w="100%" top={'0'}>
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
        <Text>{t("HeaderContact")} +9940556784534</Text>
      </Flex>
      <Flex
        h="65px"
        w="100%"
        bgColor="#fff"
        p="0 20px"
        justify="space-between"
        align="center"
      >
        <Flex align="center" onClick={() => navigate('/')} cursor={'pointer'}>
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
        <Flex justify="center">
          <Select
            variant="filled"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            size="sm"
            bgColor="#D94B3C"
            color="black"
          >
            {languageOptions.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
