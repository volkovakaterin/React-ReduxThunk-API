import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { fetchServices, deleteService, changeServiceRequest } from '../redux/actionCreators';
import { ReactComponent as EditButton } from '../svg/edit.svg';
import { ReactComponent as DeleteButton } from '../svg/cancel.svg';
import {Link} from 'react-router-dom';

const ServiceList = (props) => {
const {items, loading, error} = useSelector(state=>state.serviceList);
const dispatch = useDispatch();

  useEffect(() => {
    fetchServices(dispatch);
    dispatch (changeServiceRequest());
  }, [dispatch])

  const handleRemove = id => {
    deleteService(dispatch, id);
  }

  const handleEdit = id => {
    props.changeServiceID(id);
  }

  if (loading) {
    return (<div className='loading'></div>)
    
  }

  if (error) {
    return (<div className='block-error'><p>Произошла ошибка!</p></div>)
  }

  return (
    <ul>
      {items.map(o => (
        <li key={o.id}>
          {o.name} {o.value}
          <Link to={`/services/:${o.id}`}>
            <button className='button-edit' onClick={() => handleEdit(o.id)}><EditButton/></button>
          </Link>
          <button className='button-delete' onClick={() => handleRemove(o.id)}><DeleteButton/></button>
        </li>
      ))}
    </ul>
  );
}
export default ServiceList;