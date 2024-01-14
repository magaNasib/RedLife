import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  Avatar,
  Grid, GridItem,
  Tab, Tabs, TabList, TabPanel, TabPanels, useColorModeValue,
} from '@chakra-ui/react';
// import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { AtSignIcon, EditIcon, LockIcon, StarIcon } from '@chakra-ui/icons'
import { MyPostsCards } from './Cards/MyPostCard';
import { SavedPostsCards } from './Cards/SavedPostCards';
import { EditProfileModal } from './EditProfileModal';
import { useNavigate } from 'react-router';


export const Banner = () => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate()
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

 

  return (
    <Box
      position="relative"
      w="70vw"
      h="40vh"
      bg="gray.200"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="xl"
      boxShadow="lg"
      margin="32px auto"
      backgroundImage="https://images.jdmagicbox.com/quickquotes/listicle/listicle_1686313358901_v7h62_1040x500.jpg"
      backgroundSize="cover"
      backgroundPosition="center"
      boxSizing="border-box"
    >

      <Grid templateColumns='1fr 2fr 2fr'
        gap={6}
        w="65vw"
        h="25vh"
        margin="0 auto"
      >
        <GridItem display="flex" justifyContent="start" alignItems="center">
          <Avatar size='2xl' name='Ali Veliyev' src="path_to_image" marginLeft="32px" />{' '}
        </GridItem>
        <GridItem w='100%' display="flex" flexDirection="column" justifyContent="center" alignItems="start">
          <Text fontSize="xl" fontWeight="bold" color="white">Name: Ali Veliyev</Text>
          <Text fontSize="lg" color="white">Age: 32</Text>
          <Text fontSize="lg" color="white">Email: example@mail.com</Text>
        </GridItem>
        <GridItem w='100%' display="flex" flexDirection="column" gap="12px" justifyContent="start" margin="40px 0" >
          <Button colorScheme="whiteAlpha" variant="outline" borderColor="white" color="white" w="180px" onClick={() => setIsEditModalOpen(true)}>
            <EditIcon />Edit
          </Button>
          <Button colorScheme="whiteAlpha" variant="outline" borderColor="white" color="white" w="180px" onClick={()=>navigate('/profile/changepassword')}>
            <LockIcon />Change password
          </Button>
          <Button colorScheme="whiteAlpha" variant="outline" borderColor="white" color="white" w="180px" onClick={()=>navigate('/logout')}>
           Logout
          </Button>
        </GridItem>
      </Grid>
      <EditProfileModal isOpen={isEditModalOpen} onClose={handleEditModalClose} />
    </Box>
  );
};

export function MainTabs() {
  const colors = useColorModeValue(
    ['red.50', 'teal.50', 'blue.50'],
    ['red.900', 'teal.900', 'blue.900'],
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]
  return (
    <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
      <TabList>
        <Tab><AtSignIcon />My posts</Tab>
        <Tab><StarIcon />Saved posts</Tab>
      </TabList>
      <TabPanels p='2rem'>
        <TabPanel>
          <MyPostsContent />
        </TabPanel>
        <TabPanel>
          <SavedPostsContent />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

function MyPostsContent() {
  return (
    <div>
      <MyPostsCards />
      <MyPostsCards />
      <MyPostsCards />
    </div>
  );
}

function SavedPostsContent() {
  return (
    <div>
      <SavedPostsCards />
      <SavedPostsCards />
      <SavedPostsCards />
    </div>
  );
}