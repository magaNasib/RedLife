import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, VStack, Text, Image, Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { useTranslation } from "react-i18next";

import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { IBlogs } from "../../features/BlogsFeature";

const InfoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<IBlogs | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = await getDoc(doc(db, "blogs", id || ""));
        if (blogDoc.exists()) {
          setBlog({ ...blogDoc.data(), id: blogDoc.id } as IBlogs);
        } else {
          console.log("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const { article, creator, dateCreated, title, imageUrl } = blog;

  return (
    <>
      <Sidebar />
      <VStack align="stretch" bg="#F1F2F5" h="100%">
        <Container
          mt={20}
          maxW="container.md"
          color="white"
          padding={8}
          borderRadius="md"
        >
          <Text mb={6} fontSize={26} textColor={"#2C383E"} fontWeight="bold">
            {title}
          </Text>
          <Flex justifyContent="space-between" fontWeight="bold" mb={1}>
            <Text fontSize={18} textColor={"#445760"}>
              {creator}
            </Text>
            <Text fontSize={16} textColor={"#445760"}>
              {dateCreated}
            </Text>
          </Flex>

          <Image
            src={imageUrl}
            alt="Blog Image"
            borderRadius="sm"
            height={400}
            width={"100%"}
          />
          <Text
            fontSize="xl"
            mt={3}
            display={"flex"}
            textAlign= "justify"
          >
            <Text fontSize={18} textColor={"#445760"}>
              {article}
            </Text>
          </Text>
        </Container>
      </VStack>
    </>
  );
};

export default InfoDetails;
