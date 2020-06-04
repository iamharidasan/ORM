import React, { useEffect } from "react"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
  useEffect(() => {
    document.body.classList.add("login-page")
    return () => {
      document.body.classList.remove("login-page")
    }
  }, [])
  return (
    <div class="login-box">
      <div class="login-logo">
        <Link to="/">
          <b>Social Beat</b> Chatbot
        </Link>
      </div>
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">
            You forgot your password? Here you can easily retrieve a new
            password.
          </p>

          <form action="recover-password.html" method="post">
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Email" />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button type="submit" class="btn btn-primary btn-block">
                  Request new password
                </button>
              </div>
            </div>
          </form>

          <p class="mt-3 mb-1">
            <Link to="/login">Login</Link>
          </p>
          <p class="mb-0">
            <Link to="/register" class="text-center">
              Register a new membership
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
