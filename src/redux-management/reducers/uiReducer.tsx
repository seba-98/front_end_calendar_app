import { types } from "../types";

interface defaultSateI{
    modalOpen:boolean
}

const defaultState: defaultSateI={
    modalOpen:false
}

export const uiReducer=(state:defaultSateI=defaultState, action:any):any=>{

    switch (action.type) {
        case types.uiOpenModal:
            return {modalOpen:true} 

        case types.uiCloseModal:
            return {modalOpen:false}     
    
        default:
            return state
    }

    

}