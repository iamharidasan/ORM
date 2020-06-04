import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Footer from "../Common/Footer"
import Breadcrumb from "../Common/Breadcrumb"
import Nav from "../Common/Nav"
import Header from "../Common/Header"
import { addReply } from "../../../actions/reply"
import { withRouter } from "react-router-dom"

const CreateReply = ({ addReply, history }) => {
  const [formData, setFormData] = useState({
    reply: "",
    review: "",
  })

  const { reply, review } = formData

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <div className="content-wrapper">
        <Breadcrumb title="New Reply" />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Add New Reply</h3>
                  </div>
                  <div className="card-body">
                    <form
                      method="post"
                      onSubmit={(e) => {
                        e.preventDefault()
                        addReply(formData, history)
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="reply">Reply</label>
                        <textarea
                          name="reply"
                          id="reply"
                          cols="30"
                          rows="5"
                          placeholder="Type Here..."
                          value={reply}
                          className="form-control"
                          onChange={(e) => changeEventHandler(e)}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="review">Review</label>
                        <textarea
                          name="review"
                          id="review"
                          cols="30"
                          rows="5"
                          placeholder="Type Here..."
                          value={review}
                          className="form-control"
                          onChange={(e) => changeEventHandler(e)}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-success">
                        <i className="fas fa-check"></i> Add Reply
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

CreateReply.propTypes = {
  addReply: PropTypes.func.isRequired,
}

export default connect(null, { addReply })(withRouter(CreateReply))
