import { Button } from "@chakra-ui/button"
import { Text } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/modal"
import { useNavigate } from "react-router"
import {
    Box,
    Checkbox,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,

} from '@chakra-ui/react'
import { OAuthButtonGroup } from "./components/OAuthButtonGroup"
import { PasswordField } from "./components/PasswordField"
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "@firebase/auth"
import { useContext, useState } from "react"
import AppContext from "../../context/AppContext"

interface IProps {
}

interface ILogin {
    email: string
    password: string
}
const Login: React.FC<IProps> = () => {
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const onClickClose = () => {
        navigate('/')
    }
    const methods = useForm<ILogin>({
        defaultValues: {
            email: '',
            password: ''
        }
    })


    const handleSubmit = methods.handleSubmit(async (data: ILogin) => {
        const { email, password } = data

        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            user && user.email && navigate('/') 
            console.log(user);
        } catch (error: any) {
            console.log(error);

            if (error?.code?.includes('auth/invalid-credential')) {
                setError('Your email or password is not correct.');
            } else if (error.code.includes('auth/invalid-email')) {
                setError('Email is not valid');
            } else {
                setError('Unable to login. Please try again later.');
            }
        }

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
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Stack spacing="8">
                            <Stack spacing="6">
                                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                    <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
                                    <Text color="fg.muted">
                                        Don't have an account? <Link href="/register">Sign up</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                            <Box >
                                <Stack spacing="6">
                                    <Stack spacing="5">
                                        <FormControl isInvalid={!!methods.formState.errors.email}>
                                            <Controller
                                                control={methods.control}
                                                name='email'
                                                rules={{
                                                    required: 'This field is required'
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel htmlFor="email">Email</FormLabel>
                                                        <Input {...field} id="email" type="email" value={field.value} />
                                                    </>
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {methods.formState.errors?.email?.message}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl isInvalid={!!methods.formState.errors.password}>
                                            <Controller
                                                control={methods.control}
                                                name='password'
                                                rules={{
                                                    required: 'This field is required'
                                                }}
                                                render={({ field }) => (
                                                    <PasswordField label='Password' {...field} />
                                                )}
                                            />

                                            <FormErrorMessage>
                                                {methods.formState.errors.password?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Stack>
                                    <HStack justify="space-between">
                                        <Checkbox defaultChecked>Remember me</Checkbox>
                                        <Button variant="text" size="sm" onClick={() => navigate('/forgotpassword')}>
                                            Forgot password?
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
                                        <OAuthButtonGroup/>
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
export default Login

