import React, { useContext, useState } from 'react'
import { Button, IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader } from "@chakra-ui/popover";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaCopy } from "react-icons/fa";
import { MdDelete, MdReport } from "react-icons/md";
import { auth, db } from "../../firebase";
import { useToast } from "@chakra-ui/toast";
import { collection, deleteDoc, doc } from "@firebase/firestore";
import { useDisclosure } from "@chakra-ui/hooks";
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/modal';
import { FocusableElement } from '@chakra-ui/utils';
import { AuthContext } from '../../context/AppContext';
import { EditPost } from './EditPost';

const PostActions = ({ uid, id }: { uid: string; id: string }) => {
    const donorCollectionRef = collection(db, 'donors');
    const triggerContext = useContext<any>(AuthContext)
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<FocusableElement>(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    };
    const handleDelete = async () => {
        // onclose()
        try {
            const donorDocRef = doc(donorCollectionRef, id);
            await deleteDoc(donorDocRef);
            triggerContext.setTrigger((curr: boolean) => !curr)
            toast({
                title: 'Deleted successfully',
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
            console.log(`Donor with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting donor:', error);
        }
    }
    return (
        <>
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
                    {
                        auth?.currentUser?.uid === uid &&
                        <>
                            <PopoverHeader cursor={'pointer'}>
                                <Flex alignItems={'center'}>
                                    <FaEdit /><Text ml={'10px'} fontSize={'18px'} onClick={() => setIsEditModalOpen(true)}
                                    >Edit</Text>
                                </Flex>
                            </PopoverHeader>
                            <PopoverHeader cursor={'pointer'} onClick={onOpen}>
                                <Flex alignItems={'center'}>
                                    <MdDelete /><Text ml={'10px'} fontSize={'18px'}>Delete</Text>
                                </Flex>
                            </PopoverHeader>
                        </>
                    }
                    <PopoverHeader cursor={'pointer'}>
                        <Flex alignItems={'center'}>
                            <MdReport /><Text ml={'10px'} fontSize={'18px'}>Report</Text>
                        </Flex></PopoverHeader>
                    <PopoverHeader cursor={'pointer'}>
                        <Flex alignItems={'center'}>
                            <CopyToClipboard text={window.location.href + id} onCopy={() => {
                                toast({
                                    title: "Copied the url",
                                    status: 'info',
                                    duration: 1000,
                                    isClosable: true,
                                    position: "top-right",
                                });
                            }}>
                                <Flex gap={'10px'} alignItems={'center'} fontSize={'18px'}><FaCopy />Copy URL</Flex>
                            </CopyToClipboard>
                        </Flex>
                    </PopoverHeader>
                </PopoverContent>
            </Popover>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Post
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={(e) => {
                                onClose()
                                handleDelete()
                            }} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <EditPost
                isOpen={isEditModalOpen}
                onClose={handleEditModalClose}
                id={id}
            />
        </>
    )
}

export default PostActions