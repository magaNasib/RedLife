import { Flex, SkeletonCircle, SkeletonText,Box } from "@chakra-ui/react"

const PostSkeleton = () => {
    return (
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
}
export default PostSkeleton