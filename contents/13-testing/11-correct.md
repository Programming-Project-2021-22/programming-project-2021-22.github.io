---
slug: /testing/correct
course: Programming Project 2021/22
module: Testing
title: "Boundary Conditions: The CORRECT Way"
subtitle: null
chapter: 13
section: 11
previous: /testing/right-bicep
next: /regex/introduction
---

In this section, we will discuss the **CORRECT** acronym, as proposed by Jeff Langr, Andy Hunt, and Dave Thomas, in **[Pragmatic Unit Testing in Java 8 with JUnit](https://ubz-primo.hosted.exlibrisgroup.com/permalink/f/pok0fm/39UBZ_ALMA_DS51260958870001241)**, 2015. 

![](https://images-na.ssl-images-amazon.com/images/I/81EocPQDPiL.jpg)

Your unit tests can help you prevent shipping some of the defects that often involve **boundary conditions**-the edges around the happy-path cases where things often go wrong.

The CORRECT acronym can help you think about the boundary conditions to consider for your unit tests:
- **Conformance**: Does the value conform to an expected format?
- **Ordering**: Is the set of values ordered or unordered as appropriate?
- **Range:** Is the value within reasonable minimum and maximum values?
- **Reference:** Does the code reference anything external that isn’t under direct control of the code itself?
- **Existence:** Does the value exist (is it non-null, nonzero, present in a set, and so on)?
- **Cardinality:** Are there exactly enough values?
- **Time (absolute and relative):** Is everything happening in order? At the right time? In time?

For each criteria, consider the impact of data from all possible origins—including arguments passed in, fields, and locally managed variables. 

Then seek to fully answer the question: **What else can go wrong?**



## [C]ORRECT: Conformance

We often build methods expecting that the inputs we receive will comply with a certain format. 

For example, a URL usually follows the form ([Wikipedia](https://en.wikipedia.org/wiki/URL)):

`URL = scheme ":" ["//" authority] path ["?" query] ["#" fragment]`

where the authority component divides into three subcomponents:

`authority = [userinfo "@"] host [":" port]`

Valid URLs include:
- `http://example.com`
- `http://example.com/questions/3456/my-document`
- `http://example.com/questions#title`
- `http://example.com?query=question`

If we have a method that processes and extracts the host of a URL, we could test the following boundary conditions:
- A URL without a scheme (`:example.com`)
- A URL without colon dividing the scheme (`http//example.com`)
- A URL without a host (`http://`)

## Exercise

Consider the methods in the class below, which was designed to extract domains from emails.

```java
import java.util.*;
import java.util.regex.*;

public class Email {
  public static List<String> getDomains(List<String> emails) {
    return emails.stream()
            .map(Email::getDomain)
            .toList();
  }

  public static String getDomain(String email) {
    Matcher matcher = Pattern.compile(".+?@(.+)")
                           .matcher(email);
    matcher.find();
    return matcher.group(1);
  }
}
```


Think of 3 boundary conditions related to input conformance for the methods of the `Email` class and implement test methods that check them.

In the test class below, you will find only methods that test the happy path.

```java
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class EmailTest {

  @Test
  void shouldReturnGmailDotCom() {
    String domain = Email.getDomain("example@gmail.com");
    assertThat(domain).isEqualTo("gmail.com");
  }

  @Test
  void shouldReturnUnibzDotIt() {
    String domain = Email.getDomain("example@unibz.it");
    assertThat(domain).isEqualTo("unibz.it");
  }

  @Test
  void shouldReturnUnibzDotItAndGmailDotCom() {
    List<String> domains = Email.getDomains(List.of("example@gmail.com", "example@unibz.it"));
    assertThat(domains).contains("gmail.com", "unibz.it");
  }
}
```

To run this code, you can use the following `pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>it.unibz.inf</groupId>
    <artifactId>lecture-testing</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.8.2</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.8.2</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.assertj</groupId>
            <artifactId>assertj-core</artifactId>
            <version>3.22.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.0.0-M5</version>
            </plugin>
        </plugins>
    </build>

</project>
```


## C[O]RRECT: Ordering

The order of data, or the position of one piece of data within a larger collection, represents a CORRECTness criterion where it’s easy for code to go wrong.

Let's suppose we wrote a method that returns a list of words, in alphabetical order, that occur more than once in an input text.

Given this input

`"I love every kind of pizza, but what I love the most is pineaple pizza."`

our method should return

`["I", "love", "pizza"]`

Given this other input

`Sometimes science is more art than science, but art is never science`

it should return 

`["art", "is", "science"]`

If we were to implement the methods as show below, we would fail the second test because of the order in which repeated words appeared in the text input.

```java
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Ordering {
  public static List<String> findRepeatedWords(String text) {
    return getWordCountMap(text)
            .entrySet()
            .stream()
            .filter(entry -> entry.getValue() > 1)
            .map(Map.Entry::getKey)
            .toList();
  }

  private static Map<String, Long> getWordCountMap(String text) {
    String[] words = text.replaceAll("\\.|,", "").split(" ");

    Map<String, Long> count = new LinkedHashMap<>();

    for (String word : words) {
      long value = 0;

      if (count.containsKey(word))
        value = count.get(word);

      count.put(word, value + 1);
    }

    return count;
  }
}
```

Note that, in the first phrase, repeated words appeared in alphabetical order in the original text, while in the second case, they did not. 

## Exercise

Suppose that `getDomains()` should return domains in alphabetical order. Write methods that verify such a behavior, altering the original source code as needed. 

Make sure you consider at least one boundary condition related to input ordering.

## CO[R]RECT: Range

When you use Java’s built-in types for variables, you often get far more capacity than you need. 

If you represent a person’s age using an `int`, you’d be safe for at least a couple million more centuries.Inevitably, things will go wrong, and you’ll end up with:
- a person a few times older than Methuselah, or 
- a backward time traveler—someone with a negative age.

Given this Person class:

```java
public class Person {
  String name;
  int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }
}
```

To test these two domain rules regarding the `age` field, we can write the following tests:

```java
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;

class PersonTest {

  @Test
  void personConstructorShouldFailOnNegativeAge() {
    Throwable t = catchThrowable(() -> {
     Person p = new Person("Tiago", -2);
    });

    assertThat(t).isInstanceOf(IllegalArgumentException.class);
  }

  @Test
  void personConstructorShouldFailOnExcessivelyLargeAge() {
    Throwable t = catchThrowable(() -> {
     Person p = new Person("Tiago", 200);
    });

    assertThat(t).isInstanceOf(IllegalArgumentException.class);
  }
}
```


### Primitive Obsession

Excessive use of primitive datatypes is a code smell known as *primitive obsession* [primitive.guru](https://refactoring.guru/smells/primitive-obsession). 

**Signs and Symptoms:**
- Use of primitives instead of small objects for simple tasks (such as currency, ranges, special strings for phone numbers, etc.)
- Use of constants for coding information (such as a constant USER_ADMIN_ROLE = 1 for referring to users with administrator rights.)
- Use of string constants as field names for use in data arrays.

**Reasons for the Problem:**

Like most other smells, primitive obsessions are born in moments of weakness. “Just a field for storing some data!” the programmer said. Creating a primitive field is so much easier than making a whole new class, right? And so it was done. Then another field was needed and added in the same way. Lo and behold, the class became huge and unwieldy.

Primitives are often used to “simulate” types. So instead of a separate data type, you have a set of numbers or strings that form the list of allowable values for some entity. Easy-to-understand names are then given to these specific numbers and strings via constants, which is why they’re spread wide and far.

Another example of poor primitive use is field simulation. The class contains a large array of diverse data and string constants (which are specified in the class) are used as array indices for getting this data.

## Exercise

Consider the `Product` class below:

```java
public class Product {
  String Name;
  String manufacturer;
  double price;

  public Product(String name, String manufacturer, double price) {
    Name = name;
    this.manufacturer = manufacturer;
    this.price = price;
  }
}
```

1. Write tests for this constructor such that it only accepts reasonable price values.
2. Refactor this code by changing the price field from a primitive to a small object.

## COR[R]ECT: Reference

When testing a method, consider:
- What it references outside its scope
- What external dependencies it has
- Whether it depends on the object being in a certain state
- Any other conditions that must exist

A web app that displays a customer’s account history might require the customer to be logged on. Shifting your car’s transmission from Drive to Park requires you to first stop—if your transmission allowed the shift while the car was moving.

When you make assumptions about any state, you should verify that your code is reasonably well-behaved when those assumptions are not met. 

Imagine you’re developing the code for your car’s microprocessor-controlled transmission. You want tests that demonstrate how the transmission behaves when the car is moving versus when it is not.

```java
@Test
​public​ ​void​ remainsInDriveAfterAcceleration() {
   transmission.shift(Gear.DRIVE);
   car.accelerateTo(35);
   assertThat(transmission.getGear()).isEqualTo(Gear.DRIVE);
}
​ 	
@Test
​public​ ​void​ ignoresShiftToParkWhileInDrive() {
   transmission.shift(Gear.DRIVE);
   car.accelerateTo(30);
   transmission.shift(Gear.PARK);
   assertThat(transmission.getGear()).isEqualTo(Gear.DRIVE);
}
​ 	
@Test
​public​ ​void​ allowsShiftToParkWhenNotMoving() {
   transmission.shift(Gear.DRIVE);
   car.accelerateTo(30);
   car.brakeToStop();
   transmission.shift(Gear.PARK);
   assertThat(transmission.getGear()).isEqualTo(Gear.PARK);
}
```

The **preconditions** for a method represent the state things must be in for it to run. 
  - We want to ensure that the method behaves gracefully when its precondition isn’t met.

The **postconditions** for a method represent the state the you expect the code to make true. 
 - Sometimes this is simply the return value of a called method. 
 - You might also need to verify other side effects—changes to state that occur as a result of invoking behavior.

## CORR[E]CT: Existence

You can uncover a good number of potential defects by asking yourself:

“Does some given thing exist?” 

For a given method that accepts an argument or maintains a field, think through what will happen if the value is null, zero, or otherwise empty.

Some existence tests for our previous `Email` class could look like this:

```java
@Test
void shouldFailOnNull(){
  Throwable t = catchThrowable(() -> {
    Email.getDomain(null);
  });

  assertThat(t).isInstanceOf(IllegalArgumentException.class);
}

@Test
void shouldFailOnEmpty(){
  Throwable t = catchThrowable(() -> {
    Email.getDomain("");
  });

  assertThat(t).isInstanceOf(IllegalArgumentException.class);
}
```

## CORRE[C]T: Cardinality

Cardinality is a more general case of existence. 

In this case, you’re looking at more-specific answers than “some” or “none.” Still, the count of some set of values is only interesting in these three cases:

- `0`
- `1`
- `n` (more than one)

Some folks refer to this as the **0-1-n rule**. 
- Zero usually matters
- Having one and only one of something too. 
- As far as collections of things are concerned, usually your code is the same whether you’re dealing with ten, a hundred, or a thousand things. 

Suppose you maintain a list of the top ten food items ordered in a restaurant. Every time an order is taken, you adjust the top-ten list, which you display in your restaurant's app in real time. 

The notion of cardinality can help you derive a list of things to test out:
- Producing a report when there are no items in the list
- Producing a report when there’s only one item in the list
- Producing a report when there aren’t yet ten items in the list
- Adding an item when there are no items in the list
- Adding an item when there’s only one item in the list
- Adding an item when there aren’t yet ten items in the list
- Adding an item when there are already ten items in the list

## CORREC[T]: Time

There are several aspects of time to keep in mind:
- Ordering in time
- Elapsed time
- Wall clock

### Ordering in time

Some interfaces are inherently stateful. 

You expect `login()` to be called before `logout()`, `open()` before `read()`, `read()` before `close()`, and so on.

To test such interfaces, consider what happens if:
- methods are called out of order (try various alternate sequences) 
- some methods are skipped (e.g. the first, last, and middle of a sequence)

Just as order of data matters, the order of the calling sequence of methods matters!

### Timeouts

Sometimes, we have to think about how long our code can take to execute
- Something it waits on might take “too much” time
- It may take too long to process a large input

For instance, suppose your method makes an HTTP request to get some data from a web API. You may want to test scenarios in which:
- The underlying internet connection is very slow
- The server takes a while to answer your request

### Wall clock

Every rare once in a while, time of day matters, perhaps in subtle ways. A quick quiz:

**True or false? Every day of the year is 24 hours long.**

It depends. 

1. In UTC (Universal Coordinated Time, the modern version of Greenwich Mean Time, or GMT), the answer is yes. 
2. In areas of the world that do not observe Daylight Saving Time (DST), the answer is yes. 
3. In areas that observes DST, the answer is no. One day in March will have 23 hours (spring forward) and one in November will have 25 (fall back).
