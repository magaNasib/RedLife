import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    Heading,
    IconButton,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    useToast,
    Link,
} from "@chakra-ui/react";
import { BiLike, BiBookmark, BiSolidLike, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db, onAuthStateChanged } from "../../../firebase";
import { FaEdit, FaCopy } from "react-icons/fa";
import { MdDelete, MdReport } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { useJsApiLoader } from "@react-google-maps/api";
import { PhoneIcon } from "@chakra-ui/icons";
import { GoLocation } from "react-icons/go";
import { FacebookIcon, FacebookShareButton, FacebookShareCount, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { mapOptions } from "../../../MapConfig";
import { AuthContext } from "../../../context/AppContext";
import CommentSection from "../../HomeFeature/components/Comments/CommentsSection";
import { IPost } from "../../HomeFeature/components/AddPost";
import MyLocationPicker from "../../../components/LocationPicker";
import { CiLock } from "react-icons/ci";



function PostItem(props: IPost, key: number) {

    const { id, phone, likes, publish_date, comments, saved, type, description, city, bloodGroup, fullName, photoURL, coordinates, uid } = props
    const date = new Date(publish_date?.seconds * 1000 + publish_date?.nanoseconds / 1e6);

    const navigate = useNavigate();
    const triggerContext = useContext<any>(AuthContext)
    const toast = useToast()

    const [authChecked, setAuthChecked] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: mapOptions.googleMapApiKey,
        googleMapsApiKey: mapOptions.googleMapApiKey
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, () => {
            setAuthChecked(true);
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    let actions = {
        isILiked: false,
        isISaved: false
    };

    if (auth.currentUser) {
        actions.isILiked = likes.includes(auth.currentUser.uid);
        actions.isISaved = saved.includes(auth.currentUser.uid);
    } else {
        actions.isILiked = false;
        actions.isISaved = false;
    }


    const addLikeHandler = () => {
        if (!auth.currentUser) return navigate('/login')
        const userDocRef = doc(db, 'donors', id);

        const updateData = {
            ['likes']: actions.isILiked ? arrayRemove(auth.currentUser.uid) : arrayUnion(auth.currentUser.uid)
        };
        updateDoc(userDocRef, updateData)
            .then(() => {
                console.log('Document successfully updated!');
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });
        triggerContext.setTrigger((curr: boolean) => !curr)
    }

    const saveClickHandler = () => {
        if (!auth.currentUser) return navigate('/login')
        const userDocRef = doc(db, 'donors', id);
        const updateData = {
            ['saved']: actions.isISaved ? arrayRemove(auth.currentUser.uid) : arrayUnion(auth.currentUser.uid)
        };
        triggerContext.setTrigger((curr: boolean) => !curr)

        updateDoc(userDocRef, updateData)
            .then(() => {
                console.log('Document successfully updated!');
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });
    }


    return (

        <Flex justifyContent="center" w={'100%'} my='2' key={key}>
            <Card w="5xl" mx={'auto'}>
                <CardHeader>
                    <Flex gap="4">
                        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap" justifyContent={'space-between'}>
                            <Flex alignItems={'center'} gap={'2'}>
                                <Avatar
                                    name={fullName}
                                    src={photoURL}
                                    borderColor="green.500"
                                    borderWidth="2px"
                                    bg={'black'}
                                />
                                <div>

                                    <Heading size="md">{fullName}</Heading>
                                </div>

                            </Flex>
                            <Flex alignItems={'center'} gap={'2'}>
                                <Flex>
                                    <Text
                                        bg={type === "Acceptor" ? "green.500" : "red.500"}
                                        color="white"
                                        p="1"
                                        borderRadius="md"
                                        h="35px"
                                        w="110px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >{type} {bloodGroup}</Text>
                                    <Text ml="5px"></Text>
                                </Flex>
                                <Popover>
                                    <PopoverTrigger>
                                        <IconButton
                                            variant="ghost"
                                            colorScheme="gray"
                                            aria-label="See menu"
                                            icon={<BsThreeDotsVertical />}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent borderRadius={'15px'} bgColor={'gray.50'} w={'140px'}>
                                        {
                                            auth?.currentUser?.uid === uid &&
                                            <>
                                                <PopoverHeader cursor={'pointer'}>
                                                    <Flex alignItems={'center'}>
                                                        <FaEdit /><Text ml={'10px'} fontSize={'18px'}>Edit</Text>
                                                    </Flex>
                                                </PopoverHeader>
                                                <PopoverHeader cursor={'pointer'}>
                                                    <Flex alignItems={'center'}>
                                                        <MdDelete /><Text ml={'10px'} fontSize={'18px'}>Delete</Text>
                                                    </Flex>
                                                </PopoverHeader>
                                            </>
                                        }
                                        <PopoverHeader cursor={'pointer'}>
                                            <Flex alignItems={'center'}>
                                                <MdReport /><Text ml={'10px'} fontSize={'18px'}>Report</Text>
                                            </Flex></PopoverHeader>
                                        <PopoverHeader cursor={'pointer'}>
                                            <Flex alignItems={'center'}>
                                                <CopyToClipboard text={window.location.href} onCopy={() => {
                                                    toast({
                                                        title: "Copied the url",
                                                        status: 'info',
                                                        duration: 1000,
                                                        isClosable: true,
                                                        position: "top-right",
                                                    });
                                                }}>
                                                    <Flex gap={'10px'} alignItems={'center'} fontSize={'18px'}><FaCopy />Copy URL</Flex>
                                                </CopyToClipboard>
                                            </Flex>
                                        </PopoverHeader>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                            <Box w={'full'}>
                                <div>
                                    <Flex justifyContent={'space-between'}>
                                        <Link href={"tel:"+phone} fontWeight={'500'} color={'gray'} display={'block'}>{<PhoneIcon />} {phone}</Link>

                                        <Text color={'gray'} display={'flex'} alignItems={'center'} gap={'1'} mt={'2'}>
                                            {String(date)}
                                        </Text>
                                    </Flex>
                                    <Text color={'gray'} fontWeight={'bold'} display={'flex'} alignItems={'center'} gap={'1'} mt={'2'}>
                                        {<GoLocation />} {city}
                                    </Text>
                                </div>
                                <MyLocationPicker isLoaded={isLoaded} coordinates={coordinates} />
                            </Box>

                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                        {description}
                    </Text>
                </CardBody>
                <Divider color={'lightgray'} />
                <CardFooter
                    justify="space-between"
                    flexWrap="wrap"
                    sx={{
                        "& > button": {
                            minW: "136px",
                        },
                    }}
                >
                    <Button flex="2" variant="ghost" leftIcon={actions.isILiked ? <BiSolidLike size={20} color='#166fe5' /> : <BiLike size={20} />} isDisabled={!authChecked} onClick={() => addLikeHandler()}>
                        {likes?.length || '0'}
                    </Button>

                    <Button flex="2" variant="ghost" leftIcon={actions.isISaved ? <FaBookmark size={20} color='#166fe5' /> : <BiBookmark size={20} />} isDisabled={!authChecked} onClick={() => { saveClickHandler() }}>
                        {actions.isISaved ? 'Saved' : 'Save'}
                    </Button>

                    <Popover>
                        <PopoverTrigger>
                            <Button flex="1" variant="ghost" leftIcon={<BiShare size={20} />} >

                            </Button>
                        </PopoverTrigger>
                        <PopoverContent borderRadius={'15px'} bgColor={'gray.50'} w={'auto'} minW={'140px'} p={'2'}>
                            <Flex gap={'2'}>
                                <FacebookShareButton
                                    url={window.location.href + id}
                                    hashtag="#redlife"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={window.location.href + id}
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <WhatsappShareButton
                                    url={window.location.href + id}
                                >
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                                <LinkedinShareButton
                                    url={window.location.href + id}
                                >
                                    <LinkedinIcon size={32} round />
                                </LinkedinShareButton>
                            </Flex>
                        </PopoverContent>
                    </Popover>


                </CardFooter>
                <CommentSection  {...props} />

            </Card>
        </Flex>


    )


}

export default PostItem;