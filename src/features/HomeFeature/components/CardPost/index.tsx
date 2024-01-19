import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiSave, BiBookmark } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { IPost } from "../AddPost";
import { db } from "../../../../firebase";
import CardPostItem from "./CardPostItem";
import { postActions, PostsReducer, postsStates } from "../../../../context/PostReducer";
import { TbMoodAnnoyed } from "react-icons/tb";
import { AuthContext } from "../../../../context/AppContext";
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
interface IProps {
  trigger?: boolean
  filteredPosts?: IPost[]
}
function CardPost(props: IProps) {

  const [loading, setLoading] = useState(true)
  const donorCollectionRef = collection(db, 'donors');
  const { SUBMIT_POST } = postActions;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const triggerContext = useContext<any>(AuthContext)
  
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(query(donorCollectionRef, orderBy('publish_date', 'desc')));

        if (data.docs.length > 0) {
          const donorData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as IPost);
          dispatch({
            type: SUBMIT_POST,
            posts: donorData,
          });
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [triggerContext.trigger]);

  const POSTS = props.filteredPosts ? props.filteredPosts : state?.posts

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

  if (POSTS.length === 0) {
    return (
      <>
        <Flex justifyContent="center" alignItems={'center'} fontSize={'25'} my='2'>
          <TbMoodAnnoyed />

          <Text size={'lg'}>
            No posts present...
          </Text>
        </Flex>
      </>
    )
  }
  return (
    <>
      {
        POSTS.map((post: IPost) => (
          <CardPostItem key={post.id}  {...post} />
        ))
      }
      {/* {filteredPosts
        ? filteredPosts.map((post: IPost) => (
          <CardPostItem key={post.id} {...post} />
        ))
        : state?.posts.map((post: IPost) => <CardPostItem key={post.id} {...post} />)} */}
    </>
  );


}


export default React.memo(CardPost)