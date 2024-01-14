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
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiBookmark } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useEffect, useState, useRef, createRef, MutableRefObject } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { IPost } from "../AddPost";
import { Controller, useForm } from "react-hook-form";
import { db } from "../../../../firebase";
import { Form } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CommentSection: React.FC<IPost> = ({ id, fullName, photoURL, bloodGroup, type, description, city, phone }) => {
    // const comment = useRef('');

    // const commentRef = doc(collection(db, "donors", id, "comments"));

    // const addComment = async (e: any) => {
    //     e.preventDefault();
    //     if (comment.current.value !== "") {
    //         try {
    //             await setDoc(commentRef, {
    //                 id: commentRef.id,
    //                   comment: comment.current.value,
    //                   image: user?.photoURL,
    //                   name:
    //                     userData?.name?.charAt(0)?.toUpperCase() +
    //                       userData?.name?.slice(1) || user?.displayName?.split(" ")[0],
    //                   timestamp: serverTimestamp(),
    //             });
    //             comment.current.value = "";
    //         } catch (err) {
    //             // dispatch({ type: HANDLE_ERROR });
    //             alert(err);
    //             // console.log(err.message);
    //         }
    //     }
    // };

    return (
        <>
            <CardHeader bg='#FAFAFA'>
                <Flex gap="4" mb={'40px'} ml={'4'}>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Avatar
                            name={fullName}
                            src={photoURL}
                            size={'sm'}
                            borderColor="green.500"
                            borderWidth="2px"
                            bg={'black'}
                        />
                        <Box>
                            <Heading size="sm">{fullName}</Heading>
                            <Flex>
                                <Text>Yo sen sehv deyirsen</Text>
                            </Flex>
                        </Box>
                    </Flex>
                    <Popover>
                        <PopoverTrigger>
                            <IconButton
                                variant="ghost"
                                colorScheme="gray"
                                aria-label="See menu"
                                icon={<BsThreeDotsVertical />}
                            />
                        </PopoverTrigger>
                        <PopoverContent borderRadius={'15px'} bgColor={'gray.50'} w={'120px'}>
                            <PopoverHeader>
                            <Flex alignItems={'center'}>
                          <FaEdit /><Text ml={'10px'} fontSize={'18px'}>Edit</Text>
                        </Flex>
                            </PopoverHeader>
                            <PopoverHeader><Flex alignItems={'center'}>
                      <MdDelete /><Text ml={'10px'} fontSize={'18px'}>Delete</Text>
                      </Flex></PopoverHeader>
                        </PopoverContent>
                    </Popover>
                </Flex>
                <InputGroup>
                    <Input type="text" placeholder="Add Comment" />
                    <InputRightElement>
                        <IconButton
                            variant="ghost"
                            colorScheme="blue"
                            aria-label="See menu"><FaArrowUp />
                        </IconButton>
                    </InputRightElement>
                </InputGroup>
            </CardHeader>
        </>

    )

}

export default CommentSection;