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
import React, { SetStateAction, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";


interface IDonors {
  bloodGroup: string;
  city: string;
  description: string;
  phone: string;
  publish_date: string;
  type: string;
  uid: string;
  id: string;
  fullName: string
  photoURL: string
}

function CardPost() {
  const [posts, setPosts] = useState<IDonors[]>([]);

  const donorCollectionRef = collection(db, 'donors');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(donorCollectionRef);

        if (data.docs.length > 0) {
          const donorData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as IDonors);
          setPosts(donorData);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  return (
    <>
      {posts?.map((post: IDonors) => {
        const { phone, publish_date, type, description, city, bloodGroup, fullName, photoURL, } = post
        return (
          <Flex justifyContent="center" my='2'>
            <Card w="xl" >
              <CardHeader>
                <Flex gap="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name={fullName}
                      src={photoURL}
                      borderColor="green.500"
                      borderWidth="2px"
                      bg={'black'}
                    />

                    <Box>
                      <Heading size="sm">{fullName}</Heading>
                      <Flex>
                        <Text marginRight="2">{type}</Text>
                        <Text>{bloodGroup}</Text>
                      </Flex>
                      <Flex>
                        <Text marginRight="2">{city}</Text>
                        <Text>{phone}</Text>
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
                  {description}
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
        )
      })}
    </>
  )

}

export default CardPost;
