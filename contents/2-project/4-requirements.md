---
slug: "/project/requirements"
course: Programming Project 2021/22
module: Course Project
title: Requirements
subtitle: null
chapter: 2
section: 4
previous: "/project/dates"
next: "/project/tips"
date: "2021-01-28"
---

Although you are free to choose what to do, your project should satisfy all the requirements listed in this section.

## Programming techniques

Your project must use at least 10 of the programming techniques listed below:

1. Interfaces
2. Abstract classes
3. Generics methods
4. Generic classes
5. Varargs
6. Collections
7. Custom exceptions
8. Try-catch blocks handling
9. Custom exceptions
10. Method overriding
11. Method overloading
12. Lambda expressions
13. Streams
14. Optionals
15. File I/O
16. Serialization (to JSON, XML, CSV)
17. Deserialization (from JSON, XML, CSV)
18. HTTP
19. Regular expressions
20. Multithreading
21. Thread signaling
22. Resource sharing (between threads)
23. Asynchronous programming
24. Design patterns (each pattern counts as one technique)
25. Test hooks (e.g. `@beforeAll`, `@beforeEach`)
26. Logging
27. Casting
28. Graphical user interface (e.g. JavaFX)

Artificial usage of techniques just to meet the quota will not be accepted.

## Create a `.gitignore` file

You should add and configure a **`.gitignore`** file on the root of your git repository such that it instructs git to ignore files we do not want to be tracked.

Because of that, we expected your repository to be completely clean and only contain relevant files.

We do not want to see in your repository any:

- IDE files
- jars
- compiled classes
- logs
- run-time files

## Write a good `README.md` file

Create a **`README.md`** on the root of your git repository, containing:

- Your group members
- A description of your project
- How to build and run your project
- How to use your project
- How you implemented your project
  - Which third-party libraries you used, if any
  - Which programming techniques taught in our course you used
- Your experience in this project
  - How you organized yourselves to work on it
  - How you used Git
  - The main challenges you faced (at least one per member)

Add any additional information to your `README.md` you think is relevant.

If you are not sure what should go in your `README.md`, check out [this](https://www.makeareadme.com/) and [this](https://meakaakka.medium.com/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3) websites.

Remember that `README.md` files are written using [Markdown](https://docs.gitlab.com/ee/user/markdown.html).

## Set up Maven

Set up Maven for your project such that it can be compiled, tested, packaged, and executed using Maven commands.

Use Maven's [standard directory layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html):

Make sure your build is OS independent. Test it at least on Windows and Linux!

**If you do not configure Maven on you project, it will not be graded**

## Write unit tests

You must use [JUnit 5](https://junit.org/junit5/) as your testing framework.

Your tests should be executed when invoking the command:

```bash
mvn test
```

Your test suite will be evaluated regarding:

- _coverage_: how much of my code is tested?
- _correctness_: are my tests useful?
- _understandability_: can people understand the expected behavior of my functions via my tests?

**Each group member should write tests for her own methods. Other group members may (and should) review it.**

## Write documentation using Javadoc

Document your code using `javadoc`

Configure the [Apache Maven Javadoc Plugin](https://maven.apache.org/plugins/maven-javadoc-plugin/) for your project so that the documentation can be generated with the command:

```command-line
mvn javadoc:javadoc
```

Your documentation will be evaluated regarding:

- _utility_: how useful is the documentation to a developer that is trying to understand my code (or how to use my code)?
- _understandability_: can people understand the classes and methods that I documented?

**Each group member should document her own code. Other group members may (and should) review the documentation of others.**

## Project presentation

Record a 5-minute video presenting your project, in which you:

- Explain your idea
- Demonstrate your project
- Highlight interesting aspects of your project

Add a link to the recording in your **`README.md`** file.
