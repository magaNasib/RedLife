import {
  Card,
  Box,
  Stack,
  CardBody,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function BlogsFeature() {
  return (
    <Box m="60px 20px 0">
      <Link
        to={{
          pathname: "/donor-details/1",
          // state: {
          //   donor: {
          //     id: 1,
          //     name: "Segun Adebayo",
          //     title: "The perfect latte",
          //     description:
          //       "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
          //     date: "Dec 28, 2023",
          //     imageUrl:
          //       "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
          //   },
          // },
        }}
      >
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt="15px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px">
                Segun Adebayo
              </Heading>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>

              <Text color="gray" py="2">
                Dec 28, 2023
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </Card>
      </Link>
      <Link to="/donor-details/2">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt="15px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px">
                Segun Adebayo
              </Heading>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>

              <Text color="gray" py="2">
                Dec 28, 2023
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </Card>
      </Link>
      <Link to="/donor-details/3">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt="15px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px">
                Segun Adebayo
              </Heading>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>

              <Text color="gray" py="2">
                Dec 28, 2023
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </Card>
      </Link>
      <Link to="/donor-details/4">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt="15px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px">
                Segun Adebayo
              </Heading>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>

              <Text color="gray" py="2">
                Dec 28, 2023
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </Card>
      </Link>
      <Link to="/donor-details/5">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt="15px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px">
                Segun Adebayo
              </Heading>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>

              <Text color="gray" py="2">
                Dec 28, 2023
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </Card>
      </Link>
      <Link to="/donor-details/6">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt="15px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px">
                Segun Adebayo
              </Heading>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>

              <Text color="gray" py="2">
                Dec 28, 2023
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </Card>
      </Link>
      <Link to="/donor-details/7">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt="15px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px">
                Segun Adebayo
              </Heading>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>

              <Text color="gray" py="2">
                Dec 28, 2023
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </Card>
      </Link>
      <Link to="/donor-details/8">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mt="15px"
        >
          <Stack>
            <CardBody>
              <Heading size="sm" mb="7px">
                Segun Adebayo
              </Heading>
              <Heading size="md">The perfect latte</Heading>

              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>

              <Text color="gray" py="2">
                Dec 28, 2023
              </Text>
            </CardBody>
          </Stack>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />
        </Card>
      </Link>
    </Box>
  );
}

export default BlogsFeature;
