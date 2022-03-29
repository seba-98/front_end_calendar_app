import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQueryParameters } from '../../hooks/useQueryParameters';
import { startDeleteEvent } from '../../redux-management/actions/calendarActions';
import { closeModal } from '../../redux-management/actions/uiAction';

const DeleteFab = () => {

    const dispatch= useDispatch();
    const query=useQueryParameters();
    const navigate= useNavigate();

    const handleDelete=()=>{
        dispatch(startDeleteEvent(query));
        dispatch(closeModal());
        navigate('/calendar')
      }

  return (
    <button className="fab-danger" onClick={handleDelete}>
        <i className="fa-solid fa-trash-can"></i>
    </button>
  )
}

export default DeleteFab