import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { SearchIcon } from "@chakra-ui/icons";
import { PiChatCircleDotsFill } from "react-icons/pi";
import SearchPeople from "./components/SearchPeople";

const Messages: React.FC = () => {
  const [isBoxClicked, setIsBoxClicked] = useState(false);

  const handleBoxClick = () => {
    setIsBoxClicked(true);
  };

  return (
    <>
      <Sidebar />
      <Flex bgColor="#F2F2F5" mt="90px" ml="200px">
        <Box className="left" display="flex" w="25%" borderTopWidth="0">
          <Box w="100%" mt="120px">
            <SearchPeople />
            <Box className="choosePeople">
              <Box
                _hover={{
                  bgColor: "#6f7d84",
                }}
                cursor="pointer"
                onClick={handleBoxClick}
              >
                <Flex
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                  pl="15px"
                >
                  <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
                  <Box pt="15px" pb="15px">
                    <Heading size="sm">Mehemmed Nesibov</Heading>
                    <Text>En son yazilan sms</Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                _hover={{
                  bgColor: "#6f7d84",
                }}
                cursor="pointer"
                onClick={handleBoxClick}
              >
                <Flex
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                  pl="15px"
                >
                  <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
                  <Box pt="15px" pb="15px">
                    <Heading size="sm">Mehemmed Nesibov</Heading>
                    <Text>En son yazilan sms</Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                _hover={{
                  bgColor: "#6f7d84",
                }}
                cursor="pointer"
                onClick={handleBoxClick}
              >
                <Flex
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                  pl="15px"
                >
                  <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
                  <Box pt="15px" pb="15px">
                    <Heading size="sm">Mehemmed Nesibov</Heading>
                    <Text>En son yazilan sms</Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                _hover={{
                  bgColor: "#6f7d84",
                }}
                cursor="pointer"
                onClick={handleBoxClick}
              >
                <Flex
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                  pl="15px"
                >
                  <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
                  <Box pt="15px" pb="15px">
                    <Heading size="sm">Mehemmed Nesibov</Heading>
                    <Text>En son yazilan sms</Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                _hover={{
                  bgColor: "#6f7d84",
                }}
                cursor="pointer"
                onClick={handleBoxClick}
              >
                <Flex
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                  pl="15px"
                >
                  <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
                  <Box pt="15px" pb="15px">
                    <Heading size="sm">Mehemmed Nesibov</Heading>
                    <Text>En son yazilan sms</Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                _hover={{
                  bgColor: "#6f7d84",
                }}
                cursor="pointer"
                onClick={handleBoxClick}
              >
                <Flex
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                  pl="15px"
                >
                  <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
                  <Box pt="15px" pb="15px">
                    <Heading size="sm">Mehemmed Nesibov</Heading>
                    <Text>En son yazilan sms</Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                _hover={{
                  bgColor: "#6f7d84",
                }}
                cursor="pointer"
                onClick={handleBoxClick}
              >
                <Flex
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                  pl="15px"
                >
                  <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
                  <Box pt="15px" pb="15px">
                    <Heading size="sm">Mehemmed Nesibov</Heading>
                    <Text>En son yazilan sms</Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                _hover={{
                  bgColor: "#6f7d84",
                }}
                cursor="pointer"
                onClick={handleBoxClick}
              >
                <Flex
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                  pl="15px"
                >
                  <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
                  <Box pt="15px" pb="15px">
                    <Heading size="sm">Mehemmed Nesibov</Heading>
                    <Text>En son yazilan sms</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
        {isBoxClicked ? (
          <Flex w="75%" direction="column" borderLeft="1px solid #6f7d84">
            <Flex
              align="center"
              p="8px"
              borderBottom="1px solid #6f7d84"
              bgColor="#F2F2F5"
            >
              <Avatar name="Avatar" src="https://bit.ly/sage-adebayo" />
              <Heading size="sm" pl="15px">
                Mehemmed Nesibov
              </Heading>
            </Flex>
            <Flex flexDirection="column-reverse" h="72vh" pb="10px">
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
            <Flex p="0 10px">
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
                right="10px"
              >
                Send
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex
            w="75%"
            borderLeft="1px solid #6f7d84"
            direction="column"
            alignItems="center"
            justifyContent="center"
            m="0 auto"
          >
            <Icon as={PiChatCircleDotsFill} boxSize={150} />
            <Text mt="5px" mb="5px" fontSize="xl">
              Your messages
            </Text>
            <Text>Send private photos and messages to a friend or group</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Messages;
