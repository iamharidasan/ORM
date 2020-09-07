import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Footer from "../../Common/Footer"
import Loader from "../../../loader/Loader"
import Breadcrumb from "../../Common/Breadcrumb"
import Header from "../../Common/Header"
import Nav from "../../Common/Nav"
import { connect } from "react-redux"
import { getReview, postReply } from "../../../../actions/rtr"
import { withRouter } from "react-router-dom"
import { getReplies } from "../../../../actions/reply"

const ReplyReview = ({
  match,
  loading,
  getReview,
  review,
  history,
  postReply,
  getReplies,
  replies,
}) => {
  useEffect(() => {
    getReview(match.params.id, match.params.reviewid)
    getReplies()
  }, [getReview, match.params.id, match.params.reviewid, getReplies])
  const [formData, setformData] = useState({
    reply: "",
    id: match.params.id,
    reviewid: match.params.reviewid,
  })

  const onChangeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const selectChangeHandler = (e) => {
    if (e.target.value !== "other") {
      setformData({
        ...formData,
        reply: e.target.value,
      })
    } else {
      setformData({
        ...formData,
        reply: "",
      })
    }
  }

  const { reply } = formData
  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <div className="content-wrapper">
        <Breadcrumb title="Reply to Review" />
        <section className="content">
          {loading || review === null ? (
            <Loader />
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <strong>Author:</strong> {review && review.authorName}
                      </h3>
                    </div>
                    <div className="card-body">
                      <p>
                        {review && review.comments[0].userComment && (
                          <strong>Rating:</strong>
                        )}{" "}
                        {review &&
                          review.comments[0].userComment &&
                          review.comments[0].userComment.starRating}
                      </p>
                      <p>
                        {review && review.comments[0].userComment && (
                          <strong>Review:</strong>
                        )}{" "}
                        {review &&
                          review.comments[0].userComment &&
                          review.comments[0].userComment.text}
                      </p>
                      <form
                        action=""
                        method="post"
                        onSubmit={(e) => {
                          e.preventDefault()
                          postReply(formData, history)
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="replySelect">Select a Reply</label>
                          <select
                            name="replySelect"
                            id="replySelect"
                            onChange={(e) => selectChangeHandler(e)}
                            className="form-control"
                          >
                            <option value="">Select an Option</option>
                            {replies &&
                              replies.map((reply) => (
                                <option key={reply._id} value={reply.reply}>
                                  {reply.reply}
                                </option>
                              ))}
                            <option value="other">Other(type your own)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="reply">Reply</label>
                          <textarea
                            name="reply"
                            id="reply"
                            className="form-control"
                            placeholder="Type here..."
                            rows="3"
                            value={reply}
                            onChange={(e) => onChangeHandler(e)}
                          ></textarea>
                        </div>
                        <div>
                          <button className="btn btn-primary">
                            <i className="fas fa-check"></i> Reply
                          </button>
                        </div>
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

ReplyReview.propTypes = {
  loading: PropTypes.bool.isRequired,
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object,
  postReply: PropTypes.func.isRequired,
  getReplies: PropTypes.func.isRequired,
  replies: PropTypes.array,
}

const mapStateToProps = (state) => ({
  loading: state.rtr.loading,
  review: state.rtr.review,
  replies: state.reply.replies,
})

export default connect(mapStateToProps, { getReview, postReply, getReplies })(
  withRouter(ReplyReview)
)
