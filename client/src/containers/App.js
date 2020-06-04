import React, { Fragment, useEffect } from "react"
import "./App.css"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import store from "../store"
import setAuthToken from "../utils/setAuthToken"

import Register from "../components/auth/Register/Register"
import Login from "../components/auth/Login/Login"
import Landing from "../components/Landing/Landing"
import ForgotPassword from "../components/auth/ForgotPassword/ForgotPassword"
import Alert from "../components/Alert"
import { loadUser } from "../actions/auth"
import Dashboard from "../components/dashboard/Dashboard"
import ListApps from "../components/dashboard/Apps/ListApps"
import ListReviews from "../components/dashboard/Apps/Reviews/ListReviews"
import ReplyReview from "../components/dashboard/Apps/Reviews/ReplyReview"
import ListReplies from "../components/dashboard/Replies/ListReplies"
import CreateReply from "../components/dashboard/Replies/CreateReply"
import AddApp from "../components/dashboard/Apps/AddApp"
import EditReply from "../components/dashboard/Replies/EditReply"

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"))
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/apps" component={ListApps} />
            <Route exact path="/add-app" component={AddApp} />
            <Route exact path="/view-reviews/:id" component={ListReviews} />
            <Route
              exact
              path="/reply-review/:id/:reviewid"
              component={ReplyReview}
            />
            <Route exact path="/replies" component={ListReplies} />
            <Route exact path="/create-reply" component={CreateReply} />
            <Route exact path="/edit-reply/:id" component={EditReply} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
