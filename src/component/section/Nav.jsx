import { Box, Button, Flex, Heading, Image, Input} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHamburger, FaSleigh } from "react-icons/fa";
import { PiSignInLight } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { BsPencil } from 'react-icons/bs'
import { BsCartCheck } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useContext, useEffect, useState } from "react";
import ToggleColorMode from "../partials/ToggleColorMode";
import { useColorMode } from '@chakra-ui/color-mode'
import { AuthContext } from "../../context/AuthContext";
import { useCookies } from 'react-cookie'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import useFetch from "../../hooks/useFetch";


import ShoppingCart from "../common/ShoppingCart";





function Nav() {
  const url = `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`

  const [data,loading,error] = useFetch(url)
  
  const [categoriesNames, setCategoriesNames] = useState(data) 
  const [cookies, setCookie, removeCookie] = useCookies(['token','user']);

  const [isOpen, setIsOpen] = useState(false);
  const {setSendNewRequest,user,setUser, chooseCategory, setSearchTerm, searchTerm, openedNav, setOpenedNav, isAuthenticated, setIsAuthenticated,logout, setSearchInput, searchInput,cart, setCart   } = useContext(AuthContext);
 
 
  // const [_, setCookie, removeCookie] = useCookies(['current_page']);
  // const categoriesNames = products.filter((item) => item.categories[0].category_name !== '')

  useEffect(() => {
   
    if (data) {
      setCategoriesNames({ ...data }); 
  
    }
  }, [data]); 

  const { colorMode } = useColorMode();

  function openNavBar() {
    setIsOpen((prev) => !prev)
  }

  function saveCurrentPage(page){
    setCookie("current_page",page,{ path: '/'})
    setIsOpen(false)
  }

  useEffect(()=>{
    if(cookies.user){
      setIsAuthenticated(true)
    }
  })

  


  const nav_styles = {
    display: [isOpen ? 'flex' : 'none', 'flex'],
    pos: [isOpen ? "absolute" : "relative"],
    bg: [isOpen ? colorMode === 'light' ? 'white' : 'black' : null],
    color: [isOpen ? colorMode === 'light' ? 'black' : 'white' : null],
    height: [isOpen && '100vh'],
    width: '100%',
    zIndex: 99,
    top: "0",
    gap: 5,
    p: 7,
  };

  const button_styles = {
    top: 5,
    left: 5,
    display: ["static", "none"]
  }

  const backgroundImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_QHUmqupyyhpeim1lAXfs6gK7i3uUfSp70Q&usqp=CAU'
 

  return (
    <>
      <Box  fontSize={'30'} color={'white'}  bgImage={`url(${backgroundImage})`} >
        <Button sx={button_styles} onClick={openNavBar}>
          <FaHamburger color={[!isOpen ? colorMode === 'light' ? 'black' : 'white' : null]} size={20} />
        </Button>
        <Flex height={'70px'}>
          <Flex alignItems={'center'} sx={nav_styles} direction={["column", "row"]}>
            {isOpen && <AiOutlineCloseCircle size={25} onClick={() => setIsOpen(false)} />}
            <Link to="/" onClick={() =>{ saveCurrentPage('');    setOpenedNav(true)}}>
              <Box as="span" onClick={()=> console.log(isAuthenticated)}>Home</Box>
            </Link>
            <Link to="/categories" onClick={() => saveCurrentPage('categories')}>
      <Menu>
        <MenuButton onClick={() => {chooseCategory(false);
        setOpenedNav(false)
       }}>
          categories
        </MenuButton>
        <MenuList>
          {categoriesNames && categoriesNames.categories
            ? categoriesNames.categories.map((item,index) => (
              <MenuItem fontSize={17} key={index} color={'teal'} onClick={() => chooseCategory(item.category_name)}>{item.category_name}</MenuItem>
              ))
            : null 
          }
        </MenuList>
      </Menu>
    </Link>
            <Link to="/about-us" onClick={() => saveCurrentPage('about-us')}>
              <Box  as="span" >About Us</Box>
            </Link>
            <Link to="/contact-us" onClick={() => saveCurrentPage('contact-us')}>
              <Box as="span"  >Contact us</Box>
            </Link>


          </Flex>
          <Flex justifyContent={'center'} flex={'50%'} alignItems={'center'}>
            <Image height={'50px'} width={'200px'} src={'../../../logo.jpg'} />

          </Flex>
        </Flex>

        {/* Second Nav */}
     
      <Flex  bgColor={'rgb(240,128,128)'}>
          <Flex flex={"60%"} justifyContent={'space-between'}>
            <Flex >
              <Input display={openedNav?'flex':'none'}
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
              color={'gray.700'} placeholder='search' bg={'white'} m={'3'}/>
              <Flex display={openedNav?'flex':'none'} alignSelf={'center'}><BiSearch/></Flex>
            </Flex>
            {/* <ShoppingCart/> */}
          <Flex>
          <Heading justifySelf={'end'} fontSize={42} color={'#white'} alignItems={'center'}>
            {console.log(isAuthenticated)}
            {isAuthenticated?`Wellcome ${cookies.user.user_name}`:'Luxtury Perfumes'}</Heading>
          </Flex>
          
           
          </Flex>
          
          
          <Flex flex={'40%'} justifyContent={'right'}  alignItems={'center'} height={'60px'} >
            {isAuthenticated?<Link to={"/shopping cart"} onClick={() => saveCurrentPage('shopping cart')}><Button colorScheme="teal"><BsCartCheck  size={27}/></Button></Link>:<Link to={"/"}><Button display={'none'} colorScheme="teal"><BsCartCheck color="white"  size={27} /></Button></Link>}
            
          
            {isAuthenticated?<Link  to= {"/"}>
            <Button 
             onClick={
              ()=> {logout();
              setSendNewRequest(prev => !prev)
              removeCookie('token') 
              removeCookie('user') }
             } 
                 color={'white'}  bg={'dodgerblue'} p={5} marginLeft={5}> Log Out<PiSignInLight  /></Button>
            </Link>:
            <Link to= {"/login"}>
            <Button color={'white'}  bg={'dodgerblue'} p={5} marginLeft={5}> Log in<PiSignInLight /></Button>
            </Link>}
            
            
            

            <Link to="/register">
                <Button 
            color={'white'}
             marginLeft={5} 
             marginRight={8}
              bg={'dodgerblue'}
              
              >Register <BsPencil /> </Button>
            </Link>
          

          </Flex>
        </Flex>
        <ToggleColorMode />

      </Box>
    
    </>
  );
}

export default Nav;
