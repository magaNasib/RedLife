import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";
import Blogs from "../../pages/Blogs";
import Navbar from "../../components/Navbar";
function HomeFeature() {
  return (
    <>
      <Flex justify="space-between" bgColor="#F1F2F5">
        <Navbar/>
        <Box  flex="1" overflowY="auto" height="100vh">
          <AddPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
        </Box>
        <Blogs />
      </Flex>
    </>
  );
}

export default HomeFeature;
