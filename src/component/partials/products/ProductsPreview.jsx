import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Text,
  Image,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,


} from "@chakra-ui/react";
import { SimpleGrid } from '@chakra-ui/react'
import { useState, useContext } from "react";
import Pagination from "./Pagination"
import Footer from "../../section/Footer";
import { useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";



function ProductsPreview({ products }) {

  const [currentPage,setCurrentPage] = useState(1);
  const [productPerPage] = useState(10)
  const [dataProducts, setDataProducts] = useState([...products])
 


  //מה האינדקס של המוצר האחרון בדף
  const indexOfLastProduct = currentPage * productPerPage
  //מה האינדקס של המוצר הראשון בדף
  const indexOfFirstProduct = indexOfLastProduct - productPerPage
  //מניפולציה על המערך להחזיר את המוצרים מאינדקס עד אינדקס
  const currentProducts = dataProducts.slice(indexOfFirstProduct,indexOfLastProduct)
  const {searchTerm, setSearchTerm, user, setCart, cart, setTotalPrice, totalPrice } = useContext(AuthContext)
  const searchInGoogle = (product) =>{
    window.location.href =`https://www.google.com/search?q=${product}`;
  }

  useEffect(()=> {
    
    const searchResults = dataProducts.filter((item)=> item.product_name.includes(searchTerm))
    setDataProducts(searchResults)
  },[searchTerm])

  useEffect(()=> {
    setDataProducts([...products])
    setSearchTerm(undefined)
  },[searchTerm == ""])

  const addToCart = (item) => {
   
    setCart([...cart, item]);
    setTotalPrice(totalPrice+item.product_price)
  };
  

  // useEffect(()=>{

  // },[cart])
  
  return (
     <>
    <SimpleGrid  columns={{ base: 1, sm: 2, md: 5 }} // Adjust the number of columns for different screen sizes
        spacing={5}
        p={5}>
    
     {currentProducts.map((item,index)=> (
      <Box key={index} h={'100%'} boxShadow={'dark-lg'} >
      <Card  h={'100%'}   textAlign={'center'} >
        <Heading h={50} padding={3} textAlign={'center'} fontSize={'xl'}>{item.product_name} </Heading>
      <CardBody textAlign={'center'}>
        <Image
            style={{cursor:'pointer'}}
            onClick={()=> searchInGoogle(item.product_name)}
             src={`${item.product_image}`}
             alt='Green double couch with wooden legs'
             borderRadius='lg'
             width={'100%'}
             height={'300px'}
             
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'></Heading>
          <Accordion allowToggle>
  <AccordionItem >
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left' >
          {item.product_description}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={5} >
   {item.product_description}
    </AccordionPanel>
  </AccordionItem>

</Accordion>
          <Text color='blue.600' fontSize='2xl'>
           {`PRICE: ${item.product_price}$`} 
          </Text>
          
          <Box display={ !item.product_onsale && "none"} color={'white'}
               fontSize={23}
               bg={'red.500'}>
                {`ONSALE ${item.product_onsale}% OFF `}
           </Box>
        </Stack>

      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button  colorScheme='teal' onClick={() => addToCart(item)}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
    </Box>
    ))}
   </SimpleGrid>
   <Pagination
    productPerPage={productPerPage}
    currentPage={currentPage}
    totalProducts={products.length}
    setCurrentPage={setCurrentPage}
    />
    <Footer/>
   </>
  )
}

export default ProductsPreview;
