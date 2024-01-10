import React from 'react';
import { ChakraProvider, GridItem, Grid, Box, Button, ButtonGroup } from '@chakra-ui/react';
import { UserProfile, DonationHistory, DonorStatus, Banner, MedicalInfo, SocialFunctions, NotificationSettings, PersonalSettings } from './components';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
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
    <Box>
      <ButtonGroup m={'5'}>
        
      <Button onClick={()=>navigate('/')}>Home</Button>
      <Button onClick={()=>navigate('/logout')}>Logout</Button>
      </ButtonGroup>
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
    </Box>
  );
};

export default ProfilePage;
