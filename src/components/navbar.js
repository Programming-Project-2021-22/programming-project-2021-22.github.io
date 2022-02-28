import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const ModuleLink = ({ page }) => (
  <span key={page.chapter} className="module-link">
    {page.chapter + ". " + page.module}
  </span>
)

const SectionLink = ({ page }) => (
  <Link
    key={page.slug}
    className="section-link"
    activeClassName="active-section-link"
    to={page.slug}
  >
    {page.chapter + "." + page.section + ". " + page.title}
  </Link>
)

const ModuleNavbar = ({ pageGroup }) => {
  const first = pageGroup.nodes[0].frontmatter

  return (
    <div className="navbar-module-container">
      <ModuleLink key={first.chapter} page={first} />
      {pageGroup.nodes.map(page => (
        <SectionLink key={page.frontmatter.slug} page={page.frontmatter} />
      ))}
    </div>
  )
}

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___chapter, frontmatter___section] }
      ) {
        group(field: frontmatter___chapter) {
          fieldValue
          nodes {
            frontmatter {
              chapter
              module
              section
              title
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <div className="body-navbar-inner">
      {data.allMarkdownRemark.group.map((group, index) => (
        <ModuleNavbar key={index} pageGroup={group} />
      ))}
    </div>
  )
}

export default Navbar
