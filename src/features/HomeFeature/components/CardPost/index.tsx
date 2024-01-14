import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare, BiSave, BiBookmark } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { IPost } from "../AddPost";
import { Controller, useForm } from "react-hook-form";
import { db } from "../../../../firebase";
import CommentSection from "../Comments/CommentsSection";

// interface IDonors {
//   bloodGroup: string;
//   city: string;
//   description: string;
//   phone: string;
//   publish_date: string;
//   type: string;
//   uid: string;
//   id: string;
//   fullName: string
//   photoURL: string
// }

function CardPost() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true)
  const donorCollectionRef = collection(db, 'donors');

  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(donorCollectionRef);

        if (data.docs.length > 0) {
          const donorData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as IPost);
          setPosts(donorData);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      finally {
        setLoading(false)
      }
    };

    getPosts();
  }, []);

  if (loading) return (
    <>
      <Flex justifyContent="center" my="2">
        <Card maxW="xl">
          <CardHeader>
            <Flex gap="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name="Mammed Mahmud"
                  src="https://bit.ly/sage-adebayo"
                  borderColor="green.500"
                  borderWidth="2px"
                />
                <Box>
                  <Heading size="sm">Mahmud Mahmud</Heading>

                  <Flex>
                    <Text marginRight="2">Donor ,</Text>
                    <Text>A+</Text>
                  </Flex>
                  <Flex>
                    <Text marginRight="2">Bakı ,</Text>
                    <Text>+9940555555555</Text>
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
              Salam , mən kömək məqsədi ilə qan bağışlamaq istəyirəm . Həqiqətən
              ehtiyacı olan və bunu həkim sənədi ilə sübut edəcək insanlar əlaqə
              saxlasın.
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
            <Button flex="1" variant="ghost" leftIcon={<BiLike size={20} />}>
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<BiChat size={20} />}>
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<BiSave size={20} />}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </>
  )

  if (posts.length === 0) {
    return (
      <>
        <Flex justifyContent="center" my='2'>
          <Text>
            No posts present...
          </Text>
        </Flex>
      </>
    )
  }
  return (
    <>
      {posts?.map((post: IPost) => {
        const { id, phone, publish_date, likes, comments, type, description, city, bloodGroup, fullName, photoURL } = post
        console.log(publish_date);

        return (
          <Flex justifyContent="center" my='2' key={id}>
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
                      <Heading size="md">{fullName}</Heading>
                      <Flex>
                        <Text>{type}:</Text>
                        <Text ml="5px">{bloodGroup}</Text>
                      </Flex>
                      <Flex>
                        <Text>{city}:</Text>
                        <Text ml="5px">{phone}</Text>
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
                <Button flex="1" variant="ghost" leftIcon={<BiLike size={20} />}>
                  {likes?.length || '0'}
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiChat size={20} />} onClick={() => setShowComment(!showComment)}>
                  {comments ? Object.keys(comments).length : 0}
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiBookmark size={20} />}>
                  Save
                </Button>

              </CardFooter>
              {showComment && (
                <CommentSection fullName={post.fullName} photoURL={post.photoURL} type={post.type} bloodGroup={post.bloodGroup} description={post.description} city={post.city} phone={post.phone} likes={[]} uid={""} id={post.id} publish_date={""} comments={{
                  uid: "",
                  message: "",
                  date: ""
                }} comment={""} />
              )}
            </Card>
          </Flex>
        )
      })}

    </>
  )

}

export default CardPost;
