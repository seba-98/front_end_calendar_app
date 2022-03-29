import {EventLoading, UserLoading, RegisterLoading} from '../helpers/interfaces';
import{useState, ChangeEvent} from 'react'

type fieldChange = ChangeEvent< HTMLInputElement | HTMLTextAreaElement >;


export const useForm = (initialState:EventLoading | UserLoading | RegisterLoading): any[] => {

    const [formValues, setFormValues] = useState(initialState);

    const handleChange=({target:{name, value}}:fieldChange):void => {
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleReset=():void=>{
        setFormValues(initialState);
    }

    return [formValues, handleChange, handleReset, setFormValues];
 
}
