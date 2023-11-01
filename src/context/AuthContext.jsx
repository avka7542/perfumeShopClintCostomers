import axios from "axios";
import {useCookies } from 'react-cookie'
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [sendNewRequest, setSendNewRequest] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(false);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [openedNav, setOpenedNav] = useState(true)
  const [searchInput, setSearchInput] = useState(false)
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("")

  const login = async (loginDetails) => {
    try {
      console.log(loginDetails)
        setIsLoading(true);
        const response =
         await axios.post
         (`${import.meta.env.VITE_SERVER_URL}/users/login`
         ,loginDetails);
         
         const data = response.data;
         console.log(data)
         if(!data.success){
          throw new Error(`${data.message} : ${data.error}`)
         }


        setUser(data.user);
        setCookie("token",data.token,{path:'/'})
        setCookie("user",data.user,{path:'/'})
        setIsAuthenticated(true)
        setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error.response.data.message)
      setErrorMessage("Login failed. Please check your details!")
    }
  };

  const logout = () => {
    try {
        setIsAuthenticated(false);
        setUser({});
        removeCookie("token");
        removeCookie("user");
        setSendNewRequest(prev=>!prev)
    } catch (error) {
        console.log(error)
    }
  } 

  const chooseCategory = (value) => {
    setCategory(value)
  }

 


  const value = {
    login,
    isLoading,
    sendNewRequest,
    setSendNewRequest,
    isAuthenticated,
    user,
    setUser,
    logout,
    category,
    chooseCategory,
    searchTerm,
    setSearchTerm,
    openedNav,
    setOpenedNav,
    setIsAuthenticated,
    searchInput,
    setSearchInput,
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
    errorMessage

  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
