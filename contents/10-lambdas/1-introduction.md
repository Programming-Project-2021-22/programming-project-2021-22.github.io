---
slug: /lambdas/introduction
course: Programming Project 2021/22
module: Lambda Expressions
title: Introduction
subtitle: null
chapter: 10
section: 1
previous: /collections/choosing
next: /lambdas/what-is
---

Consider the following classes:

```java
public class Character {
  public String firstName;
  public String lastName;

  public Character(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

```java
public class Hello {
  void sayHello(Character person) {
    System.out.println("Hello " + person.firstName + " " + person.lastName + "!");
  }
}
```

```java
public class Main {

  public static void main(String[] args) {
    Character rick = new Character("Rick", "Sanchez");
    Character morty = new Character("Morty", "Smith");
    Character scary = new Character("Scary", "Terry");
    List<Character> characters = List.of(rick, morty, scary);

    Hello hello = new Hello();
    for (Character c : characters)
      hello.sayHello(c);
  }

}
```

```output
Hello Rick Sanchez!
Hello Morty Smith!
Hello Scary Terry!
```

If we often want to "say hello", it makes sense to create an interface:

```java
public interface Helloable {
  void sayHello(Character character);
}
```

And implement it for each way we say hello:

```java
public class SimpleHello implements Helloable {
  @Override
  public void sayHello(Character character) {
    System.out.println("Hello " + character.firstName + " " + character.lastName + "!");
  }
}
```

```java
public class FancyHello implements Helloable {
  @Override
  public void sayHello(Character character) {
    System.out.println("Hello Mr. " + character.lastName + ".");
  }
}
```

```java
public class Main {

  public static void main(String[] args) {
    Character rick = new Character("Rick", "Sanchez");
    Character morty = new Character("Morty", "Smith");
    Character scary = new Character("Scary", "Terry");
    List<Character> characters = List.of(rick, morty, scary);

    SimpleHello simple = new SimpleHello();
    for (Character c : characters)
      simple.sayHello(c);

    FancyHello fancy = new FancyHello();
    for (Character c : characters)
      fancy.sayHello(c);
  }

}
```
```output
Hello Rick Sanchez!
Hello Morty Smith!
Hello Scary Terry!
Hello Mr. Sanchez.
Hello Mr. Smith.
Hello Mr. Terry.
```

If we want to define how to say hello "on the fly", we can write an anonymous class:

```java
public class Main {
  public static void main(String[] args) {
    Character rick = new Character("Rick", "Sanchez");
    Character morty = new Character("Morty", "Smith");
    Character scary = new Character("Scary", "Terry");
    List<Character> characters = List.of(rick, morty, scary);

    Helloable custom =
        new Helloable() {
          @Override
          public void sayHello(Character character) {
            System.out.println("Hello " + character.firstName.charAt(0) + ". " + character.lastName);
          }
        };

    for (Character c : characters)
      custom.sayHello(c);
  }
}
```

```output
Hello R. Sanchez
Hello M. Smith
Hello S. Terry
```

A little verbose, right?

## Lambdas to the rescue!

Since Java 8, we can achieve the same result writing a lot less code by using **lambda expressions**:

```java
public class Main {
  public static void main(String[] args) {
    Character rick = new Character("Rick", "Sanchez");
    Character morty = new Character("Morty", "Smith");
    Character scary = new Character("Scary", "Terry");
    List<Character> characters = List.of(rick, morty, scary);

    Helloable custom =
        c -> System.out.println("Hello " + c.firstName.charAt(0) + ". " + c.lastName);
    
    for (Character c : characters) {
      custom.sayHello(c);
    }
  }
}
```

We can even pass these expressions as parameters:

```java
public class Main {
  public static void main(String[] args) {
    Character rick = new Character("Rick", "Sanchez");
    Character morty = new Character("Morty", "Smith");
    Character scary = new Character("Scary", "Terry");
    List<Character> characters = List.of(rick, morty, scary);

    sayHelloEverybody(
        characters, 
        c -> System.out.println("Hello " + c.firstName.charAt(0) + ". " + c.lastName));

    sayHelloEverybody(
        characters,
        c -> System.out.println("Hello Mr. " + c.firstName.charAt(0) + c.lastName.charAt(0)));
  }

  public static void sayHelloEverybody(List<Character> characters, Helloable helloable) {
    for (Character c : characters)
      helloable.sayHello(c);
  }
}
```

```output
Hello R. Sanchez
Hello M. Smith
Hello S. Terry
Hello Mr. RS
Hello Mr. MS
Hello Mr. ST
```