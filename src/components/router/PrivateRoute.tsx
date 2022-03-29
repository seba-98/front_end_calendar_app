import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"
import { startGetEvents } from "../../redux-management/actions/calendarActions";

interface dataRouter{
    children:any,
    logged:Boolean
}


const PrivateRoute = ({children, logged}:dataRouter) => {

  const dispatch= useDispatch();
  
  useEffect(() => {
    dispatch(startGetEvents());
  }, [dispatch])
  
  
  return (
    <>
        {
            logged?
            children
            :
            <Navigate to='/login'/>
        }
    
    </>
  )
}

export default PrivateRoute

function dispatch(arg0: (dispatch: any) => Promise<any>) {
  throw new Error("Function not implemented.");
}
