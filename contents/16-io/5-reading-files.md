---
slug: /io/reading-files
course: Programming Project 2021/22
module: I/O
title: Reading text files
subtitle: null
chapter: 16
section: 5
previous: /io/reading-scanner
next: /io/writing
---

In Java, you can read the contents of a file in multiple ways:
- Using a **`FileReader`** object
- Using a **`BufferedReader`** object
- Using a **`Scanner`** object
- Using the **`Files`** class

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

## `Scanner`
*The text below was adapted from the [Java SE 17 documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Scanner.html).*

A simple text scanner that can parse primitive types and strings using regular expressions.

Introduced in Java 1.5.

A [`Scanner`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Scanner.html) breaks its input into tokens using a delimiter pattern, which by default matches whitespace. The resulting tokens may then be converted into values of different types using the various next methods.

For example, this code allows a user to read a number from `System.in`:

```java
Scanner sc = new Scanner(System.in);
int i = sc.nextInt();
System.out.println("You typed: " + i);
```

As another example, this code allows long types to be assigned from entries in a file `myNumbers`:

```java
Scanner sc = new Scanner(new File("myNumbers"));
while (sc.hasNextLong()) {
  long aLong = sc.nextLong();
  System.out.println("Read: " + aLong);
}
```

The scanner can also use delimiters other than whitespace. This example reads several items in from a string:

```java
String input = "1 fish 2 fish red fish blue fish";
Scanner s = new Scanner(input).useDelimiter("\\s*fish\\s*");
System.out.println(s.nextInt());
System.out.println(s.nextInt());
System.out.println(s.next());
System.out.println(s.next());
s.close();
```

prints the following output:

```output
1
2
red
blue
```

The default whitespace delimiter used by a scanner is as recognized by `Character.isWhitespace()`. The `reset()` method will reset the value of the scanner's delimiter to the default whitespace delimiter regardless of whether it was previously changed.

A scanner can read text from any object which implements the [`Readable`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Readable.html) interface. If an invocation of the underlying readable's `read()` method throws an [`IOException`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/IOException.html) then the scanner assumes that the end of the input has been reached. The most recent  [`IOException`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/IOException.html) thrown by the underlying readable can be retrieved via the `ioException()` method.

When a `Scanner` is closed, it will close its input source if the source implements the [`Closeable`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/Closeable.html) interface.

## Reading the lines of a file with a `Scanner`

In the example below, we read each line of a file at a time with the `nextLine()` method. 

Note that we are also using a **try-with-resources** block, so we don't have to close the scanner when are done.

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ReadLineByLineUsingScanner {
  public static void main(String[] args) {
    File file = new File("src/main/resources/names.txt");
    List<String> names = new ArrayList<>();

    try (Scanner scanner = new Scanner(file)) {
      while (scanner.hasNextLine()) {
        String name = scanner.nextLine();
        names.add(name);
      }

    } catch (FileNotFoundException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}
```

## Reading an entire file at once with a `Scanner`

If all we want to do is to read the contents of a file, we can use `\Z` as a delimiter (which identifies the end of the file). We do this by setting the delimiter of our scanner using the `useDelimiter` method and then invoking `next()`.

In the example below, we do that and then split the contents using the `\n` character.

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class ReadEntireFileUsingScanner {
  public static void main(String[] args) {
    File file = new File("src/main/resources/names.txt");
    List<String> names = null;

    try (Scanner scanner = new Scanner(file)) {
      // \\Z Matches the end of a string.
      scanner.useDelimiter("\\Z");
      String fileContent = scanner.next();
      String[] lines = fileContent.split("\n");
      names = Arrays.asList(lines);

    } catch (FileNotFoundException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}
```

## Reading integers from a file with a `Scanner`

If we want to read a file that contains other datatypes, we can use one of the variations of the `next()` method, namely:
- `nextBoolean()`
- `nextByte`
- `nextShort`
- `nextInt()`
- `nextLong()`
- `nextFloat()`
- `nextDouble()`
- `nextBigInteger()`
- `nextBigDecimal()`

Here is an example in which we read `int` values from a file:

```java
public class ReadIntsFromFileUsingScanner {
  // Reads a file, number by number, using a Scanner, until a non-number character is found. 
  public static void main(String[] args) {
    File file = new File("src/main/resources/numbers.txt");
    List<Integer> list = new ArrayList<>();

    try (Scanner scanner = new Scanner(file)) {
      while (scanner.hasNextInt()) {
        int number = scanner.nextInt();
        list.add(number);
      }
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    }

    System.out.println("Numbers: " + list);
  }
}
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

## Using Files: Reading all lines

```java
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

## Using Files: Read entire file

```java
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

## Using Files and a Stream

```java
public class ReadLineByLineWithUsingStreamFiles {
  // Reads a file, line by line, using the static method lines() of the {@link Files} class.
  public static void main(String[] args) {
    Path path = Path.of("src/main/resources/names.txt");
    List<String> names = null;

    try {
      names = Files.lines(path).collect(toList());
    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println("Names: " + names);
  }
}
```

## Exercise

The **`athletes.data`** file contains data about athletes, as shown below:

  ```output
  RUNNER|name=Mary;age=43;id=47868;injured=false;shoes=Asics
  RUNNER|age=18;name=John;id=47869;injured=true;shoes=Adidas
  SWIMMER|id=47870;name=Mike;injured=false;modality=freestyle
  RUNNER|name=Amy;age=23;id=47871;shoes=Nike;injured=false
  SWIMMER|id=47872;name=Bill;modality=butterfly;injured=false
  SWIMMER|id=47872;modality=backstroke;name=Ryan;injured=true
  ```

Write a program that reads such a file and creates objects accordingly. 
Create 3 domain classes: 
  - **`Athlete.java`**,
  - **`Runner.java`**, and 
  - **`Swimmer.java`**. 
Create a **`Main.java`** class to demonstrate your solution.

## Solution

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

  // Getters and setters...
}
```

## Solution

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
}
```

## Solution

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
}
```

## Solution

```java
public class AthleteParser {
  public static Athlete parseAthleteDate(String data) {
    String[] values = data.split("\\|");
    String athleteType = values[0];
    String athleteData = values[1];

    return switch (athleteType) {
      case "RUNNER" -> parseRunner(athleteData);
      case "SWIMMER" -> parseSwimmer(athleteData);
      default -> throw new RuntimeException("Unknown athlete type.");
    };
  }

  private static Swimmer parseSwimmer(String data) {
    Swimmer swimmer = new Swimmer();
    parseAthleteDate(swimmer, data);

    String modality = getValueOf(data, "modality");
    swimmer.setModality(modality);
    return swimmer;
  }

  private static Runner parseRunner(String data) {
    Runner runner = new Runner();
    parseAthleteDate(runner, data);

    String shoes = getValueOf(data, "shoes");
    runner.setShoes(shoes);

    return runner;
  }

  // continues...
```

## Solution

```java
  // continuing...

  private static void parseAthleteDate(Athlete athlete, String data) {
    String[] athleteData = data.split(";");

    for (String entry : athleteData) {
      String[] entryArray = entry.split("=");
      String field = entryArray[0];
      String value = entryArray[1];

      switch (field) {
        case "id" -> athlete.setId(value);
        case "name" -> athlete.setName(value);
        case "age" -> athlete.setAge(Integer.parseInt(value));
        case "injured" -> athlete.setInjured(Boolean.parseBoolean(value));
      }
    }
  }

  private static String getValueOf(String data, String field) {
    String[] athleteData = data.split(";");
    for (String entry : athleteData) {
      String[] entryArray = entry.split("=");
      String aField = entryArray[0];
      String value = entryArray[1];

      if (aField.equals(field))
        return value;
    }

    return null;
  }
}
```

## Solution

```java
public class Main {
  public static void main(String[] args) {
    String currentFilename = "src/main/resources/athletes.data";
    List<Athlete> athletes = readAthletesFromFile(currentFilename);
    System.out.println("File read.");
    athletes.stream()
            .map(Athlete::toDataString)
            .forEach(System.out::println);
  }

  public static List<Athlete> readAthletesFromFile(String filename) {
    Path path = Path.of(filename);
    List<Athlete> athletes = new ArrayList<>();

    try {
      return Files.lines(path)
              .map(AthleteParser::parseAthleteDate)
              .collect(toList());

    } catch (IOException e) {
      e.printStackTrace();
      return athletes;
    }
  }
}
```
