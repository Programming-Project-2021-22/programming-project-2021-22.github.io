---
slug: "/git/introduction"
course: Programming Project 2021/22
module: Git 101
title: Introduction
subtitle: null
chapter: 3
section: 1
previous: /project/tips
next: /git/commands
date: "2021-01-28"
---
 
In this module, we will learn:

- What is a version control system
- What is Git and why it is important to learn it
- Basic git commands
- How to work with branches
- How to work with remote repositories

## Recommended readings

1. Jon Loeliger, Matthew McCullough. [Version Control with Git](https://ubz-primo.hosted.exlibrisgroup.com/permalink/f/pok0fm/39UBZ_ALMA_DS51260607810001241), 2nd Edition, 2012, O'Reilly Media, Inc., ISBN 9780596520120.   

    [![](https://images-na.ssl-images-amazon.com/images/I/51NrKTQmjgL._SX379_BO1,204,203,200_.jpg '#width=250px')](https://ubz-primo.hosted.exlibrisgroup.com/permalink/f/pok0fm/39UBZ_ALMA_DS51260607810001241)

2. Scott Chacon, Ben Straub. [Pro Git](https://git-scm.com/book/en/v2), 2nd Edition, 2014, Apress.  
  
    [![](https://git-scm.com/images/progit2.png '#width=250px')](https://git-scm.com/book/en/v2)

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

Multiple types of VCS have been developed over the years:

- CVS 
- Apache Subversion (SVN)
- **Git**
- GNU Bazaar
- Mercurial

## What is git?

- A free and open-source version control system
- Created by Linus Torvalds:
	- [https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290)
- Distributed
- Full history repository
- No network requirement
- *De facto* standard in the industry

Let us check some statistics:

- [`OpenHub VCS comparison`](https://www.openhub.net/repositories/compare)
- [`Google Trends`](https://trends.google.com/trends/explore?date=all&q=%2Fm%2F05vqwg,%2Fm%2F012ct9,%2Fm%2F08441_)

## Installing git

1. Open your terminal and type:

```
git --version
```

2. If you see an output with your Git version, you are good to go.

```
git version 2.24.3 (Apple Git-128)
```

3. Otherwise, access [https://git-scm.com/download](https://git-scm.com/download)

4. Choose your operating system

5. Follow the installation instructions

## Git tools

We learned how git works and how to use it through the command line.

You can also use git through a GUI git clients:

- GitHub Desktop: [https://desktop.github.com/](https://desktop.github.com/)
	- Multi-platform
	- Free to use
	- Github provides a Student Developer Pack: 
		
		[https://education.github.com/pack](https://education.github.com/pack)

- GitKraken: [https://desktop.github.com/](https://desktop.github.com/)
	- Multi-platform
	- Free version available for public repos only
	- Pro version available in GitHub Student Developer Pack

- SmartGit: [https://www.syntevo.com/smartgit/](https://www.syntevo.com/smartgit/)
	- Multi-platform
	- Free for non-commercial use

You may also use your IDE's embedded git client

## Git services

To collaborate and safely backup your repositories, you need a Git repository hosting service:

- GitHub: [http://github.com/](http://github.com/)
- GitLab: [http://gitlab.com/](http://gitlab.com/)
- BitBucket: [https://bitbucket.org/](https://bitbucket.org/)

UNIBZ has a self-hosted Gitlab:

- [https://gitlab.inf.unibz.it/](https://gitlab.inf.unibz.it/)


