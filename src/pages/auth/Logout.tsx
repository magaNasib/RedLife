import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import { signOut } from 'firebase/auth';
import { Box, Button, Flex, Text,Spacer } from '@chakra-ui/react';

interface IPageProps {
    name: string;
    path: string;
    exact: boolean;
    protected: boolean;
    error: unknown
}

const LogoutPage: React.FunctionComponent<IPageProps> = props => {
    const navigate = useNavigate()

    const Logout = () => {
        signOut(auth)
            .then(() => navigate('/login'))
            .catch(error => logging.error(error));
    }

    return (
        <AuthContainer header="Logout">
            <Text >Are you sure you want to logout?</Text>
            <Flex mt={'20px'}>
                <Box>
                    <Button bgColor={'red'} color={'white'} className="mr-2" onClick={() => navigate(-1)}>Cancel</Button>
                </Box>
                <Spacer />
                <Box>
                    <Button bgColor={'green'} color={'white'} onClick={() => Logout()}>Sign out</Button>
                </Box>
            </Flex>
        </AuthContainer>
    );
}

export default LogoutPage;