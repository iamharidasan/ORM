import { GET_REVIEWS, ERROR_REVIEWS, ERROR_REVIEW, GET_REVIEW } from "./types"
import axios from "axios"
import { setAlert } from "./alert"

export const getReviews = (id) => async (dispatch) => {
  try {
    const resp = await axios.get(`/api/rtr/${id}`)
    dispatch({
      type: GET_REVIEWS,
      payload: resp.data.reviews,
    })
  } catch (err) {
    dispatch({
      type: ERROR_REVIEWS,
    })
    setAlert("Somewthing went wrong")
  }
}

export const getReview = (id, reviewId) => async (dispatch) => {
  try {
    const resp = await axios.get(`/api/rtr/review/${id}/${reviewId}`)
    dispatch({
      type: GET_REVIEW,
      payload: resp.data,
    })
  } catch (err) {
    dispatch({
      type: ERROR_REVIEW,
    })
    setAlert("Somewthing went wrong")
  }
}

export const postReply = (formData, history) => async (dispatch) => {
  try {
    const { id } = formData
    const config = {
      header: {
        "Content-type": "application/json",
      },
    }
    await axios.post("/api/rtr", formData, config)
    history.push(`/view-reviews/${id}`)
  } catch (err) {
    setAlert("Somewthing went wrong")
  }
}
