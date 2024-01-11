import { Avatar } from "@chakra-ui/avatar";
import { PhoneIcon } from "@chakra-ui/icons";
import { Container, Stack, Flex, HStack, Box } from "@chakra-ui/layout";
import {
  Button,
  Card,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

const AddPost = () => {
  const [show, setShow] = useState(false);

  return (
    <Box my={'2'} maxW={'xl'} mx={'auto'}>
      <Flex
        justifyContent="space-between"
        bg={"white"}
        p="4"
        rounded={"lg"}
        flexDirection={"column"}
        border="1px solid #e2e8f0" // Border color
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" // Box shadow
      >
        <Stack isInline spacing={4} alignItems={`${!show && "center"}`}>
          <Avatar
            src="https://bit.ly/broken-link"
            borderColor="green.500"
            borderWidth="2px"
          />
          <Stack spacing={4} w={"100%"}>
            {show && (
              <>
                <Select name="bloodGrp" placeholder="Blood Group">
                  <option>B+</option>
                  <option>A+</option>
                  <option>AB+</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB-</option>
                  <option>B-</option>
                  <option>A-</option>
                </Select>
                <Select name="typeOfUser" placeholder="Who are you">
                  <option>Donor</option>
                  <option>Acceptor</option>
                </Select>

                <Select placeholder="City">
                  <option value="option1">Baku </option>
                  <option value="option2">Oghuz</option>
                  <option value="option3">Ganja</option>
                </Select>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<PhoneIcon color="gray.300" />}
                  />
                  <Input type="tel" placeholder="Phone number" />
                </InputGroup>
                <Textarea
                  resize={"none"}
                  placeholder="Additional information if you want..."
                  size="sm"
                />
                <Button onClick={() => setShow(false)}>Cancel</Button>
                <Button bg={"green"} color={"white"} rounded={".5rem"}>
                  Post
                </Button>
              </>
            )}
            {!show && (
              <Button
                bg={"#007FFF"}
                color={"white"}
                rounded={".5rem"}
                onClick={() => {
                  setShow(true);
                }}
              >
                Click here for Post
              </Button>
            )}
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default AddPost;
