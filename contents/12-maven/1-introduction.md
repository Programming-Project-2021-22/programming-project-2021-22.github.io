---
slug: /maven/introduction
course: Programming Project 2021/22
module: Maven
title: Introduction
subtitle: null
chapter: 12
section: 1
previous: /streams/operations
next: /maven/compiling
banner: https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Apache_Maven_logo.svg/1280px-Apache_Maven_logo.svg.png
---
 
## What is Maven?

[Maven](https://maven.apache.org/) is a **package manager** and a **build tool** for Java.

It is an open source project managed by the Apache Software Foundation.

It was first released in 2004, which means that:
- It is almost 20 years old!
- It solves a real problem developers have
- It is stable and trustworthy

Maven is of the most popular build tools for Java, as reported in:
- [Snyk's JVM Ecosystem Report 2021](https://snyk.io/jvm-ecosystem-report-2021/?utm_campaign=JVM-SC-2021&utm_medium=Report-Link#jvm-developers-use-maven)
- [JRebel's 2020 Java Technology Report](https://www.jrebel.com/blog/2020-java-technology-report) 
- [IntelliJ's State of Developer Ecosystem 2019](https://www.jetbrains.com/lp/devecosystem-2019/java/)

Read more at https://maven.apache.org/what-is-maven.html.  

## Why Maven?

Maven's main objective is **to allow a developer to comprehend the complete state of a development effort in the shortest period of time**.

It does that by:

(1) **Making the build process easy**:
- Maven will shield you from many details
- But it doesn’t eliminate the need to know about the underlying mechanisms

(2) **Providing a uniform build system**:
- Maven builds a project using its **project object model (POM)** and a set of plugins
- If you understand how one Maven project works, you know how all of them work

(3) **Providing quality project information**, such as:
- Change log created directly from source control
- Dependencies used by the project
- Unit test reports including coverage

(4) **Encouraging better development practices**:
- Standard directory layout
- Good testing practices:
  - Separate test source code
  - Naming conventions to locate and execute tests
  - Test cases setup their environment

## What is a package manager?

A [package manager](https://en.wikipedia.org/wiki/Package_manager) is a tool that automates the process of installing, upgrading, configuring, and removing software programs and libraries from a computer system in a consistent manner
  
**System-level** package managers:
- macOs: [Homebrew](https://brew.sh/) and [MacPorts](https://www.macports.org/)
- Linux: [Advanced Package Tool (APT)](https://manpages.debian.org/unstable/apt/apt-get.8.en.html) and [Yum](http://yum.baseurl.org/)

**Application-level** package managers:
- Java: [Maven](https://maven.apache.org/) and [Gradle](https://gradle.org/)
- Javascript/TypeScript: [npm](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/)
- Python: [pip](https://pypi.org/project/pip/)
- Ruby: [RubyGems](https://rubygems.org/)

You can find a list of package managers [here](https://en.wikipedia.org/wiki/List_of_software_package_management_systems).
  
## Why use a package manager?

1. We want to reuse someone elses code
1. We want to share our work with others
1. We don't want to check large binaries files into our git repository
1. We need help to handle complex dependencies trees as projects get complex
1. We want to easily find and download the packages we need
1. We want to easily understand which packages (and their specific versions) a project use. Package managers establish a shared convention for managing libraries that allows that
1. We want to compartmentalize the installation of dependencies

[StackExchange](https://softwareengineering.stackexchange.com/questions/372444/why-prefer-a-package-manager-over-a-library-folder)


## What is a build tool? 

A **build tool** is a program that automates the creation of executable applications from source code

**Build automation** is the act of scripting tasks that developers do in their day-to-day activities, like:
- Downloading dependencies
- Compiling source code into binary code
- Running tests
- Packaging that binary code
- Deploying to production systems

Examples of build tools:
- Java: **Ant**, **Maven**, and **Gradle**
- Javascript: [gulp](https://gulpjs.com/) and [Grunt](https://gruntjs.com/)
- .NET: [MSBuild](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild?view=vs-2019)
- Multi-language: [Bazel](https://bazel.build/)

You can find a list of build automation tools [here](https://en.wikipedia.org/wiki/List_of_build_automation_software)

[StackOverflow](https://stackoverflow.com/questions/7249871/what-is-a-build-tool)


## Why use a build tool?

In a small project, you may not need one, as you can simply invoke the build process manually. When projects get larger, this stops being practical. 

1. We want to keep organize what needs to be built, in what sequence, and what dependencies are needed.
1. We want a **quick** and **consistent** build process.
1. We want **easy to build** projects.
1. We want to use our own IDEs.
1. We want to implement [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) and [delivery](https://en.wikipedia.org/wiki/Continuous_delivery) pipelines.

This is how easy it to build a project using Maven:

```terminal 
mvn package
```

[StackOverflow](https://stackoverflow.com/questions/7249871/what-is-a-build-tool)


## What is good about Maven?

1. Quick project setup: convention over configuration
1. Modular projects
1. Mature dependency management
1. Mature project build lifecycle
1. Robust plugin community
1. Very good IDE support, including IntelliJ IDEA, Eclipse, and VS Code

## What is not so good about it?

1. The use of XML to describe projects 
    - XML is generally disliked by younger developers
    - The project description file gets very big, very fast
1. Maven is harder to extend than Gradle
1. Maven is slower than Gradle

## Maven, a de facto standard

Maven established "standards" that are used by other build tools:
- Maven standard directory layout
- Artifact naming
- Artifact repository

## Our goal with this module

Our main goal is for you to learn the basic concepts related to package managers and build tools. 

A considerable part of this knowledge is transferable to other tools that you may use in the future, such as Gradle, npm, and Grunt.

Understanding Java's build process is valuable for those venturing into the DevOps world.

We do not expect you to be a Maven guru.

**You will have to use Maven in your course project.**

