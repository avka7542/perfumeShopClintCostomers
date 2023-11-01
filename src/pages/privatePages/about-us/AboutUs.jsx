import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
} from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <Box  py={10}>
      <Container maxW="container.lg">
        <VStack spacing={6}>
          <Heading as="h1" size="xl">
            About Us
          </Heading>
          <Text fontSize="lg">
            Welcome to our Luxury Perfumes store, where sophistication meets fragrance.
          </Text>
          <Text fontSize="lg">
            At Luxury Perfumes, we believe that scent is a powerful form of self-expression.
            Our curated collection of exquisite fragrances offers you a journey into the world of
            luxury and elegance.
          </Text>
          <Text fontSize="lg">
            Our team of expert perfumers and connoisseurs scours the globe to bring you the most
            sought-after and rare fragrances. We take pride in offering a range that caters to
            diverse tastes and preferences.
          </Text>
          <Text fontSize="lg">
            Every perfume we offer is a blend of artistry, craftsmanship, and passion. Our
            commitment to quality ensures that each bottle represents the epitome of luxury.
          </Text>
          <Flex justify="center">
            <Image src="https://bisum.co.il/wp-content/uploads/2023/01/main-banner-patek-maison.jpg" alt="Our Store" maxH="400px" />
          </Flex>
          <Text fontSize="lg">
            We invite you to explore our collection and discover scents that resonate with your
            personality and style. Let us help you find the perfect fragrance to make a lasting
            impression.
          </Text>
          <Text fontSize="lg">
            Thank you for choosing Luxury Perfumes. We're honored to be part of your fragrant
            journey.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutUs;