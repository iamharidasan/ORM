import axios from "axios"
import { LOGIN_USER, REGISTER_USER, USER_LOAD, USER_ERROR } from "./types"
import { setAlert } from "./alert"
import setAuthToken from "../utils/setAuthToken"

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get("/api/users")
    dispatch({
      type: USER_LOAD,
      payload: res.data,
    })
  } catch (err) {
    dispatch(setAlert(err.message))
  }
}

//Login User
export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  }
  const body = {
    email: email,
    password: password,
  }
  try {
    const res = await axios.post("/api/users/login", body, config)
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    })
    dispatch(setAlert("Login Success", "success"))
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")))
    }
    dispatch({
      type: USER_ERROR,
    })
  }
}

//Register User
export const registerUser = (formData) => async (dispatch) => {
  const { name, email, password, repassword } = formData
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  }
  try {
    if (password !== repassword) {
      return dispatch(setAlert("Password does not match", "error"))
    }
    const body = {
      name: name,
      email: email,
      password: password,
    }
    const res = await axios.post("/api/users", body, config)
    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    })
    dispatch(setAlert("Registration Success", "success"))
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")))
    }
    dispatch({
      type: USER_ERROR,
    })
  }
}
