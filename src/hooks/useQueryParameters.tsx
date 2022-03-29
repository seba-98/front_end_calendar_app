import { useLocation } from "react-router-dom";
import queryString from "query-string";

export const useQueryParameters=()=>{
    const location= useLocation();
    const {q}=queryString.parse(location.search);
    return q;
}