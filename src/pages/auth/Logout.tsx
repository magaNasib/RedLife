import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    Text,
    Button,
    Box,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase"
import { useTranslation } from "react-i18next";


const Logout: React.FC = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const onClickClose = () => {
        navigate(-1);
    };

    const Logout = () => {
        signOut(auth)
            .then(() => navigate('/'))
            .catch(error => alert('Logout failed'));
    }

    return (
            <Modal
                isCentered
                closeOnOverlayClick={false}
                isOpen={true}
                onClose={onClickClose}
            >
                <ModalOverlay
                    py={{ base: "0", sm: "8" }}
                    px={{ base: "4", sm: "10" }}
                    bg={{ base: "transparent", sm: "bg.surface" }}
                    boxShadow={{ base: "none", sm: "md" }}
                    borderRadius={{ base: "none", sm: "xl" }}
                    backdropFilter="blur(10px) hue-rotate(90deg)"
                />
                <ModalContent>
                    <ModalHeader>{t("LogoutModal")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing="8">
                            <Stack spacing="6">
                                <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                                    <Text >{t("LogoutText")}</Text>
                                    <Flex mt={'20px'}>
                                        <Box>
                                            <Button bgColor={'red'} color={'white'} className="mr-2" onClick={() => navigate(-1)}>{t("NoBtn")}</Button>
                                        </Box>
                                        <Spacer />
                                        <Box>
                                            <Button bgColor={'green'} color={'white'} onClick={()=>Logout()}>{t("YesBtn")}</Button>
                                        </Box>
                                    </Flex>
                                </Stack>
                            </Stack>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
    );
};

export default Logout;
