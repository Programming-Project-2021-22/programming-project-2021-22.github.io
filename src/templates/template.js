import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
  <Layout previous={frontmatter.previous} next={frontmatter.next}>
    <div className="body-content-module-title">
      <div className="module">{frontmatter.chapter + '. ' + frontmatter.module}</div>
      <div className="course">{frontmatter.course}</div>
    </div>
    <div className="body-content-data">
      <h1>{frontmatter.chapter + '.' + frontmatter.section + '. ' + frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  </Layout>)
}

// export default function Template({ data }) {
//   const { markdownRemark } = data
//   const { frontmatter, html } = markdownRemark
//   return (
//           <div className="container">

//           <div className="header">
//             <div className="header-navbar">
//               <Link to="/">Home</Link>  
//             </div>
//             <div className="header-content">
//             { frontmatter.previous ?  <Link to={frontmatter.previous}>Previous</Link> : <span/>  }
//             { frontmatter.next ? <Link to={frontmatter.next}>Next</Link> : <span/> }
//             </div>
//           </div>

//           <div className="body">
//             <div className="body-navbar">
//             <Navbar currentPage={data.markdownRemark.frontmatter} pageGroups={data.allMarkdownRemark.group}/>
//             </div>
//             <div className="body-content">
//               <div className="body-content-module-title">
//                 <div className="module">{frontmatter.chapter + '. ' + frontmatter.module}</div>
//                 <div className="course">{frontmatter.course}</div>
//               </div>
//               <div className="body-content-data">
//                 <h1>{frontmatter.chapter + '.' + frontmatter.section + '. ' + frontmatter.title}</h1>
//                 <div dangerouslySetInnerHTML={{ __html: html }} />
//               </div>
//             </div>
//           </div>

//           <div className="footer">
//             <div className="footer-navbar">
//               Navbar footer
//             </div>
//             <div className="footer-content">
//               { frontmatter.previous ?  <Link to={frontmatter.previous}>Previous</Link> : <span/>  }
//               { frontmatter.next ? <Link to={frontmatter.next}>Next</Link> : <span/> }
//             </div>
//           </div>

//         </div>
//   )
// }

export const pageQuery = graphql`
  query($slug: String!) {
  markdownRemark(frontmatter: {slug: {eq: $slug}}) {
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
    }
  }
  # allMarkdownRemark(
  #   sort: {fields: [frontmatter___chapter, frontmatter___section]}
  #   filter: {frontmatter: {chapter: {ne: 0}}}
  #   ) {
  #   group(field: frontmatter___module) {
  #     nodes {
  #       frontmatter {
  #         chapter
  #         course
  #         module
  #         slug
  #         title
  #         section
  #       }
  #     }
  #   }
  # }
}
`