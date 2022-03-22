---
slug: /generics/introduction
course: Programming Project 2021/22
module: Generic Programming
title: Introduction
subtitle: null
chapter: 7
section: 1
previous: /inheritance/casting
next: /generics/methods
---

## Problem

Suppose that you have just implemented a method that sorts arrays of `Integers`

```java
sort(Integer[] array)
```

And now you want to use it to sort a `Double` array. What would you do?

What if you want to use it to sort arrays of any type?

## Solution 1: overload `sort()`

We can implement `sort()` for each type we want to support, but we will end up with a **lot of duplicate code**!

(The sorting method below is a naive [bubble sort](https://www.youtube.com/watch?v=xli_FI7CuzA))

```java
public static void sort(Integer[] array) {
  boolean sorted = false;
  while (!sorted) {
    sorted = true;
    for (int i = 0; i < array.length - 1; i++) {
      if (array[i].compareTo(array[i + 1]) > 0) {
        Integer temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        sorted = false;
      }
    }
  }
}

public static void sort(String[] array) {
  boolean sorted = false;
  while (!sorted) {
    sorted = true;
    for (int i = 0; i < array.length - 1; i++) {
      if (array[i].compareTo(array[i + 1]) > 0) {
        String temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        sorted = false;
      }
    }
  }
}

void sort(Double[] array) { 
  // method body...
}

void sort(Char[] array) { 
  // method body...
}
```

That does not look elegant, does it?

## Solution 2: use `Object[]`

We can implement a single method that accepts `Object[]` as a parameter:

```java
sort(Object[] array) {
  // ...
}
```

We will need to cast variables whenever we retrieve elements from the array:

```java
// ...
Comparable current = (Comparable) array[i];
Comparable next = (Comparable) array[i + 1];
// ...
```

Which means our sort method will look like this:

```java
public static void sort(Object[] array) {
  boolean sorted = false;
  while (!sorted) {
    sorted = true;
    for (int i = 0; i < array.length - 1; i++) {
      Comparable current = (Comparable) array[i];
      Comparable next = (Comparable) array[i + 1];
      if (current.compareTo(next) > 0) {
        array[i] = next;
        array[i + 1] = current;
        sorted = false;
      }
    }
  }
}
```

In this solution, we give up type checking at compile-time (e.g. you can only sort by elements that implement the `Comparable` interface). Therefore, we may often run into run-time exceptions.

For instance, the code below will throw an exception!

```java
public static void main(String[] args) {
  Integer[] numbers = new Integer[] {5, 10, 15, 0};
  System.out.println("Before sorting: " + Arrays.toString(numbers));
  
  sort(numbers);
  System.out.println("After sorting: " + Arrays.toString(numbers) + "\n");

  Person[] people = new Person[] {new Person("Tiago", 31), new Person("Camila", 33), new Person("Davi", 0)};
  System.out.println("Before sorting: " + Arrays.toString(people));
  
  sort(people); // This will throw an exception!
  System.out.println("After sorting: " + Arrays.toString(people) + "\n");
}
```

## Solution 3: use a supertype (e.g. `Comparable[]`)

We can implement a single method that accepts `Comparable[]` as a parameter:

```java
public static void sort(Comparable[] array) {
  boolean sorted = false;
  while (!sorted) {
    sorted = true;
    for (int i = 0; i < array.length - 1; i++) {
      Comparable current = array[i];
      Comparable next = array[i + 1];
      if (current.compareTo(next) > 0) {
        array[i] = next;
        array[i + 1] = current;
        sorted = false;
      }
    }
  }
}
```

We still give up some design-time checks (e.g. that all comparables in the array are of the same type), but we are a lot safer.

However, if we decide we also want to sort lists, as in:

```java
public static void sort(List<Comparable> list) {
  boolean sorted = false;
  while (!sorted) {
    sorted = true;
    for (int i = 0; i < list.size() - 1; i++) {
      if (list.get(i).compareTo(list.get(i + 1)) > 0) {
        Comparable temp = list.get(i);
        list.set(i, list.get(i + 1));
        list.set(i + 1, temp);
        sorted = false;
      }
    }
  }
}
```

We will face some type-check problems:

```java
public static void main(String[] args) {
  ArrayList<Integer> numbersList = new ArrayList<>();
  numbersList.add(15);
  numbersList.add(10);
  numbersList.add(5);
  
  sort(numbersList); // => This does not compile!

  ArrayList<Comparable> comparablesList = new ArrayList<>(numbersList);
  System.out.println("Before sorting: " + comparablesList);
  sort(comparablesList);
  System.out.println("After sorting: " + comparablesList + "\n");
}
```

## Solution 4: write a generic method

Our best strategy in this case, however, is to write a generic method!

This is what our generic `sort` would look like:

```java
public static <T extends Comparable> void sort(List<T> list) {
  boolean sorted = false;

  while (!sorted) {
    sorted = true;
    for (int i = 0; i < list.size() - 1; i++) {
      if (list.get(i).compareTo(list.get(i + 1)) > 0) {
        T temp = list.get(i);
        list.set(i, list.get(i + 1));
        list.set(i + 1, temp);
        sorted = false;
      }
    }
  }
}
```

And this is what it will allows us to do:

```java
public static void main(String[] args) {
   ArrayList<Integer> numbers = new ArrayList<>();
   numbers.add(15);
   numbers.add(5);
   numbers.add(10);
   numbers.add(0);
   System.out.println("Before sorting: " + numbers);
   sort(numbers);
   System.out.println("After sorting: " + numbers + "\n");

   ArrayList<String> names = new ArrayList<>();
   names.add("Davi");
   names.add("Camila");
   names.add("Tiago");
   System.out.println("Before sorting: " + names);
   sort(names);
   System.out.println("After sorting: " + names + "\n");
}
```

