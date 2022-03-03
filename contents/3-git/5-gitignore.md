---
slug: "/git/gitignore"
course: Programming Project 2021/22
module: Git 101
title: Ignoring files
subtitle: null
chapter: 3
section: 5
previous: /git/commands
next: /git/branches
date: "2021-01-28"
---

We do not want to keep track of all files we eventually add in your repository. Think of your compile classes (`*.class`), for instance. Would there a a reason to add those to your repository?

To avoid adding those by accident, the `.gitignore` was invented.

## Syntax

This is how you describe what git should ignore ([source](https://git-scm.com/docs/gitignore)):

```gitignore
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

# A leading "**" followed by a slash means match in all directories.

**/foo

# A trailing "**" matches everything inside

foo/**

# A slash followed by two consecutive asterisks then a slash matches zero or more directories.
# For example, "a/**/b" matches "a/b", "a/x/b", "a/x/y/b" and so on.

a/**/b
```

## An example of `.gitignore` for a Java repository

Adapted from [GitHub’s collection](https://github.com/github/gitignore/blob/master/Java.gitignore) of `.gitignore` file templates.

```gitignore
# Compiled class file
*.class

# Log file
*.log

# Package Files
_.jar
_.war
_.nar
_.ear
_.zip
_.tar.gz
*.rar

# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
```

## Exercise

1. Create a Java project with only a main class.
2. Initialize a git repository to store your code.
3. Write a .gitignore file to ignore all IDE files.

For solutions, find your IDE template at [GitHub’s collection](https://github.com/github/gitignore/blob/master/Java.gitignore).
