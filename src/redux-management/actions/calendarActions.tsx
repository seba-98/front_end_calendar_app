import moment from "moment";
import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";
import { activeEventI, entryEvent } from "../../helpers/interfaces";
import { types } from "../types";



export const eventStartAddNew=(event:any)=>{
    return async(dispatch:any)=>{

        const data=await fetchConToken('events/createEvent', event, 'POST');
       
         if(data.ok){
            Swal.fire('Evento creado', data.event.title, 'success');
            return dispatch(setNewEvent({
                ...data.event,
                start:moment(data.event.start).toDate(),
                end:moment(data.event.end).toDate()
            }));
         }
         else{
             return Swal.fire('Error al crear el evento', data.event.title, 'success');
         }
    }
}

export const startGetEvents=()=>{
    
    return async(dispatch:any)=>{
        const data=await fetchConToken('events/getEvents');
        
        if(data.ok){
            return dispatch(getEvents(data.events));
        }
        else{
            console.log(data.msg);
        }
    }
}

export const startUpdateEvent=(event:any, id:any)=>{

    return async(dispatch:any)=>{
        const data=await fetchConToken(`events/updateEvent/${id}`, event, 'PUT');

        if(data.ok){
            Swal.fire('Evento actualizado', '', 'success');
            return dispatch(eventUpdated({
                ...data.event,
                start:moment(data.event.start).toDate(),
                end:moment(data.event.end).toDate()
            }));
        }
        else{
            Swal.fire('Error al actualizar el evento', data.msg, 'error');
        }
    }
}

export const startDeleteEvent=(id:any)=>{

    return async(dispatch:any)=>{

        const resp = await Swal.fire({
            title: '¿Quiere eliminar el evento?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            }
        });

        if(resp.isConfirmed){
            const data= await fetchConToken(`events/deleteEvent/${id}`, {}, 'DELETE');

            
           if(data.ok){

               const Toast = Swal.mixin({
                   toast: true,
                   position: 'top-end',
                   showConfirmButton: false,
                   timer: 3000,
                   timerProgressBar: true,
                   didOpen: (toast) => {
                     toast.addEventListener('mouseenter', Swal.stopTimer)
                     toast.addEventListener('mouseleave', Swal.resumeTimer)
                   }
                 })
                 
                 Toast.fire({
                   icon: 'success',
                   title: 'Evento eliminado'
                 })
                 dispatch(eventDeleted(data.event));
                 
                }else{
                    Swal.fire(data.msg,'', 'error');
                    dispatch(setActiveEvent(null));
                }
                
        }
    }
}


 export const setActiveEvent=(event:activeEventI | null ) => ({
    type:types.eventSetActive,
    payload:event
})
 const setNewEvent=(event:entryEvent) => ({
    type:types.eventAddNew,
    payload:event
})

 const eventUpdated=(event:entryEvent)=>({
    type:types.eventUpdated,
    payload:event
})
 const getEvents=(events:any)=>({
    type:types.eventsGet,
    payload:events
})

 const eventDeleted=(event:entryEvent)=>({
     type:types.eventDeleted,
     payload:event
})

export const cleanData=()=>({type: types.cleanData})