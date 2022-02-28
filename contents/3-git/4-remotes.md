---
slug: "/git/remotes"
course: Programming Project 2021/22
module: Git 101
title: Remote repositories
subtitle: null
chapter: 3
section: 4
previous: /git/branches
next: null
date: "2021-01-28"
---
 
## Remote Repositories

- So far, we have only worked with one local repository.

- Let us now discover why git is a **distributed version control system** and how we can work with separate repositories.

- Essentially, separate repositories are useful:

	- Whenever a developer works autonomously.

	- Whenever developers are separated by a wide area network. A cluster of developers in the same location may share a local repository to amass localized changes.

	- Whenever a project is expected to diverge significantly along separate development paths. Although the regular branching and merging mechanism demonstrated in previous chapters can handle any amount of separate development, the resulting complexity may become more trouble than it’s worth. Instead, separate development paths can use separate repositories, to be merged again whenever appropriate.

## Clones

- A **clone** is a copy of a repository. 

- A clone contains all the objects from the original; as a result, each clone is an independent and autonomous repository and a true, symmetric peer of the original. 

- A clone allows each developer to work locally and independently without centralization, polls, or locks. Ultimately, it’s cloning that allows Git to scale to projects that are large and dispersed.

- Cloning a repository is just the first step in sharing code. You must also relate one repository to another to establish paths for data exchange. Git establishes these repository connections through remotes.

- A remote is a reference, or handle, to another repository. You use a remote as a shorthand name for an otherwise lengthy and complicated Git URL. You can define any number of remotes in a repository, thus creating elaborate networks of repository sharing.


## Cloning a remote repository with `git clone`

To clone your repository, run:

```bash
$ git clone https://gitlab.inf.unibz.it/Tiago.PrinceSales/my-awesome-project.git
```

Note that the recently cloned repo:

- has the same files as the original repo
- inherits the commit history from the original repo
- is independent from the original repo*


## Interacting with a remote repository

We can interact with a remote repository in the following ways:

- **git fetch**: retrieves objects and their related metadata from a remote repository.

- **git pull**: like git fetch, but also merges changes into a corresponding branch

- **git push**: transfers objects and their related metadata to a remote repository

## Pulling and pushing changes

Pushing changes: local changes being sent to remote repo

```bash
$ git clone https://gitlab.inf.unibz.it/Tiago.PrinceSales/my-awesome-project.git

# Edit the local repo (e.g. create a new file, alter or delete an existing one)

$ git add .
$ git commit -m "My update"
$ git push
```

Pulling changes: remote changes being brought to the local repo

```bash
# Edit the remote repo (e.g. create a new file, alter or delete an existing one)
$ git pull
```

## Creating a new branch and pushing it to remote

```bash
# clone repo
$ git clone https://gitlab.inf.unibz.it/Tiago.PrinceSales/my-awesome-project.git

$ git checkout -b dev
# Switched to a new branch 'dev'

$ git push -u origin dev
# Total 0 (delta 0), reused 0 (delta 0)
# remote: 
# remote: To create a merge request for dev, visit:
# remote:   https://gitlab.inf.unibz.it/Tiago.PrinceSales/my-awesome-project/-/merge_requests/ne
# w?merge_request%5Bsource_branch%5D=dev
# remote: 
# To https://gitlab.inf.unibz.it/Tiago.PrinceSales/my-awesome-project.git
#  * [new branch]      dev -> dev
# Branch 'dev' set up to track remote branch 'dev' from 'origin'.

```

## Exercise

1. Log in to GitLab or GitHub
2. Create a repository
3. Clone it in your computer
4. Create a local branch and publish in the remote repo
5. In the new branch, create a simple java program (HelloWorld.java)
6. Commit and push your changes to the remote

## Merge/Pull Requests

When you work on group project, you will have multiple branches.

What should you do when you finish the feature you are working on?

. . .

- You simply merge the changes to the master branch and let people know?
- You call your group members and show them the code in your computer?
- You inform your group members and they checkout your branch and test your code?

Creating a Merge/Pull request is a good alternative for these situations.

On GitLab, they are called Merge Requests, on GitHub, Pull Requests.

Let us make one now?

## Additional features of Git services

- Issues: a way to keep track of tasks, enhancements, and bugs in your project

  Learn more at [https://guides.github.com/features/issues/](https://guides.github.com/features/issues/)

- Forking projects: a way to contribute to other people's projects

  Learn more at [https://guides.github.com/activities/forking/](https://guides.github.com/activities/forking/)

- Project documentation: help others learn and reuse your project

  Learn more at [https://guides.github.com/features/wikis/](https://guides.github.com/features/wikis/)


