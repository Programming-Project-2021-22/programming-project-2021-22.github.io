import React from "react"
import { Link } from 'gatsby'

import Navbar from "./navbar";

export default function Layout({ previous, next, children }) {
  return (
    <div className="container">

      <div className="header">
        <div className="header-navbar">
          <Link to="/">Home</Link>  
        </div>
        <div className="header-content">
        { previous ?  <Link to={previous}>Previous</Link> : <span/> }
        { next ? <Link to={next}>Next</Link> : <span/> }
        </div>
      </div>

      <div className="body">
        <div className="body-navbar">
          <Navbar/>
        </div>
        <div className="body-content">
          { children }
        </div>
      </div>

      <div className="footer">
        <div className="footer-navbar">
        </div>
        <div className="footer-content">
          { previous ?  <Link to={previous}>Previous</Link> : <span/> }
          { next ? <Link to={next}>Next</Link> : <span/> }
        </div>
      </div>

    </div>
  )
}