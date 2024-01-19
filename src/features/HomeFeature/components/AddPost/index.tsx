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
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { auth, db, onAuthStateChanged } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../../../context/AppContext";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { mapOptions } from "../../../../MapConfig";


export interface IPost {
  bloodGroup: "B+" | "A+" | "AB+" | "O+" | "B-" | "A-" | "AB-" | "O-";
  type: "Donor" | "Acceptor";
  city: string;
  coordinates: {
    lat: number
    lng: number
  }
  phone: string;
  description?: string;
  fullName: string;
  photoURL: string;
  likes: string[];
  saved: string[];
  uid: string;
  id: string;
  publish_date: {
    seconds:number
    nanoseconds:number
  };
  comments: {
    id: string
    displayName?: string;
    comment: string;
    date?: string;
    publish_date: string
    uid: string
    photo_url: string
  }[]
  comment: string;
  setTrigger?: Dispatch<SetStateAction<boolean>>
}
const AddPost = ({ setTrigger }: any) => {
  const {t} = useTranslation();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const triggerContext = useContext<any>(AuthContext)
  const [searchResult, setSearchResult] = useState<any>("Result: none");

  const toast = useToast();
  const methods = useForm<IPost>({
    defaultValues: {
      phone: "",
      description: "",
    },
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapOptions.googleMapApiKey,
    libraries: ["places"],
  });
  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      let coordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      console.log(place);
      console.log(coordinates);
      
      const formattedAddress = place.formatted_address;
      methods.setValue('city', formattedAddress)
      methods.setValue('coordinates', coordinates)

    } else {
      alert("Please enter text");
    }
  }

  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const donorCollectionRef = doc(collection(db, "donors"));


  const handleSubmit = methods.handleSubmit(async (data: IPost) => {
    data.phone = '+994' + data.phone
    setLoading(true);

    try {
      const sendingData = {
        ...data,
        publish_date: new Date(),
        uid: auth.currentUser?.uid,
        fullName: auth.currentUser?.displayName,
        avatar: auth.currentUser?.photoURL,
        likes: [],
        comments: [],
        saved: []
      };
      await setDoc(donorCollectionRef, sendingData);
      setShow(false);
      methods.reset();
      triggerContext.setTrigger((curr: boolean) => !curr)

      toast({
        title: t("AddPostSuccesMessage"),
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setTrigger((curr: boolean) => !curr);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });
  return (
    <Box w="100%" my={"2"} maxW={"2xl"} mx={"auto"} mt="0">
      <Flex
        justifyContent="space-between"
        bg={"white"}
        p="4"
        rounded={"lg"}
        flexDirection={"column"}
        border="1px solid #e2e8f0"
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
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
                    name="bloodGroup"
                    rules={{
                      required: "This field is required",
                    }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          name="bloodGrp"
                          placeholder={t("AddPostBloodSelector")}
                          onChange={field.onChange}
                          value={field.value}
                        >
                          <option value="B+">B+</option>
                          <option value="A+">A+</option>
                          <option value="AB+">AB+</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB-">AB-</option>
                          <option value="B-">B-</option>
                          <option value="A-">A-</option>
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
                    name="type"
                    rules={{
                      required: "This field is required",
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        name="typeOfUser"
                        placeholder={t("AddPostDonorSelector")}
                      >
                        <option value="Donor">{t("AddPostDonor")}</option>
                        <option value="Acceptor">{t("AddPostAcceptor")}</option>
                      </Select>
                    )}
                  />

                  <FormErrorMessage>
                    {methods.formState.errors?.type?.message}
                  </FormErrorMessage>
                </FormControl>

                {isLoaded && <FormControl isInvalid={!!methods.formState.errors.city}>
                  <Controller
                    control={methods.control}
                    name="city"
                    rules={{
                      required: "This field is required",
                    }}
                    render={({ field }) => (
                      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                          <Input
                            type="text"
                            placeholder="Search for location Information"
                            onChange={field.onChange}
                            value={field.value}
                          />
                      </Autocomplete>
                    )}
                  />

                  <FormErrorMessage>
                    {methods.formState.errors?.city?.message}
                  </FormErrorMessage>
                </FormControl>}
                <FormControl isInvalid={!!methods.formState.errors.phone}>
                  <Controller
                    control={methods.control}
                    name="phone"
                    rules={{
                      required: "This field is required",
                      validate: value => {
                        const isNineDigits = /^\d{9}$/.test(value);
                        if (!isNineDigits) {
                          return "Phone number must be 9 digits";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <InputGroup>
                        <InputLeftAddon>+994</InputLeftAddon>
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          type="tel"
                          placeholder={t("AddPostPhone")}
                        />
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
                    name="description"
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        resize={"none"}
                        placeholder={t("AddPostDescription")}
                        size="sm"
                      />
                    )}
                  />

                  <FormErrorMessage>
                    {methods.formState.errors?.description?.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  border="1px solid"
                  borderRadius="35px"
                  borderColor="#0C67C3"
                  backgroundColor="#FFFF"
                  color="#0C67C3"
                  _hover={{ bg: "#FFFF", borderColor: "#0C67C3" }}
                  onClick={() => {
                    methods.reset();
                    setShow(false);
                  }}
                >
                  {t("AddPostCancelBtn")}
                </Button>
                <Button
                  border="1px solid"
                  borderRadius="35px"
                  bgColor="#0C67C3"
                  color="#FFFF"
                  _hover={{ bg: "#0C67C3" }}
                  isLoading={loading && !authChecked}
                  onClick={handleSubmit}
                >
                  {t("AddPostPostBtn")}
                </Button>
              </>
            )}
            {!show && (
              <Button
                border="1px solid"
                borderRadius="35px"
                borderColor="#445760"
                backgroundColor="#FFFFFF"
                color="#445760"
                display="flex"
                justifyContent="flex-start"
                pl="25px"
                isLoading={!authChecked}
                _hover={{ bg: "#E8E9EB", borderColor: "#E8E9EB" }}
                onClick={() => {
                  auth.currentUser ? setShow(true) : navigate("/login");
                }}
              >
                {t("AddPostStartPostBtn")}
              </Button>
            )}
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default AddPost;
