import React from "react"

const Footer = () => {
  return (
    <footer className="main-footer">
      <strong>
        Copyright &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://www.socialbeat.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Social Beat
        </a>
        .
      </strong>{" "}
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0
      </div>
    </footer>
  )
}

export default Footer
