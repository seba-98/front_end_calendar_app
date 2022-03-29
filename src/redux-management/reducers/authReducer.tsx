import { types } from "../types";

interface initI{
    uid:string | boolean,
    name:string | boolean,
    checking:boolean
}
const initialState:initI={
    uid:false,
    name:false,
    checking:true
}


export const authReducer=(state=initialState, action:any):any=>{

    switch (action.type) {
    
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking:false
            }
            
        case types.authCheckingFinish:
            return{
                ...state,
                checking:false
            }  

        case types.authLogOut:
            return {
                checking:false,
            }
            
        default:
            return state;
    }

}
