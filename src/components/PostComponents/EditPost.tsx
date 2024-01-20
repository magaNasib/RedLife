import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    VStack,
    FormControl,
    FormLabel,
    Input, InputGroup, InputLeftElement,
    Select,
    Stack,
} from '@chakra-ui/react';
import { EditIcon, PhoneIcon } from '@chakra-ui/icons';
import { useTranslation } from "react-i18next";
import AddPost from '../../features/HomeFeature/components/AddPost';
import AddPostForm from '../../features/HomeFeature/components/AddPost/AddPostForm';

interface EditPostProps {
    isOpen: boolean;
    onClose: () => void;
    id:string
}

export const EditPost: React.FC<EditPostProps> = ({ isOpen, onClose,id }) => {
    const { t } = useTranslation();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4} w={"100%"} pb={'5'}>
                        <AddPostForm setShow={onClose} mode={'edit'} id={id}/>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

