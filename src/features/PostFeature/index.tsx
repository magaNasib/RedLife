import { Box, Flex, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import { getDocs, query, orderBy, collection, where, doc, getDoc } from "firebase/firestore"
import { SetStateAction, useContext, useEffect, useState } from "react"
import { IPost } from "../HomeFeature/components/AddPost"
import { db } from "../../firebase"
import { TbMoodAnnoyed } from "react-icons/tb"
import PostSkeleton from "../../components/PostSkeleton"
import CardPostItem from "../HomeFeature/components/CardPost/CardPostItem"
import PostItem from "./components/PostItem"
import { AuthContext } from "../../context/AppContext"

const PostFeature = () => {
    const triggerContext = useContext<any>(AuthContext)

    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<IPost>()
    const donorCollectionRef = collection(db, 'donors');
    useEffect(() => {
        const getPosts = async () => {
            try {
                const collectionSnapShot = await doc(donorCollectionRef, id);

                await getDoc(collectionSnapShot)
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const specificDonorData = docSnapshot.data() as IPost;
                            setData({...specificDonorData,id:id || ''})
                        } else {
                            console.log('Document does not exist');
                        }
                    })

            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, [id,triggerContext.trigger]);

    
    if (loading) return <PostSkeleton />
    
    if (!data) {
        return (
            <>
                <Flex justifyContent="center" alignItems={'center'} fontSize={'25'} my='2'>
                    <TbMoodAnnoyed />

                    <Text size={'lg'}>
                        The Post Not Found...
                    </Text>
                </Flex>
            </>
        )
    }

    return (
        <>
        <PostItem {...data} key={id}/>
        </>
    )
}

export default PostFeature