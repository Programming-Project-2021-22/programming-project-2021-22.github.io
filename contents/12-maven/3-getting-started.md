---
slug: /maven/getting-started
course: Programming Project 2021/22
module: Maven
title: Getting Started
subtitle: null
chapter: 12
section: 3
previous: /maven/compiling
next: /maven/coordinates
---

Before we go into the concepts and details of Maven, let us have a hands-on experience.

## Installing Maven on macOS

```terminal
$ brew update
$ brew install maven
```

## Installing Maven on Linux

```terminal
$ sudo yum install maven
```

or 

```terminal
$ sudo apt-get update
$ sudo apt-get -y install maven
```

## Installing Maven on Windows

1. Download the latest Maven from the Apache Maven website [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi) (e.g. `apache-maven-3.6.3-bin.zip`)
1. Unzip it in the folder where you want maven to live in
1. Add both `M2_HOME` and `MAVEN_HOME` variables to the Windows environment using system properties, and point it to your Maven folder.
1. Update the PATH variable by appending the Maven bin folder – `%M2_HOME%\bin`, so that you can run the Maven’s command everywhere.


## Tutorials: How to install Maven

If the previous instructions are not sufficient for you, try one of the tutorials below:

- https://maven.apache.org/install.html
- https://www.baeldung.com/install-maven-on-windows-linux-mac  
- https://mkyong.com/maven/install-maven-on-mac-osx/
- https://mkyong.com/maven/how-to-install-maven-in-windows/
- https://devwithus.com/install-maven-windows/
- https://phoenixnap.com/kb/install-maven-on-ubuntu


## Checking Maven installation

You can test if Maven is properly installed in your machine by running:

```terminal
$ mvn --version
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /usr/local/Cellar/maven/3.6.3/libexec
Java version: 13.0.1, vendor: Oracle Corporation, runtime: /Library/Java/Jav
aVirtualMachines/openjdk-13.0.1.jdk/Contents/Home
Default locale: it_IT, platform encoding: UTF-8
OS name: "mac os x", version: "10.14.6", arch: "x86_64", family: "mac"
```

## Setting up our first Maven project

1. Create a `pom.xml` file:

    ```xml
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
      <modelVersion>4.0.0</modelVersion>
      
      <groupId>it.unibz.pp2021</groupId>
      <artifactId>hello-world</artifactId>
      <version>1.0-SNAPSHOT</version>
      
      <properties>
        <maven.compiler.target>17</maven.compiler.target>
        <maven.compiler.source>17</maven.compiler.source>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
      </properties>
    </project>
    ```

2. Reorganize our project structure such that it complies with the Maven's default project structure.
  
    ```terminal
    $ mkdir -p src/main/java
    $ mv HelloWorld.java ./src/main/java/
    ```

3. We can now start using some maven commands. To **compile** your project, execute:
  
    ```terminal
    $ mvn compile
    ```

4. To **clean** your project's environment, execute:

    ```terminal
    $ mvn clean
    ```

5. To **compile** and **create a jar** file for your project, execute:

    ```terminal
    $ mvn package
    ```

## Including dependencies in the project

On your `pom.xml` file, add:

  ```xml
  <dependencies>
    <dependency>
      <groupId>org.apache.commons</groupId>
      <artifactId>commons-lang3</artifactId>
      <version>3.10</version>
    </dependency>
  </dependencies>
  ```

## Creating a new Maven project in IntelliJ IDEA

1. If no project is currently open in IntelliJ IDEA, click **Create New Project** on the Welcome screen. Otherwise, select **File | New | Project** from the main menu.
1. Select **Maven** from the options on the left.
1. Specify the project's SDK (JDK) or use the default one and an archetype if you want to use a predefined project template (configure your own archetype by clicking **Add Archetype**).
1. Click **Next**.
1. On the next page of the wizard, specify the following Maven coordinates to be added to the `pom.xml` file:
    - **GroupId** - the package of a new project.
    - **ArtifactId** - the name for your project.
    - **Version** -the a version of your project. By default, this field is specified automatically.
1. Click **Next**.
1. If you are creating a project using a Maven archetype, IntelliJ IDEA displays the Maven settings that you can use to set the Maven home directory and Maven repositories. Also, you can check the archetype properties.
1. Click **Next**.
1. Specify the name and location settings.
1. Click **Finish**.
 
See more at [JetBrain's support page](https://www.jetbrains.com/help/idea/maven-support.html).   


## Creating a fat jar using 

We add the following snippet to our `pom.xml` file (which uses the Assembly plugin):

  ```xml
  <build>
    <plugins>
      <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-assembly-plugin</artifactId>
          <executions>
            <execution>
              <phase>package</phase>
              <goals>
                  <goal>single</goal>
              </goals>
              <configuration>
                <archive>
                  <manifest>
                    <mainClass>HelloWorld</mainClass>
                  </manifest>
                </archive>
                <descriptorRefs>
                  <descriptorRef>jar-with-dependencies</descriptorRef>
                </descriptorRefs>
              </configuration>
            </execution>
          </executions>
        </plugin>
    </plugins>
</build>
  ```

