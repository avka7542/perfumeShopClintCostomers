import { Navigate , Outlet } from "react-router-dom"

function PrivateRoutes({isLogged}) {

   if(!isLogged){
    return <Navigate to="/shopping cart" />
   }

  return <Outlet />
}

export default PrivateRoutes;