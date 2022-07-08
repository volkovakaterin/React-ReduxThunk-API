import {FETCH_SERVICES_FAILURE, FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, CHANGE_SERVICE_FIELD, REMOVE_SERVICE, ADD_SERVICE_REQUEST, ADD_SERVICE_FAILURE, ADD_SERVICE_SUCCESS, CHANGE_SERVICE, FETCH_CHANGE_SUCCESS, FETCH_CHANGE_FAILURE, SAVE_CHANGE_SUCCESS, CHANGE_SERVICE_REQUEST} from "./actions";

export const fetchServicesRequest = () => ({
    type: FETCH_SERVICES_REQUEST,
  });
  
export const fetchServicesFailure = error => ({
    type: FETCH_SERVICES_FAILURE,
    payload: {
      error,
    },
  });
  
export const fetchServicesSuccess = items => ({
    type: FETCH_SERVICES_SUCCESS,
    payload: {
      items,
    },
  });
  
export const addServiceRequest = (name, price) => ({
    type: ADD_SERVICE_REQUEST,
    payload: {
      name,
      price,
    },
  })
  
export const addServiceFailure = error => ({
    type: ADD_SERVICE_FAILURE,
    payload: {
      error,
    },
  });
  
export const addServiceSuccess = () => ({
    type: ADD_SERVICE_SUCCESS,
  });
  
export const changeServiceRequest = ()=>({
  type: CHANGE_SERVICE_REQUEST
})

export const changeServiceField = (name, value) => ({
    type: CHANGE_SERVICE_FIELD,
    payload: {
      name,
      value,
    },
  });

  export const changeService = (name, value, content) =>({
    type: CHANGE_SERVICE,
    payload: {
        name,
        value,
        content
    }
  });
 
  export const fetchChangeFailure = error => ({
    type: FETCH_CHANGE_FAILURE,
    payload: {
      error,
    },
  });

  

  export const fetchChangeSuccess = item => ({
    type: FETCH_CHANGE_SUCCESS,
    payload: {
      item,
    },
  });

  export const changeFethService = async (dispatch, id) =>{
    try {
      const response = await fetch(`http://localhost:8000/services/:${id}`)
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(fetchChangeSuccess(data));
    } catch (e) {
      dispatch(fetchChangeFailure(e.message));
    } 
  }
  
export const saveChangeSuccess = () =>({
    type: SAVE_CHANGE_SUCCESS,
  })

export const saveChangeService = async(dispatch, name, value, content, id)=>{
    dispatch(changeServiceRequest());
    try {
      const response = await fetch('http://localhost:8000/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, value, content, id}),
      })
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      dispatch(saveChangeSuccess());
    } catch (e) {
      dispatch(fetchChangeFailure(e.message));
    }
  }
  
  export const removeService = id => ({
    type: REMOVE_SERVICE,
    payload: {
      id,
    },
  });

export const fetchServices = async dispatch => {
    dispatch(fetchServicesRequest());
    try {
      const response = await fetch('http://localhost:8000/services')
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(fetchServicesSuccess(data));
    } catch (e) {
      dispatch(fetchServicesFailure(e.message));
    }
  }
  
export const addService = async (dispatch, name, price, id) => {
    dispatch(addServiceRequest());
    try {
      const response = await fetch('http://localhost:8000/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, value: price, id, content: ''}),
      })
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      dispatch(addServiceSuccess());
    } catch (e) {
      dispatch(addServiceFailure(e.message));
    }
    fetchServices(dispatch);
  }

  export const deleteService = async (dispatch, id) => {
    dispatch(removeService(id));
    try {
    const response = await fetch(`http://localhost:8000/services/:${id}`, {
      method: 'DELETE',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      body: JSON.stringify(id)  
    })
    if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(fetchServicesSuccess(data));
    } catch (e) {
        dispatch(fetchServicesFailure(e.message));
      }
  }