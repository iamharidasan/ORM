import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Header from "../Common/Header"
import Footer from "../Common/Footer"
import Breadcrumb from "../Common/Breadcrumb"
import Nav from "../Common/Nav"
import Loader from "../../loader/Loader"
import { getReplies } from "../../../actions/reply"
import Moment from "react-moment"

const ListReplies = ({ replies, getReplies, loading }) => {
  useEffect(() => {
    getReplies()
  }, [getReplies])
  return (
    <div className="wrapper">
      <Header />
      <Nav />
      <div className="content-wrapper">
        <Breadcrumb title="List of Replies" />
        <section className="content">
          {loading ? (
            <Loader />
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Replies Registered</h3>
                      <div className="card-tools">
                        <Link to="/create-reply" className="btn btn-success">
                          Add New Reply
                        </Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Reply</th>
                            <th>Query</th>
                            <th>Action</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {replies && replies.length > 0 ? (
                            replies.map((reply) => (
                              <tr key={reply._id}>
                                <td>{reply.reply}</td>
                                <td>{reply.review}</td>
                                <td>
                                  <Link
                                    to={`/edit-reply/${reply._id}`}
                                    className="btn btn-warning"
                                  >
                                    <i className="fas fa-edit"></i> Edit
                                  </Link>
                                </td>
                                <td>
                                  <Moment format="DD/MM/YYYY hh:mm a">
                                    {reply.date}
                                  </Moment>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" align="center">
                                No Reviews Created Yet
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

ListReplies.propTypes = {
  replies: PropTypes.array,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  replies: state.reply.replies,
  loading: state.reply.loading,
})

export default connect(mapStateToProps, { getReplies })(ListReplies)
