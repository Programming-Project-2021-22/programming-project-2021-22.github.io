---
slug: "/git/branches"
course: Programming Project 2021/22
module: Git 101
title: Branches
subtitle: null
chapter: 3
section: 3
previous: /git/commands
next: /git/remotes
date: "2021-01-28"
---

## Branches

- A branch is the fundamental means of launching a separate line of development within a software project

- A branch is a split from line of development, which allows it to continue in multiple directions simultaneously and, potentially, to produce different versions of a project

- Branches are often reconciled and merged with other branches to reunite disparate efforts

- Git allows many branches within a repository

- Git users make routine use of branches

## Branches - cont.

Why should we use branches?

. . . 

- A branch often represents an individual customer release. If you want to start version 1.1 of your project but you know that some of your customers want to stick with version 1.0, keep the old version alive as a separate branch.

. . . 

- A branch can encapsulate a development phase, such as the prototype, beta, stable, or bleeding-edge release. You can think of the version “1.1” release as a separate phase, too—the maintenance release.

. . . 

- A branch can isolate the development of a single feature or research into a particularly complex bug. For example, you can introduce a branch for a well-defined and conceptually isolated task or to facilitate a merge of several branches prior to a release.

	It may seem like overkill to create a new branch just to fix one bug, but Git’s branching system encourages such small-scale use.

. . . 

- An individual branch can represent the work of an individual contributor. Another branch—the “integration” branch—can be used specifically to unify efforts.

## Creating branches using `git branch`

To create a branch, run:

```bash
$ git branch development
```

To create a branch from a particular commit, run:
```bash
$ git branch development 56befbfbd06788dad7107cac7046b2e95b768ee2
```

The last option is the commit hash code from which to branch.

## Listing and selecting branches

To list all branches, run:

```bash
$ git branch
```

To select a branch to work with, run:

```bash
$ git checkout development
```

To create and checkout a branch, run:

```bash
$ git checkout -b feature1
```

Note that `git checkout` may also be used to revert changes on a file to the last committed changes.

## What if...

I have **untracked changes** in my active branch while trying to checkout another branch?

A may have created a new file...

```bash
$ git checkout development
$ printf "I will not stage this new file" > unstagedFile.txt
$ git checkout master
```

Or edited an existing file...

```bash
$ git checkout development
$ $ printf "I will not stage this change" > trackedFile.txt
$ git checkout master
```
. . .

Untracked changes are **brought to the checked out branch** 

## What if...

I have **staged changes** in my active branch while trying to checkout another branch?

```bash
$ git checkout development
$ $ printf "I will not stage this change" > file.txt
$ git add file.txt
$ git checkout master
```

. . .

Staged changes are **brought to the checked out branch ONLY if they do not cause conflict**.

Otherwise, you will see a message like this:

```bash
$ git checkout development

# error: Your local changes to the following files would be overwritten by checkout:
#         file.txt
# Please commit your changes or stash them before you switch branches.
# Aborting
```

## How to inspect what is going on?

```bash
# To see the content of the file who is causing the conflict
$ cat file.txt

# To compare the content of the files
$ git diff file.txt

# To see the content of the file in another branch
$ git show dev:file.txt
```


## What if...

I have **committed** changes in my active branch while trying to checkout another branch?

```bash
$ git checkout development
$ $ printf "I will not stage this change" > stagedFile.txt
$ git add stagedFile.txt
$ git checkout master
```

Committed changes **stay in the original branch** 

## Deleting branches with `git branch`

To delete a branch, run:

```bash
$ git branch -d development
```

If the branch you are trying to delete is currently checked out, you the command will fail:

```bash
$ git branch -d development
# error: Cannot delete branch 'development' checked out at '~/repos/file_state_repo'
```

Git will also "complain" if the branch to be deleted has changes that have not been merged into the current branch:

```bash
$ git checkout master
# Switched to branch 'master'

$ git branch -d development
# error: The branch 'development' is not fully merged.
# If you are sure you want to delete it, run 'git branch -D development'.
```

To delete the branch anyway, run:
```bash
$ git branch -D development
```

## Merging branches

- Git is a **distributed version control system**: It allows developers to make and record changes independently, and combine their changes at any time—all without a central repository

- A merge unifies two or more commit history branches

- A merge must occur within a single repository

- When modifications in one branch do not conflict with modifications found in another branch, Git computes a merge result and creates a new commit that represents the new, unified state.

- When branches conflict, which occurs whenever changes compete to alter the same line of the same file, Git does not resolve the dispute. 

## Merging branches with `git merge`

To merge branch `source` into branch `target`, you must:

```bash
$ git checkout target
$ git merge source
```

## Visualizing branches

[http://git-school.github.io/visualizing-git](http://git-school.github.io/visualizing-git)

## Exercise 

1. Initialize a repository
2. Create two branches
3. Add different files to both
4. Merge one into the other
5. Delete the merged branch

## Solution

```bash
$ mkdir my_repo

$ cd my_repo

$ git init
# Initialized empty Git repository in ~/my_repo/.git/

$ touch readme.md
$ git add .
$ git commit -m "First commit"
# [master (root-commit) ec593d5] First commit
#  1 file changed, 0 insertions(+), 0 deletions(-)
#  create mode 100644 readme.md

$ git branch dev
$ git checkout dev
# Switched to branch 'dev'

$ printf ".DS_Store" > .gitignore
$ git add .
$ git commit -m "Added basic .gitignore"
# [dev 72cf4fc] Added basic .gitignore
#  1 file changed, 1 insertion(+)
#  create mode 100644 .gitignore
```

## Solution

```bash
$ git checkout master
# Switched to branch 'master'

$ git merge dev
# Updating ec593d5..72cf4fc
# Fast-forward
#  .gitignore | 1 +
#  1 file changed, 1 insertion(+)
#  create mode 100644 .gitignore

$ git branch -d dev
# Deleted branch dev (was 72cf4fc).
```

## Merging with conflicts

Consider the following case:

```bash
$ git init
$ touch readme.md
$ git add .
$ git commit -m "First commit"

$ git branch dev

$ printf "# My title" > readme.md
$ git add .
$ git commit -m "Added title"

$ git checkout dev
$ printf "# A much better title\n\n ## With a header below it" > readme.md
$ git add .
$ git commit -m "Added a nice title and header"

$ git checkout master
$ git merge dev
```

**What will happen?**

## Merging with conflicts - cont.

To find the conflicting files, run:

```bash
$ git status
```

What happens inside a conflicting file?

```markdown
<<<<<<< HEAD
This is a nice project!
=======
# This is a better title!

## And I'll throw in a header
>>>>>>> dev
```

We should manually assess the conflicts and change the files.

Then stage and commit the changes:

```bash
$ git add readme.md
$ git commit -m "Merged 'dev'"
```




## Rebasing commits with `git rebase`

Consider the following situation:

![](./figures/before-rebase.png)

How do I get the C, D, and E into my `topic` branch?


## Rebasing commits with `git rebase` - cont.

I can rebase these commits and get the following situation:

![](./figures/after-rebase.png)

By running the commands:

```bash
$ git checkout topic
$ git rebase master
```

or:

```bash
$ git rebase master topic
```

## Visualizing rebasing

[http://git-school.github.io/visualizing-git](http://git-school.github.io/visualizing-git)


## `git merge` vs `git rebase`

![](./figures/merge-rebase.png){width=80%}

From: https://hackernoon.com/git-merge-vs-rebase-whats-the-diff-76413c117333

**Merge preserves history whereas rebase rewrites it.**

<!-- 
## Comparing commits with `git diff`

To compare the state of the repository between two commits, run:
```bash
$ git diff d6e5980bb9390e853e29b293bc8ecf024b237260 1d1c4876beb0a570972b09218570eda145159c75
```

The output of `git comparison` is organized per file. -->

