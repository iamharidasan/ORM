import { GET_REPLIES, ERROR_REPLIES, GET_REPLY, ERROR_REPLY } from "./types"
import axios from "axios"
import { setAlert } from "./alert"

//Get Replies using User ID
export const getReplies = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/replies")
    dispatch({
      type: GET_REPLIES,
      payload: res.data,
    })
  } catch (err) {
    setAlert("Something went wrong")
    dispatch({
      type: ERROR_REPLIES,
    })
  }
}

//Get Reply using ID
export const getReply = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/replies/${id}`)
    dispatch({
      type: GET_REPLY,
      payload: res.data,
    })
  } catch (err) {
    setAlert("Something went wrong")
    dispatch({
      type: ERROR_REPLY,
    })
  }
}
// Post Reply
export const addReply = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-type": "application/json",
      },
    }
    await axios.post("/api/replies", formData, config)
    history.push("/replies")
  } catch (err) {
    setAlert("Seomething went wrong")
    dispatch({
      type: ERROR_REPLIES,
    })
  }
}

// Edit Reply
export const editReply = (formData, id, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-type": "application/json",
      },
    }
    await axios.post(`/api/replies/${id}`, formData, config)
    history.push("/replies")
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)))
    } else {
      dispatch(setAlert("Seomething went wrong"))
    }
    dispatch({
      type: ERROR_REPLIES,
    })
  }
}
