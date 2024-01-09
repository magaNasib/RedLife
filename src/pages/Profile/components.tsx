import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Avatar, Box, Text, Badge, Image, Heading, Button, HStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export const Banner: React.FC = () => {
  return (
    <Box height="40vh" display="flex" alignItems="center" justifyContent="center" mb="4">
      <Image src="https://www.pr-medicalevents.com/wp-content/uploads/2016/06/post-img.jpg" alt="Donation Banner" maxW="100%" maxH="100%"/>
      {/* <Image src='/src/assets/blood.jpg' alt='xxx' /> */}
    </Box>
  );
};

interface UserProfileProps {
  name: string;
  age: number;
  contactInfo: string;
  phoneInfo: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ name, age, contactInfo, phoneInfo }) => {
  return (
    <Box p="4" borderWidth="1px" borderRadius="md" boxShadow="md" background="#FFA07A">
      <Avatar name={name} size="xl" mb="4" />
      <Text fontSize="xl" fontWeight="bold">Name: {name}</Text>
      <Text fontSize="lg">Age: {age}</Text>
      <Text fontSize="lg">Email: {contactInfo}</Text>
      <Text fontSize="lg">Phone: {phoneInfo}</Text>
    </Box>
  );
};

export const MedicalInfo: React.FC = () => {
  return (
    <Box p="4" borderWidth="1px" borderRadius="md" boxShadow="md" mb="4">
      <Heading fontSize="xl" mb="2">Medical Information</Heading>
      <Text>• Blood Type: B(III+)</Text>
      <Text>• Medical Test Results</Text>
      {/* Дополнительная информация */}
    </Box>
  );
};

interface DonationHistoryProps {
  donations: { date: string; amount: number; location: string }[];
}

export const DonationHistory: React.FC<DonationHistoryProps> = ({ donations }) => {
  return (
    <Box p="4" borderWidth="1px" borderRadius="md" boxShadow="md" background="#FFB6C1">
      <Text fontSize="xl" fontWeight="bold" mb="4">Donation History:</Text>
      {donations.map((donation, index) => (
        <Box key={index} mb="2">
          <Text>Date: {donation.date}</Text>
          <Text>Amount: {donation.amount} ml</Text>
          <Text>Location: {donation.location}</Text>
        </Box>
      ))}
    </Box>
  );
};

interface DonorStatusProps {
  level: string;
  achievements: string[];
}

export const DonorStatus: React.FC<DonorStatusProps> = ({ level, achievements }) => {
  return (
    <Box p="4" borderWidth="1px" borderRadius="md" boxShadow="md" background="#FFA07A">
      <Box display="flex" flexDirection="row" gap="4px">
        <Text fontSize="xl" fontWeight="bold">Donor Level: {level}</Text> 
        <CheckCircleIcon color="green" marginTop="8px"/>
      </Box>
      <Text fontSize="lg" fontWeight="bold" mb="2">Achievements:</Text>
      {achievements.map((achievement, index) => (
        <Badge key={index} colorScheme="green" mr="2" mb="2">
          {achievement}
        </Badge>
      ))}
    </Box>
  );
};

export const NotificationSettings: React.FC = () => {
  return (
    <Box p="4" borderWidth="1px" borderRadius="md" boxShadow="md" mb="4" background="#FFA07A">
      <Heading fontSize="xl" mb="2">Notification Settings</Heading>
      <Text>Preferences for upcoming blood donation campaigns or events notifications</Text>
      <Button
      variant="solid"
      colorScheme="red"
      borderRadius="md"
      mb="2"
      _hover={{ cursor: 'pointer' }}
    >
      Configure notifications
    </Button>
  </Box>
  );
};

export const SocialFunctions: React.FC = () => {
  return (
    <Box p="4" borderWidth="1px" borderRadius="md" boxShadow="md" mb="4">
      <Heading fontSize="xl" mb="2">Social Functions</Heading>
      <HStack spacing="4" mb="2">
        <FaInstagram size="24px" color="purple.500" />
        <FaTwitter size="24px" color="blue.400" />
        <FaFacebook size="24px" color="blue.700" />
      </HStack>
      <Text>Share your achievements and invite your friends.</Text>
    </Box>
  );
};

export const PersonalSettings: React.FC = () => {
  return (
    <Box p="4" borderWidth="1px" borderRadius="md" boxShadow="md" mb="4" display="flex"
     flexDirection="column">
    <Heading fontSize="xl" mb="2">Personal Settings</Heading>
    <Button
      variant="solid"
      colorScheme="blue"
      borderRadius="md"
      mb="2"
      _hover={{ cursor: 'pointer' }}
    >
      Change Password
    </Button>
    <Button
      variant="solid"
      colorScheme="green"
      borderRadius="md"
      _hover={{ cursor: 'pointer' }}
    >
      Privacy Settings
    </Button>
  </Box>
  );
};