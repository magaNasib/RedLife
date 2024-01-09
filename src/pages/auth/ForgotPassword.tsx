import { Button } from "@chakra-ui/button"
import { Checkbox } from "@chakra-ui/checkbox"
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Stack, Heading, HStack, Divider, Link, Box } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/modal"
import { Text } from "@chakra-ui/layout"
import { FormProvider, Controller, useForm } from "react-hook-form"
import { OAuthButtonGroup } from "./components/OAuthButtonGroup"
import { PasswordField } from "./components/PasswordField"
import { useNavigate } from "react-router"
import { useState } from "react"

const ForgotPassword = () => {
    const [error, setError] = useState('')

    const methods = useForm()
    const navigate = useNavigate()
    const onClickClose = () => {
       navigate('/')
   }
   const handleSubmit = methods.handleSubmit((data)=>{
    console.log(data);
    
   })
    return (
        <FormProvider {...methods}>
            <Modal isCentered closeOnOverlayClick={false} isOpen={true} onClose={onClickClose} >
                <ModalOverlay
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={{ base: 'transparent', sm: 'bg.surface' }}
                    boxShadow={{ base: 'none', sm: 'md' }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                    <ModalHeader>  Reset your password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Stack spacing="8">
                            <Stack spacing="6">
                                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                    <Text color="fg.muted">
                                        Don't have an account? <Link href="/register">Sign up</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                            <Box >
                                <Stack spacing="6">
                                    <Stack spacing="5">
                                        
                                    </Stack>
                                    <HStack justify="space-between">
                                        <Checkbox defaultChecked>Remember me</Checkbox>
                                        <Button variant="text" size="sm">
                                            Reset your password
                                        </Button>
                                    </HStack>
                                    <Stack spacing="6">
                                        <Button type="submit" onClick={handleSubmit}>Sign in</Button>
                                        <Text fontSize='14' color='red'>{error}</Text>
                                        <HStack>
                                            <Divider />
                                            <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                                                or continue with
                                            </Text>
                                            <Divider />
                                        </HStack>
                                        <OAuthButtonGroup />
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </ModalBody>
                    {/* <ModalFooter>
                    <Button onClick={onClickClose}>Close</Button>
                </ModalFooter> */}
                </ModalContent>
            </Modal>
        </FormProvider>
    )
}
export default ForgotPassword