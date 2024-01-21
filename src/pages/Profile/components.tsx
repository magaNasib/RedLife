import React, { useContext, useEffect, useState } from "react";
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
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import { AtSignIcon, EditIcon, LockIcon } from "@chakra-ui/icons";
import { BiBookmark } from "react-icons/bi";
import { EditProfileModal } from "./EditProfileModal";
import { useNavigate } from "react-router";
import profilImg from "../../assets/worldBlood.jpg";
import { auth, db } from "../../firebase";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import CardPost from "../../features/HomeFeature/components/CardPost";
import { AuthContext } from "../../context/AppContext";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { User, updateProfile } from "firebase/auth";
import { IPost } from "../../features/HomeFeature/components/AddPost";
import { doc, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export const Banner = () => { 
  const {t} = useTranslation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [myPosts, setMyPost] = useState<IPost[]>([]);
  
  const navigate = useNavigate();
  const user : User | null = auth?.currentUser
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const storedURL = localStorage.getItem('profilePhotoURL');
    if (storedURL) {
      setMyPost((prev) => ({ ...prev, img: storedURL }));
    } else if (user && user.photoURL) {
      setMyPost((prev) => ({ ...prev, img: user.photoURL }));
    }
  }, [user]);

  useEffect(() => {
    const uploadFile = async () => {
      if (file) {

        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'images/' + name);

        try {
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
                default:
                  break;
              }
            },
            (error) => {
              switch (error.code) {
                case 'storage/unauthorized':
                  alert("User doesn't have permission to access the object")
                  break;
                case 'storage/canceled':
                  alert("User canceled the upload")
                  break;
                case 'storage/unknown':
                  alert("Unknown error occurred, inspect error.serverResponse")
                  break;
              }
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                // setMyPost((prev) => ({ ...prev, img: downloadURL }));
                // const userDocRef = doc(db, 'users',user?.uid || ''); 
                // updateDoc(userDocRef, { profilePhotoURL: downloadURL });

                await updateProfile(user as User,{photoURL:downloadURL})

                localStorage.setItem('profilePhotoURL', downloadURL);
              });
            }
          );
        } catch (error) {
          console.error('Error uploading file:', error);
        }

      }

    }
    file && uploadFile();
  }, [file,user])
  console.log(user);

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
        minH="25vh"
        margin="0 auto"
      >
        <GridItem display="flex" alignItems="center">
          <Avatar
            size="2xl"
            name={user?.displayName || ''}
            // src={user?.photoURL || 'path_to_image'}
            // src={file ? URL.createObjectURL(file) : photoURL || 'path_to_image'}
            src={user?.photoURL || (file ? URL.createObjectURL(file) : 'path_to_image')}
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
          {t("NameProfPage")}: {user?.displayName}
          </Text>
          <Text fontSize="lg" color="white">
          {t("EmailProfPage")}: {user?.email}
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
            {t("EditProfPage")}
          </Button>
          {/* Upload image button */}
          <Flex justifyContent={'center'} alignItems={'center'} border={'2px solid white'} borderRadius={'5px'} width={'180px'} height={'40px'}>
            <MdOutlineDriveFolderUpload color={'white'} />
            <FormLabel htmlFor="file" color={'white'} pt={'8px'}>
            {t("İmageProfPage")}
            </FormLabel>
            <Input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              display={'none'}
            />
          </Flex>

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
            {t("ChangePasswordProfPage")}
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
            {t("LogoutProfPage")}
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
  
  const {t} = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const [myPosts, setMyPost] = useState<IPost[]>([]);
  const [savedPosts, setSavedPosts] = useState<IPost[]>([]);
  const donorCollectionRef = collection(db, "donors");
  const triggerContext = useContext<any>(AuthContext)

  const user = auth?.currentUser
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(query(donorCollectionRef, orderBy('publish_date', 'desc')));

        if (data.docs.length > 0) {
          const donorData = data.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as IPost)
          );
          setMyPost(donorData.filter((data) => user?.uid === data.uid));
          setSavedPosts(donorData.filter((data) => data.saved.includes(user?.uid || '')));

        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, [triggerContext.trigger]);
  return (
    <Tabs onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>
          <AtSignIcon mr={'1'} />
          {t("MyPostsProfPage")}
        </Tab>
        <Tab>
        {<BiBookmark />} 
        {t("SavedPostsProfPage")}
        </Tab>
      </TabList>
      <TabPanels p="2rem">
        <TabPanel>
          <div>
            <CardPost filteredPosts={myPosts} />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <CardPost filteredPosts={savedPosts} />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

