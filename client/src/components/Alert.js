import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Alert = ({ alerts }) => {
  let showAlert = ""
  showAlert = alerts.map((alert) => (
    <div id="toast-container" key={alert.id} className="toast-top-right">
      <div className={`toast toast-${alert.alertType}`} aria-live="assertive">
        <div className="toast-message">{alert.msg}</div>
      </div>
    </div>
  ))
  return showAlert
}

Alert.propTypes = {
  alerts: PropTypes.array,
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export default connect(mapStateToProps, {})(Alert)
