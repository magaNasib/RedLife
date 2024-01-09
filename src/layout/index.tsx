import React from 'react';
import { Outlet } from 'react-router-dom';
// import Header from './Header';
import Main from './Main';
import { Flex } from '@chakra-ui/react';
// import { Box, Container, Flex } from '@chakra-ui/react';
// import { SearchBox } from '../components/SearchBox';
// import { Hashtags } from '../components/Hashtags';

export const Layout: React.FC = () => {
    return (
        <Flex minH={'100vh'}>
            {/* <Box w={'20%'} p={'2'}>
                <Header />
            </Box> */}
            {/* <Container maxW='container.lg' p={'2'}> */}
                <Main>
                    <Outlet />
                </Main>
            {/* </Container> */}
            {/* <Box p='2' maxW='20%' borderLeft={'1px'} borderColor={'gray.200'} >
                <SearchBox/>
                <Hashtags/>
            </Box> */}
        </Flex>
    );
};
