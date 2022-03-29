import { UserLoading } from "./interfaces";

export const validateLogin=({lEmail, lPassword}:UserLoading):any=>{
    const errors: UserLoading={
        lEmail: null,
        lPassword: null
    };

    if(!lEmail){
        errors.lEmail="El correo es obligatorio";
    }
    if(!lEmail?.includes('@') || !lEmail?.includes('.')){
        errors.lEmail="Ingrese Email valido";
    }
    if(!lPassword){
        errors.lPassword="Coloque su contraseña";
    }

    if(errors.lEmail || errors.lPassword){
        return errors;
    }

    return null;
}