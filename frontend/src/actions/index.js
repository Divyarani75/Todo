import axios from "axios";

import { serviceData } from '../constants/defaultValues';

export const loginAction = (body) => dispatch => {

  return axios
  .post(serviceData+"api/login", body)
  .then((data) => {  

    //console.log(data,"datadata")

    if (data.data.success && data.data.token) {
      return dispatch({
        type: "LOGIN_ACTION_SUCCESS",
        payload: data.data.token
      })
    }
    else {
      return dispatch({
        type: "LOGIN_ACTION_FAIL",
        payload: data
      })
    }

  }).catch((err) => {
    console.error(err)
  });


  
}

//{"success":false,"message":"Error: Account already exist"}
export const signupAction = (body) => dispatch => {


  return axios
            .post(serviceData+"api/signup", body)
            .then((data) => {  
              if (data.data.success) {
                return dispatch({
                  type: "SIGNUP_ACTION_SUCCESS",
                  payload: data.data
                })
              }
              else {
                return dispatch({
                  type: "SIGNUP_ACTION_FAIL",
                  payload: data.data
                })
              }

            }).catch((err) => {
              console.error(err)
            });

  
}

export const getUserAction = (email, token) => dispatch => {
  return fetch("/api/users/" + email, {
    method: 'GET',
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
      "x-access-token": token
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: "GET_USER_ACTION",
        payload: data
      })
    })
    .catch(e => console.error(e))
}

export const updateUserAction = (form_data, token) => dispatch => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
      "x-access-token": token
    },
    body: JSON.stringify(form_data)
  })
    .then(res => res.json())
    .then(data => {
      return dispatch({
        type: "UPDATE_USER_ACTION",
        payload: form_data
      })
    })
    .catch(e => console.error(e))
}
