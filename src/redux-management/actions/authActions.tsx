import { types } from "../types";
import { RegisterLoading, User, UserLoading } from "../../helpers/interfaces";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import Swal from "sweetalert2";

export const startLogin=({lEmail:email, lPassword:password}:UserLoading)=>{
    return async(dispatch:any)=>{
       const response=await fetchSinToken('auth/login', {email, password}, 'POST');

        if(!response.ok){
            return Swal.fire({
                title:response.msg,
                icon:"warning"
            }) 
        }

        localStorage.setItem('token', response.token);
        localStorage.setItem('token-init-date', JSON.stringify( new Date().getTime()));
       
        dispatch(login({uid:response._id, name:response.name}))

        Swal.fire({
            title:`¡Bienvenido/a ${response.name}`,
            icon:"success"
        })
    }
}

export const startRegister=({name, rEmail:email, rPassword:password, rConfirmPassword:confirmPassword}: RegisterLoading)=>{
    return async(dispatch:any)=>{
        
        const response=await fetchSinToken(
            'auth/new', 
        {
            name:name?.trim().toLowerCase(),
            email:email?.trim().toLowerCase(), 
            password:password?.trim().toLowerCase(), 
            confirmPassword:confirmPassword?.trim().toLowerCase()
        }, 
        'POST'
        );

        if(!response.ok){
            return Swal.fire({
            title:response.errors,
            icon:"warning"
        }) 
        }

        localStorage.setItem('token', response.token);
        localStorage.setItem('token-init-date', JSON.stringify( new Date().getTime()));
       
        dispatch(login({uid:response._id, name:response.name}))

        Swal.fire({
            title:` ${response.name} has sido registrado correctamente`,
            icon:"success"
        })
    }
}


export const startChecking=(page:string='/')=>{
    return async(dispatch:any)=>{
        const resp= await fetchConToken('auth/renew');

        if(resp.ok){
            localStorage.setItem('token', resp.token);
            localStorage.setItem('token-init-date', JSON.stringify( new Date().getTime()));

            dispatch(login({uid:resp._id, name:resp.name}))
        }else{
            localStorage.removeItem('token');
            localStorage.removeItem('token-init-date');
            
            if(page ==='/' || page==='/login'){
                return dispatch((checkingFinish()));
            }else if(page ==='/calendar'){
                Swal.fire('Error', resp.msg, 'error');
                return dispatch((checkingFinish()));
            }

        }
    }
}
export const startLogOut=()=>{
    return (dispatch:any)=>{
        localStorage.clear();
        dispatch(logOut());
        dispatch(checkingFinish());
    }
}



const login=(user:User)=>({
    type:types.authLogin,
    payload:user
})
const logOut=()=>({
    type:types.authLogOut
})
const checkingFinish=()=>({type:types.authCheckingFinish})

