---
slug: /maven/compiling
course: Programming Project 2021/22
module: Maven
title: Compiling Java
subtitle: null
chapter: 12
section: 2
previous: /maven/introduction
next: /maven/getting-started
---

## Java compile process

![](https://miro.medium.com/max/1400/0*sdC9GbNa659Ftywc.png)

Diagram from [this](https://medium.com/@PrayagBhakar/lesson-2-behind-the-scenes-4df6a461f31f) medium.com article.



## Java packaging 

- **.jar**:
  - Java ARchive
  - A zip file that may contain `*.class` files, source files, and resources
  - *Thin* vs *Fat* jars
  - *Runnable* vs *Non-runnable* jars
  - [https://docs.oracle.com/en/java/javase/13/docs/specs/jar/jar.html](https://docs.oracle.com/en/java/javase/13/docs/specs/jar/jar.html)
- **.war**:
  - Web Application aRchive
  - A zip file that may contain jars, compiled class, and resources for web applications
  - [https://docs.oracle.com/javaee/7/tutorial/packaging003.htm](https://docs.oracle.com/javaee/7/tutorial/packaging003.htm)
- **.ear**:
  - Enterprise ARchive
  - A zip file that may contain one or more wars
  - [https://docs.oracle.com/javaee/7/tutorial/packaging001.htm](https://docs.oracle.com/javaee/7/tutorial/packaging001.htm)
- **Docker containers:**
  - A more recent approach to deploy applications (not only Java)
  - Consists of docker image containing runtime environment, JVM, and Java package

## Java deployment

- **Thin jars** are often used to deploy libraries or partial applications
- **Fat jars** are often used to deploy complete applications that do not require application servers
- **Wars and ears** are often used to deploy complete applications that require application servers:
  - Apache Tomcat, JBoss, Jetty
- **Docker images** are often used to deploy complete applications
  - Increasingly popular in last few years

## Compiling Java from the command line

Let us create a simple `HelloWorld.java`

```java
public class HelloWorld {

  public static void main(String[] args) {
    System.out.println("Hello students!");
  }
}
```

We can compile it by running:

```terminal
$ javac HelloWorld.java
```

We will now find a `HelloWorld.class` file in the current directory, which we can run by doing: 
  
```terminal
$ java HelloWorld
```

We should see the output below in the terminal:

```output
Hello students!
```

## Creating jar files from the command line

We can create a jar file by running:

```terminal
$ jar cf hello.jar HelloWorld.class
```

We will now find a `hello.jar` file in the current directory, which we can run by:

```terminal
$ java -classpath hello.jar HelloWorld
```

We should see the following output in our terminals:

```output
Hello students!
```
  
We can see what is on the inside of our compiled class by running:

```terminal
$ unzip hello.jar -d tmp
```

  In the `tmp` directory we will find our `HelloWorld.class` and a `META-INF` folder containing a `MANIFEST.MF` file.

## The `MANIFEST.MF` file

Whenever we create a `jar` file, a default manifest file is created:

```java
Manifest-Version: 1.0
Created-By: 13.0.1 (Oracle Corporation)
```

A manifest's entries take the form of `"header: value"` pairs.

The manifest can also contain information about the other files that are packaged in the archive.

Exactly what file information should be recorded in the manifest depends on how you intend to use the JAR file.

Read more [here](https://docs.oracle.com/javase/tutorial/deployment/jar/manifestindex.html)


## Creating a runnable jar

To create a runnable jar, we first need to create a `Manifest.txt` as show below. **Make sure there is an empty line at the end of your file!**

```java
Main-Class: HelloWorld

```

Then, we run the following command:

```terminal
$ jar cfm runnable-hello.jar Manifest.txt HelloWorld.class 
```

We can now simply run our program by executing:

```terminal
$ java -jar runnable-hello.jar
```

We should see the following output:

```output
Hello students!
```
  
## Using 3rd party jars

Now, suppose that we want to use the [Apache Commons Lang library](http://commons.apache.org/proper/commons-lang/)

```java
import org.apache.commons.lang3.StringUtils;

public class HelloWorld {

  public static void main(String[] args) {
    System.out.println("Hello students!");
    System.out.println("Is \"    \" an empty string? " + StringUtils.isBlank("    "));
  }
}
```

We need to download the appropriate `jar` file and make it available in our classpath when compiling and running our program

To compile, we can execute:

```terminal
$ javac -classpath ./lib/* HelloWorld.java
```

We should now have `HelloWorld.class`, our compiled file.
  
To run the program, we execute:

```terminal
$ java -classpath './lib/*:./' HelloWorld
```

We should see the following output:

```output
Hello students!
Is "    " an empty string? true
```

## Creating a jar with a dependency

To create a runnable jar with a dependency, we must edit our `Manifest.txt` file:

```java
Main-Class: HelloWorld
Class-Path: lib/commons-lang3-3.10.jar
```
  
Then, we run the following command:

```terminal
$ jar cfm runnable-hello.jar Manifest.txt HelloWorld.class 
```

We can now simply run our program by executing:

```terminal
$ java -jar runnable-hello.jar
```

We should see the following output:

```output
Hello students!
Is "    " an empty string? true
```

