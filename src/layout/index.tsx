import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import { Box,  Flex } from '@chakra-ui/react';

export const Layout: React.FC = () => {
    return (
        <Flex minH={'100vh'}>
            <Box w={'20%'} p={'2'}>
                <Header />
            </Box>
            <Box w={'80%'} p={'2'}>
                <Main>
                    <Outlet />
                </Main>
            </Box>
        </Flex>
    );
};
