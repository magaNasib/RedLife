import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth} from "../../firebase"

interface IForgot {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [error, setError] = useState('')
  const {t} = useTranslation();
  const methods = useForm<IForgot>({
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/");
  };

  const handleSubmit = methods.handleSubmit(async (data: IForgot) => {
    const { email } = data
    console.log(data);
    try {
      await sendPasswordResetEmail(auth, email);
    
      setTimeout(() => {
        navigate("/login");
      }, 2000); 

      alert(t("ForgotPassSuccesMessage"));

    } catch (error: any) {
      if (error?.code?.includes('auth/invalid-email')) {
        setError(t("ForgotPassErrMessage1"));
      } else if (error?.code?.includes('auth/user-not-found')) {
        setError(t("ForgotPassErrMessage2"));
      } else {
        setError(t("ForgotPassErrMessage3"));
      }
    }

  })

  return (
    <FormProvider {...methods}>
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
          <ModalHeader>{t("ForgotPassModal")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="8">
              <Stack spacing="6">
                <Stack spacing={{ base: "2", md: "3" }} textAlign="center">

                  <FormControl isInvalid={!!methods.formState.errors.email}>
                    <Controller
                      control={methods.control}
                      name='email'
                      rules={{
                        required: t("ValidationMessage")
                      }}
                      render={({ field }) => (
                        <>
                          <FormLabel htmlFor="email">{t("ForgotPassEmail")}</FormLabel>
                          <Input {...field} id="email" type="email" value={field.value} />
                        </>
                      )}
                    />

                    <FormErrorMessage>
                      {methods.formState.errors.email?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </Stack>
              <Box>
                <Stack spacing="6">
                  <Stack spacing="6">
                    <Button type="submit" onClick={handleSubmit}>
                    {t("LinkButton")}
                    </Button>
                    <Text fontSize="14" color="red">{error}
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
};

export default ForgotPassword;
