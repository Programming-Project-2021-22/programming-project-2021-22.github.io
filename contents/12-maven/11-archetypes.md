---
slug: /maven/archetypes
course: Programming Project 2021/22
module: Maven
title: Archetypes
subtitle: null
chapter: 12
section: 11
previous: /maven/wrapper
next: /maven/maven-git
---

Maven provides project templates, which are called **archetypes**.

An archetype is defined as an original pattern or model from which all other things of the same kind are made.

Archetypes are provided by Maven and by third parties.

We can create a project based on an archetype by executing:

```terminal
$ mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes 
      -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4
```

We will be then asked to provide some additional information, such as the groupId, artifactId, and version number.

Read more [here](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html).




