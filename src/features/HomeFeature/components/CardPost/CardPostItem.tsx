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
    Heading,
    IconButton,
    SkeletonCircle,
    SkeletonText,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiSave, BiBookmark } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { IPost } from "../AddPost";
import { db } from "../../../../firebase";
import CommentSection from "../Comments/CommentsSection";
import { FaEdit, FaCopy } from "react-icons/fa";
import { MdDelete, MdReport } from "react-icons/md";

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

function CardPostItem(props: IPost) {

    const [showComment, setShowComment] = useState(false);

    const { id, phone, likes, comments, type, description, city, bloodGroup, fullName, photoURL } = props

    return (
    
                    <Flex justifyContent="center" my='2' key={id}>
                        <Card w="2xl" >
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
                                    <Popover>
                                        <PopoverTrigger>
                                            <IconButton
                                                variant="ghost"
                                                colorScheme="gray"
                                                aria-label="See menu"
                                                icon={<BsThreeDotsVertical />}
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent borderRadius={'15px'} bgColor={'gray.50'} w={'140px'}>
                                            <PopoverHeader>
                                                <Flex alignItems={'center'}>
                                                    <FaEdit /><Text ml={'10px'} fontSize={'18px'}>Edit</Text>
                                                </Flex>
                                            </PopoverHeader>
                                            <PopoverHeader><Flex alignItems={'center'}>
                                                <MdDelete /><Text ml={'10px'} fontSize={'18px'}>Delete</Text>
                                            </Flex></PopoverHeader>
                                            <PopoverHeader><Flex alignItems={'center'}>
                                                <MdReport /><Text ml={'10px'} fontSize={'18px'}>Report</Text>
                                            </Flex></PopoverHeader>
                                            <PopoverHeader><Flex alignItems={'center'}>
                                                <FaCopy /><Text ml={'10px'} fontSize={'18px'}>Copy URL</Text>
                                            </Flex></PopoverHeader>
                                        </PopoverContent>
                                    </Popover>
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
                                <CommentSection  {...props}/>
                            )}
                        </Card>
                    </Flex>


                )
    

}

export default CardPostItem;
