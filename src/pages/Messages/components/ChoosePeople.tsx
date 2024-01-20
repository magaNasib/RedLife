
import "./index.css"

import { Avatar, Box, Flex, Heading, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';

interface ChoosePeopleProps {
	handleBoxClick: () => void;
}

const ChoosePeople: React.FC<ChoosePeopleProps> = ({ handleBoxClick }) => {
	return (
		<Box
			w="25%"
			position="relative"
		>
			<Box mb="10px">
				<Flex
					mt="90px"
					p="5px 15px 10px"
					zIndex="11"
					position="absolute"
					w="100%"
					bgColor="#F2F2F5"
					flexDirection="column"
				>
					<Box>
						<Text fontWeight="bold" fontSize="xl" mb="5px">
							Zeynab Aliyeva
						</Text>
						<Text fontWeight="bold" mb="10px" fontSize="md">
							Messages
						</Text>
					</Box>
					<InputGroup w="95%">
						<InputLeftElement cursor="pointer" pointerEvents="none">
							<SearchIcon color="#445760" />
						</InputLeftElement>
						<Input
							type="text"
							placeholder="Search Direct Messages"
							border="1px solid #445760"
							borderRadius="35px"
							borderColor="#445760"
							backgroundColor="#FFFFFF"
							color="#445760"
						/>
					</InputGroup>
				</Flex>
				<Box
					h="100vh"
					className="noScrollbar"
					overflowY='scroll'>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
					<Box
						_hover={{
							bgColor: "#6f7d84",
						}}
						cursor="pointer"
						onClick={handleBoxClick}
					>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
							pl="15px"
						>
							<Avatar
								name="Avatar"
								src="https://bit.ly/sage-adebayo"
							/>
							<Box pt="15px" pb="15px">
								<Heading size="sm">Mehemmed Nesibov</Heading>
								<Text>En son yazilan sms</Text>
							</Box>
						</Flex>
					</Box>
				</Box>
			</Box>
		</Box >
	)
}

export default ChoosePeople
