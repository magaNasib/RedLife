import { Flex } from "@chakra-ui/react";
import React from "react";
import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";
import Blogs from "../../pages/Blogs";
import Navbar from "../../components/Navbar";
function HomeFeature() {
  return (
    <>
      <Navbar />
      <Flex justify="space-between" bgColor="#F1F2F5">
        <Flex w="100%" direction="column" align="center" mt="75px" ml="220px">
          <AddPost />
          <CardPost />
        </Flex>
        <Blogs />
      </Flex>
    </>
  );
}

export default HomeFeature;
