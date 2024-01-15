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
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    InputGroup,
    InputRightElement,
    Input,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiBookmark } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { IPost } from "../AddPost";
import { auth, db, onAuthStateChanged } from "../../../../firebase";
import CommentSection from "../Comments/CommentsSection";
import { FaEdit, FaCopy, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdReport } from "react-icons/md";
import { useNavigate } from "react-router-dom";



function CardPostItemDetails(props: IPost, key: number) {

    // const [showComment, setShowComment] = useState(false);

    const { id, phone, likes, type, description, city, bloodGroup, fullName, photoURL } = props
    const navigate = useNavigate();

    const [authChecked, setAuthChecked] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, () => {
            setAuthChecked(true);
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const actionClickHandler = (action: string) => {
        if (!auth.currentUser) return navigate('/login')

        const userDocRef = doc(db, 'donors', id);

        const updateData = {
            [action]: likes.push(auth.currentUser?.uid),
        };
        console.log(likes);

        updateDoc(userDocRef, updateData)
            .then(() => {
                console.log('Document successfully updated!');
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });
    }

    return (

        <Flex justifyContent="center" my='2' key={key}>
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
                </CardFooter>
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
                    </Flex>
                    {/* <InputGroup>
                        <Input type="text" placeholder="Add Comment" />
                        <InputRightElement>
                            <IconButton
                                variant="ghost"
                                colorScheme="blue"
                                aria-label="See menu"><FaArrowUp />
                            </IconButton>
                        </InputRightElement>
                    </InputGroup> */}
                </CardHeader>
            </Card>
        </Flex>


    )


}

export default CardPostItemDetails;
