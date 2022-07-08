import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import { changeServiceField, addService } from '../redux/actionCreators';
import { nanoid } from 'nanoid';

const ServiceAdd = () => {
const {item, loading, error} = useSelector(state=>state.serviceAdd);
const dispatch = useDispatch();

  const handleChange = evt => {
    const {name, value} = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const id=nanoid();
    addService(dispatch, item.name, item.price, id);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='name' onChange={handleChange} value={item.name} />
      <input name='price' onChange={handleChange} value={item.price} />
      <button className='button-save' type='submit' disabled={loading}>Save</button>
      {error && <p>Something went wrong try again</p>}
    </form>
  );
}

export default ServiceAdd;





