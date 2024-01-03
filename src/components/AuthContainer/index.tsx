import { Box, Container, Center } from '@chakra-ui/layout';
import React from 'react';

export interface IAuthContainerProps {
    header: any;
    children: any
}

const AuthContainer: React.FunctionComponent<IAuthContainerProps> = props => {
    const { children, header } = props;

    return (
        <Container>
            <Center>
                <Box
                    // w={['100%', '80%', '60%', '40%']} 
                    mt={5} 
                    p={5} 
                    bg="white" 
                    rounded="md" 
                    boxShadow="md"
                    w={'100vw'}
                >
                    {header && (
                        <Box
                            bg="primary.500"
                            color="gray"
                            textAlign="center"
                            py={2} 
                            roundedTop="md" 
                        >
                            {header}
                        </Box>
                    )}
                    <Box>
                        {children}
                    </Box>
                </Box>
            </Center>
        </Container>
    );
}

export default AuthContainer;