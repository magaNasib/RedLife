import { Button } from "@chakra-ui/button"
import { Text } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/modal"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next";
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
    const {t} = useTranslation();
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const onClickClose = () => {
        navigate(-1)
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
                setError(t("LoginErrMessage1"));
            } else if (error.code.includes('auth/invalid-email')) {
                setError(t("LoginErrMessage2"));
            } else {
                setError(t("LoginErrMessage3"));
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
                    <ModalHeader>{t("LoginHeader")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Stack spacing="8">
                            <Stack spacing="6">
                                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                    <Heading size={{ base: 'xs', md: 'sm' }}>{t("LoginHeading")}</Heading>
                                    <Text color="fg.muted">
                                    {t("LoginText")} <Link href="/register">{t("LoginTextLink")}</Link>
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
                                                        <FormLabel htmlFor="email">{t("LoginEmail")}</FormLabel>
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
                                                    <PasswordField label={t("LoginPassword")} {...field} />
                                                )}
                                            />

                                            <FormErrorMessage>
                                                {methods.formState.errors.password?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Stack>
                                    <HStack justify="space-between">
                                        <Checkbox defaultChecked>{t("LoginChekbox")}</Checkbox>
                                        <Button variant="text" size="sm" onClick={() => navigate('/forgotpassword')}>
                                            {t("LoginForgotPass")}
                                        </Button>
                                    </HStack>
                                    <Stack spacing="6">
                                        <Button type="submit" onClick={handleSubmit}>{t("LoginButton")}</Button>
                                        <Text fontSize='14' color='red'>{error}</Text>
                                        <HStack>
                                            <Divider />
                                            <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                                            {t("LoginBottomText")}
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

