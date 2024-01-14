import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { IPost } from "../AddPost";
import { db } from "../../../../firebase";
import CommentSection from "../Comments/CommentsSection";
import { FaEdit,FaCopy } from "react-icons/fa";
import { MdDelete,MdReport } from "react-icons/md";
import CardPostItem from "./CardPostItem";

// interface IDonors {
//   bloodGroup: string;
//   city: string;
//   description: string;
//   phone: string;
//   publish_date: string;
//   type: string;
//   uid: string;
//   id: string;
//   fullName: string
//   photoURL: string
// }

function CardPost({ filteredPosts }: { filteredPosts?: IPost[] }) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true)
  const donorCollectionRef = collection(db, 'donors');


  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(donorCollectionRef);

        if (data.docs.length > 0) {
          const donorData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as IPost);
          setPosts(donorData);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      finally {
        setLoading(false)
      }
    };

    getPosts();
  }, []);

  if (loading) return (
    <>
    <Flex justifyContent="center" my='2'>
      <Box padding='6' boxShadow='lg' bg='white' w={'2xl'}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
    </Flex>
    <Flex justifyContent="center" my='2'>
      <Box padding='6' boxShadow='lg' bg='white' w={'2xl'}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
    </Flex>
  </>
  )

  if (posts.length === 0) {
    return (
      <>
        <Flex justifyContent="center" my='2'>
          <Text>
            No posts present...
          </Text>
        </Flex>
      </>
    )
  }
return (
  <>
    {filteredPosts && filteredPosts.length > 0
      ? filteredPosts.map((post: IPost) => (
          <CardPostItem key={post.id} {...post} />
        ))
      : posts.map((post: IPost) => <CardPostItem key={post.id} {...post} />)}
  </>
);


}

export default CardPost;
