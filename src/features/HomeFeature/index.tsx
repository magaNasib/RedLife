import { Container } from "@chakra-ui/react";
import React from "react";
import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";
function HomeFeature() {
  return (
    <>
      <AddPost />
      <CardPost />
    </>
  );
}

export default HomeFeature;
