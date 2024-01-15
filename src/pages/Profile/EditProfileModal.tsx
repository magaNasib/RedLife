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
} from '@chakra-ui/react';
import { EditIcon, PhoneIcon } from '@chakra-ui/icons';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing="4">
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" placeholder="Enter your name" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input type="text" placeholder="Enter your country" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Phone Number</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <PhoneIcon color='gray.300' />
                                </InputLeftElement>
                                <Input type='tel' placeholder='Enter your phone number' />
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Blood Group</FormLabel>
                            <Select placeholder="Select blood group">
                                <option value="O(I) Rh+">O(I) Rh+</option>
                                <option value="O(I) Rh">O(I) Rh</option>
                                <option value="A(II) Rh+">A(II) Rh+</option>
                                <option value="A(II) Rh−">A(II) Rh−</option>
                                <option value="B (III) Rh+">B (III) Rh+</option>
                                <option value="B (III) Rh−">B (III) Rh−</option>
                                <option value="AB (IV) Rh+">AB (IV) Rh+</option>
                                <option value="AB (IV) Rh">AB (IV) Rh</option>
                            </Select>
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        <EditIcon /> Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

