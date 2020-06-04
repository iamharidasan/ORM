import { combineReducers } from "redux"
import auth from "./auth"
import alert from "./alert"
import apps from "./apps"
import rtr from "./rtr"
import reply from "./reply"

export default combineReducers({
  auth,
  alert,
  apps,
  rtr,
  reply,
})
