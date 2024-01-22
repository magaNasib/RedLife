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
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { IPost } from "../AddPost";
import { db } from "../../../../firebase";
import CardPostItem from "./CardPostItem";
import { postActions, PostsReducer, postsStates } from "../../../../context/PostReducer";
import { TbMoodAnnoyed } from "react-icons/tb";
import { AuthContext } from "../../../../context/AppContext";
import PostSkeleton from "../../../../components/PostSkeleton";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();
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
          const donorData = await Promise.all(data.docs.map(async (doc) => {
            // const myUid = { ...doc.data() }.uid;

         
            const mergedData = { ...doc.data(), id: doc.id };
            return mergedData as IPost;

          }));


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

  if (loading) return <PostSkeleton />

  if (POSTS.length === 0) {
    return (
      <>
        <Flex justifyContent="center" alignItems={'center'} fontSize={'25'} my='2'>
          <TbMoodAnnoyed />

          <Text size={'lg'}>
            {t("IfNotCards")}
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