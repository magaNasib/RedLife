
import {  Button,Stack, Wrap, WrapItem } from '@chakra-ui/react'

export const Hashtags = () => {

    return (
        <Stack direction='column' mt='10'>
            <Wrap spacing={3}>
                <WrapItem>
                    <Button colorScheme='gray' size='sm'>#Blood</Button>
                </WrapItem>
                <WrapItem>
                    <Button colorScheme='red' size='sm'>#Emergency</Button>
                </WrapItem> 
                <WrapItem>
                    <Button colorScheme='green' size='sm'>#Donation</Button>
                </WrapItem> 
                <WrapItem>
                    <Button colorScheme='blue' size='sm'>#Donor</Button>
                </WrapItem> 
                <WrapItem>
                    <Button colorScheme='green' size='sm'>#Donation</Button>
                </WrapItem> 
                <WrapItem>
                    <Button colorScheme='blue' size='sm'>#Donor</Button>
                </WrapItem> 
                <WrapItem>
                    <Button colorScheme='green' size='sm'>#Donation</Button>
                </WrapItem> 
                <WrapItem>
                    <Button colorScheme='blue' size='sm'>#Donor</Button>
                </WrapItem> 
            </Wrap>
        </Stack>
    )

}