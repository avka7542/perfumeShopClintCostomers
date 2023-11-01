import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';

const LoginForm = () => {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the server using Axios
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, formData);

      // Handle the response as needed
      if (response.status === 200) {
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred', error);
    }
  };

  return (
    <Center height="100vh">
      <Box width="300px" p={4} boxShadow="lg" rounded="md" bg="white">
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default LoginForm;
