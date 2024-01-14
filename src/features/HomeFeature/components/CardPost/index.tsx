import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { IPost } from "../AddPost";
import { db } from "../../../../firebase";
import CardPostItem from "./CardPostItem";
import { postActions, PostsReducer, postsStates } from "../../../../context/PostReducer";

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
interface IProps{
  trigger:boolean
} 
function CardPost(props:IProps) {
  
  const [loading, setLoading] = useState(true)
  const donorCollectionRef = collection(db, 'donors');
  const { SUBMIT_POST } = postActions;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);


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
  }, [props.trigger]);

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

  if (state?.posts.length === 0) {
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
      {state?.posts?.map((post: IPost, key: number) => {
        return (

          <CardPostItem {...post} key={key} />

        )
      })}

    </>
  )

}


export default CardPost