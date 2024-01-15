import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Avatar,
  Grid,
  GridItem,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  useColorModeValue,
} from "@chakra-ui/react";
import { AtSignIcon, EditIcon, LockIcon, StarIcon } from "@chakra-ui/icons";
import { MyPostsCards } from "./Cards/MyPostCard";
import { SavedPostsCards } from "./Cards/SavedPostCards";
import { EditProfileModal } from "./EditProfileModal";
import { useNavigate } from "react-router";
import profilImg from "../../assets/worldBlood.jpg";
import { auth, db } from "../../firebase";
import { collection, doc, getDocs, orderBy, query, where } from "@firebase/firestore";
import { IPost } from "../../features/HomeFeature/components/AddPost";
import CardPost from "../../features/HomeFeature/components/CardPost";

export const Banner = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const user = auth?.currentUser

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Box
      position="relative"
      w="70vw"
      bgImage={profilImg}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="xl"
      boxShadow="lg"
      m="90px auto"
      p="35px"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Grid
        templateColumns="1fr 2fr 2fr"
        gap={3}
        w="65vw"
        h="25vh"
        margin="0 auto"
      >
        <GridItem display="flex" alignItems="center">
          <Avatar
            size="2xl"
            name={user?.displayName || ''}
            src={user?.photoURL || "path_to_image"}
            marginLeft="50px"
          />
        </GridItem>
        <GridItem
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
        >
          <Text fontSize="xl" color="white">
            Name: {user?.displayName}
          </Text>
          <Text fontSize="lg" color="white">
            Email: {user?.email}
          </Text>
        </GridItem>
        <GridItem
          w="100%"
          display="flex"
          flexDirection="column"
          gap="11px"
          justifyContent="start"
          margin="40px 0"
        >
          <Button
            colorScheme="whiteAlpha"
            variant="outline"
            borderColor="white"
            color="white"
            w="180px"
            borderWidth="1px"
            onClick={() => setIsEditModalOpen(true)}
          >
            <EditIcon />
            Edit
          </Button>

          <Button
            colorScheme="whiteAlpha"
            variant="outline"
            borderColor="white"
            color="white"
            w="180px"
            borderWidth="1px"
            onClick={() => navigate("/profile/changepassword")}
          >
            <LockIcon />
            Change password
          </Button>

          <Button
            colorScheme="whiteAlpha"
            variant="outline"
            borderColor="white"
            color="white"
            w="180px"
            borderWidth="1px"
            onClick={() => navigate("/logout")}
          >
            Logout
          </Button>
        </GridItem>
      </Grid>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
      />
    </Box>
  );
};

export function MainTabs() {
  const colors = useColorModeValue(
    ["red.50", "teal.50", "blue.50"],
    ["red.900", "teal.900", "blue.900"]
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
  return (
    <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
      <TabList>
        <Tab>
          <AtSignIcon mr={'1'}/>
          My posts
        </Tab>
        <Tab>
          <StarIcon mr={'1'} />
          Saved posts
        </Tab>
      </TabList>
      <TabPanels p="2rem">
        <TabPanel>
          <MyPostsContent />
        </TabPanel>
        <TabPanel>
          <SavedPostsContent />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function MyPostsContent() {

  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const donorCollectionRef = collection(db, "donors");
  const user = auth?.currentUser
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(query(donorCollectionRef, orderBy('publish_date', 'desc')));
     
        if (data.docs.length > 0) {
          const donorData = data.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as IPost)
          );
          setFilteredPosts(donorData.filter((data) => user?.uid === data.uid));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } 
    };

    getPosts();
  }, []);
  
  return (
    <div>
      <CardPost filteredPosts={filteredPosts} />
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
