---
slug: /maven/layout
course: Programming Project 2021/22
module: Maven
title: Standard Directory Layout
subtitle: null
chapter: 12
section: 8
previous: /maven/depedencies
next: /maven/lifecycle
---


This is how a Maven project is organized:


| Item                     | Description                                                                  |
|--------------------------|------------------------------------------------------------------------------|
| `src/main/java`          | Application/Library sources                                                |
| `src/main/resources`     | Application/Library resources                                              |
| `src/main/filters`       | Resource filter files                                                      |
| `src/main/webapp`        | Web application sources                                                    |
| `src/test/java`          | Test sources                                                               |
| `src/test/resources`     | Test resources                                                             |
| `src/test/filters`       | Test resource filter files                                                 |
| `src/it`                 | Integration Tests (primarily for plugins)                                  |
| `src/assembly`           | Assembly descriptors                                                       |
| `src/site`               | Site                                                                       |
| `LICENSE.txt`            | Project's license                                                          |
| `NOTICE.txt`             | Notices and attributions required by libraries that the project depends on |
| `README.txt`             | Project's readme                                                           |
| `pom.xml`                | Project Object Model                                                       | 


Read more [here](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html).

