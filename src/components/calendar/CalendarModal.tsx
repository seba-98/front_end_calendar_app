import  { useState, SyntheticEvent, useEffect } from 'react'
import Swal  from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment';
import Modal from 'react-modal';
import { useForm } from '../../hooks/useForm';

//------redux--------------
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux-management/actions/uiAction';
import { eventStartAddNew, startUpdateEvent } from '../../redux-management/actions/calendarActions';

//-----------helpers----------------------
import { EventLoading } from '../../helpers/interfaces';
import {customStyles, now, nowPlus1} from '../../helpers/CalendarItems';
import { useNavigate } from 'react-router-dom';
import { useQueryParameters } from '../../hooks/useQueryParameters';

Modal.setAppElement('#root');

const CalendarModal = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const query= useQueryParameters();  


    //-------STATE DATA--------------------------------
    const {modalOpen}=useSelector((state:any)=>state.ui);
    const {activeEvent}=useSelector((state:any)=>state.calendar);

  
    const [ dateStart, setDateStart ] = useState<any>(moment(now).format('YYYY/MM/DD hh:mm A'));
    const [ dateEnd, setDateEnd ] = useState<any>(moment(nowPlus1).format('YYYY/MM/DD hh:mm A'));
    

    useEffect(() => {

      if(activeEvent !== null){

        const {start, end}=activeEvent;
        setDateStart(moment(start).format('YYYY/MM/DD hh:mm A'));
        setDateEnd(moment(end).format('YYYY-MM-DD hh:mm A') );
        setFormValues(activeEvent)
      }
      else{
        setDateStart( moment(now).format('YYYY/MM/DD hh:mm A'));
        setDateEnd( moment(nowPlus1).format('YYYY/MM/DD hh:mm A'));
        setFormValues(initFormValues)
      }
     
    }, [activeEvent])

    //----------------USEFORM HOOK-----------------------

    const initFormValues={
      title: '',
      notes:'',
      start: moment(dateStart).toDate(),
      end:moment(dateEnd).toDate(),
    }


    const [formValues,handleInputChange, , setFormValues]=useForm(initFormValues);
    const {title, notes, start, end}:EventLoading=formValues;


  
  //-------------MODAL FUNCTIONS---------------
  const handleCloseModal=()=>{
    setFormValues(initFormValues);
    dispatch(closeModal());
    navigate('/calendar');
  }
  
  


    //-----------SUBMIT FUNC--------------------------------------------------------
    const handleSubmit = (e:SyntheticEvent)=>{
      e.preventDefault();
      const momentStart = moment(start);
      const momentEnd = moment(end);

      let validateBody= notes.trim().length < 1;
      let validateTitle = notes.trim().length < 1;

      if(momentStart.isSameOrAfter(momentEnd)){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha de inicio no puede ser mayor o igual a la de finalización',
        })
      }

      if(!validateBody && !validateTitle && activeEvent){
        dispatch(startUpdateEvent(formValues, query))
        dispatch(closeModal()); //cerramos el modal
      };
      if(!validateBody && !validateTitle && !activeEvent){
        dispatch(eventStartAddNew(formValues))
        dispatch(closeModal()); //cerramos el modal
      }; 
      setDateStart(now)    //reestablecemos la fecha de inicio del modal
      setDateEnd(nowPlus1) //reestablecemos la fecha de fin del modal

      handleCloseModal();
    }


    const dateStartChange=({target}:any)=>{
      const value=moment(target.value).format('YYYY/MM/DD hh:mm A');
      setDateStart(value);
      setFormValues({...formValues, start:moment(value).toDate() });

    }
    const dateEndChange=({target}:any)=>{
      const value=moment(target.value).format('YYYY/MM/DD hh:mm A');
      setDateEnd(value);
      setFormValues({...formValues, end:moment(value).toDate()});
    }

  
    return (
      <div >
         <Modal
          isOpen={modalOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
          closeTimeoutMS={500}
          className="modal"
          overlayClassName="modal-fondo"
          contentLabel="Example Modal"
        > 
          <h1> {!activeEvent ? 'Nuevo evento' : activeEvent.title} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>

                <div className="form-group mb-3">

                  <div className='infoDateModal'>
                    <label>Inicio: </label>
                    <span>{moment(dateStart).format('A')}</span>
                  </div>

                  <input type="datetime-local" onChange={dateStartChange} value={moment(dateStart).format('YYYY-MM-DDThh:mm')}></input>
                 <div className='infoDateModal'>
                    <label>Fin: </label>
                    <span>{moment(dateEnd).format('A')}</span>
                 </div>
                  <input type="datetime-local" onChange={dateEndChange} value={moment(dateEnd).format('YYYY-MM-DDThh:mm')}></input>
                </div> 

                <hr />
                <div className="form-group mb-3">
                  <label>Titulo y notas</label>
                  <input 
                    value={title?title:''}
                    type="text" 
                    className={`form-control ${title?.trim().length < 1 && 'is-invalid'}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                  <textarea 
                    className={`form-control ${notes?.trim().length < 1 && 'is-invalid'}`}
                    placeholder="Notas"
                    rows={5}
                    name="notes"
                    value={notes}
                    onChange={handleInputChange}
                  ></textarea>
                  <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>


                <button
                  type="submit"
                  className="btn btn-outline-primary btn-block"
                >
                  <i className="far fa-save"></i>
                  <span> Guardar</span>
                </button>

                
            </form>
         </Modal> 
      </div>
    );
}

export default CalendarModal