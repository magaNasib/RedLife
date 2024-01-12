import { Avatar } from "@chakra-ui/avatar";
import { PhoneIcon } from "@chakra-ui/icons";
import { Container, Stack, Flex, HStack, Box } from "@chakra-ui/layout";
import {
  Alert,
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { auth, db } from "../../../../firebase";
import { useNavigate } from "react-router-dom";

export interface IPost {
  bloodGroup: 'B+' | 'A+' | 'AB+' | 'O+' | 'B-' | 'A-' | 'AB-' | 'O-'
  type: 'Donor' | 'Acceptor'
  city: string
  phone: string
  description?: string
  fullName: string
  photoURL: string
  likes: string[]
  uid:string
  id:string
  publish_date:string
  comments: {
    uid: string
    message: string
    date: string
  }
}
const AddPost = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const toast = useToast()
  const methods = useForm<IPost>({
    defaultValues: {
      phone: ''
    }
  })
  const donorCollectionRef = collection(db, 'donors')
  const handleSubmit = methods.handleSubmit(async (data: IPost) => {
    setLoading(true)
    try {
      const sendingData = {
        ...data,
        publish_date: new Date(),
        uid: auth.currentUser?.uid,
        fullName: auth.currentUser?.displayName,
        avatar: auth.currentUser?.photoURL,
        likes:[],
        comments:{}
      }
      await addDoc(donorCollectionRef, sendingData)
      setShow(false)
      methods.reset()
      toast({
        title: 'Post created successfully',
        description: "Refresh the page to see latest posts",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  })
  return (
    <FormProvider {...methods}>
      <Box my={'2'} maxW={'xl'} mx={'auto'}>
        <Flex
          justifyContent="space-between"
          bg={"white"}
          p="4"
          rounded={"lg"}
          flexDirection={"column"}
          border="1px solid #e2e8f0" // Border color
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" // Box shadow
        >
          <Stack isInline spacing={4} alignItems={`${!show && "center"}`}>
            <Avatar
              src="https://bit.ly/broken-link"
              borderColor="green.500"
              borderWidth="2px"
            />
            <Stack spacing={4} w={"100%"}>
              {show && (
                <>

                  <FormControl isInvalid={!!methods.formState.errors.bloodGroup}>
                    <Controller
                      control={methods.control}
                      name='bloodGroup'
                      rules={{
                        required: 'This field is required'
                      }}
                      render={({ field }) => (
                        <>
                          <Select {...field} name="bloodGrp" placeholder="Blood Group" onChange={field.onChange} value={field.value}>
                            <option value='B+'>B+</option>
                            <option value='A+'>A+</option>
                            <option value='AB+'>AB+</option>
                            <option value='O+'>O+</option>
                            <option value='O-'>O-</option>
                            <option value='AB-'>AB-</option>
                            <option value='B-'>B-</option>
                            <option value='A-'>A-</option>
                          </Select>
                        </>
                      )}
                    />
                    <FormErrorMessage>
                      {methods.formState.errors?.bloodGroup?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!methods.formState.errors.type}>
                    <Controller
                      control={methods.control}
                      name='type'
                      rules={{
                        required: 'This field is required'
                      }}
                      render={({ field }) => (
                        <Select {...field} name="typeOfUser" placeholder="Who are you">
                          <option value='Donor'>Donor</option>
                          <option value='Acceptor'>Acceptor</option>
                        </Select>
                      )}
                    />

                    <FormErrorMessage>
                      {methods.formState.errors?.type?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!methods.formState.errors.city}>
                    <Controller
                      control={methods.control}
                      name='city'
                      rules={{
                        required: 'This field is required'
                      }}
                      render={({ field }) => (
                        <Select {...field} placeholder="City">
                          <option value="Baku">Baku </option>
                          <option value="Oghuz">Oghuz</option>
                          <option value="Ganja">Ganja</option>
                        </Select>
                      )}
                    />

                    <FormErrorMessage>
                      {methods.formState.errors?.city?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!methods.formState.errors.phone}>
                    <Controller
                      control={methods.control}
                      name='phone'
                      rules={{
                        required: 'This field is required'
                      }}
                      render={({ field }) => (
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<PhoneIcon color="gray.300" />}
                          />
                          <Input {...field} value={field.value} onChange={field.onChange} onBlur={field.onBlur} type="tel" placeholder="Phone number" />
                        </InputGroup>
                      )}
                    />

                    <FormErrorMessage>
                      {methods.formState.errors?.phone?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!methods.formState.errors.description}>
                    <Controller
                      control={methods.control}
                      name='description'

                      render={({ field }) => (
                        <Textarea
                          {...field}
                          resize={"none"}
                          placeholder="Additional information if you want..."
                          size="sm"
                        />
                      )}
                    />

                    <FormErrorMessage>
                      {methods.formState.errors?.description?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button onClick={() => {
                    methods.reset()
                    setShow(false)
                  }}>Cancel</Button>
                  <Button bg={"green"} color={"white"} rounded={".5rem"} isLoading={loading}
                    onClick={handleSubmit}>
                    Post
                  </Button>
                </>
              )}
              {!show && (
                <Button
                  bg={"#007FFF"}
                  color={"white"}
                  rounded={".5rem"}
                  onClick={() => {
                    auth.currentUser && setShow(true);
                    !auth.currentUser && navigate('/login');
                  }}
                >
                  Click here for Post
                </Button>
              )}
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </FormProvider>
  );
};

export default AddPost;
