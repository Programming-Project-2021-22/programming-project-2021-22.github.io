---
slug: /io/reading-file-reader
course: Programming Project 2021/22
module: I/O
title: "Reading: FileReader and BufferedReader"
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
- Using the `Files` class (since Java 1.7)

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

```output
[Rick, Morty, Birdperson, Beth, Summer, Jerry, Mr. Meeseeks]
```

Note that this code used the try-with-resources block. If we had not, we would need to close the `FileReader` after opening it, as in:

```java
package reading.file_reader;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ReadFromFileUsingFileReaderWithoutTryWithResources {

  public static void main(String[] args) {
    File file = new File("src/main/resources/names.txt");
    List<String> names = new ArrayList<>();

    FileReader reader = null;
    try {
      reader = new FileReader(file);
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
    } finally {
      if (reader != null) {
        try {
          reader.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }

    System.out.println(names);
  }
}
```

## Using a BufferedReader: Reading line by line

```java
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

```output
Names: [Rick, Morty, Birdperson, Beth, Summer, Jerry, Mr. Meeseeks, Gearhead]
```


## Using a BufferedReader: Alternative looping condition

```java
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

```output
Names: [Rick, Morty, Birdperson, Beth, Summer, Jerry, Mr. Meeseeks, Gearhead]
```


## Using a BufferedReader and a Stream

```java
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

public class ReadFromFileUsingBufferedReaderStream {
  // Reads a file, line by line, using a BufferedReader and the lines() method.
  public static void main(String[] args) {
    File file = new File("src/main/resources/names.txt");
    List<String> names = null;

    try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
      names = reader.lines()
                    .toList();
    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}
```

```output
Names: [Rick, Morty, Birdperson, Beth, Summer, Jerry, Mr. Meeseeks, Gearhead]
```

## Exercise 1

The `athletes.data` file contains data about athletes, as shown below:

```output
RUNNER|name=Mary;age=43;id=47868;injured=false;shoes=Asics
RUNNER|age=18;name=John;id=47869;injured=true;shoes=Adidas
SWIMMER|id=47870;name=Mike;injured=false;modality=freestyle
RUNNER|name=Amy;age=23;id=47871;shoes=Nike;injured=false
SWIMMER|id=47872;name=Bill;modality=butterfly;injured=false
SWIMMER|id=47872;modality=backstroke;name=Ryan;injured=true
```

Write a program that uses a `BufferedReader` to read such a file and create objects out of its data. Create one `Athlete` per line of the type identified in the beginning of the line.

Use the classes available below: 
- `Athlete.java`
- `Runner.java`
- `Swimmer.java` 
- `Main.java`

```java
public abstract class Athlete {
  String id;
  String name;
  int age;
  boolean injured;

  public Athlete() {
    id = null;
    name = null;
    age = 0;
    injured = false;
  }

  public Athlete(String id, String name, int age, boolean injured) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.injured = injured;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public boolean isInjured() {
    return injured;
  }

  public void setInjured(boolean injured) {
    this.injured = injured;
  }
}
```

```java
public class Runner extends Athlete {
  String shoes;

  public Runner() {
    super();
    shoes = null;
  }

  public Runner(String id, String name, int age, boolean injured, String shoes) {
    super(id, name, age, injured);
    this.shoes = shoes;
  }

  public String getShoes() {
    return shoes;
  }

  public void setShoes(String shoes) {
    this.shoes = shoes;
  }

  @Override
  public String toString() {
    return "Runner {" +
            id +
            ", " + name +
            ", " + age +
            ", " + injured +
            ", " + shoes +
            "}";
  }

}
```

```java
public class Swimmer extends Athlete {
  String modality;

  public Swimmer() {
    super();
    modality = null;
  }

  public Swimmer(String id, String name, int age, boolean injured, String modality) {
    super(id, name, age, injured);
    this.modality = modality;
  }

  public String getModality() {
    return modality;
  }

  public void setModality(String modality) {
    this.modality = modality;
  }
  
  @Override
  public String toString() {
    return "Swimmer {" +
            id +
            ", " + name +
            ", " + age +
            ", " + injured +
            ", " + modality +
            "}";
  }
}
```

```java
public class Main {

  public static void main(String[] args) {
    String currentFilename = "src/main/resources/athletes.data";
    List<Athlete> athletes = readAthletesFromFile(currentFilename);
    System.out.println("File read.");
    System.out.println(athletes);
  }

  public static List<Athlete> readAthletesFromFile(String filename) {
    // WRITE YOUR CODE HERE
  }

}
```
