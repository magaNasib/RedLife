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
import { useTranslation } from "react-i18next";


const PostActions = ({ uid, id }: { uid: string; id: string }) => {
    const { t } = useTranslation();

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
                title: t("DeleteSuccesMessage"),
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
                <PopoverContent borderRadius={'15px'} bgColor={'gray.50'} w={'240px'}>
                    {
                        auth?.currentUser?.uid === uid &&
                        <>
                            <PopoverHeader cursor={'pointer'}>
                                <Flex alignItems={'center'}>
                                    <FaEdit /><Text ml={'10px'} fontSize={'18px'} onClick={() => setIsEditModalOpen(true)}
                                    >{t("CardEdit")}</Text>
                                </Flex>
                            </PopoverHeader>
                            <PopoverHeader cursor={'pointer'} onClick={onOpen}>
                                <Flex alignItems={'center'}>
                                    <MdDelete /><Text ml={'10px'} fontSize={'18px'}>{t("CardDelete")}</Text>
                                </Flex>
                            </PopoverHeader>
                        </>
                    }
                  
                    <PopoverHeader cursor={'pointer'}>
                        <Flex alignItems={'center'}>
                            <CopyToClipboard text={window.location.origin + '/' + id} onCopy={() => {
                                toast({
                                    title: t("SharedMessage"),
                                    status: 'info',
                                    duration: 1000,
                                    isClosable: true,
                                    position: "top-right",
                                });
                            }}>
                                <Flex gap={'10px'} alignItems={'center'} fontSize={'18px'}><FaCopy />{t("CardShare")}</Flex>
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
                            {t("DeleteAlert1")}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {t("DeleteAlert2")}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>
                                {t("DeleteBtn1")}
                            </Button>
                            <Button colorScheme='red' onClick={(e) => {
                                onClose()
                                handleDelete()
                            }} ml={3}>
                                {t("DeleteBtn2")}
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