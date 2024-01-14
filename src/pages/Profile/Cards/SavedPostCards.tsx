import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { BiLike, BiChat } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React from "react";

export function SavedPostsCards() {
  return (
    <>
      <Flex justifyContent="center" my='2'>
        <Card maxW="xl">
          <CardHeader>
            <Flex gap="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name="Veli Aliyev"
                  src="https://bit.ly/dan-abramov"
                  borderColor="green.500"
                  borderWidth="2px"
                />

                <Box>
                  <Heading size="sm">Veli Aliyev</Heading>
                  <Flex>
                    <Text marginRight="2">Donor ,</Text>
                    <Text>B+</Text>
                  </Flex>
                  <Flex>
                    <Text marginRight="2">Bakı ,</Text>
                    <Text>+9945668899</Text>
                  </Flex>
                </Box>
              </Flex>
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>
              Salam , mən kömək məqsədi ilə qan bağışlamaq istəyirəm . Həqiqətən
              ehtiyacı olan və bunu həkim sənədi ilə sübut edəcək insanlar əlaqə
              saxlasın.
            </Text>
          </CardBody>
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
              Like
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
              Comment
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </>
  );
}
