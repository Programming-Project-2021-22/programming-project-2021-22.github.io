---
slug: "/git/commands"
course: Programming Project 2021/22
module: Git 101
title: Basic commands
subtitle: null
chapter: 3
section: 2
previous: /git/introduction
next: /git/branches
date: "2021-01-28"
---

## Some basic Unix shell commands

```bash
# changes the working directory
$ cd ~/tmp

# lists the contents of the working directory
$ ls

# creates a copy of the file
$ cp file.txt copy-of-file.txt

# moves the file (potentially renaming it)
$ mv file.txt file2.txt

# creates a new folder
$ mkdir tmp

# removes a file
$ rm file.txt

# removes a directory
$ rm -r ~/tmp

# writes to a file overriding its contents
$ echo Hello world > file.txt

# writes to a file appending to its contents
$ echo Hello again world >> file.txt

# prints the contents of the file on the terminal
$ cat file.txt

# displays the contents of the file on the terminal page-by-page
$ less file.txt
```

## If you are using windows...

- On Windows, many of these commands are different.

- Check the link below for a list of Windows equivalent commands:
  \newline

  [https://www.geeksforgeeks.org/linux-vs-windows-commands/](https://www.geeksforgeeks.org/linux-vs-windows-commands/)

## Git command line interface

The git command:

```bash
$ git
```

The git command accepts options: 

```bash
$ git --version
```

The git command accepts sub-commands:

```bash
$ git log
```

Many git sub-commands also accept options:

```bash
git log -p 
```

If you are not sure how to use a sub-command, run:

```bash
$ git help add
$ git add --help
```

Many options have short and long "versions":

```bash
$ git commit -m "Fixed a typo."
$ git commit --message="Fixed a typo."
```

## Creating an repository with `git init`

A Git repository is a database containing all the information needed to retain and manage the revisions and history of a project. 

A repository retains a complete copy of the entire project throughout its lifetime. 

Let us create a repository:

```bash
$ mkdir ~/tmp/myrepo
$ cd ~/tmp/myrepo
$ echo 'My website is alive!' > index.html
```

To initialize a Git repository, run:

```bash
$ git init
```

`git init` will create a hidden directory `/.git` in the current directory. It does not matter if the directory where you ran this command is empty or not.

To see the structure of the created `.git` directory, run:

```bash
$ find .
```

or 

```bash
$ tree .git
```

To install the `tree` command, you may use:

- `homebrew` on macOS
- `apt-get` on Linux
-  on Windows, it should already be available*

## File management: a two-stage process

1. Stage incremental changes
2. Commit blocks of change

## File management: file states

- **Untracked**: a file in the repository directory that is neither tracked or ignored. 

  This is the state a file is in right after you create it.

- **Tracked**: a file that is in the repository or is staged in the index. 

- **Ignored**: a file that explicitly declared as “invisible” or “ignored” in the repository, even though it may be present within your working directory. 

  We use a `.gitignore` file do inform git about which other files it should ignore.

## Checking the state of the repository with `git status`

To check the current status of the repository, run:
```bash
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

```bash
$ git add file.txt
```

To add multiple files, run:

```bash
$ git add file.txt file2.txt file3.txt
```

To add all files in a directory, run:

```bash
$ git add .
```

## Committing changes with `git commit`

- A commit is used to record changes to a repository

- Committing triggers git to record a snapshot of the sate of the repository

- Git does NOT store a copy of all the files, only the changes

- Commits are organized in a chain, with each commit pointing to one or more predecessors

- To commit staged changes, run:

  ```bash
  $ git commit
  ```

  This command will trigger the shell to open a default editor for you to describe your commit.

- If you want to add your commit title, use the `-m` option:

  ```bash
  $ git commit -m "The title of my commit."
  ```

- To also add a commit description, use a second `-m`:

  ```bash
  $ git commit -m "The description of my commit."
  ```


## Committing changes with `git commit`

- The normal process will go through is

  ```bash
  # You create, edit or delete files
  $ echo 'Hello world' > file.txt

  # You stage your changes
  $ git add file.txt

  # You commit your changes
  $ git commit -m "This message describes the commit."
  ```

- You can stage and commit changes all at once by running:

  ```bash
  $ git commit -a -m "Stage and commit all changes."
  ```

  The option `-a` will automatically commit all changes made to tracked files, including new, modified or deleted files.

## Configuring the commit author

- You can specify the author in every commit:

  ```bash
  $ git commit -m "Initial commit" --author "Tiago <tiago.princesales@unibz.it>"
  ```

- Or set up the author in the project's configuration file

  ```bash
  $ git config user.name "Tiago Prince Sales"
  $ git config user.email "tiago.princesales@unibz.it"
  ```

- To set it up globally, run:

  ```bash
  $ git config --global user.name "Tiago Prince Sales"
  $ git config --global user.email "tiago.princesales@unibz.it"
  ```

- To see all you current configurations, run:

  ```bash
  $ git config --list
  ```

## Amending your commits

- Sometimes, we will make a commit and realize that:
  - we forgot to stage some changes
  - the commit message is not clear

- In such occasions, you can run

  ```bash
  $ git add unstagedFile.txt
  $ git commit --amend
  ```

- If you simply want to change the commit title, run:

  ```bash
  $ git commit --amend -m "My better title"
  ```


## Removing files `git rm`

- To remove a single file, run:

  ```bash
  $ git rm file.txt
  ```

- To remove multiple files, run:

  ```bash
  $ git rm file.txt file2.txt file3.txt
  ```

- You can also run: 

  ```bash
  $ rm file.txt
  $ rm file2.txt
  $ rm file3.text
  $ git add .
  ```

- To remove a file and keep it as unstaged, do

  ```bash
  git rm --cached file.txt
  ```

## Moving or renaming files with `git mv`

- To move or rename a single file, run:

  ```bash
  $ git mv file.txt newFile.txt
  ```

- or

  ```bash
  $ mv file.txt newFile.txt
  $ git rm file.txt
  $ git add newFile.txt
  ```

- or

  ```bash
  $ mv file.txt newFile.txt
  $ git add .
  ```

## Unstaging changes with `git reset`

- To unstage a change to a file, run:

  ```bash
  git reset nope.txt
  ```

- To unstage all staged files, run:

  ```bash
  git reset
  ```

When running the last two commands, your changes will not be lost.

## Undoing a commit with `git reset`

To undo the last commit and keep its changes staged, run:
```bash
$ git reset --soft HEAD~1
```

To undo the last commit and keep its changes unstaged, run:
```bash
$ git reset --mixed HEAD~1
```

To undo the last commit and throw away the changes, run:
```bash
$ git reset --hard HEAD~1
```

- Note that HEAD refers to the latest commit on the active branch.
- HEAD~1 refers to the second last commit on the active branch

## Reversing a commit with `git revert`

- Reverting doesn’t alter the existing history within a repository

- It adds a new commit to the history

To revert the last commit, run:
```bash
$ git revert HEAD
```

To revert any commit, run:
```bash
$ git revert 64c852bcb306bceeeec8f77708171c583d807408
```

<!-- ## `git reset` vs `git revert`

A good answer on StackOverflow: 
[https://stackoverflow.com/questions/8358035/whats-the-difference-between-git-revert-checkout-and-reset](https://stackoverflow.com/questions/8358035/whats-the-difference-between-git-revert-checkout-and-reset)

- **`git revert`**: this command creates a new commit that undoes the changes from a previous commit. It adds new history to the project (it doesn't modify existing history).

- **`git checkout`**: this command checks-out content from the repository and puts it in your work tree. It can also have other effects, depending on how the command was invoked. For instance, it can also change which branch you are currently working on. This command doesn't make any changes to the history.

- **`git reset`**: this command is a little more complicated. It actually does a couple of different things depending on how it is invoked. It modifies the index (the so-called "staging area"). Or it changes which commit a branch head is currently pointing at. This command may alter existing history (by changing the commit that a branch references).

## `git reset` vs `git revert` vs `git checkout` - cont. 

**Using these commands**

- If a commit has been made somewhere in the project's history, and you later decide that the commit is wrong and should not have been done, then git revert is the tool for the job. It will undo the changes introduced by the bad commit, recording the "undo" in the history.

- If you have modified a file in your working tree, but haven't committed the change, then you can use git checkout to checkout a fresh-from-repository copy of the file.

- If you have made a commit, but haven't shared it with anyone else and you decide you don't want it, then you can use git reset to rewrite the history so that it looks as though you never made that commit.

- These are just some of the possible usage scenarios. There are other commands that can be useful in some situations, and the above three commands have other uses as well.-->

## Ignoring files with .gitignore

- To inform which files git should ignore, we use the **.gitignore** file.

- This is how you describe what git should ignore:

  (from [https://git-scm.com/docs/gitignore](https://git-scm.com/docs/gitignore))

  ```markdown
  # A line starting with # is a comment
  
  # The forward slash / is used as a directory separator. 
  # Separators may occur at the beginning, middle or end of a pattern.
  target/classes

  # If there is a separator at the beginning or middle (or both) of the pattern, 
  # then it is relative to the directory level of the .gitignore file itself. 
  /Main.class
  target/Main.class
  
  # Otherwise the pattern may also match at any level below the .gitignore level.
  Main.class
  main/

  # If there is a separator at the end of the pattern, 
  # then the pattern will only match directories.
  target/
  
  # Otherwise the pattern can match both files and directories.
  target

  # For example, a pattern doc/frotz/ matches doc/frotz directory, but not a/doc/frotz directory; 
  # however frotz/ matches frotz and a/frotz that is a directory

  # An asterisk "*" matches anything except a "/"
  *.class

  # A question mark "?" matches any one character except a "/"
  ?.class

  ## A leading "**" followed by a slash means match in all directories.
  **/foo

  # A trailing "/**" matches everything inside
  foo/**

  # A slash followed by two consecutive asterisks then a slash matches zero or more directories. 
  # For example, "a/**/b" matches "a/b", "a/x/b", "a/x/y/b" and so on.
  a/**/b
  ```

## .gitignore for a Java project

Adapted from: [https://github.com/github/gitignore/blob/master/Java.gitignore](https://github.com/github/gitignore/blob/master/Java.gitignore)

```markdown
# Compiled class file
*.class

# Log file
*.log

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
```
## Exercise

1. Create a Java project in your IDE of choice, with only a main class.

2. Initialize a git repository to store your code.

3. Write a .gitignore file to ignore all IDE files.

. . . 

For solutions, find your IDE template at[https://github.com/github/gitignore/tree/master/Global](https://github.com/github/gitignore/tree/master/Global)

## Viewing your old commits

- To retrieve the commit history, run:

  ```bash
  $ git log
  ```

- To include the changes introduced in each commit, run:

  ```bash
  $ git log -p
  ```

- For more details on the last commit, run:

  ```bash
  $ git show
  ```

- For more details on a particular commit, run:

  ```bash
  $ git show d6e5980bb9390e853e29b293bc8ecf024b237260
  ```

- For a summary of the commits, run:

  ```bash
  $ git show-branch --more=10
  ```

## Visualize Git

- Let's make things more graphical with Visualize Git:

  - Source: [https://github.com/git-school/visualizing-git](https://github.com/git-school/visualizing-git)

  - Running instance: [http://git-school.github.io/visualizing-git](http://git-school.github.io/visualizing-git)

- Type `help` in the command box to see a list of supported operations

  - `pres()` = Turn on presenter mode<br>

  - `undo` = Undo the last git command<br>

  - `redo` = Redo the last undone git command<br>

  - `mode` = Change mode (`local` or `remote`)<br>

  - `clear` = Clear the history pane and reset the visualization

## Visualize Git: Supported operations

Git Commands:

  ```shell
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

## File management: file states

- **Untracked**: a file in the repository directory that is neither tracked or ignored. 

  This is the state a file is in right after you create it.

- **Tracked**: a file that is in the repository or is staged in the index. 

- **Ignored**: a file that explicitly declared as “invisible” or “ignored” in the repository, even though it may be present within your working directory. 

  
## File states in action

```bash
$ mkdir ~/repos/file_state_repo
$ cd ~/repos/file_state_repo
$ git init
$ git status
# On branch master
#
# No commits yet
#
# nothing to commit (create/copy files and use "git add" to track)
$ echo "New data" > file.txt
$ git status
# On branch master
#
# No commits yet
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       file.txt
#nothing added to commit but untracked files present (use "git add" to track)
```

## File states in action - cont.

```bash
# Manually create an example junk file
$ touch main.o
$ git status
# On branch master
#
# No commits yet
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       file.txt
#       main.o
$ echo main.o > .gitignore
$ git status
# On branch master
#
# No commits yet
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       .gitignore
#       file.txt
```

## File states in action - cont.

```bash
$ git add .gitignore
$ git status
# On branch master
#
# No commits yet
#
# Changes to be committed:
#   (use "git rm --cached <file>..." to unstage)
#
#         new file:   .gitignore
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#         file.txt
$ git commit -m "Initial commit"
# [master (root-commit) 1bf2af7] Initial commit
#  1 file changed, 1 insertion(+)
#  create mode 100644 .gitignore
$ git status
# On branch master
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
# 
#         file.txt
# 
# nothing added to commit but untracked files present (use "git add" to track)
$ git ls-files
# .gitignore
```


