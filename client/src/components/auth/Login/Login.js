import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, Redirect } from "react-router-dom"
import { loginUser } from "../../../actions/auth"
import { connect } from "react-redux"

const Login = ({ loginUser, isAuthenticated }) => {
  useEffect(() => {
    document.body.classList.add("login-page")
    return () => {
      document.body.classList.remove("login-page")
    }
  }, [])

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const onChangeHandler = (e) =>
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })

  const { email, password } = loginData

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="login-box">
      <div className="login-logo">
        <Link to="/">
          <b>Social Beat</b> ORM Tool
        </Link>
      </div>
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>

          <form
            action=""
            method="post"
            onSubmit={(e) => {
              e.preventDefault()
              loginUser(email, password)
            }}
          >
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => onChangeHandler(e)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChangeHandler(e)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
            </div>
          </form>

          <p className="mb-1">
            <Link to="/forgot-password">I forgot my password</Link>
          </p>
          <p className="mb-0">
            <Link to="/register" className="text-center">
              Register as a new User
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { loginUser })(Login)
