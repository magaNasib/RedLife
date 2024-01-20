import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";
import { IPost } from ".";
import { mapOptions } from "../../../../MapConfig";
import { useContext, useEffect, useState } from "react";
import { Library } from "@googlemaps/js-api-loader";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "@firebase/firestore";
import { db, auth } from "../../../../firebase";
import { AuthContext } from "../../../../context/AppContext";
import { useToast } from "@chakra-ui/toast";

const AddPostForm = ({ setShow, mode, id = ' ' }: { setShow: (a: boolean) => void; mode: 'add' | 'edit', id?: string }) => {
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<any>("Result: none");
    const triggerContext = useContext<any>(AuthContext)
    const isEdit = mode === 'edit'
    const toast = useToast();
    const libraries: Library[] = ["places"]
    const methods = useForm<IPost>({
        defaultValues: {
            phone: "",
            description: "",
            city: ''
        },
    });
    const donorCollectionRef = collection(db, "donors");
    const donorCollectionRef2 = doc(collection(db, "donors"), id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const donorDoc = await getDoc(donorCollectionRef2);
                if (donorDoc.exists()) {
                    const donorData = donorDoc.data() as IPost;
                    Object.entries(donorData).forEach(([key, value]) => {
                        methods.setValue(key as keyof IPost, value);
                    })
                    methods.setValue('phone',donorData.phone.substring(4)) 
                } else {
                    console.log("No such document!");
                }

            } catch (error) {
                console.error("Error fetching donor data:", error);
            }
        };

        isEdit && fetchData();

    }, [id, mode])



    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapOptions.googleMapApiKey,
        libraries: libraries
    });
    function onLoad(autocomplete: any) {
        
        setSearchResult(autocomplete);
    }


    function onPlaceChanged() {
        if (searchResult != null) {
            const place = searchResult.getPlace();
            let coordinates = {
                lat: place?.geometry?.location?.lat(),
                lng: place?.geometry?.location?.lng()
            }
            console.log(place);
            console.log(coordinates);

            const formattedAddress = place.formatted_address;
            methods.setValue('city', formattedAddress)
            methods.setValue('coordinates', coordinates)

        } else {
            alert(t("MessageEnterText"));
        }
    }

    const handleEdit = methods.handleSubmit(async (data:IPost) => {
        data.phone = '+994' + data.phone

        setLoading(true);
        try {

            await updateDoc(donorCollectionRef2, { ...data });
            methods.reset();
            triggerContext.setTrigger((curr: boolean) => !curr)
            setShow(false)
            toast({
                title: 'Saved successfully',
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }


    })
    const handleSubmit = methods.handleSubmit(async (data: IPost) => {
        data.phone = '+994' + data.phone
        setLoading(true);

        try {
            const sendingData = {
                ...data,
                publish_date: new Date(),
                uid: auth.currentUser?.uid,
                fullName: auth.currentUser?.displayName,
                avatar: auth.currentUser?.photoURL,
                likes: [],
                comments: [],
                saved: []
            };
            await addDoc(donorCollectionRef, sendingData);
            setShow(false);
            methods.reset();
            triggerContext.setTrigger((curr: boolean) => !curr)

            toast({
                title: t("AddPostSuccesMessage"),
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    });
    return (
        <>
            <FormControl isInvalid={!!methods.formState.errors.bloodGroup}>
                <Controller
                    control={methods.control}
                    name="bloodGroup"
                    rules={{
                        required: t("ValidationMessage"),
                    }}
                    render={({ field }) => (
                        <>
                            <Select
                                {...field}
                                name="bloodGrp"
                                placeholder={t("AddPostBloodSelector")}
                                onChange={field.onChange}
                                value={field.value}
                            >
                                <option value="B+">B+</option>
                                <option value="A+">A+</option>
                                <option value="AB+">AB+</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB-">AB-</option>
                                <option value="B-">B-</option>
                                <option value="A-">A-</option>
                            </Select>
                        </>
                    )}
                />
                <FormErrorMessage>
                    {methods.formState.errors?.bloodGroup?.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!methods.formState.errors.type}>
                <Controller
                    control={methods.control}
                    name="type"
                    rules={{
                        required: t("ValidationMessage"),
                    }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            name="typeOfUser"
                            placeholder={t("AddPostDonorSelector")}
                        >
                            <option value="Donor">{t("AddPostDonor")}</option>
                            <option value="Acceptor">{t("AddPostAcceptor")}</option>
                        </Select>
                    )}
                />

                <FormErrorMessage>
                    {methods.formState.errors?.type?.message}
                </FormErrorMessage>
            </FormControl>

            {isLoaded && <FormControl isInvalid={!!methods.formState.errors.city}>
                <Controller
                    control={methods.control}
                    name="city"
                    rules={{
                        required: t("ValidationMessage"),
                    }}
                    render={({ field }) => (
                        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                            <Input
                                type="text"
                                placeholder={t("AddPostCitySearch")}
                                onChange={field.onChange}
                                value={field.value}
                            />
                        </Autocomplete>
                    )}
                />

                <FormErrorMessage>
                    {methods.formState.errors?.city?.message}
                </FormErrorMessage>
            </FormControl>}
            <FormControl isInvalid={!!methods.formState.errors.phone}>
                <Controller
                    control={methods.control}
                    name="phone"
                    rules={{
                        required: t("ValidationMessage"),
                        validate: value => {
                            const isNineDigits = /^\d{9}$/.test(value);
                            if (!isNineDigits) {
                                return t("PhoneValidationMessage");
                            }
                            return true;
                        },
                    }}
                    render={({ field }) => (
                        <InputGroup>
                            <InputLeftAddon>+994</InputLeftAddon>
                            <Input
                                {...field}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                type="number"
                                placeholder={t("AddPostPhone")}
                            />
                        </InputGroup>
                    )}
                />

                <FormErrorMessage>
                    {methods.formState.errors?.phone?.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!methods.formState.errors.description}>
                <Controller
                    control={methods.control}
                    name="description"
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            resize={"none"}
                            placeholder={t("AddPostDescription")}
                            size="sm"
                        />
                    )}
                />

                <FormErrorMessage>
                    {methods.formState.errors?.description?.message}
                </FormErrorMessage>
            </FormControl>
            <Button
                border="1px solid"
                borderRadius="35px"
                borderColor="#0C67C3"
                backgroundColor="#FFFF"
                color="#0C67C3"
                _hover={{ bg: "#FFFF", borderColor: "#0C67C3" }}
                onClick={() => {
                    methods.reset();
                    setShow(false);
                }}
            >
                {t("AddPostCancelBtn")}
            </Button>
            {
                !isEdit && <Button
                    border="1px solid"
                    borderRadius="35px"
                    bgColor="#0C67C3"
                    color="#FFFF"
                    _hover={{ bg: "#0C67C3" }}
                    isLoading={loading}
                    onClick={handleSubmit}
                >
                    {t("AddPostPostBtn")}
                </Button>
            }
            {
                isEdit && <Button
                    border="1px solid"
                    borderRadius="35px"
                    bgColor="#0C67C3"
                    color="#FFFF"
                    _hover={{ bg: "#0C67C3" }}
                    isLoading={loading}
                    onClick={handleEdit}
                >
                    Save
                </Button>
            }
        </>
    )
}

export default AddPostForm