import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  // let contents = []

  // data.allMarkdownRemark.group.forEach(module => {
  //   const section = module.nodes[0].frontmatter;
  //   contents.push(<div>{section.chapter + '. ' + section.module}</div>)
  //   module.nodes.forEach(node => contents.push(<PostLink key={node.frontmatter.slug} post={node} />))
  // })

  return (
    <Layout next="/introduction/structure">
      <h1 className="module">Programming Project 2021-22</h1>
      <div>
        <p>Welcome to the web page of the Programming Project course!</p>
        This a university course being taught at the academic year 2021-22 for
        the{" "}
        <a href="https://www.unibz.it/en/faculties/computer-science/bachelor-computer-science/">
          Bachelor in Computer Science
        </a>{" "}
        of the <a href="http://unibz.it/">Free University of Bozen-Bolzano</a>.
        Here, you will find information about the course, course material,
        exercises, and more!
        <h3>Important dates:</h3>
        <ul>
          <li>
            <b>First exam session:</b>
            <ul>
              <li>Project submission: 17/06/2022</li>
              <li>Project peer-review submission: 24/06/2022</li>
              <li>Oral exam: 01/07/2022</li>
            </ul>
          </li>
          <li>
            <b>Second exam session:</b>
            <ul>
              <li>Project submission: 26/08/2022</li>
              <li>Project peer-review submission: 02/09/2022</li>
              <li>Oral exam: 09/09/2022</li>
            </ul>
          </li>
        </ul>
        <h3>Labs</h3>
        <p>Click on the links below to accept the assignments on Github Classroom.</p>
        <ul>
          <li><a href="https://classroom.github.com/a/v0IH4i39">Lab 1: Git</a></li>
          <li><a href="https://classroom.github.com/a/O801GQYH">Lab 2: Exceptions</a> - (<a href="https://github.com/UNIBZ-Programming-Project/lab-2-exceptions/tree/solutions">Solutions</a>)</li>
        </ul>
        <h3>Course Project</h3>
        <p>Click on the link below to accept the assignment for the course project on Github Classroom.</p>
        <ul>
          <li><a href="https://classroom.github.com/a/KEbQ1JIO">Course Project</a></li>
        </ul>
        <h3>Relevant links:</h3>
        <ul>
          <li>
            <a href="https://education.github.com/git-cheat-sheet-education.pdf">
              Git Cheat Sheet
            </a>
          </li>
          <li>
            Enrol in our{" "}
            <a href="https://ole.unibz.it/course/view.php?id=9650">
              OLE course
            </a>
          </li>
          <li>
            Attend lectures via{" "}
            <a href="https://teams.microsoft.com/l/team/19%3aPwFOwWPTMOIxIYmj2dRh5pAeOxT4debJh06L1gZ_F3A1%40thread.tacv2/conversations?groupId=783e8e85-a1f8-474e-87da-c282e7babb2a&tenantId=92513267-03e3-401a-80d4-c58ed6674e3b">
              MS Teams
            </a>
          </li>
          <li>
            Check when the next lecture will be in the{" "}
            <a href="https://www.unibz.it/en/timetable/?searchByKeywords=Programming+Project&sourceId=unibz&department=22&degree=13441%2C13584&studyPlan=17692%2C18234&fromDate=2022-03-01&toDate=2022-09-30">
              course timetable
            </a>
          </li>
        </ul>
      </div>
    </Layout>
 
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___chapter, frontmatter___section] }
    ) {
      group(field: frontmatter___module) {
        nodes {
          frontmatter {
            chapter
            course
            module
            next
            previous
            section
            slug
            title
          }
        }
      }
    }
  }
`
