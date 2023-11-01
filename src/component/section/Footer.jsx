import React from 'react';
import { Box, Container, Flex, Icon, Text, Link } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box marginTop={5} as="footer" bg="gray.800" color="white" py="6">
      <Container maxW="container.lg">
        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="xl" fontWeight="semibold">Contact Us</Text>
            <Text>If you have any questions or concerns, feel free to get in touch with us!</Text>
          </Box>
          <Flex>
            <ContactItem icon={FaMapMarkerAlt} text="123 Main Street, City, Country" />
            <ContactItem icon={FaPhone} text="+123-456-7890" />
            <ContactItem icon={FaEnvelope} text="email us" email="avka7542@gmail.com" />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

const ContactItem = ({ icon, text, email }) => {
  return (
    <Flex align="center" mr="4">
      <Icon as={icon} boxSize="5" mr="2" />
      <Link href={`mailto:${email}`}>{text}</Link>
    </Flex>
  );
};

export default Footer;
