
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { PiChatCircleDotsFill } from "react-icons/pi";
import ChoosePeople from './components/ChoosePeople';
import { useTranslation } from "react-i18next";

const Messages: React.FC = () => {
  const {t} = useTranslation();
  const [isBoxClicked, setIsBoxClicked] = useState(false);

  const handleBoxClick = () => {
    setIsBoxClicked(true);
  };

  return (
    <>
      <Sidebar />
      <Flex bgColor="#F2F2F5" ml="200px" minH="100vh">
        <ChoosePeople handleBoxClick={handleBoxClick} />
        {isBoxClicked ? (
          <Flex
            position="relative"
            h="100vh"
            w="75%"
            direction="column"
            borderLeft="1px solid #6f7d84"
          >
            <Flex
              mt="90px"
              align="center"
              p="8px"
              borderBottom="1px solid #6f7d84"
            >
              <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
              <Heading size="sm" pl="15px">
                Mehemmed Nesibov
              </Heading>
            </Flex>
            <Flex
              className="noScrollbar"
              overflowY="scroll"
              h="100vh"
              flexDirection="column-reverse"
              pb="50px"
            >
              <Flex p="0 0 10px 10px" className="chating">
                <Flex alignItems="center">
                  <Avatar
                    name="Avatar"
                    src="https://bit.ly/sage-adebayo"
                    size="sm"
                    mr="5px"
                  />
                  <Text
                    maxW="500px"
                    border="1px solid #445760"
                    borderRadius="10px"
                    backgroundColor="#FFFF"
                    p="5px 10px "
                  >
                    Salam, yaxsiyam . Sen necesen ?
                  </Text>
                </Flex>
              </Flex>
              <Flex p="0 10px 10px 0" justifyContent="end" className="chating">
                <Flex>
                  <Text
                    maxW="500px"
                    border="1px solid #445760"
                    borderRadius="10px"
                    backgroundColor="#FFFF"
                    p="5px 10px"
                  >
                    Salam, necesen?
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              position="absolute"
              bottom="0px"
              w="100%"
              p="0 5px 10px"
              bgColor="#F2F2F6"
            >
              <Input
                placeholder="Message..."
                type="text"
                border="1px solid #445760"
                borderRadius="35px"
                backgroundColor="#FFFFFF"
                color="#445760"
              />
              <Button
                backgroundColor="#FFFFFF"
                border="1px solid #445760"
                borderRadius="35px"
                position="absolute"
                zIndex="10"
                right="6px"
              >
                {t("MessagesBtn")}
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex
            w="75%"
            borderLeft="1px solid #6f7d84"
            direction="column"
            alignItems="center"
            h="100vh"
            justifyContent="center"
            m="0 auto"
          >
            <Icon as={PiChatCircleDotsFill} boxSize={150} />
            <Text mt="5px" mb="5px" fontSize="xl">
            {t("YourMessages")}
            </Text>
            <Text>{t("MessagesText")}</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Messages;
