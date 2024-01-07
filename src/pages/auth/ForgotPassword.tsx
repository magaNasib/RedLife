import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
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

  const { handleSubmit, register, formState } = useForm<IRegister>({
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/");
  };

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    //LOGIC THAT WHEN USER SUBMITS FORM
    console.log(data);
  };

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
                  <Text color="fg.muted">
                    Don't have an account? <Link href="/register">Sign up</Link>
                  </Text>
                  <FormControl isInvalid={!!formState.errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {formState.errors.email?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </Stack>
              <Box>
                <Stack spacing="6">
                  <Stack spacing="5"></Stack>
                  <HStack justify="space-between">
                    <Checkbox defaultChecked>Remember me</Checkbox>
                    <Button variant="text" size="sm">
                      Reset your password
                    </Button>
                  </HStack>
                  <Stack spacing="6">
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>
                      Sign in
                    </Button>
                    <Text fontSize="14" color="red">
                      {error}
                    </Text>
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
  );
};

export default ForgotPassword;
