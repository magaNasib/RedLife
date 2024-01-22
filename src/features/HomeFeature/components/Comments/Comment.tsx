import {
    Avatar,
    Box,
    Flex,
    Heading,
    IconButton,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    useToast,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState, useContext, useEffect } from "react";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../../../context/AppContext";
import { useTranslation } from "react-i18next";
interface IUser {
    uid: string
    photoURL: string
    avatar: string
}
interface IComment {
    id: string; displayName?: string | undefined; comment: string; date?: string | undefined; publish_date: string; uid: string; photo_url: string | undefined; postId: string
}

const Comment: React.FC<IComment> = (props) => {
    const { id, displayName, comment, date, publish_date, uid, photo_url, postId } = props
    const triggerContext = useContext<any>(AuthContext)
    const [userData, setUserData] = useState<IUser | null>(null);
    const { t } = useTranslation();
    const donorsCollectionRef = collection(db, 'donors');
    const [loading, setLoading] = useState(false)
    const toast = useToast();

    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData(uid);
            setUserData(userData)
        }
        uid && getUserData()
    }, [])

    const fetchUserData = async (uid: string): Promise<IUser | null> => {
        const usersCollectionRef = collection(db, 'users');
        const userQuery = query(usersCollectionRef, where('uid', '==', uid));
        const userData = await getDocs(userQuery);

        if (userData.docs.length > 0) {
            return userData.docs[0].data() as IUser;
        }

        return null;
    };
    const handleCommentDelete = () => {
        setLoading(true)
        const postDocRef = doc(donorsCollectionRef, postId);
        getDoc(postDocRef)
            .then(docSnapshot => {
                if (docSnapshot.exists()) {
                    const post = docSnapshot.data();

                    if (post && post.comments) {
                        const updatedComments = post.comments.filter((comment: IComment) => comment.id !== id);

                        return updateDoc(postDocRef, { comments: updatedComments });
                    } else {
                        console.error('Post or comments not found.');
                    }
                } else {
                    console.error('Post not found.');
                }
            })
            .then(() => {
                console.log(`Comment with id ${id} deleted successfully.`);
                toast({
                    title: t("DeleteSuccesMessage"),
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right",
                });
                triggerContext.setTrigger((curr: boolean) => !curr)

            })
            .catch(error => {
                console.error('Error updating post:', error);
            })
            .finally(() => {
                setLoading(false)

            })

    }
    return (


        <Flex gap="4" mb={'40px'} ml={'4'} key={id} cursor={loading ? 'progress' : 'default'}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                    name={displayName}
                    src={userData?.avatar || photo_url}
                    size={'sm'}
                    borderColor="green.500"
                    borderWidth="2px"
                    bg={'black'}
                />
                <Box>
                    <Heading size="sm">{displayName}</Heading>
                    <Flex>
                        <Text>{comment}</Text>
                    </Flex>
                </Box>
            </Flex>
            {uid === auth.currentUser?.uid && <Popover>
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
                        <Flex alignItems={'center'} cursor={'pointer'}>
                            <FaEdit /><Text ml={'10px'} fontSize={'18px'}>{t("CommentEdit")}</Text>
                        </Flex>
                    </PopoverHeader>
                    <PopoverHeader>
                        <Flex alignItems={'center'} cursor={'pointer'}>
                            <MdDelete /><Text ml={'10px'} fontSize={'18px'} onClick={handleCommentDelete}>{t("CommentDelete")}</Text>
                        </Flex>
                    </PopoverHeader>
                </PopoverContent>
            </Popover>}
        </Flex>


    )

}

export default Comment;