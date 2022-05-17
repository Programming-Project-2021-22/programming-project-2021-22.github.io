---
slug: /io/reading-file-reader
course: Programming Project 2021/22
module: I/O
title: FileReader and BufferedReader
subtitle: null
chapter: 16
section: 3
previous: /io/streams
next: /io/reading-scanner
---

In Java, you can read the contents of a file in multiple ways:
- Using a `FileReader` object (since Java 1.1)
- Using a `BufferedReader` object (since Java 1.1)
- Using a `Scanner` object (since Java 1.5)
- Using the `Files` class

Let us see how to do use these alternative methods to read names from a file, as in:

```output
Rick
Morty
Birdperson
Beth
Summer
Jerry
Mr. Meeseeks
Gearhead
```

## `FileReader`

## Reading character by character with a `FileReader`

```java
public class ReadFromFileUsingFileReader {
  // Reads a file, character by character, using a FileReader.
  public static void main(String[] args) {
    File file = new File("src/main/resources/names.txt");
    List<String> names = new ArrayList<>();

    try (FileReader reader = new FileReader(file)) {
      String name = "";

      while (reader.ready()) {
        char character = (char) reader.read();

        if (character == '\n') {
          names.add(name);
          name = "";
        } else {
          name += character;
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println(names);
  }
}
```
## BufferedReader

## Using a BufferedReader: Reading line by line

```java
public class ReadFromFileUsingBufferedReaderReady {
  // Reads a file, line by line, using a BufferedReader. Loops using ready().
  public static void main(String[] args) {
    File file = new File("src/main/resources/names.txt");
    List<String> names = new ArrayList<>();

    try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
      while (reader.ready()) {
        String name = reader.readLine();
        names.add(name);
      }

    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}
```

## Using a BufferedReader: Alternative looping condition

```java
public class ReadFromFileUsingBufferedReader {
  // Reads a file, line by line, using a BufferedReader. Loops using readLine()
  public static void main(String[] args) {
    File file = new File("src/main/resources/names.txt");
    List<String> names = new ArrayList<>();

    try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
      String line = reader.readLine();

      while (line != null) {
        names.add(line);
        line = reader.readLine();
      }

    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}
```

## Using a BufferedReader and a Stream

```java
public class ReadFromFileUsingBufferedReaderStream {
  // Reads a file, line by line, using a BufferedReader and the lines() method.
  public static void main(String[] args) {
    File file = new File("src/main/resources/names.txt");
    List<String> names = null;

    try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
      names = reader.lines()
                    .collect(toList());
    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}
```