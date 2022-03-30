import  { useState, SyntheticEvent, useEffect } from 'react'
import Swal  from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment';
import DatePicker from 'react-datetime';
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

  
    const [ dateStart, setDateStart ] = useState<Date>(  now.toDate() );
    const [ dateEnd, setDateEnd ] = useState<Date>( nowPlus1.toDate() );
    
    // const [dateStartOpen, setDateStartOpen] = useState<boolean>(false);
    // const [dateEndOpen, setDateEndOpen] = useState<boolean>(false);


    //----------------USEFORM HOOK-----------------------

    const initFormValues={
      title: '',
      notes:'',
      start: dateStart,
      end:dateEnd,
    }


    const [formValues,handleInputChange, , setFormValues]=useForm(initFormValues);
    const {title, notes, start, end}:EventLoading=formValues;

    

    useEffect(() => {

      if(activeEvent !== null){

        const {start, end}=activeEvent;
        setDateStart(start );
        setDateEnd(end);

        setFormValues(activeEvent)
      }
      else{
        setDateStart(now.toDate());
        setDateEnd(nowPlus1.toDate());
        setFormValues(initFormValues)
      }
     
    }, [activeEvent])
    


  //-------------MODAL FUNCTIONS---------------
  const handleCloseModal=()=>{
    setFormValues(initFormValues);
    dispatch(closeModal());
    navigate('/calendar');
  }
  
  
  //-------------DATEPICKER OPEN-CLOSE FUNCTIONS---------------
  //   const openStartDate=()=>setDateStartOpen(!dateStartOpen);
  //   const openEndDate=()=>setDateEndOpen(!dateEndOpen);

  // //---------DATE FUNCTIONS---------------
  //   const handleStartDateChange = ( e:any ) =>{ 
  //     setDateStart( e.toDate() );
  //     setFormValues({
  //       ...formValues,
  //       start:e.toDate()
  //     })
  //   };
  //   const handleEndtDateChange = ( e:any ) =>  {
  //     setDateEnd( e.toDate() );
  //     setFormValues({
  //       ...formValues,
  //       end:e.toDate()
  //     })
  //   };


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
      setDateStart(now.toDate())    //reestablecemos la fecha de inicio del modal
      setDateEnd(nowPlus1.toDate()) //reestablecemos la fecha de fin del modal

      handleCloseModal();
    }

    const yesterday = moment(dateStart).subtract(1, 'day')
    const valid = ( current:any ) => current.isAfter( yesterday );

    
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
          <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>



                 <div className="form-group mb-3">
                  <label className='date-open' >
                    INICIO:
                    <span>{moment(dateStart).format("DD/MM/YYYY/ LT")}</span>
                    <i className="fa-solid fa-bars"></i>
                  </label>
                  
                  <div >
                    <DatePicker
                    inputProps={{style: { width: 250, background: 'black', color: 'white', cursor: 'pointer'}}}
                    value={ dateStart }
                    dateFormat="DD-MM-YYYY"
                    timeFormat="hh:mm A"
                    closeOnSelect= { true }
                    closeOnClickOutside={ true }
                    className="picker"
                  />
                  </div>
                </div>

                <div className="form-group mb-3">

                    <label className='date-open' >
                      FIN:
                      <span>{moment(dateEnd).format("DD/MM/YYYY/ LT")}</span>
                      <i className="fa-solid fa-bars"></i>
                    </label>

                    <div >
                      <DatePicker
                        inputProps={{style: { width: 250, background: 'black', color: 'white', display:''}}}
                        value={ dateEnd }
                       
                        dateFormat="DD-MM-YYYY"
                        timeFormat="hh:mm A"
                        closeOnSelect= { true }
                        closeOnClickOutside={ true }
                        isValidDate= {valid}
                        className="picker"
                      />
                    </div>
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