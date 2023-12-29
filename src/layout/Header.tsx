
import { Box, Button, Flex, Heading, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Stack direction={'column'} p={'2'} borderRight={'1px'} borderColor={'gray.200'} minH={'100vh'}>
            <Heading display='flex'  color={'red.500'}>Red<Text color={'green'}>Life</Text></Heading>
            <Flex direction={'column'} p={'5'} gap={'3'} fontSize={'larger'}>
                <Link to={'/'}>Home</Link>
                <Link to={'/'}>Messages</Link>
                <Link to={'/'}>Search</Link>
            </Flex>
            <Menu>
                <MenuButton as={Button} colorScheme='gray'>
                    Profile
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Profile'>
                        <MenuItem>My Account</MenuItem>
                        <MenuItem>Payments </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title='Help'>
                        <MenuItem>Docs</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </Stack>
    )
}

export default Header