"use strict";(self.webpackChunkgatsby_starter_hello_world=self.webpackChunkgatsby_starter_hello_world||[]).push([[850],{6301:function(e,t,a){a.d(t,{Z:function(){return m}});var n=a(7294),r=a(1597),l=function(e){var t=e.page;return n.createElement("span",{key:t.chapter,className:"module-link"},t.chapter+". "+t.module)},c=function(e){var t=e.page;return n.createElement(r.Link,{key:t.slug,className:"section-link",activeClassName:"active-section-link",to:t.slug},t.chapter+"."+t.section+". "+t.title)},s=function(e){var t=e.pageGroup;console.log();var a=t.nodes[0].frontmatter;return n.createElement("div",{className:"navbar-module-container"},n.createElement(l,{key:a.chapter,page:a}),t.nodes.map((function(e){return n.createElement(c,{key:e.frontmatter.slug,page:e.frontmatter})})))},o=function(){var e=(0,r.useStaticQuery)("800307450").allMarkdownRemark.group.sort((function(e,t){return parseInt(e.fieldValue)-parseInt(t.fieldValue)}));return n.createElement("div",{className:"body-navbar-inner"},e.map((function(e,t){return n.createElement(s,{key:t,pageGroup:e})})))};function m(e){var t=e.previous,a=e.next,l=e.children;return n.createElement("div",{className:"container"},n.createElement("div",{className:"header"},n.createElement("div",{className:"header-navbar"},n.createElement(r.Link,{to:"/"},"Home")),n.createElement("div",{className:"header-content"},t?n.createElement(r.Link,{to:t},"Previous"):n.createElement("span",null),a?n.createElement(r.Link,{to:a},"Next"):n.createElement("span",null))),n.createElement("div",{className:"body"},n.createElement("div",{className:"body-navbar"},n.createElement(o,null)),n.createElement("div",{className:"body-content"},l)),n.createElement("div",{className:"footer"},n.createElement("div",{className:"footer-navbar"}),n.createElement("div",{className:"footer-content"},t?n.createElement(r.Link,{to:t},"Previous"):n.createElement("span",null),a?n.createElement(r.Link,{to:a},"Next"):n.createElement("span",null))))}},2162:function(e,t,a){a.r(t),a.d(t,{default:function(){return l}});var n=a(7294),r=a(6301);function l(e){var t=e.data.markdownRemark,a=t.frontmatter,l=t.html;return n.createElement(r.Z,{previous:a.previous,next:a.next},n.createElement("div",{className:"body-content-module-title"},n.createElement("div",{className:"module"},a.chapter+". "+a.module),n.createElement("div",{className:"course"},a.course)),n.createElement("div",{className:"body-content-data"},n.createElement("h1",null,a.chapter+"."+a.section+". "+a.title),a.banner?n.createElement("div",{className:"page-banner-container"},n.createElement("img",{className:"page-banner",src:a.banner})):null,n.createElement("div",{dangerouslySetInnerHTML:{__html:l}})))}}}]);
//# sourceMappingURL=component---src-templates-template-js-aadc16a91c2ce3d4e3c3.js.map