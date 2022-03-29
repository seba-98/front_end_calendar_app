import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../../redux-management/store/Store";
import {startLogOut} from '../../redux-management/actions/authActions';
import { cleanData } from "../../redux-management/actions/calendarActions";

const Navbar = () => {

  const{name} = useSelector((state:RootStore) => state.auth);
  const dispatch=useDispatch();

  const handleLogout = () =>{
     dispatch(cleanData());
     dispatch(startLogOut());
  }


  return (
    <div className="navbar navbar-dark bg-dark ">
        <span className="navbar-brand ms-3">
            {name}
        </span>

        <button className="btn btn-outline-danger me-3" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i><span> Salir</span>
        </button>
    </div>
  )
}

export default Navbar