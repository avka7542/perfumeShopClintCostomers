import { toast } from "react-toastify";
import {
  Box,
  Button,
  Container,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import FormInput from '../FormInput';
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";


function userForm() {

  const initialValues = {
    user_name: "",
    user_email: "",
    user_password: "",
    user_phone: "",
    user_address: ""
  }

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState(false);
  const { setSendNewRequest } = useContext(AuthContext)

  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url:`${import.meta.env.VITE_SERVER_URL}/users/addCustomer`,
        data: values,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error);
      }


      setValues(initialValues);
      setSendNewRequest(prev => !prev)
      onClose()
    } catch (error) {
     console.log(error)
      }
     finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box as="form" padding={4} onSubmit={handleSubmit}>
        <FormInput
          NumberMargin={0}
          isRequired={true}
          InputLabel='Name'
          handleChange={handelChange}
          inputValue={values.user_name}
          inputName='user_name'
          inputType='text'
        />

        <FormInput
          NumberMargin={4}
          isRequired={true}
          InputLabel='Email'
          handleChange={handelChange}
          inputValue={values.user_email}
          inputName='user_email'
          inputType='email'
        />

        <FormInput
          NumberMargin={4}
          isRequired={true}
          InputLabel='Password'
          handleChange={handelChange}
          inputValue={values.user_password}
          inputName='user_password'
          inputType='password'
        />

        <FormInput
          NumberMargin={4}
          isRequired={true}
          InputLabel='Phgone Number'
          handleChange={handelChange}
          inputValue={values.user_phone}
          inputName='user_phone'
          inputType='number'
        />

        <FormInput
          NumberMargin={4}
          isRequired={true}
          InputLabel='Address'
          handleChange={handelChange}
          inputValue={values.user_address}
          inputName='user_address'
          inputType='text'
        />

        <Button type="submit" marginTop={4} colorScheme="teal">
          {"send"}
        </Button>
      </Box>
      {loading && <Spinner color="red.500" />}
    </Container>
  )
}

export default userForm