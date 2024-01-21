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
import { useState } from "react"
import { useTranslation } from "react-i18next";
import { updateProfile } from "firebase/auth"

interface IProps {
}
interface IRegister {
    fullname: string
    savedPosts:string

    email: string
    password: string
    repassword: string
}
const Register: React.FC<IProps> = () => {
    const {t} = useTranslation();
    const [error, setError] = useState('')
    const methods = useForm<IRegister>({
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
            repassword: ''
        }
    })

    const navigate = useNavigate()


    const onClickClose = () => {
        navigate('/')
    }

    const handleSubmit = methods.handleSubmit(async (data: IRegister) => {
        const { fullname, email, password } = data
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            
            await updateProfile(user, {
                displayName: fullname
            });
            await setDoc(doc(db, 'users', user.uid), { email })
            navigate('/login')
        } catch (error: any) {
            if (error?.code?.includes('auth/weak-password')) {
                setError(t("RegisterErrMessage1"));
            } else if (error.code.includes('auth/email-already-in-use')) {
                setError(t("RegisterErrMessage2"));
            } else {
                setError(t("RegisterErrMessage3"));
            }
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
                    <ModalHeader>{t("RegisterHeader")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Stack spacing="8">
                            <Stack spacing="6">
                                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                    <Heading size={{ base: 'xs', md: 'sm' }}>{t("RegisterHeading")}</Heading>
                                    <Text color="fg.muted">
                                    {t("RegisterText")} <Link href="/login">{t("RegisterTextLink")}</Link>
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
                                                    required: t("ValidationMessage")
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel htmlFor="fullname">{t("RegisterName")}</FormLabel>
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
                                                    required: t("ValidationMessage")
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel htmlFor="email">{t("RegisterEmail")}</FormLabel>
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
                                                    required: t("ValidationMessage")
                                                }}
                                                render={({ field }) => (
                                                    <PasswordField label={t("RegisterPassword1")} {...field} />
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
                                                    required: t("ValidationMessage")
                                                }}
                                                render={({ field }) => (
                                                    <PasswordField label={t("RegisterPassword2")} {...field} />
                                                )}
                                            />

                                            <FormErrorMessage>
                                                {methods.formState.errors.password?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Stack>
                                    <Stack spacing="6">
                                        <Button type="submit" onClick={handleSubmit}>{t("RegisterButton")}</Button>
                                        <Text fontSize='14' color='red'>{error}</Text>
                                        <HStack>
                                            <Divider />
                                            <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                                            {t("RegisterBottomText")}
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