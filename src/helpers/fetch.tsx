

const baseUrl= import.meta.env.VITE_APP_API_URL;

export const fetchSinToken=async(endpoint:string, data:any, method:string='GET'):Promise<any>=>{

    const url=`${baseUrl}/${endpoint}` //http://localhost:4000/api

    if(method === 'GET'){

        try {
            const petition=await fetch(url);
            const response= await petition.json();
            return response; 
            
        } catch (error) {
            return {
                ok:false,
                msg:`El error es: ${error}`
            }
        }

    }else{
        try {
            const petition= await fetch(url,{
                method:'POST', 
                body:JSON.stringify(data),
                headers: {'Content-Type': 'application/json',}
            })
            const response =await petition.json();
            return response;

        } catch (error) {
            return {
                ok:false,
                msg:`El error es: ${error}`
            }
        }
    }
}

export const fetchConToken=async(endpoint:any, data:any={}, method="GET")=>{

    const url=`${baseUrl}/${endpoint}`; //http://localhost:4000/api/auth/renew
    const token = localStorage.getItem('token') || '';

    if(method === 'GET'){
        try {
            const petition=await fetch(url,{
                method:'GET',
                headers:{'x-token':`${token}`}      //enviamos el token actual en los headers
            })                                      //para que el servidor reconozca la peticion
            const response= await petition.json();  //si esta vencido rechaza la petición.
            return response;                        //si no esta vencido la petición se procesa
                                                    // y se renueva el token
        } catch (error) {
            return {
                ok:false,
                msg:`El error es: ${error}`
            }
        }
    }
    
    if(method === 'POST' || method === 'PUT'){
        try {

            const petition=await fetch(url,{
                method:method,
                body:JSON.stringify(data),
                headers:{
                    'x-token':`${token}`,
                    'Content-Type': 'application/json'
                },
            })
            const response= await petition.json();
            return response;

             
        } catch (error) {
            return {
                ok:false,
                msg:`El error es: ${error}`
            }
        }
    }
    
    if(method=== 'DELETE'){

        try {

            const petition=await fetch(url,{
                method:method,
                headers:{
                    'x-token':`${token}`,
                    'Content-Type': 'application/json'
                },
            })
            const response= await petition.json();
            return response;

             
        } catch (error) {
            return {
                ok:false,
                msg:`El error es: ${error}`
            }
        }

    }

}

