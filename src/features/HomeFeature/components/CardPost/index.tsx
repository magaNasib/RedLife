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
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React from "react";

function CardPost() {
  return (
    <>
      <Flex justifyContent="center">
        <Card maxW="xl">
          <CardHeader>
            <Flex gap="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name="Mammed Mahmud"
                  src="https://bit.ly/sage-adebayo"
                  borderColor="green.500"
                  borderWidth="2px"
                />

                <Box>
                  <Heading size="sm">Mammed Mahmud</Heading>
                  <Flex>
                    <Text marginRight="2">Donor ,</Text>
                    <Text>A+</Text>
                  </Flex>
                  <Flex>
                    <Text marginRight="2">Bakı ,</Text>
                    <Text>+9940555555555</Text>
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
            <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </>
  );
}

export default CardPost;
