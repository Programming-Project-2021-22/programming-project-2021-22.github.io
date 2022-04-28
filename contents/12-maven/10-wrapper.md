---
slug: /maven/wrapper
course: Programming Project 2021/22
module: Maven
title: Wrapper
subtitle: null
chapter: 12
section: 10
previous: /maven/lifecycle
next: /maven/archetypes
---

An approach to distribute our projects with Maven embedded, which allows your project to be compiled even by people who do not have Maven in their systems.

We can add a maven wrapper to our projects by executing:

```terminal
$ mvn -N io.takari:maven:wrapper
```
  
This should add to our current directory the following items:
- `mvnw`: a bash script for unix-based systems
- `mvnw.cmd`: a cmd script for Windows
- `.mvn/`: a hidden directory with maven wrapper files

We can choose which version of Maven we want in our wrapper:

```terminal
$ mvn -N io.takari:maven:wrapper -Dmaven=3.6.0
```






