import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const Header = ({ user }) => {
  const [navigationState, setNavigationState] = useState(true)

  const [dropDownState, setDropDownState] = useState(false)

  const navigationToggleHandler = () => {
    const doesShow = navigationState
    if (navigationState) {
      document.body.classList.add("sidebar-collapse")
    } else {
      document.body.classList.remove("sidebar-collapse")
    }
    setNavigationState(!doesShow)
  }

  const dropDownToggleHandler = () => {
    const doesShow = dropDownState
    if (dropDownState) {
      document.getElementById("dropDown").classList.add("show")
    } else {
      document.getElementById("dropDown").classList.remove("show")
    }
    setDropDownState(!doesShow)
  }
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            href="!#"
            onClick={(e) => {
              e.preventDefault()
              navigationToggleHandler()
            }}
          >
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link"
            href="!#"
            onClick={(e) => {
              e.preventDefault()
              dropDownToggleHandler()
            }}
          >
            <i className="fas fa-user"></i>
            {user && ` ${user.name}`}
          </a>
          <div id="dropDown" className="dropdown-menu dropdown-menu-right">
            <Link to="/profile" className="dropdown-item">
              <i className="fas fa-edit mr-2"></i> Edit Profile
            </Link>
            <div className="dropdown-divider"></div>
            <Link to="/logout" className="dropdown-item">
              <i className="fas fa-users mr-2"></i> Logout
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  )
}

Header.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, {})(Header)
