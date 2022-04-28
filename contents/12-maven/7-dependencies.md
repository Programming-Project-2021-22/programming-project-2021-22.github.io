---
slug: /maven/dependencies
course: Programming Project 2021/22
module: Maven
title: Dependencies
subtitle: null
chapter: 12
section: 7
previous: /maven/pom
next: /maven/layout
---


**Dependency**: an artifact in which your Maven project depends on

**Transitive dependency**: a dependency of one of your projects' dependencies
- This can go many levels deep!
- Cyclic dependencies are not supported (A depends on B, B depends on A)

## Dependency management

A fundamental feature of Maven that allows developers to specify the exact version of which artifact their projects depend on.

**Dependency mediation**: what should be done when multiple versions of the same dependency are encountered?
- Maven adopts the "nearest dependency' policy.
- Example: 
  - A depends on B
  - A depends on C 2.0
  - B depends on C 1.0
- C 2.0 is included!

**Dependency exclusion**: we can specifically exclude dependencies

**Optional dependencies**: excluded by default for downstream projects
- Avoid blowing up dependency size
- Avoid dependency conflicts

[StackOverflow](https://stackoverflow.com/questions/40393098/when-to-use-optionaltrue-optional-and-when-to-use-scopeprovided-scope)  


## Transitive dependencies in practice

To write the following code:

```java
import java.io.IOException;
import org.apache.http.client.fluent.Request;

public class HelloWorld {
  public static void main(String[] args) throws IOException {
      String content = Request.Get("http://example.com")
                          .execute()
                          .returnContent()
                          .asString();
      System.out.println(content);
  }
}
```

We must import the following dependency:

```xml
<dependency>
  <groupId>org.apache.httpcomponents</groupId>
  <artifactId>fluent-hc</artifactId>
  <version>4.5.12</version>
</dependency>
```

Note that the `org.apache.httpcomponents:fluent-hc:4.5.12` library depends on:
- `org.apache.httpcomponents:httpclient:4.5.12`, which also depends on:
  - `commons-codec:commons-codec:1.11`
  - `org.apache.httpcomponents:httpcore:4.4.13`
  - `commons-logging:commons-logging:1.2`
- `commons-logging:commons-logging:1.2`

This allows us to do: 

```java
import java.io.IOException;
import org.apache.http.client.fluent.Request;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class HelloWorld {
  public static void main(String[] args) throws IOException {
      String content = Request.Get("http://example.com")
                          .execute()
                          .returnContent()
                          .asString();
      System.out.println(content);

      Log log = LogFactory.getLog("My log");
      log.info("Log this, please.");
  }
}
```

## Dependency scope

Dependency scopes can help to limit the transitivity of the dependencies. They also modify the classpath for different build tasks. Maven has six default dependency scopes.

And it's important to understand that each scope — except for import — has an impact on transitive dependencies.

[Baeldung article](https://www.baeldung.com/maven-dependency-scopes).

## Dependency scope: compile

- Default scope
- Available on the classpath of the project in all build tasks
- Propagated to dependent projects
- Example: `Apache HttpClient`, `Guava`, `Apache Commons IO`

```xml
<dependency>
  <groupId>org.apache.httpcomponents</groupId>
  <artifactId>fluent-hc</artifactId>
  <version>4.5.12</version>
</dependency>

<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>30.1.1-jre</version>
</dependency>

<dependency>
  <groupId>commons-io</groupId>
  <artifactId>commons-io</artifactId>
  <version>2.8.0</version>
</dependency>
```

## Dependency scope: provided

- Dependencies that should be provided at runtime by JDK or a container
- Available only at compile-time and in the test classpath of the project
- Is not propagated to dependent projects
- Example: A web application deployed in some container, where the container already provides some libraries itself

```xml
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>servlet-api</artifactId>
  <version>2.5</version>
  <scope>provided</scope>
</dependency>
```

## Dependency scope: runtime

- Required at runtime, but not needed for compilation of the project code
- Available only at runtime and test classpath, but mussing from compile classpath
- Not propagated to dependent projects
- Example: `MySQL JDBCs`

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>6.0.6</version>
    <scope>runtime</scope>
</dependency>
```

## Dependency scope: test

- Not required at standard runtime of the application, but is used only for test purposes
- Available at test and execution classpaths
- Not propagated to dependent projects
- Example: `Junit 5` and `Truth`

```xml
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter-api</artifactId>
  <version>5.7.0</version>
  <scope>test</scope>
</dependency>

<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter-engine</artifactId>
  <version>5.7.0</version>
  <scope>test</scope>
</dependency>

<dependency>
  <groupId>com.google.truth</groupId>
  <artifactId>truth</artifactId>
  <version>1.1.2</version>
  <scope>test</scope>
</dependency>
```

## Dependency scope: system

- Very similar to the provided scope. 
- The main difference between them is that system requires us to directly point to a specific jar on the system.
- The important thing to remember is that building the project with system scope dependencies may fail on different machines if dependencies aren't present or are located in a different place than the one systemPath points to:

```xml
<dependency>
  <groupId>com.baeldung</groupId>
  <artifactId>custom-dependency</artifactId>
  <version>1.3.2</version>
  <scope>system</scope>
  <systemPath>${project.basedir}/libs/custom-dependency-1.3.2.jar</systemPath>
</dependency>
```

## Dependency scope: import

This scope was added in Maven 2.0.9 and it's only **available for the dependency type pom**.

```xml
<dependency>
  <groupId>com.baeldung</groupId>
  <artifactId>custom-project</artifactId>
  <version>1.3.2</version>
  <type>pom</type>
  <scope>import</scope>
</dependency>
```

## Testing dependency scope 

Let us add **junit 5**'s dependencies in our `pom.xml`:

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.6.1</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-engine</artifactId>
    <version>5.6.1</version>
    <scope>test</scope>
</dependency>
```

For this, we will also need to adjust the version of the surefire plugin:

```xml
<plugins>
  <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>2.22.2</version>
    </plugin>
</plugins>
```

We can now create a unit test:

```java
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class MyTest {
  @Test
  void addition() {
      Assertions.assertEquals(2, 2);
  }
}
```

We can compile and run our test file by executing:

```terminal
$ mvn clean test
```

What if we try to use a class in junit's package in our `main` method?

```java
import org.junit.jupiter.api.Assertions;

public class HelloWorld {
  public static void main(String[] args) {
      Assertions.assertEquals(2, 2);
  }
}
```

```terminal
$ mvn clean compile
```

The build will fail, as we declared our dependencies using:
  
```xml
<scope>test<scope>
```

If we remove this line or change its value to compile, we will be able to "see" it at compile time.

## Dependency plugin

Dependencies are managed by the Maven Dependency Plugin

Important goals:
- `dependency:tree`: shows the dependency tree
- `dependency:go-offline`: downloads all dependencies so we can compile the project offline
- `dependency:purge-local-repository`: deletes and re-resolves artifacts from the local repository
- `dependency:sources`: downloads dependencies' source files

