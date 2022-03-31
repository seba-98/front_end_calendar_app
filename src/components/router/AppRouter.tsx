import {  useSelector,useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom"
import { startChecking } from "../../redux-management/actions/authActions";
import LoginScreen from "../auth/LoginScreen"
import CalendarScreeen from "../calendar/CalendarScreeen";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { useEffect } from "react";
import Preload from "../ui/Preload";


const AppRouter = () => {
  
  const id = useSelector((state:any) => state.auth.uid);
  const checking = useSelector((state:any) => state.auth.checking);

  const dispatch= useDispatch();
  const {pathname}= useLocation();

  
    useEffect(() => {
      dispatch(startChecking(pathname));
    }, [dispatch])



  return (
    checking ? (
    <Routes>
      <Route path="/" element={<PublicRoute logged={id}><LoginScreen /></PublicRoute>}/>
      <Route path="/login" element={<PublicRoute logged={id}><LoginScreen /></PublicRoute>}/>
      <Route path="/calendar" element={<PrivateRoute logged={id}><CalendarScreeen /></PrivateRoute>}/>
    </Routes>
    )
    :
    <Preload/>
  )
}

export default AppRouter