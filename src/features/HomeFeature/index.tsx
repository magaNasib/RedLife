import { Flex } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";
import Blogs from "../../pages/Blogs";
import Navbar from "../../components/Navbar";
function HomeFeature() {
  const [trigger,setTrigger] = useState(false)
  
  return (
    <>
      <Navbar />
      <Flex justify="space-between" bgColor="#F1F2F5">
        <Flex w="100%" direction="column" align="center" mt="75px" ml="220px">
          <AddPost setTrigger={setTrigger}/>
          <CardPost trigger={trigger}/>
        </Flex>
        <Blogs />
      </Flex>
    </>
  );
}

export default HomeFeature;
