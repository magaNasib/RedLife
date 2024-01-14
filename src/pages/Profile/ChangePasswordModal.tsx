// ChangePasswordModal.tsx
import React, {useState} from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
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
    Input, InputGroup, InputRightElement,
} from '@chakra-ui/react';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing="4">
                        <FormControl>
                            <FormLabel>Old Password</FormLabel>
                            {/* <Input type="password" placeholder="Enter your old password" /> */}
                            <PasswordInput/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>New Password</FormLabel>
                            {/* <Input type="password" placeholder="Enter your new password" /> */}
                            <PasswordInput/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Repeat New Password</FormLabel>
                            {/* <Input type="password" placeholder="Repeat your new password" /> */}
                            <PasswordInput/>
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

function PasswordInput() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}

export default PasswordInput;

