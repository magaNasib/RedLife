import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  IconButton,
  SkeletonCircle,
  SkeletonText,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiSave, BiBookmark } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { IPost } from "../AddPost";
import { auth, db, onAuthStateChanged } from "../../../../firebase";
import CommentSection from "../Comments/CommentsSection";
import { FaEdit, FaCopy } from "react-icons/fa";
import { MdDelete, MdReport } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CardPostItem(props: IPost, key: number) {
  const [showComment, setShowComment] = useState(false);

  const {
    id,
    phone,
    likes,
    comments,
    saved,
    type,
    description,
    city,
    bloodGroup,
    fullName,
    photoURL,
    uid,
  } = props;
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const actionClickHandler = (action: string) => {
    if (!auth.currentUser) return navigate("/login");

    const userDocRef = doc(db, "donors", id);

    const updateData = {
      [action]: likes.push(auth.currentUser?.uid),
    };
    console.log(likes);

    updateDoc(userDocRef, updateData)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  };

  return (
    <Flex justifyContent="center" my="2" key={key}>
      <Card w="2xl">
        <CardHeader>
          <Flex gap="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={fullName}
                src={photoURL}
                borderWidth="2px"
                bg={"black"}
              />
              <Flex justify="space-between">
                <Box mr="65px">
                  <Heading size="md">{fullName}</Heading>
                  <Flex>
                    <Text>{city},</Text>
                    <Text ml="5px">{phone}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            <Popover>
              <Flex>
                <Text
                  bg={type === "Acceptor" ? "green.500" : "red.500"}
                  color="white"
                  p="1"
                  borderRadius="md"
                  h="35px"
                  w="110px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {type}:{" "}
                  <Text ml="5px" color="#ffff">
                    {bloodGroup}
                  </Text>
                </Text>
              </Flex>
              <PopoverTrigger>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                />
              </PopoverTrigger>
              <PopoverContent
                borderRadius={"15px"}
                bgColor={"gray.50"}
                w={"140px"}
              >
                <PopoverHeader>
                  <Flex alignItems={"center"}>
                    <FaEdit />
                    <Text ml={"10px"} fontSize={"18px"}>
                      Edit
                    </Text>
                  </Flex>
                </PopoverHeader>
                <PopoverHeader>
                  <Flex alignItems={"center"}>
                    <MdDelete />
                    <Text ml={"10px"} fontSize={"18px"}>
                      Delete
                    </Text>
                  </Flex>
                </PopoverHeader>
                <PopoverHeader>
                  <Flex alignItems={"center"}>
                    <MdReport />
                    <Text ml={"10px"} fontSize={"18px"}>
                      Report
                    </Text>
                  </Flex>
                </PopoverHeader>
                <PopoverHeader>
                  <Flex alignItems={"center"}>
                    <FaCopy />
                    <Text ml={"10px"} fontSize={"18px"}>
                      Copy URL
                    </Text>
                  </Flex>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{description}</Text>
        </CardBody>
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<BiLike size={20} />}
            isDisabled={!authChecked}
            onClick={() => actionClickHandler("likes")}
          >
            {likes?.length || "0"}
          </Button>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<BiChat size={20} />}
            isDisabled={!authChecked}
            onClick={() => setShowComment(!showComment)}
          >
            {comments ? Object.keys(comments).length : 0}
          </Button>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<BiBookmark size={20} />}
            isDisabled={!authChecked}
          >
            Save
          </Button>
        </CardFooter>
        {showComment && <CommentSection {...props} />}
      </Card>
    </Flex>
  );
}

export default CardPostItem;
