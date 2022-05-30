"use strict";(self.webpackChunkgatsby_starter_hello_world=self.webpackChunkgatsby_starter_hello_world||[]).push([[678],{6301:function(e,t,a){a.d(t,{Z:function(){return s}});var l=a(7294),n=a(1597),r=function(e){var t=e.page;return l.createElement("span",{key:t.chapter,className:"module-link"},t.chapter+". "+t.module)},c=function(e){var t=e.page;return l.createElement(n.Link,{key:t.slug,className:"section-link",activeClassName:"active-section-link",to:t.slug},t.chapter+"."+t.section+". "+t.title)},o=function(e){var t=e.pageGroup;console.log();var a=t.nodes[0].frontmatter;return l.createElement("div",{className:"navbar-module-container"},l.createElement(r,{key:a.chapter,page:a}),t.nodes.map((function(e){return l.createElement(c,{key:e.frontmatter.slug,page:e.frontmatter})})))},m=function(){var e=(0,n.useStaticQuery)("800307450").allMarkdownRemark.group.sort((function(e,t){return parseInt(e.fieldValue)-parseInt(t.fieldValue)}));return l.createElement("div",{className:"body-navbar-inner"},e.map((function(e,t){return l.createElement(o,{key:t,pageGroup:e})})))};function s(e){var t=e.previous,a=e.next,r=e.children;return l.createElement("div",{className:"container"},l.createElement("div",{className:"header"},l.createElement("div",{className:"header-navbar"},l.createElement(n.Link,{to:"/"},"Home")),l.createElement("div",{className:"header-content"},t?l.createElement(n.Link,{to:t},"Previous"):l.createElement("span",null),a?l.createElement(n.Link,{to:a},"Next"):l.createElement("span",null))),l.createElement("div",{className:"body"},l.createElement("div",{className:"body-navbar"},l.createElement(m,null)),l.createElement("div",{className:"body-content"},r)),l.createElement("div",{className:"footer"},l.createElement("div",{className:"footer-navbar"}),l.createElement("div",{className:"footer-content"},t?l.createElement(n.Link,{to:t},"Previous"):l.createElement("span",null),a?l.createElement(n.Link,{to:a},"Next"):l.createElement("span",null))))}},6558:function(e,t,a){a.r(t);var l=a(7294),n=a(6301);t.default=function(e){e.data;return l.createElement(n.Z,{next:"/introduction/structure"},l.createElement("h1",{className:"module"},"Programming Project 2021-22"),l.createElement("div",null,l.createElement("p",null,"Welcome to the web page of the Programming Project course!"),"This a university course being taught at the academic year 2021-22 for the"," ",l.createElement("a",{href:"https://www.unibz.it/en/faculties/computer-science/bachelor-computer-science/"},"Bachelor in Computer Science")," ","of the ",l.createElement("a",{href:"http://unibz.it/"},"Free University of Bozen-Bolzano"),". Here, you will find information about the course, course material, exercises, and more!",l.createElement("h3",null,"Important dates:"),l.createElement("ul",null,l.createElement("li",null,l.createElement("b",null,"First exam session:"),l.createElement("ul",null,l.createElement("li",null,"Project submission: 17/06/2022"),l.createElement("li",null,"Project peer-review submission: 24/06/2022"),l.createElement("li",null,"Oral exam: 01/07/2022"))),l.createElement("li",null,l.createElement("b",null,"Second exam session:"),l.createElement("ul",null,l.createElement("li",null,"Project submission: 26/08/2022"),l.createElement("li",null,"Project peer-review submission: 02/09/2022"),l.createElement("li",null,"Oral exam: 09/09/2022")))),l.createElement("h3",null,"Labs"),l.createElement("p",null,"Click on the links below to accept the assignments on Github Classroom."),l.createElement("ul",null,l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/v0IH4i39"},"Lab 1: Git")),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/O801GQYH"},"Lab 2: Exceptions")),l.createElement("li",null,"Lab 3: Group Project Lab 1/3"),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/BRX-CZUW"},"Lab 4: Inheritance")),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/XfZI3Iqo"},"Lab 5: Generics")),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/zdNVjpBg"},"Lab 6: Collections")),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/NMYey4_w"},"Lab 7: Lambdas and Streams")),l.createElement("li",null,"Lab 8: Group Project Lab 2/3"),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/nP7ij0Ad"},"Lab 9: Maven")),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/Iqtm5I00"},"Lab 10: Testing")),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/206iHDIP"},"Lab 11: Regular Expressions")),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/gEJEwg4K"},"Lab 12: Design Patterns")),l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/W5dkk3Rb"},"Lab 13: I/O")),l.createElement("li",null,"Lab 14: Multithreading"),l.createElement("li",null,"Lab 15: Group Project Lab 3/3")),l.createElement("h3",null,"Course Project"),l.createElement("p",null,"Click on the link below to accept the assignment for the course project on Github Classroom."),l.createElement("ul",null,l.createElement("li",null,l.createElement("a",{href:"https://classroom.github.com/a/KEbQ1JIO"},"Course Project"))),l.createElement("h3",null,"Relevant links:"),l.createElement("ul",null,l.createElement("li",null,l.createElement("a",{href:"https://education.github.com/git-cheat-sheet-education.pdf"},"Git Cheat Sheet")),l.createElement("li",null,"Enrol in our"," ",l.createElement("a",{href:"https://ole.unibz.it/course/view.php?id=9650"},"OLE course")),l.createElement("li",null,"Attend lectures via"," ",l.createElement("a",{href:"https://teams.microsoft.com/l/team/19%3aPwFOwWPTMOIxIYmj2dRh5pAeOxT4debJh06L1gZ_F3A1%40thread.tacv2/conversations?groupId=783e8e85-a1f8-474e-87da-c282e7babb2a&tenantId=92513267-03e3-401a-80d4-c58ed6674e3b"},"MS Teams")),l.createElement("li",null,"Check when the next lecture will be in the"," ",l.createElement("a",{href:"https://www.unibz.it/en/timetable/?searchByKeywords=Programming+Project&sourceId=unibz&department=22&degree=13441%2C13584&studyPlan=17692%2C18234&fromDate=2022-03-01&toDate=2022-09-30"},"course timetable")))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-576d199fe4e540a8b644.js.map