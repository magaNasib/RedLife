import { Box, Flex } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar"
import PostFeature from "../../features/PostFeature"
import Blogs from "../Blogs"

const Post = () => {

    return (
        <>
            <Sidebar />
            <Flex justifyContent="center" bgColor="#F1F2F5" minH='100vh' ml={'100px'}>
                <Box m="0 auto" py={'100'} >
                    <PostFeature />
                </Box>
            </Flex>

        </>
    )
}

export default Post