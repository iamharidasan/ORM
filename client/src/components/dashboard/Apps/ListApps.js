import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { useEffect } from "react"
import Moment from "react-moment"
import Header from "../Common/Header"
import Nav from "../Common/Nav"
import Breadcrumb from "../Common/Breadcrumb"
import Footer from "../Common/Footer"
import Loader from "../../loader/Loader"
import { getApps } from "../../../actions/apps"

const ListApps = ({ apps, loading, getApps }) => {
  useEffect(() => {
    getApps()
  }, [getApps])

  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <div className="content-wrapper">
        <Breadcrumb title="Apps" />
        <section className="content">
          {loading ? (
            <Loader />
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">List of Apps</h3>
                      <div className="card-tools">
                        <Link className="btn btn-success" to="/add-app">
                          Add a New App
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-hover table-bordered table-stripped">
                        <thead>
                          <tr>
                            <th>App Name</th>
                            <th>Client Email</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {apps ? (
                            apps.map((app) => (
                              <tr key={app._id}>
                                <td>{app.appName}</td>
                                <td>{app.clientEmail}</td>
                                <td>
                                  <Moment format="DD/MM/YYYY hh:mm A">
                                    {app.date}
                                  </Moment>
                                </td>
                                <td>
                                  <Link
                                    to={`/view-reviews/${app._id}`}
                                    className="btn btn-info"
                                  >
                                    <i className="fas fa-star"></i> View Reviews
                                  </Link>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" align="center">
                                No Apps
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  )
}

ListApps.propTypes = {
  apps: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getApps: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
  loading: state.apps.loading,
})

export default connect(mapStateToProps, { getApps })(ListApps)
