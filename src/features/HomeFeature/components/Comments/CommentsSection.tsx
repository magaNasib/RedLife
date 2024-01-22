import {
    Avatar,
    Box,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
} from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, {  useState, useContext } from "react";
import { arrayUnion,  doc,  updateDoc } from "firebase/firestore";
import { IPost } from "../AddPost";
import { auth, db } from "../../../../firebase";
import {  useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../../../context/AppContext";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";

const CommentSection: React.FC<IPost> = ({ id, comments }) => {
    const {t} = useTranslation();
    const [text, setText] = useState('')
    const navigate = useNavigate();
    const triggerContext = useContext<any>(AuthContext)

    const addCommentHandler = () => {
        if (!auth.currentUser) return navigate('/login')
        if (text) {

            console.log(id);
            
            const userDocRef = doc(db, 'donors', id);
            const myComment = {
                id: uuidv4(),
                displayName: auth.currentUser.displayName,
                comment: text,
                publish_date: new Date(),
                uid: auth.currentUser.uid
            }
            const updateData = {
                ['comments']: arrayUnion(myComment)
            };
            triggerContext.setTrigger((curr: boolean) => !curr)

            updateDoc(userDocRef, updateData)
                .then(() => {
                    setText('')
                    console.log('Document successfully updated!');
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                });
        }

    }

    return (
        <>
            <CardHeader bg='#FAFAFA'>
                {
                    comments.length > 0 && comments?.map((comment) => {
                        return (
                            <Flex gap="4" mb={'40px'} ml={'4'}>
                                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                                    <Avatar
                                        name={comment.displayName}
                                        src={comment.photo_url}
                                        size={'sm'}
                                        borderColor="green.500"
                                        borderWidth="2px"
                                        bg={'black'}
                                    />
                                    <Box>
                                        <Heading size="sm">{comment.displayName}</Heading>
                                        <Flex>
                                            <Text>{comment.comment}</Text>
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
                                    <PopoverContent borderRadius={'15px'} bgColor={'gray.50'} w={'180px'}>
                                        <PopoverHeader>
                                            <Flex alignItems={'center'}>
                                                <FaEdit /><Text ml={'10px'} fontSize={'18px'}>{t("CommentEdit")}</Text>
                                            </Flex>
                                        </PopoverHeader>
                                        <PopoverHeader><Flex alignItems={'center'}>
                                            <MdDelete /><Text ml={'10px'} fontSize={'18px'}>{t("CommentDelete")}</Text>
                                        </Flex></PopoverHeader>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        )
                    })
                }
                <InputGroup>
                    <Input type="text" placeholder={t("CommentPlaceholder")} value={text} onChange={(e) => setText(e.target.value)} />
                    <InputRightElement>
                        <IconButton
                            onClick={addCommentHandler}
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