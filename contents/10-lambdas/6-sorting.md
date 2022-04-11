---
slug: /lambdas/sorting
course: Programming Project 2021/22
module: Lambda Expressions
title: Sorting with Lambdas
subtitle: null
chapter: 10
section: 6
previous: /lambdas/standard
next: /streams/introduction
---

Consider the following class (from [this](https://www.programcreek.com/2014/01/why-lambda-java-8/) source)

```java
public class Dog {
  String name;
  int height;
  int weight;

  public Dog(String name, int height, int weight) {
    this.name = name;
    this.height = height;
    this.weight = weight;
  }

  public String toString() {
    return String.format("%s: w = %d kg, h = %d cm%n", name, weight, height);
  }
}
```

This is how we would sort a `Dog` array per weight:

```java
public class ArraySorting {
  public static void main(String[] args) {
    Dog d1 = new Dog("Max", 50, 2);
    Dog d2 = new Dog("Rocky", 30, 1);
    Dog d3 = new Dog("Bear", 60, 3);
    Dog[] dogs = {d1, d2, d3};
    System.out.println("Original array:\n" + Arrays.toString(dogs));

    Arrays.sort(dogs, (o1, o2) -> o1.weight - o2.weight);
    System.out.println("Sorted array (by weight):\n" + Arrays.toString(dogs));
  }
}
```

## `Arrays.sort()`

`Arrays.sort()` accepts a `Comparator<T>` as a parameter, which is a **functional interface**!

This means we can write lambda expressions to quickly create custom comparators:

```java
Arrays.sort(dogs, (o1, o2) -> o2.weight - o1.weight);
System.out.println("Sorted array (by weight reversed):\n" + Arrays.toString(dogs));

Arrays.sort(dogs, (o1, o2) -> o1.height - o2.height);
System.out.println("Sorted array (by height):\n" + Arrays.toString(dogs));

Arrays.sort(dogs, (o1, o2) -> o1.name.compareToIgnoreCase(o2.name));
System.out.println("Sorted array (by name):\n" + Arrays.toString(dogs));
```

## `List.sort()`

Lists can also be sorted with custom comparators declared with lambda expressions:

```java
import java.util.ArrayList;
import java.util.List;

public class ListSorting {
  public static void main(String[] args) {
    Dog d1 = new Dog("Max", 50, 2);
    Dog d2 = new Dog("Rocky", 30, 1);
    Dog d3 = new Dog("Bear", 60, 3);
    List<Dog> dogs = new ArrayList<>(List.of(d1, d2, d3));

    System.out.println("Original array:\n" + dogs);

    dogs.sort((o1, o2) -> o1.weight - o2.weight);
    System.out.println("Sorted array (by weight):\n" + dogs);

    dogs.sort((o1, o2) -> o2.weight - o1.weight);
    System.out.println("Sorted array (by weight reversed):\n" + dogs);

    dogs.sort((o1, o2) -> o1.height - o2.height);
    System.out.println("Sorted array (by height):\n" + dogs);

    dogs.sort((o1, o2) -> o1.name.compareToIgnoreCase(o2.name));
    System.out.println("Sorted array (by name):\n" + dogs);
  }
}
```

## `Collections.min()` and `Collections.max()`

The same comparators can be used to find min and max values in a collection:

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MinMax {
  public static void main(String[] args) {
    Dog d1 = new Dog("Max", 50, 2);
    Dog d2 = new Dog("Rocky", 30, 1);
    Dog d3 = new Dog("Bear", 60, 3);
    List<Dog> dogs = new ArrayList<>(List.of(d1, d2, d3));
    System.out.println(dogs);

    Dog lightest = Collections.min(dogs, (o1, o2) -> o1.weight - o2.weight);
    System.out.println("Lightest dog: " + lightest.name);

    Dog tallest = Collections.max(dogs, (o1, o2) -> o1.height - o2.height);
    System.out.println("Tallest dog: " + tallest.name);
  }
}
```

```output
[{Max, 2 kg, 50 cm}, {Rocky, 1 kg, 30 cm}, {Bear, 3 kg, 60 cm}]
Lightest dog: Rocky
Tallest dog: Bear
```