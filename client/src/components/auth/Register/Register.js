import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, Redirect } from "react-router-dom"
import { registerUser } from "../../../actions/auth"
import { connect } from "react-redux"

const Register = ({ registerUser, isAuthenticated }) => {
  useEffect(() => {
    document.body.classList.add("register-page")
    return () => {
      document.body.classList.remove("register-page")
    }
  }, [])
  const [regFormData, setRegFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  })
  const { name, email, password, repassword } = regFormData

  const onChangeHandler = (e) => {
    setRegFormData({
      ...regFormData,
      [e.target.name]: e.target.value,
    })
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="register-box">
      <div className="register-logo">
        <Link to="/">
          <b>Social Beat</b> ORM Tool
        </Link>
      </div>

      <div className="card">
        <div className="card-body register-card-body">
          <p className="login-box-msg">Register a new user</p>

          <form
            action=""
            method="post"
            onSubmit={(e) => {
              e.preventDefault()
              registerUser(regFormData)
            }}
          >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                name="name"
                value={name}
                onChange={(e) => onChangeHandler(e)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>
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
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Retype password"
                name="repassword"
                value={repassword}
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
                  Register
                </button>
              </div>
            </div>
          </form>

          <Link to="/login" className="text-center">
            I already have an account
          </Link>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { registerUser })(Register)
