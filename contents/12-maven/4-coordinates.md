---
slug: /maven/coordinates
course: Programming Project 2021/22
module: Maven
title: Coordinates
subtitle: null
chapter: 12
section: 4
previous: /maven/getting-started
next: /maven/repositories
---

Let us now backtrack and try to make sense of what we did so far.

## Maven coordinates

Maven coordinates are used to identify artifacts in a repository.
- **groupId**: 
  - A descriptor of the organization that created the artifact
  - Usually the organization's reverse domain
- **artifactId**: 
  - A descriptor of the artifact
  - Usually the project's name
- **version**: 
  - The version of the artifact

Here are some examples:

  ```xml
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter-api</artifactId>
  <version>5.6.0</version>
  ```
  
  ```xml
  <groupId>org.apache.logging.log4j</groupId>
  <artifactId>log4j-api</artifactId>
  <version>2.13.1</version>
  ```

## Maven versions

Example: `3.2.1-98234-beta`
- **Major version**: 3
- **Minor version**: 2
- **Incremental version** (patch): 1
- **Build number**: 98234
- **Qualifier**: beta

Most often you will see either: 
- `MajorVersion.MinorVersion.IncrementalVersion`; or 
- `MajorVersion.MinorVersion`

## Snapshot versions

Example: `3.2.1-SNAPSHOT`

The `SNAPSHOT` qualifier tells Maven that this is a development version that is likely to change. Thus, Maven will recurrently check for newer versions. 

By default, Maven will check remote repositories once per day (this is configurable).

If a dependency does not have the `SNAPSHOT` qualifier, it will remain as it is unless we change it. 


## Semantic Versioning

Maven does not define when to update the major, minor, or incremental versions.

A guideline that we can follow is the [Semantic Versioning](https://semver.org/) specification, which reads as follows:

  > Given a version number MAJOR.MINOR.PATCH, increment the:
  >
  > 1. MAJOR version when you make incompatible API changes,
  > 1. MINOR version when you add functionality in a backwards compatible manner, and
  > 1. PATCH version when you make backwards compatible bug fixes.
  > 
  > Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

