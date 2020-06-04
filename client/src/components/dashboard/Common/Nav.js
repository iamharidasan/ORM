import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Logo from "../../img/logo.png"
import { Link } from "react-router-dom"

const Nav = ({ user }) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/dashboard" className="brand-link">
        <img
          src={Logo}
          alt="ORM Tool"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">ORM Tool</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/apps" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>Apps</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/replies" className="nav-link">
                <i className="nav-icon fas fa-reply-all"></i>
                <p>Replies</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

Nav.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, {})(Nav)
