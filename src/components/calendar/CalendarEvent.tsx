import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveEvent } from "../../redux-management/actions/calendarActions";
import { openModal } from "../../redux-management/actions/uiAction";
import { RootStore } from "../../redux-management/store/Store";

const CalendarEvent = ({event}:any) => {

  
  
    const{title, user, _id}=event;
    const {activeEvent} = useSelector((state:RootStore)=>state.calendar);
    const navigate=useNavigate();
    const dispatch= useDispatch();


    const handleSetActive=()=> {
      navigate(`?q=${_id}`);
      dispatch(setActiveEvent(event));
      dispatch(openModal());
    }

    const setStyle=():string | undefined=>{
      if(activeEvent){
        const {id}=activeEvent;
        if(id===_id){
          return'selectedEvent'
        }
    }
      else null
    }

  return (
    <div onClick={handleSetActive} className={setStyle()}>
        <span>{title}</span><br />
        <strong> - {user?.name}</strong>
    </div>
  )
}

export default CalendarEvent