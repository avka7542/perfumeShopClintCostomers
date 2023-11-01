import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet
} from 'react-router-dom'
import { Box, Button, Image } from '@chakra-ui/react'
import Products from './pages/privatePages/home/Products';
import Nav from './component/section/Nav';
import Footer from './component/section/Footer';
import ContectUs from './pages/privatePages/contect-us/ContectUs';
import Login from './pages/publicPages/Login';
import PrivateRoutes from './utils/PrivateRoutes';
import { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import AboutUs from './pages/privatePages/about-us/AboutUs';
import Categories from './pages/privatePages/categories/Categories';
import UserForm from './component/partials/users/UserForm';
import LoginForm from './pages/publicPages/LoginForm';
import ShoppingCart from './component/common/ShoppingCart';
import Paypal from './component/common/Paypal';



function Root(){


  return(
    <>
    <Nav/>
    <Outlet />
    
    </>
  )
}

function App() {

  const { isAuthenticated } = useContext(AuthContext);
 

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>}>
        
        <Route element={<PrivateRoutes isLogged={isAuthenticated} />}>
          <Route path='/shopping cart' element={<ShoppingCart/>}/>
        </Route>

        <Route index element={<Products />} />
        <Route path='/contact-us' element={<ContectUs />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/register' element={<UserForm/>}/>
        <Route path='/login' element ={<Login/>}/>


        
      </Route>
    )
  )

  return (
    <>
   

    <RouterProvider router={router} />
    </>
  )
}

export default App
