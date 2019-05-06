import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, FETCH_CHARITY } from './types';

export const fetchUser = ()  =>  async dispatch => {    // can use because we have single argument in body
                                                        // Implies "return function(dispatch)
     const res = await axios.get('/api/current_user')

     dispatch({ type: FETCH_USER, payload: res.data });
    };


export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values );
    history.push('/surveys');
    dispatch ({type: FETCH_USER, payload: res.data});

};

export const fetchSurveys = () => async dispatch =>{
    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data});
};

//export const fetchCharity = () => async dispatch =>{
  //  const res = await axios.get('/api/returnCharity');

    //dispatch({ type: FETCH_CHARITY, payload: res.data});
//};