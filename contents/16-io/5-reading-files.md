---
slug: /io/reading-files
course: Programming Project 2021/22
module: I/O
title: "Reading: Files"
subtitle: null
chapter: 16
section: 5
previous: /io/reading-scanner
next: /io/writing
---

Our third option to read the contents of a text file is using the `Files` class of the `java.nio` package. To do so, we will need to create `Path` objects instead of `File` objects.

## Reading all lines of a file with `Files`

We can read all lines of a file at once:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class ReadAllLinesUsingFiles {
  // Reads a file, line by line, using the static method readAllLines() of the {@link Files} class.
  public static void main(String[] args) {
    Path path = Path.of("src/main/resources/names.txt");
    List<String> names = null;

    try {
      names = Files.readAllLines(path);
    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}
```

## Reading an entire file with `Files`

We can read its whole content into a `String`:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

public class ReadEntireFileUsingFiles {
  // Reads the entire contents of a file using the static method readString() of the {@link Files} class.
  public static void main(String[] args) {
    Path path = Path.of("src/main/resources/names.txt");
    List<String> names = null;

    try {
      String fileContent = Files.readString(path);
      String[] array = fileContent.split("\n");
      names = Arrays.asList(array);
    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}
```

## Using `Files` and a streams

We can even use streams:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class ReadLineByLineWithUsingStreamFiles {

  // Reads a file_manipulation.file, line by line, using the static method lines() of the {@link Files} class.
  public static void main(String[] args) {
    Path path = Path.of("src/main/resources/names.txt");
    List<String> names = null;

    try {
      names = Files.lines(path).toList();
    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}

```

## Exercise 3

Let us revisit the athlete exercise once again. This time, you should read the `athletes.data` file using the `Files` class. 

After solving the exercise, reflect on the 3 ways in which you read the `athletes.data` file and tell me which one you liked best.