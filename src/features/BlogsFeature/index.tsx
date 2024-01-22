import React, { useState, useEffect } from "react";
import {
  Card,
  Box,
  Stack,
  CardBody,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";
export interface IBlogs {
  article: string;
  creator: string;
  dateCreated: string;
  title: string;
  imageUrl: string;
  id?: string;
}
interface IProps {
  filteredBlogs?: IBlogs[];
}
function BlogsFeature(props: IProps) {
  const [blogs, setBlogs] = useState<IBlogs[]>([]);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const { t } = useTranslation();
  const blogsCollectionRef = collection(db, "blogs");
  const handleTextToggle = () => {
    setIsTextVisible(!isTextVisible);
  };
  useEffect(() => {
    const getBlogs = async () => {
      const data = await getDocs(blogsCollectionRef);
      setBlogs(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IBlogs))
      );
    };
    getBlogs();
  }, []);

  return (
    <>
      <Box m="0 auto" w="60%" pr={"10"} mt={"95px"}>
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            display="flex"
            justify="space-between"
            mt="15px"
            onClick={handleTextToggle}
            style={{ cursor: "pointer" }}
            h="170px"
          >
            <Stack>
              <CardBody>
                <Heading size="sm" mb="7px" fontSize="smaller">
                  {blog.creator}
                </Heading>
                <Link
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  to={`/infoDetails/${blog.id}`}
                >
                  {blog.title}
                </Link>
                <Text color="gray" py="2" size="sm" fontSize="smaller">
                  {blog.dateCreated}
                </Text>
              </CardBody>
            </Stack>
            <Image
              objectFit="cover"
              maxW={{ base: "50%", sm: "200px" }}
              src={blog?.imageUrl}
              alt="error"
            />
          </Card>
        ))}
      </Box>
    </>
  );
}

export default BlogsFeature;
