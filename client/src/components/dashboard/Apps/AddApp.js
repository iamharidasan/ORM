import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { storeApp } from "../../../actions/apps"
import Header from "../Common/Header"
import Nav from "../Common/Nav"
import Breadcrumb from "../Common/Breadcrumb"
import Footer from "../Common/Footer"
import { withRouter } from "react-router-dom"

const AddApp = ({ storeApp, history }) => {
  const [formData, setFormData] = useState({
    appName: "",
    clientEmail: "",
    packageName: "",
    privateKey: "",
  })
  const { appName, clientEmail, packageName, privateKey } = formData
  const onChangeEventHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <div className="content-wrapper">
        <Breadcrumb title="Add App" />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">App Details</h3>
                  </div>
                  <div className="card-body">
                    <form
                      method="post"
                      onSubmit={(e) => {
                        e.preventDefault()
                        storeApp(formData, history)
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="appName">App Name</label>
                        <input
                          type="text"
                          name="appName"
                          id="appName"
                          className="form-control"
                          value={appName}
                          onChange={(e) => onChangeEventHandler(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="clientEmail">Client Email</label>
                        <input
                          type="text"
                          name="clientEmail"
                          id="clientEmail"
                          className="form-control"
                          value={clientEmail}
                          onChange={(e) => onChangeEventHandler(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="packageName">Package Name</label>
                        <input
                          type="text"
                          name="packageName"
                          id="packageName"
                          className="form-control"
                          value={packageName}
                          onChange={(e) => onChangeEventHandler(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="privateKey">Private Key</label>
                        <textarea
                          name="privateKey"
                          id="privateKey"
                          className="form-control"
                          value={privateKey}
                          onChange={(e) => onChangeEventHandler(e)}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-success">
                        <i className="fas fa-check"></i> Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

AddApp.propTypes = {
  storeApp: PropTypes.func.isRequired,
}

export default connect(null, { storeApp })(withRouter(AddApp))
