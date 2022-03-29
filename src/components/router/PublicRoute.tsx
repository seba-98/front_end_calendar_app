import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"
import { startGetEvents } from "../../redux-management/actions/calendarActions";

interface dataRouter{
    children:any,
    logged:Boolean
}

const PublicRoute = ({children, logged}:dataRouter) => {

    const dispatch= useDispatch();
    useEffect(() => {
    dispatch(startGetEvents());
    }, [dispatch])

    return (
        <>
            {
                logged?
                <Navigate to='/calendar'/>
                :
                children
            }
        </>
    )
}

export default PublicRoute