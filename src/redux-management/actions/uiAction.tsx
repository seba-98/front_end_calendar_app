import { types } from "../types";

export const openModal=()=>({
    type:types.uiOpenModal,
    payload:{modalOpen:true}
})
export const closeModal=()=>({
    type:types.uiCloseModal,
    payload:{modalOpen:false}
})