import { useContext,useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import {
  Box,
  Button,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Paypal from './Paypal';


const ShoppingCart = () => {
  const { cart, setCart, setTotalPrice, totalPrice } = useContext(AuthContext);
  const [checkOut , setCheckOut] = useState(false)

console.log(totalPrice)

  const removeFromCart = (itemId) => {
    const removedItem = cart.find((cartItem) => cartItem._id === itemId);
    console.log(removedItem)
    if (removedItem) {
      const newTotalPrice = totalPrice -  removedItem.product_price 
      setTotalPrice(newTotalPrice);
      const updatedCart = cart.filter((cartItem) => cartItem._id !== itemId);
      setCart(updatedCart);
    }
  };
  

  return (
    <Box textAlign={'center'}>
      <Text fontSize="5xl" fontWeight="bold" mb={4}>
        Your Shopping Cart
      </Text>
      <UnorderedList>
        {cart.map((item,index) => (
          <ListItem key={index} fontSize='xl' display="flex" justifyContent="space-between">
            <Text marginLeft={10}>
              {item.product_name} - ${item.product_price}
            </Text>
            <Button
            marginX={40}
            marginY={3}
            fontSize={'xl'}
              colorScheme="blue"
              size="sm"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
      <Text fontSize='2xl' mt={4}>
        Total Price: ${totalPrice.toFixed(2)}
      </Text>
      <Box display={"flex"} justifyContent={'center'} marginTop={10}>
      {checkOut? <Paypal props={totalPrice}/> :
      <Button onClick={()=> setCheckOut(true)} colorScheme='teal'>
      Pay On Paypal
      </Button>}
      </Box>
    </Box>
  );
};

export default ShoppingCart;
