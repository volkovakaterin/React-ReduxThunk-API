import React, {useState} from 'react';
import ServiceList from './components/ServiceList';
import ServiceAdd from './components/ServiceAdd';
import ChangeService from './components/ChangeService';
import {Routes, Route} from 'react-router-dom';

function App() {
  const [serviceID, setID] = useState('');
  const changeServiceID =(id)=>{
setID(id)}
  return ( 
    <>
    <Routes>
       <Route path = '/services' element={
       <>
       <ServiceAdd/>
       <ServiceList changeServiceID = {changeServiceID}/>
       </>
       }/>
       <Route path = {`/services/:${serviceID}`} element={<ChangeService serviceID = {serviceID}/>}/>
    </Routes>  
    </>
    
   
  );
}


export default App;


