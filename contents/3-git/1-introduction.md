---
slug: "/git/introduction"
course: Programming Project 2021/22
module: Git 101
title: Introduction
subtitle: null
chapter: 3
section: 1
previous: /project/tips
next: /git/install
banner: https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1280px-Git-logo.svg.png
---

## Learning goals

In this module, we will learn:

- What is a version control system
- What is Git and why it is important to learn it
- Basic git commands
- How to work with branches
- How to work with remote repositories

## Sources

The material in this module has been adapted from:

1. Jon Loeliger, Matthew McCullough. [Version Control with Git](https://ubz-primo.hosted.exlibrisgroup.com/permalink/f/pok0fm/39UBZ_ALMA_DS51260607810001241), 2nd Edition, 2012, O'Reilly Media, Inc., ISBN 9780596520120.

   [![](https://images-na.ssl-images-amazon.com/images/I/51NrKTQmjgL._SX379_BO1,204,203,200_.jpg "#width=250px")](https://ubz-primo.hosted.exlibrisgroup.com/permalink/f/pok0fm/39UBZ_ALMA_DS51260607810001241)

2. Scott Chacon, Ben Straub. [Pro Git](https://git-scm.com/book/en/v2), 2nd Edition, 2014, Apress.

   [![](https://git-scm.com/images/progit2.png "#width=250px")](https://git-scm.com/book/en/v2)

## How do you code now?

Think about how you currently code. Do you just sit at your computer, open an IDE, and start coding?
Were do you save your source files?

Also, what would happen if:

- You permanently delete a file by mistake?
- You change your code a lot and then regret your decisions?
- You need to work with other developers, but:
  - You are each working on the same part of a system?
  - You are in different places?
- You want to publish your code for others to reuse?
- Your hard-drive/ssd crashes?

To avoid the disastrous situations implied by these questions, version control systems were invented!

## VCS: Version Control System

- A version control system (VCS) is a software that manages and tracks different versions of files over time.
- Changes are registered with metadata, which usually includes:
  - An author
  - A timestamp
  - A message explaining it
- A VCS can track any type file, but it is mostly used for source code
- Its main features are:
  - Allowing users to develop and maintain a repository of content
  - Providing access to historical editions of each file
  - Recording all changes in a log

## VCS Types

### Local Version Control Systems

![lvcs](https://git-scm.com/book/en/v2/images/local.png)  
Figure from [https://git-scm.com/](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

- **Main benefit**:
  - Being able to do version control
- **Main drawback**:
  - No support for collaboration
  - Single point of failure

### Centralized Version Control Systems

![cvcs](https://git-scm.com/book/en/v2/images/centralized.png)  
Figure from [https://git-scm.com/](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

- **Main benefits**:
  - Being able to do version control
  - Supports collaboration
- **Main drawback**:
  - Single point of failure
  - Project history is only visible to the server

### Distributed Version Control Systems

![dvcs](https://git-scm.com/book/en/v2/images/distributed.png)  
Figure from [https://git-scm.com/](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

- **Main benefits**:
  - Being able to do version control
  - Supports collaboration
  - Redundancy
  - Availability

## Version Control Systems

Multiple VCS have been developed over the years:

- [Concurrent Versions System (CVS)](https://en.wikipedia.org/wiki/Concurrent_Versions_System)
  - First release: 1990
  - Local
- [Apache Subversion (SVN)](https://en.wikipedia.org/wiki/Apache_Subversion)
  - First release: 2000
  - Centralized
- [Git](https://en.wikipedia.org/wiki/Git)
  - First release: 2005
  - Decentralized
- [GNU Bazaar](https://en.wikipedia.org/wiki/GNU_Bazaar)
  - First release: 2005
  - Decentralized
- [Mercurial](https://en.wikipedia.org/wiki/Mercurial)
  - First release: 2005
  - Decentralized

Git overwhelmingly superseded the other systems became the _de facto_ standard in the software industry.

Here is some data from OpenHub, a public directory of free and open-source software, on the **[adoption of version control systems](https://www.openhub.net/repositories/compare)**.

And here is some data from **[Google Trends](https://trends.google.com/trends/explore?date=all&q=%2Fm%2F05vqwg,%2Fm%2F012ct9,%2Fm%2F08441_)**.

## What is git?

- A free and open-source version control system
- Created by [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds)
- See git's first commit [here](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290)
- A distributed version control system
- Provides full history repository
- No network requirement

## About Git

Before we get our hands dirty, let's take a whirlwind tour on how Git works.

### How Git stores data

Traditional VCS systems store data as a list of file-based changes, as in what is called **delta-based** version control:

![delta-vcs](https://git-scm.com/book/en/v2/images/deltas.png)

Git stores complete versions of each file, as in a **stream of snapshots**:

![snapshot-vcs](https://git-scm.com/book/en/v2/images/snapshots.png)

### Nearly every operation is local

Most operations in Git need only local files and resources to operate:

- Browsing the history of a project
- Comparing different file states
- Creating branches of work

When you clone a Git repository, you get its full history!

### Git has integrity

- Everything in Git is checksummed before it is stored and is then referred to by that checksum.

- It's impossible to alter the contents of a file without Git knowing.

- Git uses SHA-1 hash for checksumming, a hashing algorithm that generates 40-character strings composed of hexadecimal characters (0–9 and a–f) and calculated based on the contents of a file or directory structure in Git.

- A SHA-1 hash looks something like this:
  ```
  24b9da6552252987aa493b52f8696cd6d3b00373
  ```

### Git generally only adds data

- When you do actions in Git, nearly all of them only add data to the Git database.

- You can lose or mess up changes you haven’t committed yet, but after you commit a snapshot into Git, it is very difficult to lose, especially if you regularly push your database to another repository.

- This makes using Git a joy because we know we can experiment without the danger of severely screwing things up.

### File states

- **tracked**: Git is aware of the file
  - **modified**: you have changed the file but have not committed it to your database yet
  - **staged**: ou have marked a modified file in its current version to go into your next commit snapshot
  - **committed**: your data is safely stored in your local database
- **untracked**: Git is not "watching" the file

![](https://i.stack.imgur.com/kslSd.png)  
From [this](https://stackoverflow.com/questions/55877484/is-committed-and-unmodified-the-same) StackOverflow question.

<!-- ![states](https://git-scm.com/book/en/v2/images/areas.png) -->
