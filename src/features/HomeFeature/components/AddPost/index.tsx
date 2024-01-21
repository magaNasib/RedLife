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
import { Library } from "@googlemaps/js-api-loader";
import AddPostForm from "./AddPostForm";

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
    seconds: number
    nanoseconds: number
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
  // setTrigger?: Dispatch<SetStateAction<boolean>>
}
const AddPost = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

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
            {show && <AddPostForm setShow={setShow} mode='add' />}

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
                isDisabled={!authChecked}
                isLoading={ loading}
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
