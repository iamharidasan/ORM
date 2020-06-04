import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Logo from "../img/logo.png"

const Landing = () => {
  useEffect(() => {
    document.body.classList.add("login-page")
    return () => {
      document.body.classList.remove("login-page")
    }
  }, [])
  return (
    <div className="login-box">
      <div className="card">
        <div className="card-body register-card-body">
          <p className="login-box-msg">
            <img src={Logo} alt="Chatbot Dashboard" width="40" height="40" />{" "}
            ORM Tool Dashboard
          </p>
          <div className="text-center">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>{" "}
            <Link to="/register" className="btn btn-success">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
