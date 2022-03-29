import { RegisterLoading } from "./interfaces"

export const validateRegister=({name, rEmail, rPassword, rConfirmPassword }:RegisterLoading):RegisterLoading | null=>{
    const errors:RegisterLoading={
        name:null,
        rEmail:null,
        rPassword:null,
        rConfirmPassword:null
     }
    if(!name || name.length<3){
        errors.name='Nombre es requerido y debe tener al menos 3 caracteres'
    }
    if(!rEmail || !rEmail.includes('@') || !rEmail.includes('.')){
        errors.rEmail='Email es requerido y debe tener un formato valido'
    }
    if(!rPassword || rPassword.length<6){
        errors.rPassword='Contraseña es requerida y debe tener al menos 6 caracteres'
    }
    if(!rConfirmPassword ){
        errors.rConfirmPassword='Confirmar contraseña es requerida'
    }
    if(rPassword !== rConfirmPassword){
        errors.rConfirmPassword='Las contraseñas no coinciden'
    }

    if(errors.name || errors.rEmail || errors.rPassword || errors.rConfirmPassword){
        return errors
    }   
    
    return null

}