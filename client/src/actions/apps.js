import axios from "axios"
import { setAlert } from "./alert"
import { GET_APPS, APPS_ERROR } from "./types"

export const getApps = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/app")
    dispatch({
      type: GET_APPS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({ type: APPS_ERROR })
    dispatch(setAlert(`Please review: ${err.message}`))
  }
}

export const storeApp = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-type": "application/json",
      },
    }
    const res = await axios.post("/api/app", formData, config)
    dispatch({
      type: GET_APPS,
      payload: res.data,
    })
    history.push("/apps")
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")))
    }
    dispatch({ type: APPS_ERROR })
  }
}
