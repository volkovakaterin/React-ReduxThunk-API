import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { changeFethService, saveChangeService, changeServiceRequest } from '../redux/actionCreators';
import { Link, Navigate } from 'react-router-dom';

const ChangeService= (props) => {
const {item, loading, error} = useSelector(state=>state.serviceChange);
const dispatch = useDispatch();
const stateItem = useSelector(state=>state.serviceChange);
const [inputName, setInputName] = useState(stateItem.item.name);
const [inputPrice, setInputPrice] = useState(stateItem.item.value);
const [inputContent, setInputContent] = useState(stateItem.item.content);
const [successfulUpload, setUpload] = useState('false');

useEffect(() => {
    changeFethService(dispatch, props.serviceID);
    setInputName(stateItem.item.name);
    setInputPrice(stateItem.item.value);
    setInputContent(stateItem.item.content)
    setUpload(stateItem.upload)
  }, [dispatch, props.serviceID, stateItem.item.content, stateItem.item.name, stateItem.item.value, stateItem.upload])

  const handleCancel = evt=> {
   dispatch(changeServiceRequest());
  }

  const handleSave = evt=> {
    dispatch(saveChangeService(dispatch, inputName, inputPrice, inputContent, props.serviceID))   
  }

  if (loading) {
    return (<div className='loading'></div>)
  }

  if (error) {
    return (<div className='block-error'><p>Произошла ошибка!</p></div>);
  }

  if(successfulUpload) {
    return <Navigate to="/services" />
    }
  
  let inputs;
  if(typeof item === 'object'){
    inputs =
    <>
    <form>
      <label className='label-change'>Название<input className='input-change' type = 'text' name='name' required onChange={e=>setInputName(e.target.value)} value={inputName} /></label>
      <label className='label-change'>Стоимость<input className='input-change' type = 'number' name='value' required onChange={e=>setInputPrice(e.target.value)} value={inputPrice} /></label>
      <label className='label-change'>Описание<input className='input-change' type = 'text' name= 'content' onChange={e=>setInputContent(e.target.value)} value={inputContent}/></label>
    </form> 
    <Link to={`/services`}>
      <button className='button-change-cancel' onClick={() => handleCancel()}>Отмена</button>
    </Link>
    {/* <Link to={`/services`}> */}
     <button className='button-change-save' onClick={() => handleSave()}>Сохранить</button> 
    {/* </Link> */}
    </>
  }
  return ( 
    <div className='block-change'>
    {inputs}
    </div>          
  )
}
export default ChangeService;