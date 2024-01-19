import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Heading,
  Select,
} from "@chakra-ui/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Bg from "./../../assets/donorBg.jpg";
import { useEffect, useState } from "react";
import { IPost } from "../../features/HomeFeature/components/AddPost";
import CardPost from "../../features/HomeFeature/components/CardPost";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Sidebar from "../../components/Sidebar";
import PostSkeleton from "../../components/PostSkeleton";
interface IDonors { }
interface IFDonars {
  bloodGroups: string;
  locations: string;
  donorType: string;
}

const Donors: React.FC<IDonors> = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const donorCollectionRef = collection(db, "donors");

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
  const methods = useForm<IFDonars>({
    defaultValues: {
      bloodGroups: "",
      locations: "",
      donorType: "",
    },
  });
  const handleSearch = (data: IFDonars) => {
    console.log("Search data:", data);
    const filtered = posts.filter((post) => {
      return (
        (data.bloodGroups === "" || post.bloodGroup === data.bloodGroups) &&
        (data.locations === "" || post.city === data.locations) &&
        (data.donorType === "" || post.type === data.donorType)
      );
    });
    console.log("Filtered posts:", filtered);
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
                  Search a Donor
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
                  Your Donation Can Make Someone’s Life Better
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
                          All Blood Group
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
                <FormControl isInvalid={!!methods.formState.errors.locations}>
                  <Controller
                    control={methods.control}
                    rules={{
                      required: "This field is required",
                    }}
                    name="locations"
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
                          Select A District
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Baku"}
                        >
                          Baku
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Ganja"}
                        >
                          Ganja
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Laankaran"}
                        >
                          Lankaran
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Gakh"}
                        >
                          Gakh
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Quba"}
                        >
                          Quba
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Oghuz"}
                        >
                          Oghuz
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Shirvan"}
                        >
                          Shirvan
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
                          Donor Type
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Donor"}
                        >
                          Donor
                        </option>
                        <option
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          value={"Acceptor"}
                        >
                          Acceptor
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
                  Search
                </Button>
              </GridItem>
            </Grid>
          </Box>
        </FormProvider>
        {
          loading && <PostSkeleton/>
        } 
        {
          !loading && <CardPost filteredPosts={filteredPosts} />

        }
      </Box>
    </>
  );
};

export default Donors;
