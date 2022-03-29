import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveEvent } from '../../redux-management/actions/calendarActions';
import { openModal } from '../../redux-management/actions/uiAction'

const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleOpenModal = (e:MouseEvent ):void => {
      dispatch(setActiveEvent(null))
      dispatch(openModal())
    }
  

  return (
    <button 
        className="btn btn-primary fab" 
        onClick={handleOpenModal}
        style={{zIndex:'1000'}}
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}

export default AddNewFab

