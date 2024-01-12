import {
  Box,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Heading,
  Select,
} from "@chakra-ui/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Bg from "./../../assets/donorBg.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface IDonors {}
interface IFDonars {
  bloodGroups: string;
  locations: string;
  donorType: string;
}

interface Donor {
  id: number;
  imageUrl: string;
  heading: string;
  description: string;
  quantityOfBlood: number;
}

const Donors: React.FC<IDonors> = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const methods = useForm<IFDonars>({
    defaultValues: {
      bloodGroups: "",
      locations: "",
      donorType: "",
    },
  });
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://mocki.io/v1/c53fd2b2-fae4-4552-9ea2-8fe1b112b483"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: Donor[] = await response.json();
      setDonors(data); // Set the fetched data to the state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <Box
          w={"100%"}
          backgroundImage={Bg}
          backgroundRepeat="no-repeat"
          py={"20"}
          // bgGradient='linear(to-l, #7928CA, #FF0080)'
        >
          <Grid
            templateColumns="repeat(3,1fr)"
            gap="24px"
            width={"60%"}
            margin={"0px auto"}
          >
            <GridItem colSpan={3}>
              <Heading color={"#ff4d4d"} as="h1" size="lg" textAlign={"center"}>
                Search a Donors
              </Heading>
            </GridItem>
            <GridItem colSpan={3}>
              <Heading color={"white"} as="p" size="lg" textAlign={"center"}>
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
                        value={"Ab+"}
                      >
                        Ab+
                      </option>
                      <option
                        style={{
                          background: "#ff4d4d",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        value={"0+"}
                      >
                        0+
                      </option>
                      <option
                        style={{
                          background: "#ff4d4d",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        value={"0-"}
                      >
                        0-
                      </option>
                      <option
                        style={{
                          background: "#ff4d4d",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        value={"Ab-"}
                      >
                        Ab-
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
                        value={"Oguz"}
                      >
                        Oguz
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
                        value={"All"}
                      >
                        All
                      </option>
                      <option
                        style={{
                          background: "#ff4d4d",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        value={"Eligible"}
                      >
                        Eligible
                      </option>
                    </Select>
                  )}
                />
                <FormErrorMessage color={"red"} fontSize={"14px"}>
                  {methods.formState.errors.locations?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
          <Grid m={"100px auto"}>
            <GridItem colSpan={3}>
              <Heading color={"#ff4d4d"} as="h1" size="lg" textAlign={"center"}>
                Our Blood Donars
              </Heading>
            </GridItem>
            <GridItem colSpan={3}>
              <Heading color={"white"} as="p" size="lg" textAlign={"center"}>
                Find a Blood Donars Contact His Phone Numbers
              </Heading>
            </GridItem>
          </Grid>
        </Box>
      </FormProvider>
      {donors.map((donor) => (
        <Link key={donor.id} to={`/donor-details/${donor.id}`}>
          <Card maxW="sm">
            <CardBody>
              <Image
                src={donor.imageUrl}
                alt="Donor Avatar"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{donor.heading}</Heading>
                <Text>{donor.description}</Text>
                <Text color="blue.600" fontSize="2xl">
                  Quantity of Blood: {donor.quantityOfBlood}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Donors;
