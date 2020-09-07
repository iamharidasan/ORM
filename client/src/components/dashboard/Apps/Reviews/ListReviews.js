import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import Header from "../../Common/Header"
import Nav from "../../Common/Nav"
import Breadcrumb from "../../Common/Breadcrumb"
import Loader from "../../../loader/Loader"
import Footer from "../../Common/Footer"
import { getReviews } from "../../../../actions/rtr"
import { getReplies } from "../../../../actions/reply"

const ListReviews = ({
  match,
  getReviews,
  reviews,
  loading,
  getReplies,
  replies,
}) => {
  useEffect(() => {
    getReplies()
    getReviews(match.params.id)
  }, [getReviews, match.params.id, getReplies])
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false)
  }

  const handleOpen = () => {
    setShowModal(true)
  }

  const [selectAll, setSelectAll] = useState(false)

  const selectAllHandle = () => {
    setSelectAll(true)
  }

  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <div className="content-wrapper">
        <Breadcrumb title="List of Reviews" />
        <section className="content">
          {loading ? (
            <Loader />
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">View Reviews</h3>
                      <div className="card-tools">
                        <button className="btn btn-info" onClick={handleOpen}>
                          {" "}
                          Bulk Review
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-hover table-bordered table-stripped">
                        <thead>
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                name="bulk"
                                onChange={selectAllHandle}
                                value="All"
                              />
                            </th>
                            <th>Reviewer</th>
                            <th>Review</th>
                            <th>Stars Count</th>
                            <th>Replied?</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews ? (
                            reviews.map((review, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="select"
                                    value={review.reviewId}
                                    checked={selectAll}
                                  />
                                </td>
                                <td>{review.authorName}</td>
                                <td>{review.comments[0].userComment.text}</td>
                                <td>
                                  {review.comments[0].userComment.starRating}
                                </td>
                                <td>
                                  {review.comments[1].developerComment
                                    ? "Yes"
                                    : "No"}
                                </td>
                                <td>
                                  <Link
                                    to={`/reply-review/${match.params.id}/${review.reviewId}`}
                                    className="btn btn-info"
                                    title="Reply to review"
                                  >
                                    <i className="fas fa-reply"></i> Reply to
                                    Review
                                  </Link>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td align="center" colSpan="5">
                                No Reviews are available till the past week
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
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Bulk Review: Choose a Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="form-group">
              <label for="template">Stored Templates</label>
              <select
                type="text"
                name="template"
                id="template"
                className="form-control"
              >
                <option value="">Select a Template</option>
                {replies.map((reply) => (
                  <option key={reply._id}>{reply.reply}</option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

ListReviews.propTypes = {
  getReviews: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reviews: PropTypes.array,
  getReplies: PropTypes.array,
  replies: PropTypes.array,
}

const mapStateToProps = (state) => ({
  reviews: state.rtr.reviews,
  loading: state.rtr.loading,
  replies: state.reply.replies,
})

export default connect(mapStateToProps, { getReviews, getReplies })(ListReviews)
