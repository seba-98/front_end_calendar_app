import { types } from "../types";
import { initialStateCalendarI} from '../../helpers/interfaces';
import moment from "moment";


const initialState:initialStateCalendarI={
    events:[],
    activeEvent:null
}

export const calendarReducer=(state= initialState, action:any)=>{

    switch (action.type) {

        case types.eventSetActive:
            return {...state, activeEvent:action.payload}

        case types.eventAddNew:
            return {
                ...state,
                events:[...state.events, action.payload]
            }
        case types.eventUpdated:

            return {
                ...state,
                events:state.events.map(
                    e =>(e._id === action.payload._id) 
                    ? 
                    action.payload : e
                )
            }
        case types.eventsGet:
            return{
                ...state,
                events:action.payload.map((e:any)=>({
                    ...e,
                    start: moment(e.start).toDate(),  //al traer los eventosd, la fecha de inicio y final
                    end: moment(e.end).toDate(),       //deben ser cambiadas a fecha de javascript
                  }))                                   //ya que react big calendar no utiliza objetos de moment
            }
        case types.eventDeleted:
            return{
                activeEvent:null,
                events:state.events.filter(
                    e=>e._id !== action.payload._id && e
                )
            }

        case types.cleanData:
            return initialState;  
    
        default:
            return state;
    }

}