---
slug: "/git/shell"
course: Programming Project 2021/22
module: Git 101
title: Basic shell commands
subtitle: null
chapter: 3
section: 3
previous: /git/install
next: /git/commands
date: "2021-01-28"
---

## Unix shell

From [Wikipedia](https://en.wikipedia.org/wiki/Unix_shell):

> Unix shell is **a command-line interpreter** [...] that provides a command line user interface for Unix-like operating systems. The shell is both an **interactive command language** and a scripting language, and is used by the operating system to control the execution of the system using shell scripts.
>
> Users typically interact with a Unix shell using a **terminal emulator**;

If that does not mean much to you, this is what a terminal and shell commands look like:

![ohmyzsh](https://ohmyz.sh/img/themes/nebirhos.jpg '#max-width=800px')  
Figure from [Oh My Zsh](https://ohmyz.sh/).

## Some basic Unix shell commands

Changes the working directory:

```command-line
cd ~/tmp
```

Lists the contents of the working directory:

```command-line
$ ls
```

Creates an empty file:

```command-line
$ touch file.txt
```

Creates a copy of the file:

```command-line
$ cp file.txt copy-of-file.txt
```

Moves the file (potentially renaming it):

```command-line
$ mv file.txt file2.txt
```

Creates a new folder:

```command-line
$ mkdir tmp
```

Deletes a file:

```command-line
$ rm file.txt
```

Deletes a directory:

```command-line
$ rm -r ~/tmp
```

Writes to a file overriding its contents

```command-line
$ echo Hello world > file.txt
```

Writes to a file appending to its contents

```command-line
$ echo Hello again world >> file.txt
```

Prints the contents of the file on the terminal

```command-line
$ cat file.txt
```

Displays the contents of the file on the terminal page-by-page

```command-line
$ less file.txt
```

## If you are using windows...

On Windows, many of these commands are different.

Check the table below for a list of Windows equivalent commands:
  
| Windows                       | Linux                        | Description                             |
|-------------------------------|------------------------------|-----------------------------------------|
| `dir`                           | `ls -l`                   | Directory listing                       |
| `copy`                          | `cp`                           | Copies a file                          |
| `ren`                           | `mv`                           | Renames a file                           |
| `move`                          | `mv`                           | Moves a file                           |
| `cls`                           | `clear`                        | Clears the screen                            |
| `del`                           | `rm`                           | Deletes files                           |
| `fc`                            | `diff`                         | Compares contents of files               |
| `find`                          | `grep`                         | Searches for a string in a file         |
| `cd`                            | `cd`                           | Changes the current directory           |
| `chdir`                         | `pwd`                          | Returns your current directory location |
| `md`                            | `mkdir`                        | Creates a new directory/folder          |
| `echo`                          | `echo`                         | Prints something on the screen          |
| `edit`                          | `vim` (depends on editor)      | Writes into files                       |
| `exit`                          | `exit`                         | Leaves the terminal/command window      |
| `rmdir`                         | `rm -rf` / `rmdir`             | Deletes a directory                     |
| `tree`                          | `ls -R`                        | Lists a directory recursively           |
| `type`                          | `cat`                          | Prints the contents of a file.          |

This table was adapted from [this](https://www.geeksforgeeks.org/linux-vs-windows-commands/) source.

## Windows Subsystem for Linux

Alternatively, Windows users can install the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install).

> Windows Subsystem for Linux (WSL) lets developers run a GNU/Linux environment -- including most command-line tools, utilities, and applications -- directly on Windows, unmodified, without the overhead of a traditional virtual machine or dual-boot setup.
