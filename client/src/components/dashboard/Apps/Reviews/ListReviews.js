import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Header from "../../Common/Header"
import Nav from "../../Common/Nav"
import Breadcrumb from "../../Common/Breadcrumb"
import Loader from "../../../loader/Loader"
import Footer from "../../Common/Footer"
import { getReviews } from "../../../../actions/rtr"

const ListReviews = ({ match, getReviews, reviews, loading }) => {
  useEffect(() => {
    getReviews(match.params.id)
  }, [getReviews, match.params.id])
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
                    </div>
                    <div className="card-body">
                      <table className="table table-hover table-bordered table-stripped">
                        <thead>
                          <tr>
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
    </div>
  )
}

ListReviews.propTypes = {
  getReviews: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reviews: PropTypes.array,
}

const mapStateToProps = (state) => ({
  reviews: state.rtr.reviews,
  loading: state.rtr.loading,
})

export default connect(mapStateToProps, { getReviews })(ListReviews)
