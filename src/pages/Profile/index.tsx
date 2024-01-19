import React from "react";
import { Banner, MainTabs } from "./components";
import { Box } from "@chakra-ui/react";

const ProfilePage = () => {
  return (
    <>
      <Box p="4" bgColor="#F2F2F5" minH="100vh">
        <Banner/>
        <MainTabs />
      </Box>
    </>
  );
};

export default ProfilePage;
