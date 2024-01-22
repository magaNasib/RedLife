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
import { useTranslation } from "react-i18next";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
    const {t} = useTranslation();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("EditProfileModal")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing="4">
                        <FormControl>
                            <FormLabel>{t("NameProfileModal")}</FormLabel>
                            <Input type="text" placeholder={t("NamePlaceholderModal")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>{t("MailProfileModal")}</FormLabel>
                            <Input type="text" placeholder={t("MailPlaceholderModal")} />
                        </FormControl>

                        {/* <FormControl>
                            <FormLabel>{t("CountryModal")}</FormLabel>
                            <Input type="text" placeholder={t("CountryPlaceholderModal")} />
                        </FormControl> */}
{/* 
                        <FormControl>
                            <FormLabel>{t("PhoneNumberModal")}</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <PhoneIcon color='gray.300' />
                                </InputLeftElement>
                                <Input type='tel' placeholder={t("PhonePlaceholderModal")}/>
                            </InputGroup>
                        </FormControl> */}

                        {/* <FormControl>
                            <FormLabel>{t("BloodGroupModal")}</FormLabel>
                            <Select placeholder={t("BloodPlaceholderModal")}>
                                <option value="O(I) Rh+">O(I) Rh+</option>
                                <option value="O(I) Rh">O(I) Rh</option>
                                <option value="A(II) Rh+">A(II) Rh+</option>
                                <option value="A(II) Rh−">A(II) Rh−</option>
                                <option value="B (III) Rh+">B (III) Rh+</option>
                                <option value="B (III) Rh−">B (III) Rh−</option>
                                <option value="AB (IV) Rh+">AB (IV) Rh+</option>
                                <option value="AB (IV) Rh">AB (IV) Rh</option>
                            </Select>
                        </FormControl> */}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                    {t("CloseModal")}
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        <EditIcon /> {t("SaveChangesModal")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

