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
import { BiLike, BiChat, BiBookmark } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { IPost } from "../AddPost";
import { Controller, useForm } from "react-hook-form";
import { db } from "../../../../firebase";


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

  const methods = useForm<IPost>({
    defaultValues: {
      comment: ''
    }
  })


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
      <Flex justifyContent="center" my='2'>
        <Box padding='6' boxShadow='lg' bg='white' w={'xl'}>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
      </Flex>
      <Flex justifyContent="center" my='2'>
        <Box padding='6' boxShadow='lg' bg='white' w={'xl'}>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
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
                      <Heading size="sm">{fullName}</Heading>
                      <Flex>
                        <Text marginRight="2">{type}</Text>
                        <Text>{bloodGroup}</Text>
                      </Flex>
                      <Flex alignSelf={'end'}>
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
              <Divider color={'lightgray'} />

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Button flex="1" size={'sm'} variant="ghost" leftIcon={<BiLike />}>
                  {likes?.length || '0'}
                </Button>
                <Button flex="1" size={'sm'} variant="ghost" leftIcon={<BiChat />} onClick={() => setShowComment(!showComment)}>
                  {comments ? Object.keys(comments).length : 0}
                </Button>
                <Button flex="1" size={'sm'} variant="ghost" leftIcon={<BiBookmark />}>
                  Save
                </Button>

              </CardFooter>
              {showComment && (
                <>
                  <CardHeader>
                    <Flex gap="4" mb={'40px'}>
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
                          <Flex alignSelf={'end'}>
                            <Text marginRight="2">{city}</Text>
                            <Text>{phone}</Text>
                          </Flex>
                          <Flex>
                            <Text>{description}</Text>
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
                    <FormControl isInvalid={!!methods.formState.errors.comment}>
                      <Controller
                        control={methods.control}
                        name='comment'
                        rules={{
                          required: 'This field is required'
                        }}
                        render={({ field }) => (
                          <InputGroup>
                            <Input {...field} value={field.value} onChange={field.onChange} onBlur={field.onBlur} type="text" placeholder="Add Comment" />
                            <InputRightElement>
                              <IconButton
                                variant="ghost"
                                colorScheme="blue"
                                aria-label="See menu"><FaArrowUp />
                              </IconButton>
                            </InputRightElement>
                          </InputGroup>
                        )}
                      />

                      <FormErrorMessage>
                        {methods.formState.errors?.comment?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </CardHeader>
                </>
              )}
            </Card>
          </Flex>
        )
      })}

    </>
  )

}

export default CardPost;
