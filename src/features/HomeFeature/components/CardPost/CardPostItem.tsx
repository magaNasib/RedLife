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
import { BiLike, BiChat, BiSave, BiBookmark, BiSolidLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { IPost } from "../AddPost";
import { auth, db, onAuthStateChanged } from "../../../../firebase";
import CommentSection from "../Comments/CommentsSection";
import { FaEdit, FaCopy } from "react-icons/fa";
import { MdDelete, MdReport } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { AuthContext } from "../../../../context/AppContext";



function CardPostItem(props: IPost, key: number) {
  const [showComment, setShowComment] = useState(false);

    const { id, phone, likes, comments, saved, type, description, city, bloodGroup, fullName, photoURL, uid } = props
    const navigate = useNavigate();
    const triggerContext = useContext<any>(AuthContext)

  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setAuthChecked(true);
    });

        return () => unsubscribe();
    }, [auth, navigate]);
    let actions = {
        isILiked: false,
        isISaved: false
    };

    if (auth.currentUser) {
        actions.isILiked = likes.includes(auth.currentUser.uid);
        actions.isISaved = saved.includes(auth.currentUser.uid);
    } else {
        actions.isILiked = false;
        actions.isISaved = false;
    }
    const addLikeHandler = () => {
        if (!auth.currentUser) return navigate('/login')
        const userDocRef = doc(db, 'donors', id);

        const updateData = {
            ['likes']: actions.isILiked ? arrayRemove(auth.currentUser.uid) : arrayUnion(auth.currentUser.uid)
        };
        triggerContext.setTrigger((curr: boolean) => !curr)
        updateDoc(userDocRef, updateData)
            .then(() => {
                console.log('Document successfully updated!');
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });
    }

    const saveClickHandler = () => {
        if (!auth.currentUser) return navigate('/login')
        const userDocRef = doc(db, 'donors', id);
        const updateData = {
            ['saved']: actions.isISaved ? arrayRemove(auth.currentUser.uid) : arrayUnion(auth.currentUser.uid)
        };
        triggerContext.setTrigger((curr: boolean) => !curr)

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
                    <Button flex="1" variant="ghost" leftIcon={actions.isILiked ? <BiSolidLike size={20} color='#166fe5' /> : <BiLike size={20} />} isDisabled={!authChecked} onClick={() => addLikeHandler()}>
                        {likes?.length || '0'}
                    </Button>
                    <Button flex="1" variant="ghost" leftIcon={<BiChat size={20} />} isDisabled={!authChecked} onClick={() => {
                        setShowComment(!showComment)

                    }}>
                        {comments?.length || '0'}
                    </Button>
                    <Button flex="1" variant="ghost" leftIcon={actions.isISaved ? <FaBookmark size={20} color='#166fe5' /> : <BiBookmark size={20} />} isDisabled={!authChecked} onClick={() => { saveClickHandler() }}>
                        {actions.isISaved ? 'Saved' : 'Save'}
                    </Button>

                </CardFooter>
                {showComment && (
                    <CommentSection  {...props} />
                )}
            </Card>
        </Flex>


    )


}

export default CardPostItem;
