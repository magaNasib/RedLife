import React from 'react';
import { ChakraProvider, GridItem, Grid} from '@chakra-ui/react';
import { UserProfile, DonationHistory, DonorStatus, Banner, MedicalInfo, SocialFunctions, NotificationSettings, PersonalSettings } from './components'; 

const MyProfilePage: React.FC = () => {
  const userData = {
    name: 'Ali Veliyev',
    age: 25,
    contactInfo: 'ali@example.com',
    phoneInfo: '+994 50 255-85-85',
  };

  const donationsData = [
    { date: '05/01/2024', amount: 300, location: 'Hospital №1' },
    { date: '25/11/2023', amount: 250, location: 'Hospital №2' },
    { date: '12/09/2023', amount: 200, location: 'Hospital №3' },
  ];

  const donorStatusData = {
    level: 'Bronze',
    achievements: ['3 donations', 'Saving lives'],
  };

  return (
    <ChakraProvider>
      <Banner />
      <Grid templateColumns="repeat(3, 1fr)" gap={6} p="4">
        <GridItem colSpan={1}>
          <DonorStatus {...donorStatusData} />
          <SocialFunctions />
        </GridItem>
        <GridItem colSpan={1} gap="12px">
          <UserProfile {...userData} />
          <MedicalInfo />
          <DonationHistory donations={donationsData} />
        </GridItem>
        <GridItem colSpan={1}>
          <NotificationSettings />
          <PersonalSettings />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default MyProfilePage;
