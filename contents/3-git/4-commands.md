---
slug: "/git/commands"
course: Programming Project 2021/22
module: Git 101
title: Git commands
subtitle: null
chapter: 3
section: 4
previous: /git/shell
next: /git/gitignore
date: "2021-01-28"
---

Now, let's start using git!

## Command line interface

Before we choose to use any Desktop client, let us learn how to interact with the command-line interface (CLI).

The `git` command:

```command-line
$ git
```

The `git` command accepts options:

```command-line
$ git --version
```

The `git` command accepts sub-commands:

```command-line
$ git log
```

Many `git` sub-commands also accept options:

```command-line
$ git log -p
```

If you are not sure how to use a sub-command, run:

```command-line
$ git help add
$ git add --help
```

Many options have short and long "versions":

```command-line
$ git commit -m "Fixed a typo."
$ git commit --message="Fixed a typo."
```

## Creating an repository with `git init`

A Git repository is a database containing all the information needed to retain and manage the revisions and history of a project.

A repository retains a complete copy of the entire project throughout its lifetime.

Let us create a repository:

```command-line
$ mkdir ~/tmp/myrepo
$ cd ~/tmp/myrepo
$ echo 'My website is alive!' > index.html
```

To initialize a Git repository, run:

```command-line
$ git init
```

`git init` will create a hidden directory `/.git` in the current directory. It does not matter if the directory where you ran this command is empty or not.

To see the structure of the created `.git` directory, run:

```command-line
$ find .
```

or

```command-line
$ tree .git
```

To install the `tree` command, you may use:

- `homebrew` on macOS
- `apt-get` on Linux
- on Windows, it should already be available

## File management: a two-stage process

1. Stage incremental changes
2. Commit blocks of change

## File states

![](https://i.stack.imgur.com/kslSd.png)

## Checking the state of the repository with `git status`

To check the current status of the repository, run:

```command-line
$ git status
```

This command will show you:

- Tracked and untracked files
- What happened to your repository's files
  - Have they been **added**?
  - Have they been **modified**?
  - Have they been **deleted**?

## Adding files with `git add`

To stage a single file, run:

```command-line
$ git add file.txt
```

To add multiple files, run:

```command-line
$ git add file.txt file2.txt file3.txt
```

To add all files in a directory, run:

```command-line
$ git add .
```

## Committing changes with `git commit`

- A commit is used to record changes to a repository

- Committing triggers git to record a snapshot of the sate of the repository

- Git does NOT store a copy of all the files in a repository, only those that changed since the last commit

- Commits are organized in a chain, with each commit pointing to one or more predecessors

- To commit staged changes, run:

  ```command-line
  $ git commit
  ```

  This command will trigger the shell to open a default editor for you to describe your commit.

- If you want to add your commit title, use the `-m` option:

  ```command-line
  $ git commit -m "The title of my commit."
  ```

- To also add a commit description, use a second `-m`:

  ```command-line
  $ git commit -m "The title of my commit." -m "The description of my commit."
  ```

- The normal process you will go through is:

  ```command-line
  # You create, edit or delete files
  $ echo 'Hello world' > file.txt

  # You stage your changes
  $ git add file.txt

  # You commit your changes
  $ git commit -m "This message describes the commit."
  ```

- You can stage and commit changes all at once by running:

  ```command-line
  $ git commit -a -m "Stage and commit all changes."
  ```

  The option `-a` will automatically commit all changes made to tracked files, including new, modified or deleted files.

## Putting all of these commands together

Here is an interaction in which we use all of the aforementioned commands.

1. We create a directory.

```command-line
$ mkdir ~/repos/file_state_repo
```

2. We initialize a Git repository.

```command-line
$ cd ~/repos/file_state_repo
$ git init
$ git status
  On branch master

  No commits yet

  nothing to commit (create/copy files and use "git add" to track)
```

3. We add two files to the repository. Note how these files are created in the untracked state.

```command-line
$ echo "New data" > file.txt
$ git status
  On branch master

  No commits yet

  Untracked files:
    (use "git add <file>..." to include in what will be committed)

        file.txt
  nothing added to commit but untracked files present (use "git add" to track)

  Manually create an example junk file
$ touch data.csv
$ git status
  On branch master

  No commits yet

  Untracked files:
    (use "git add <file>..." to include in what will be committed)

        file.txt
        data.csv
```

4. We start tracking one of the files.

```command-line
$ git add data.csv
$ git status
  On branch master

  No commits yet

  Changes to be committed:
    (use "git rm --cached <file>..." to unstage)

          new file:   data.csv

  Untracked files:
    (use "git add <file>..." to include in what will be committed)

          file.txt
```

5. We commit this newly tracked file.

```command-line
$ git commit -m "Initial commit"
  [master (root-commit) 1bf2af7] Initial commit
   1 file changed, 1 insertion(+)
   create mode 100644 .gitignore
$ git status
  On branch master
  Untracked files:
    (use "git add <file>..." to include in what will be committed)

          file.txt

  nothing added to commit but untracked files present (use "git add" to track)
```

## Configuring the commit author

1. You can specify the author in every commit:

```command-line
$ git commit -m "Initial commit" --author "Tiago <tiago.princesales@unibz.it>"
```

2. You can set up the author in the project's configuration file:

```command-line
$ git config user.name "Tiago Prince Sales"
$ git config user.email "tiago.princesales@unibz.it"
```

3. You can set it up globally:

```command-line
$ git config --global user.name "Tiago Prince Sales"
$ git config --global user.email "tiago.princesales@unibz.it"
```

To see all you current configuration, run:

```command-line
$ git config --list
```

## Amending your commits

- Sometimes, we will make a commit and realize that:

  - we forgot to stage some changes
  - the commit message is not clear

- In such occasions, you can run

  ```command-line
  $ git add unstagedFile.txt
  $ git commit --amend
  ```

- If you simply want to change the commit title, run:

  ```command-line
  $ git commit --amend -m "My better title"
  ```

## Removing files with `git rm`

- To remove a single file, run:

  ```command-line
  $ git rm file.txt
  ```

- To remove multiple files, run:

  ```command-line
  $ git rm file.txt file2.txt file3.txt
  ```

- You can also run:

  ```command-line
  $ rm file.txt
  $ rm file2.txt
  $ rm file3.text
  $ git add .
  ```

- To remove a file and keep it as unstaged, do

  ```command-line
  git rm --cached file.txt
  ```

## Moving or renaming files with `git mv`

- To move or rename a single file, run:

  ```command-line
  $ git mv file.txt newFile.txt
  ```

- or

  ```command-line
  $ mv file.txt newFile.txt
  $ git rm file.txt
  $ git add newFile.txt
  ```

- or

  ```command-line
  $ mv file.txt newFile.txt
  $ git add .
  ```

## Unstaging changes with `git reset`

- To unstage a change to a file, run:

  ```command-line
  git reset nope.txt
  ```

- To unstage all staged files, run:

  ```command-line
  git reset
  ```

When running the last two commands, **your changes will not be lost.**

## Undoing a commit with `git reset`

- To undo the last commit and keep its changes unstaged, run:

  ```command-line
  $ git reset --mixed HEAD~1
  ```

- To undo the last commit and keep its changes staged, run:

  ```command-line
  $ git reset --soft HEAD~1
  ```

- To undo the last commit and throw away the changes, run:

  ```command-line
  $ git reset --hard HEAD~1
  ```

- Note that:
  - `HEAD` refers to the latest commit on the active branch
  - `HEAD~1` refers to the second last commit on the active branch

## Reversing a commit with `git revert`

- Reverting doesn’t alter the existing history within a repository. Instead, it adds a new commit to its history.

- To revert your last commit, run:

  ```command-line
  $ git revert HEAD
  ```

- To revert any commit, run:
  ```command-line
  $ git revert 64c852bcb306bceeeec8f77708171c583d807408
  ```

## Viewing your your repository's history

- To retrieve the commit history, run:

  ```command-line
  $ git log
  ```

- To include the changes introduced in each commit, run:

  ```command-line
  $ git log -p
  ```

- For more details on the last commit, run:

  ```command-line
  $ git show
  ```

- For more details on a particular commit, run:

  ```command-line
  $ git show d6e5980bb9390e853e29b293bc8ecf024b237260
  ```

- For a summary of the commits, run:

  ```command-line
  $ git show-branch --more=10w
  ```

## Visualize Git

- Let's make things more graphical with Visualize Git:
  - [Source code](https://github.com/git-school/visualizing-git)
  - [Running instance](http://git-school.github.io/visualizing-git)
- Type `help` in the command box to see a list of supported operations
  - `pres()` = Turn on presenter mode<br>
  - `undo` = Undo the last git command<br>
  - `redo` = Redo the last undone git command<br>
  - `mode` = Change mode (`local` or `remote`)<br>
  - `clear` = Clear the history pane and reset the visualization

Supported Git commands:

```command-line
git branch
git checkout
git cherry_pick
git commit
git fetch
git log
git merge
git pull
git push
git rebase
git reflog
git reset
git rev_parse
git revert
git tag
```
