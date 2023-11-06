import React from 'react';
import { Box, Container, Flex, Icon, Text, Link, Grid } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box marginTop={5} as="footer" bg="gray.800" color="white" py={{ base: 4, md: 6 }}>
      <Container maxW="container.lg">
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 4, md: 8 }}>
          <Box>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="semibold">Contact Us</Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}>If you have any questions or concerns, feel free to get in touch with us!</Text>
          </Box>
          <Flex justifyContent={{ base: 'center', md: 'space-between' }}>
            <ContactItem icon={FaMapMarkerAlt} text="123 Main Street, City, Country" />
            <ContactItem icon={FaPhone} text="+123-456-7890" />
            <ContactItem icon={FaEnvelope} text="email us" email="avka7542@gmail.com" />
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
};

const ContactItem = ({ icon, text, email }) => {
  return (
    <Flex align="center" mr={{ base: 0, md: 4 }}>
      <Icon as={icon} boxSize={{ base: 5, md: 6 }} mr={{ base: 2, md: 4 }} />
      <Link href={`mailto:${email}`}>{text}</Link>
    </Flex>
  );
};

export default Footer;
