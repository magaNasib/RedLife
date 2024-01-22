import React from "react";
import { useParams } from "react-router-dom";
import { Container, VStack, Heading, Text, Image } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { useTranslation } from "react-i18next";


const InfoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {t} = useTranslation();
  const donor = {
    id: 1,
    imageUrl:
      "https://media.istockphoto.com/id/1352107081/photo/world-blood-donor-day-blood-donation-blood-donor-with-bandage-after-giving-blood.jpg?s=612x612&w=0&k=20&c=X0yE4G5ZOx11VEoZgVo4FFGdepWF-qekKqBdzKJoP8c=",
    heading: "Heading 1",
    description:
      t("InfopageDescription"),
    createdAt: t("InfopageDate"),
    quantityOfBlood: 2,
  };

  return (
    <>
      <Sidebar />
      <VStack spacing={8} align="stretch" bg="#F1F2F5" h="100vh">
        <Container
          mt={10}
          maxW="container.sm"
          color="white"
          padding={8}
          borderRadius="md"
        >
          <Heading as="h2" size="lg" color={"black"} mt="90px">
            {t("InfopageHeading")}: {donor.id}
          </Heading>
          <Text color={"black"} mb={3} fontSize={22} textColor={"#6B6B6B"}>
            {donor.description}
          </Text>
          <Image
            src={donor.imageUrl}
            alt="Donor Avatar"
            borderRadius="sm"
            height={400}
            width={"100%"}
          />
          {/* <Heading as="h3" size="md" mt={4} color={"black"}>
          {donor.heading}
        </Heading> */}
          <Text
            color="black"
            fontSize="xl"
            mt={3}
            display={"flex"}
            justifyContent={"space-between"}
          >
            {t("InfopageQuantity")}: {donor.quantityOfBlood}
            <Text fontSize={16} textColor={"#6B6B6B"}>
              {donor.createdAt}
            </Text>
          </Text>
        </Container>
      </VStack>
    </>
  );
};

export default InfoDetails;
