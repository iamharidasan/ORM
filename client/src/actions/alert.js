import { SHOW_ERROR, REMOVE_ERROR } from "./types"
import { v4 } from "uuid"

export const setAlert = (msg, alertType = "error", timeout = 5000) => (
  dispatch
) => {
  const id = v4()
  dispatch({
    type: SHOW_ERROR,
    payload: { msg, alertType, id },
  })
  setTimeout(() => dispatch({ type: REMOVE_ERROR, payload: id }), timeout)
}
