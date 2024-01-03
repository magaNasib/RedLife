import { Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface IPageProps {
    children: string;
}

const Home: React.FC<IPageProps> = (props) => {
    return (
        <>
            <h1>Home Page</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi pariatur distinctio tempore voluptates, provident esse numquam, maxime dolorum, deleniti alias repudiandae porro architecto atque. Porro voluptatum repellat rem!
            <p>
                Change your password <ChakraLink as={Link} to="/change" color="red">here</ChakraLink>.
            </p>
            <p>
                Click <ChakraLink as={Link} to="/logout" color="red">here</ChakraLink> to logout.
            </p>
        </>
    );
};

export default Home;
