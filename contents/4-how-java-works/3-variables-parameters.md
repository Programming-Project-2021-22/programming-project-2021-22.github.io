---
slug: /java/variables-parameters
course: Programming Project 2021/22
module: How Java Works
title: Variables and Parameters
subtitle: null
chapter: 4
section: 3
previous: /java/architecture
next: /java/memory-model
---

## Variable types

**Primitive variables** are those whose type is a primitive datatype, namely `boolean`, `char`, `byte`, `short`, `int`, `long`, `float`, and `double`.

```java
int i = 0;
char c = 'a';
```

**Reference variables** are those whose type is a reference to an object.

```java
String s = "Tiago";
Person p = new Person();
```

**Instance variables** are those that are specific to each instance of a class, i.e., they are non-static fields.

```java
public class Person {
  String name; // instance variable
}
```

**Class variables** are those that belong to a class and are shared by its instance., i.e., static fields.

```java
public class Fiat500 {
  static String designer; // class variable
}
```

**Local variables** are declared within methods to store temporary state.

```java
public double getHypotenuse(double adjacent, double opposite) {
  double squaredAdjacent = Math.pow(adjacent, 2); // local variable
  double squaredOpposite = Math.pow(opposite, 2); // local variable
  return Math.sqrt(squaredAdjacent + squaredOpposite); 
}
```

**Parameters** are values we pass to methods.

## Default values

If not explicitly initialized, an instance variable is given a default value.
- A reference instance variable is initialized as `null`
- A primitive instance variable is initialized according to its type
  - int to `0`
  - char to `'\u000'`, and
  - float to `0.0`

> A local variable is never given a default value and **MUST** be initialized by the developer

## Passing parameters

Consider the code below. What do you expect to be the printed on the screen?

  ```java
  public class Tester {

    public static void changeMe(int x) {
      x = 5;
      System.out.println("changeMe: " + x);
    }

    public static void main(String[] args) {
      int x = 10;
      changeMe(x);
      System.out.println("main: " + x);
    }

  }
  ```

  This?

  ```ini
  changeMe: 5
  main: 10
  ```

  Or this?

  ```ini
  changeMe: 5
  main: 5
  ```

What about this program?

```java
public class ModifyingObjectParameter {
  public static void changeMe(Person x) {
    x.name = "Morty";
    System.out.println("changeMe: " + x.name);
  }

  public static void main(String[] args) {
    Person x = new Person("Rick");
    changeMe(x);
    System.out.println("main: " + x.name);
  }

  static class Person {
    public String name;

    public Person(String name) {
      this.name = name;
    }
  }
}
```

This?

```ini
changeMe: Morty
main: Rick
```

Or this?

```ini
changeMe: Morty
main: Morty
```

And this program?

```java
public class ReplacingObjectParameter {
  public static void main(String[] args) {
    Person x = new Person("Rick");
    changeMe(x);
    System.out.println("main: " + x.name + " " + x.hashCode());
  }

  public static void changeMe(Person x) {
    x = new Person("Morty");
    System.out.println("changeMe: " + x.name + " " + x.hashCode());
  }

  static class Person {
    public String name;

    public Person(String name) {
      this.name = name;
    }
  }
}

```

This?

```ini
changeMe: Morty 603742814
main: Rick 424058530
```

Or this?

```ini
changeMe: Rick 424058530
main: Rick 424058530
```

## Passing parameters

- When a method is invoked and receive parameters, how are they passed?
  - by reference
  - by value
- When a parameter is passed by **reference**:
  - the caller and the callee (the function) use the same variable for the parameter
  - if the callee modifies the parameter variable, the effect is visible to the caller’s variable.
- Wwhen a parameter is passed by **value**:
  - the caller and callee have two independent variables with the same value
  - If the callee modifies the parameter variable, the effect is not visible to the caller.
- **Given the examples we have just seen, how do you think Java works?**

## Passing parameters in Java

> **Java programs always pass parameters by value!**

Primitive variable are passed by value.

References values are passed by value.

The key to understanding why the results were different in our previous experiment is realizing that in the code excerpt below:
  
```java
Person me;
```

The variable `me` is not a `Person` object, but a **pointer** (or reference in Java's terminology) to a `Person` object.

This is what actually happens when we initialize a variable:

```java
Person x = new Person("Morty");
```

![](../../figures/variable-creation.png '#max-width=300px')

And when we pass a parameter:

```java
changeMe(x); 
```

![](../../figures/parameter-assigned.png '#max-width=550px')

## Immutable variables

Primitive variables (`int`, `long`, `short`...) can be reassigned after being defined.

This can be prevented by using final:

```java
int i = 15; // int is a primitive type
i = 20; // OK
```

```java
final int j = 10;
j = 20; // Does not compile!
```

## Strings

`String` is not a primitive type but it’s also immutable.

Because of that, if we need to make a lot of modifications to strings of characters, we should use `StringBuffer` or `StringBuilder`

Unlike `String`, `StringBuffer` and `StringBuilder` objects can be modified without leaving behind a lot of new unused objects.

## Immutability

Normal reference variables cannot be made immutable just by using the `final` keyword, which only prevents reassignment to another object.

The object that the reference points to can still be changed, as shown in the code below:

```java
static class Dog {
  String name;

  public Dog(String name) {
    this.name = name;
  }
}

public static void main(String[] args) {
  final Dog dog = new Dog("Snuffles");
  dog.name = "Snowball"; // OK
  dog = new Dog("Snowball"); // Does not compile!
}
```