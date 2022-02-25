import React from "react"
import { graphql, Link } from "gatsby"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-header"></div>
        <div className="navbar-content"></div>
        <div className="navbar-footer"></div>
      </div>
      <div className="content-container">
        <div className="header">
        { frontmatter.previous ?  <Link to={frontmatter.previous}>Previous</Link> : <span/>  }
        { frontmatter.next ? <Link to={frontmatter.next}>Next</Link> : <span/> }
        </div>
        <div className="subheader">
          <div className="module">{frontmatter.chapter + '. ' + frontmatter.module}</div>
          <div className="course">{frontmatter.course}</div>
        </div>
        <div className="content">
          <h1>{frontmatter.chapter + '.' + frontmatter.section + '. ' + frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <div className="footer">
        { frontmatter.previous ?  <Link to={frontmatter.previous}>Previous</Link> : <span/>  }
        { frontmatter.next ? <Link to={frontmatter.next}>Next</Link> : <span/> }
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        course
        previous
        next
        chapter
        section
        module
      }
    }
  }
`