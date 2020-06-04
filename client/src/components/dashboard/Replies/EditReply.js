import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Footer from "../Common/Footer"
import Breadcrumb from "../Common/Breadcrumb"
import Nav from "../Common/Nav"
import Header from "../Common/Header"
import { editReply, getReply } from "../../../actions/reply"
import { withRouter } from "react-router-dom"
import Loader from "../../loader/Loader"

const EditReply = ({
  match,
  editReply,
  history,
  oldReply,
  getReply,
  loading,
}) => {
  useEffect(() => {
    getReply(match.params.id)
    setFormData({
      reply: loading || !oldReply.reply ? "" : oldReply.reply,
      review: loading || !oldReply.review ? "" : oldReply.review,
    })
  }, [getReply, match.params.id, loading, oldReply])
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
        <Breadcrumb title="Edit Reply" />
        <section className="content">
          {loading || oldReply === null ? (
            <Loader />
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Edit your Reply</h3>
                    </div>
                    <div className="card-body">
                      <form
                        method="post"
                        onSubmit={(e) => {
                          e.preventDefault()
                          editReply(formData, match.params.id, history)
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
                          <i className="fas fa-check"></i> Update Reply
                        </button>
                      </form>
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

EditReply.propTypes = {
  editReply: PropTypes.func.isRequired,
  oldReply: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  oldReply: state.reply.reply,
  loading: state.reply.loading,
})

export default connect(mapStateToProps, { editReply, getReply })(
  withRouter(EditReply)
)
