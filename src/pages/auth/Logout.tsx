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


const Logout: React.FC = () => {


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
                    <ModalHeader>Are you sure you want to logout?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing="8">
                            <Stack spacing="6">
                                <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                                    <Text >Are you sure you want to logout?</Text>
                                    <Flex mt={'20px'}>
                                        <Box>
                                            <Button bgColor={'red'} color={'white'} className="mr-2" onClick={() => navigate(-1)}>Cancel</Button>
                                        </Box>
                                        <Spacer />
                                        <Box>
                                            <Button bgColor={'green'} color={'white'} onClick={()=>Logout()}>Sign out</Button>
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
