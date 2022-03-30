import { Calendar, dateFnsLocalizer, Event, View } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import es from 'date-fns/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Navbar from '../ui/Navbar'
import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'

//imports helpers
import { Style } from '../../helpers/interfaces';
import { messages } from '../../helpers/calendar-messages';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddNewFab from '../ui/AddNewFab'
import DeleteFab from '../ui/DeleteFab'
import { setActiveEvent } from '../../redux-management/actions/calendarActions'


const locales = {'es': es,}
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales,})



const CalendarScreeen = () => {

  const {events} = useSelector((state:any) =>state.calendar);
  const {activeEvent}=useSelector((state:any)=>state.calendar);
  const {uid}=useSelector((state:any)=>state.auth);
  const dispatch= useDispatch();



  
  const getLastView=():View=>{
    switch (localStorage.getItem('lastView')) {
      case 'month':
        return 'month'
      case 'week':
        return 'week'
      case 'day':
        return 'day'
      case 'agenda':
        return 'agenda'
      default:
        return 'month';
    }
  }


  
  const [lastView, setLastView] = useState<View>(getLastView());
  


  const onSelectEvent = (e:Event ):void => {
  }
  const onViewChange=(e:View) => {
    localStorage.setItem('lastView', e);
    setLastView(e)
  }
  const selectSlot=()=>{
    dispatch(setActiveEvent(null))
  }


  const eventStyleGetter=( event:any, start:any, end:any, isSelected:any):object => {

    const equal= event.user._id===uid;

    const style:Style={
      backgroundColor:`${equal ? '#367CF7' : 'grey'}`,
      borderRadius:'0px',
      opacity:0.8,
      display:'block',
      color:'white'
    }
   
      return {style};
  }


  return (
    <div className="calendar-screen">
      <Navbar />
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={events}
          style={{ height: 500 }}
          messages={messages}
          culture='es'
          eventPropGetter={eventStyleGetter} 
          components={{ event:CalendarEvent }}
          onSelectEvent={onSelectEvent}
          onSelectSlot={selectSlot}
          selectable={true}
          onView={onViewChange}
          view={lastView}
      />

      <AddNewFab />
      <CalendarModal/>
      {activeEvent&&
        <DeleteFab />
      }

      
    </div>
  )
}

export default CalendarScreeen