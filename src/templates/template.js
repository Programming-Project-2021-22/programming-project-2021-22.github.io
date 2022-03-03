import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout previous={frontmatter.previous} next={frontmatter.next}>
      <div className="body-content-module-title">
        <div className="module">
          {frontmatter.chapter + ". " + frontmatter.module}
        </div>
        <div className="course">{frontmatter.course}</div>
      </div>
      <div className="body-content-data">
        <h1>
          {frontmatter.chapter +
            "." +
            frontmatter.section +
            ". " +
            frontmatter.title}
        </h1>
        {frontmatter.banner ? (
          <div className="page-banner-container">
            <img className="page-banner" src={frontmatter.banner} />
          </div>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        course
        previous
        next
        chapter
        section
        module
        banner
      }
    }
  }
`
