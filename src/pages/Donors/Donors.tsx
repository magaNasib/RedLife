import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Bg from "./../../assets/donorBg.jpg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPost } from "../../features/HomeFeature/components/AddPost";
import CardPost from "../../features/HomeFeature/components/CardPost";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Sidebar from "../../components/Sidebar";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { mapOptions } from "../../MapConfig";
import { Library } from "@googlemaps/js-api-loader";

interface IDonors { }
interface IFDonars {
  bloodGroups: string;
  locations: string;
  donorType: string;
}

const Donors: React.FC<IDonors> = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const donorCollectionRef = collection(db, "donors");
  const methods = useForm<IFDonars>({
    defaultValues: {
      bloodGroups: "",
      locations: "",
      donorType: "",
    },
  });
  const libraries: Library[] = ["places"]
  const [searchResult, setSearchResult] = useState<any>("Result: none");
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(donorCollectionRef);

        if (data.docs.length > 0) {
          const donorData = data.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as IPost)
          );
          setPosts(donorData);
          setFilteredPosts(donorData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);
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
   
      const formattedAddress = place.formatted_address;
      methods.setValue('locations', formattedAddress)

    } else {
      alert(t("MessageEnterText"));
    }
  }


  const handleSearch = (data: IFDonars) => {
    const filtered = posts.filter((post) => {
      return (
        (data.bloodGroups === "" || post.bloodGroup === data.bloodGroups) &&
        (data.locations === "" || post.city === data.locations) &&
        (data.donorType === "" || post.type === data.donorType)
      );
    });
    setFilteredPosts(filtered);
  };

  return (
    <>
      <Sidebar />
      <Box
        py="90px"
        backgroundImage={Bg}
        w={"100%"}
        minH={'100vh'}
        backgroundSize="cover"
      >
        <FormProvider {...methods}>
          <Box>
            <Grid
              templateColumns="repeat(3,1fr)"
              gap="24px"
              width={"60%"}
              margin={"0px auto"}
              mb="60px"
            >
              <GridItem colSpan={4}>
                <Heading
                  color={"#FFFF"}
                  as="h1"
                  size="lg"
                  textAlign={"center"}
                  pt="50px"
                  pb="20px"
                >
                  {t("DonorHeader")}
                </Heading>
              </GridItem>
              <GridItem colSpan={4}>
                <Heading
                  color={"white"}
                  as="p"
                  size="lg"
                  textAlign={"center"}
                  pb="30px"
                >
                  {t("DonorHeading")}
                </Heading>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl isInvalid={!!methods.formState.errors.bloodGroups}>
                  <Controller
                    control={methods.control}
                    rules={{
                      required: "This field is required",
                    }}
                    name="bloodGroups"
                    render={({ field }) => (
                      <Select
                      defaultValue={'All Blood Group'}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        bgColor={"#ff4d4d"}
                        color={"white"}
                        border={"none"}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          fontWeight: "bold",
                        }}
                      >
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"All Blood Group"}
                          
                        >
                          {t("BloodSelector")}
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"A+"}
                        >
                          A+
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"B+"}
                        >
                          B+
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"AB+"}
                        >
                          AB+
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"O+"}
                        >
                          O+
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"O-"}
                        >
                          O-
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"AB-"}
                        >
                          AB-
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"B-"}
                        >
                          B-
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"A-"}
                        >
                          A-
                        </option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage color={"red"} fontSize={"14px"}>
                    {methods.formState.errors.bloodGroups?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                {isLoaded && <FormControl isInvalid={!!methods.formState.errors.locations}>
                  <Controller
                    control={methods.control}
                    rules={{
                      required: "This field is required",
                    }}
                    name="locations"
                    render={({ field }) => (
                      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                        <Input

                          bgColor={"#ff4d4d"}
                          color={"white"}
                          border={"none"}
                          style={{
                            outline: "none",
                            boxShadow: "none",
                            fontWeight: "bold",
                          }}
                          _placeholder={{
                            color:'white'
                          }}
                          type="text"
                          placeholder={t('CitySelector')}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </Autocomplete>
                    )}
                  />
                  <FormErrorMessage color={"red"} fontSize={"14px"}>
                    {methods.formState.errors.locations?.message}
                  </FormErrorMessage>
                </FormControl>}
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl isInvalid={!!methods.formState.errors.donorType}>
                  <Controller
                    control={methods.control}
                    rules={{
                      required: "This field is required",
                    }}
                    name="donorType"
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        bgColor={"#ff4d4d"}
                        color={"white"}
                        border={"none"}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          fontWeight: "bold",
                        }}
                      >
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"All Blood Group"}
                          selected
                        >
                          {t("DonorTypeSelector")}
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Donor"}
                        >
                          {t("DonorType1")}
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Acceptor"}
                        >
                          {t("DonorType2")}
                        </option>
                      </Select>
                    )}
                  />

                  <FormErrorMessage color={"red"} fontSize={"14px"}>
                    {methods.formState.errors.locations?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <Button
                  type="button"
                  bgColor={"#ff4d4d"}
                  color={"white"}
                  onClick={methods.handleSubmit(handleSearch)}
                >
                  {t("SearchBtn")}
                </Button>
              </GridItem>
            </Grid>
          </Box>
        </FormProvider>
        <CardPost filteredPosts={filteredPosts} />
      </Box>
    </>
  );
};

export default Donors;
