---
slug: /lambdas/local-variables
course: Programming Project 2021/22
module: Lambda Expressions
title: Local Variables in Lambda Expressions
subtitle: null
chapter: 10
section: 4
previous: /lambdas/functional-interfaces
next: /lambdas/standard
---

A lambda expression does not define a new scope, it inherits its enclosing one.

We can access local variables within our lambda expressions:

```java
public static void main(String[] args) {
  int multiplier = 2;
  List.of(1, 2, 3, 4).forEach(x -> System.out.println(x * multiplier));
}
```

But we **cannot** modify their value: 

```java
int sum = 0;
// This will not compile!
List.of(1, 2, 3, 4).forEach(x -> sum += x);
```

We also **cannot** redeclare a variable:

```java
public static void main(String[] args) {
  int value = 2;
  List.of(1, 2, 3, 4).forEach(x -> {
    int value = x;
    System.out.println(x);
  });
}
```

The local variables we use within our lambda bodies should be either:
- **final**: variables whose values cannot be altered
- **effectively final**: variables whose values are not altered after initialization

Note that the object referenced by a variable may be modified within a lambda expression:

```java
class Accumulator {
  int value;

  public Accumulator(int value) {
    this.value = value;
  }

  void add(int value) {
    this.value += value;
  }
}

public class ModifyingObjects {
  public static void main(String[] args) {
    Accumulator acc = new Accumulator(0);
    List.of(1, 2, 3, 4).forEach(x -> acc.add(x));
  }
}
```