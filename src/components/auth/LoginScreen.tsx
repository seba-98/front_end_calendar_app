import  { SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2';
import { errInputStyle } from '../../helpers/errInputStyle';
import { validateLogin } from '../../helpers/validateLogin';
import { validateRegister } from '../../helpers/validateRegister';
import { useForm } from '../../hooks/useForm'
import { startLogin, startRegister } from '../../redux-management/actions/authActions';

const LoginScreen = () => {

    const dispatch = useDispatch();
    

     //---------------FORMULARIO DE LOGIN------------------------
     const[formLoginValues, handleLoginChange, , ]=useForm({
         lEmail:'',
         lPassword:''
        })
        const{lEmail, lPassword}= formLoginValues;

        const [loginErrors, setLoginErrors] = useState(validateLogin(formLoginValues));
        const [onLoginForm, setOnLoginForm] = useState(false);

        useEffect(() => {
            onLoginForm?
            setLoginErrors(validateLogin(formLoginValues))
            :
            setLoginErrors(null)
        } , [onLoginForm, formLoginValues])
        
        const handleSubmit=(e:SyntheticEvent)=>{
            e.preventDefault();
            if(loginErrors){
                return Swal.fire( {
                title: 'Complete los campos correctamente',
                icon: 'error'
                })
            }
            dispatch(startLogin(formLoginValues));
        }
            
        
     //---------------FORMULARIO DE REGISTRO------------------------

    const[formRegisterValues, handleRegisterChange, , ]=useForm({
        name:'',
        rEmail:'',
        rPassword:'',
        rConfirmPassword:''
    });
    const{name, rEmail, rPassword, rConfirmPassword}= formRegisterValues;

    //--------VALIDACIONES DEL FORMULARIO DE REGISTRO----------
    const [errors, setErrors] = useState(validateRegister(formRegisterValues));
    const [onForm, setOnForm] = useState(false); //Para saber si esta en el formulario de registro o no

    useEffect(() => {
        onForm? //si esta dentro del formulario
        setErrors(validateRegister(formRegisterValues)) //mostramos los errores
        :
        setErrors(null); //si esta fuera no los mostramos
    },
    [formRegisterValues, onForm])
    //-----------------------------------------------------------------
   
    
    const handleRegisterSubmit=(e:SyntheticEvent):any=>{
        e.preventDefault();
        
        if(errors){
            return Swal.fire({
                title: 'Complete los campos correctamente',
                icon: 'error',
            })
        }
        dispatch(startRegister(formRegisterValues));
    }
    
   


  return (
    <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleSubmit} onBlur={()=>{setOnLoginForm(false)}} onFocus={()=>{setOnLoginForm(true)}} >
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='lEmail'
                                value={lEmail}
                                onChange={handleLoginChange}
                                style={loginErrors?.lEmail && errInputStyle()}
                                autoComplete='off'
                            />
                            {loginErrors?.lEmail && <span className="text-danger">{loginErrors?.lEmail}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='lPassword'
                                value={lPassword}
                                onChange={handleLoginChange}
                                style={loginErrors?.lPassword && errInputStyle()}
                                autoComplete='off'
                            />
                        </div>
                        {loginErrors?.lPassword && <span className="text-danger">{loginErrors?.lPassword}</span>}
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>


                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegisterSubmit} onBlur={()=>{setOnForm(false)}} onFocus={()=>{setOnForm(true)}}>
                        <div className="form-group">
                            <input
                                type="text"
                                name='name'
                                value={name}
                                className="form-control"
                                placeholder="Nombre"
                                onChange={handleRegisterChange}
                                style={ errors?.name && errInputStyle() }
                                autoComplete="off"
                            />
                            { errors?.name && <p className="text-danger ">{errors.name}</p> }
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name='rEmail'
                                value={rEmail}
                                className="form-control"
                                placeholder="Correo"
                                onChange={handleRegisterChange}
                                style={ errors?.rEmail && errInputStyle() }
                                autoComplete="off"
                            />
                            { errors?.rEmail && <p className="text-danger">{errors.rEmail}</p> }
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name='rPassword'
                                value={rPassword}
                                className="form-control"
                                placeholder="Contraseña" 
                                onChange={handleRegisterChange}
                                style={ errors?.rPassword && errInputStyle() }
                                autoComplete="off"
                                />
                            { errors?.rPassword && <p className="text-danger">{errors.rPassword}</p> }    
                        </div>

                        <div className="form-group">
                            <input
                                name='rConfirmPassword'
                                value={rConfirmPassword}
                                onChange={handleRegisterChange}
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                style={ errors?.rConfirmPassword && errInputStyle() }
                                autoComplete="off"
                            />
                            { errors?.rConfirmPassword && <p className="text-danger">{errors.rConfirmPassword}</p> }
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default LoginScreen