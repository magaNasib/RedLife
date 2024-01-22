import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Stack, Text } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/modal"
import { useNavigate } from "react-router"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { updatePassword } from "@firebase/auth"
import { auth } from "../../firebase"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import { useToast } from "@chakra-ui/toast"
import { useTranslation } from "react-i18next";

interface IProps {
}
interface IChange {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
const ChangePassword: React.FC<IProps> = () => {

    const {t} = useTranslation();
    const [changing, setChanging] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const toast = useToast();
    const methods = useForm<IChange>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ''
        }
    })

    const navigate = useNavigate()


    const onClickClose = () => {
        navigate('/profile')
    }

    const handleSubmit = methods.handleSubmit(async (data: IChange) => {
        const { newPassword, confirmPassword,oldPassword } = data
        if (newPassword !== confirmPassword) {
            setError(t("ErrorMessage1"));
            return;
        }

        if (error !== '') setError('');

        try {
            await promptForCredentials(oldPassword);
            setChanging(true);
            await updatePassword(auth.currentUser!, newPassword);
            toast({
                title: t("SuccesMessage"),
                // description: "Refresh the page to see latest posts",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: 'top-right'   
            });
            navigate('/profile')
        } catch (error: any) {
            console.log(error);

            if (error?.code?.includes('auth/wrong-password')) {
                setError(t("ErrorMessage2"));
            } else {
                setError(t("ErrorMessage3"));
            }
        }

    })
    const promptForCredentials = async (currentPassword: string) => {
        const user = auth.currentUser;
        const credentials = EmailAuthProvider.credential(user?.email!, currentPassword);

        await reauthenticateWithCredential(user!, credentials);
    };

    // if (auth.currentUser?.providerData[0]?.providerId !== 'password') return <Navigate to="/" />;   

    return (
        <FormProvider {...methods}>
            <Modal isCentered closeOnOverlayClick={false} isOpen={true} onClose={onClickClose}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                    <ModalHeader>{t("ChangePassModal")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Stack spacing="8">
                            <Box >
                                <Stack spacing="6">
                                    <Stack spacing="5">

                                        <FormControl isInvalid={!!methods.formState.errors.oldPassword}>
                                            <Controller
                                                control={methods.control}
                                                name='oldPassword'
                                                rules={{
                                                    required: 'This field is required'
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel htmlFor="oldPassword">{t("CurrPasswordModal")}</FormLabel>
                                                        <Input {...field}
                                                            onChange={field.onChange}
                                                            value={field.value}
                                                            id="oldPassword" type="password" />
                                                    </>
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {methods.formState.errors?.oldPassword?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={!!methods.formState.errors.newPassword}>
                                            <Controller
                                                control={methods.control}
                                                name='newPassword'
                                                rules={{
                                                    required: t("ValidationMessage")
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel htmlFor="newPassword">{t("NewPasswordModal1")}</FormLabel>
                                                        <Input {...field}
                                                            onChange={field.onChange}
                                                            value={field.value}
                                                            id="newPassword" type="password"
                                                        />
                                                    </>
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {methods.formState.errors?.newPassword?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={!!methods.formState.errors.newPassword}>
                                            <Controller
                                                control={methods.control}
                                                name='confirmPassword'
                                                rules={{
                                                    required: t("ValidationMessage")
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel htmlFor="newPassword">{t("NewPasswordModal2")}</FormLabel>
                                                        <Input {...field}
                                                            onChange={field.onChange}
                                                            value={field.value}
                                                            id="confirmPassword" type="password"
                                                        />
                                                    </>
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {methods.formState.errors?.confirmPassword?.message}
                                            </FormErrorMessage>
                                        </FormControl>

                                    </Stack>
                                    <Stack spacing="6">
                                        <Button type="submit" disabled={changing} onClick={handleSubmit}>{t("BtnChangePass")}</Button>
                                        <Text fontSize='14' color='red'>{error}</Text>
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
export default ChangePassword;

function promptForCredentials() {
    throw new Error("Function not implemented.")
}
