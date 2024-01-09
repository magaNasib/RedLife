import { Button } from "@chakra-ui/button"
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Stack, Text } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/modal"
import { useNavigate } from "react-router"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "@firebase/auth"
import { auth } from "../../firebase"
import { useState } from "react"

interface IProps {
}
interface IChange {
    oldPassword: string,
    newPassword: string,
    confirmPassword:string
}
const ChangePassword: React.FC<IProps> = () => {

    const [changing, setChanging] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const methods = useForm<IChange>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword:''
        }
    })

    const navigate = useNavigate()


    const onClickClose = () => {
        navigate('/')
    }

    const handleSubmit = methods.handleSubmit(async (data: IChange) => {
        const { newPassword,confirmPassword } = data
        if (newPassword !== confirmPassword) {
            setError('Make sure your passwords are matching');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        try {
            await updatePassword(auth.currentUser!, newPassword);
            navigate('/login')
        } catch (error: any) {
            console.log(error);
            
            if (error?.code?.includes('auth/wrong-password')) {
                setError('Invalid current password.');
            } else {
                setError('Unable to change password. Please try again later.');
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
                    <ModalHeader>Change Password</ModalHeader>
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
                                                        <FormLabel htmlFor="oldPassword">Current Password</FormLabel>
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
                                                    required: 'This field is required'
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel htmlFor="newPassword">New Password</FormLabel>
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
                                                    required: 'This field is required'
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel htmlFor="newPassword">Confirm Your New Password</FormLabel>
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
                                        <Button type="submit" disabled={changing} onClick={handleSubmit}>Change Password</Button>
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