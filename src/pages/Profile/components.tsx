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
import { collection, doc, getDocs, orderBy, query, where } from "@firebase/firestore";
import { IPost } from "../../features/HomeFeature/components/AddPost";
import CardPost from "../../features/HomeFeature/components/CardPost";
import { AuthContext } from "../../context/AppContext";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { getDoc, setDoc, updateDoc } from "firebase/firestore";

export const Banner: React.FC<IPost> = ({ id, uid,photoURL }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [file, setFile] = useState("");
  // const [data, setData] = useState({});
  const [myPosts, setMyPost] = useState<IPost[]>([]);


  const navigate = useNavigate();

  const user = auth?.currentUser

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, 'images/' + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      // const donorCollectionRef = collection(db, "donors");


      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            // setMyPost((prev) => ({ ...prev, img: downloadURL }));
            // const userDocRef = doc(db, 'users',user?.uid || ''); 
            // updateDoc(userDocRef, { profilePhotoURL: downloadURL });

            setDoc(doc(db, 'users', user?.photoURL), { profilePhotoURL: downloadURL })

          });
        }
      );

    }
    file && uploadFile();
  }, [file, myPosts, user?.photoURL, user?.uid])

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'users', user?.photoURL || '');
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.profilePhotoURL) {
          setMyPost((prev) => ({ ...prev, img: userData.profilePhotoURL }));

          localStorage.setItem('profilePhotoURL', userData.profilePhotoURL);
        }
      }
    };

    fetchUserData();
  }, [user?.uid]);

  useEffect(() => {
    const storedURL = localStorage.getItem('profilePhotoURL');
    if (storedURL) {
      setMyPost((prev) => ({ ...prev, img: storedURL }));
    }
  }, []);



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
            // src={user?.photoURL || "path_to_image"}
            src={file ? URL.createObjectURL(file) : 'path_to_image'}
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
          {/* Upload image button */}
          <Flex justifyContent={'center'} alignItems={'center'} border={'2px solid white'} borderRadius={'5px'} width={'180px'} height={'40px'}>
            <MdOutlineDriveFolderUpload color={'white'} />
            <FormLabel htmlFor="file" color={'white'} pt={'8px'}>
              Image
            </FormLabel>
            <Input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
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
          My posts
        </Tab>
        <Tab>
          {<BiBookmark />}
          Saved posts
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

