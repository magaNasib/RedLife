import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler, Controller } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  Button,
  HStack,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { OAuthButtonGroup } from "./components/OAuthButtonGroup";

interface IRegister {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [error, setError] = useState("");

  const methods = useForm<IRegister>({
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/");
  };

  const handleSubmit = methods.handleSubmit((data) => {
    console.log(data);

  })

  return (
    <FormProvider {...useForm<IRegister>({ defaultValues: { email: "" } })}>
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
          <ModalHeader>Reset your password</ModalHeader>
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
                      {methods.formState.errors.email?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </Stack>
              <Box>
                <Stack spacing="6">
                  <Stack spacing="6">
                    <Button type="submit" onClick={handleSubmit}>
                      Get a link
                    </Button>
                    <Text fontSize="14" color="red">
                      {error}
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
