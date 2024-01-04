import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Divider, HStack, Heading, Link, Stack, Text } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/modal"
import { useNavigate } from "react-router"
import { OAuthButtonGroup } from "./components/OAuthButtonGroup"
import { PasswordField } from "./components/PasswordField"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { createUserWithEmailAndPassword } from "@firebase/auth"
import { auth, db } from "../../firebase"
import { doc, setDoc } from "@firebase/firestore"

interface IProps {
}
interface IRegister {
    fullname: string
    email: string
    password: string
    repassword: string
}

const Register: React.FC<IProps> = () => {

    const methods = useForm<IRegister>({
        defaultValues: {
            fullname: '',
            email: '',
            password:'',
            repassword:''
        }
    })

    const navigate = useNavigate()
    

    const onClickClose = () => {
        navigate('/')
    }
    const handleSubmit = methods.handleSubmit(async (data: IRegister) => {
        const { fullname, email, password } = data
        try {   
            const {user} = await createUserWithEmailAndPassword(auth,email,password);
            console.log(user);
            
            await setDoc(doc(db,'users',user.uid),{email})      
            
        } catch (error) {
            console.log(error);
            
        }
    })
    return (
        <FormProvider {...methods}>
            <Modal isCentered closeOnOverlayClick={false} isOpen={true} onClose={onClickClose}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                    <ModalHeader>Register</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Stack spacing="8">
                            <Stack spacing="6">
                                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                    <Heading size={{ base: 'xs', md: 'sm' }}>Create your account</Heading>
                                    <Text color="fg.muted">
                                        Already have an account? <Link href="/login">Sign in</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                            <Box >
                                <Stack spacing="6">
                                    <Stack spacing="5">

                                        <FormControl isInvalid={!!methods.formState.errors.fullname}>
                                            <Controller
                                                control={methods.control}
                                                name='fullname'
                                                rules={{
                                                    required: 'This field is required'
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel htmlFor="fullname">Fullname</FormLabel>
                                                        <Input {...field} id="fullname" type="fullname" value={field.value} />
                                                    </>
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {methods.formState.errors?.fullname?.message}
                                            </FormErrorMessage>
                                        </FormControl>
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
                                        <FormControl isInvalid={!!methods.formState.errors.repassword}>
                                            <Controller
                                                control={methods.control}
                                                name='repassword'
                                                rules={{
                                                    required: 'This field is required'
                                                }}
                                                render={({ field }) => (
                                                    <PasswordField label='Confirm the Password' {...field} />
                                                )}
                                            />

                                            <FormErrorMessage>
                                                {methods.formState.errors.password?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Stack>
                                    <Stack spacing="6">
                                        <Button type="submit" onClick={handleSubmit}>Sign up</Button>
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
                </ModalContent>
            </Modal>
        </FormProvider>
    )
}
export default Register