import {
    CHANGE_SERVICE,
    FETCH_CHANGE_FAILURE,
    FETCH_CHANGE_SUCCESS,
    SAVE_CHANGE_SUCCESS,
    CHANGE_SERVICE_REQUEST
  } from './actions'
  
const initialState = {
    item: { name: '', value: '', content: ''},
    loading: true,
    error: null,
    upload: false
  };

export default function serviceChangeReducer(state = initialState, action) {
    switch (action.type) {
      case CHANGE_SERVICE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          upload: false
        };
      case FETCH_CHANGE_FAILURE:
        const {error} = action.payload;
        return {
          ...state,
          loading: false,
          error,
          upload: false
        };
      case FETCH_CHANGE_SUCCESS:
        const {item} = action.payload;
        return {
          ...state,
          item,
          loading: false,
          error: null,
        };
      case CHANGE_SERVICE:
        const {name, value, content} = action.payload;
        return {
            ...state,
            item: {
              name, value, content
            }
          };
      case SAVE_CHANGE_SUCCESS:
        return {
          ...state,
           upload: true};
        default:
          return state;
        }}