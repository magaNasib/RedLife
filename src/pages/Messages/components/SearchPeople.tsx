import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React from "react";

const SearchPeople: React.FC = () => {
  return (
    <Box
      pl="15px"
      pt="5px"
      mb="10px"
      position="fixed"
      zIndex="10"
      top={"90"}
      bgColor="#F2F2F5"
    >
      <Text fontWeight="bold" fontSize="xl" mb="5px">
        Zeynab Aliyeva
      </Text>
      <Text fontWeight="bold" mb="10px" fontSize="md">
        Messages
      </Text>
      <InputGroup w="95%">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="#445760" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search Direct Messages"
          border="1px solid #445760"
          borderRadius="35px"
          borderColor="#445760"
          backgroundColor="#FFFFFF"
          color="#445760"
        />
      </InputGroup>
    </Box>
  );
};

export default SearchPeople;
