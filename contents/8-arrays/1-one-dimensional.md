---
slug: /arrays/one-dimensional
course: Programming Project 2021/22
module: Arrays
title: One Dimensional Arrays
subtitle: null
chapter: 8
section: 1
previous: /generics/classes
next: /arrays/multidimensional
---
 
## What is an array?

**Array**: an object that stores a collection of values in ordered cells

Each cell:
- holds a value
- can be accessed via its index

Cells are
- indexed from 0 
- incrementally indexed

All cells in an array hold values of **the same type**, which can be: 
- a primitve type, e.g. `int`, `boolean`
- a reference type, i.e. a class or an interface

![](../../figures/array0.jpg)


## Declaring arrays

This is how we declare an array in Java:

```java
// An array of numbers
int[] numbers;

// An array of strings
String[] names;

// An array of people (objects of type Person)
Person[] friends;
```
   
Note that the actual arrays are not constructed by these declarations!

## Constructing arrays

This is how we construct an array in Java:

```java
// Constructing an array of numbers of size 10
new int[10];

// Constructing an array of strings of size 6
new String[6];

// Constructing an array of people of size 3
new Person[3];
```
   
The number between brackets is the size of the array you are constructing, which is **fixedx**! 

This is how we can declare and construct an array in one statement: 

```java
int[] numbers = new int[10];
String[] names = new String[6];
Person[] friends = new Person[6];
```

## Declaring, constructing, and initializing an array

Declaring, constructing, and initializing an array in one statement:

```java
int[] data = { 23, 38, 14, -3, 0, 14, 9, 103, 0, -56 };
String[] data = { "Joey", "Rachel", "Ross", "Pheobe", "Monica", "Chandler" };
```
   
The size of the array will be the number of elements you insert between the curly brackets

## Iterating through the elements in an array

How do we iterate over every element of an array with 5 cells? 

```java
int[] numbers = { 10, 20, 30, 40, 50};

for (int index = 0; index<5 ; index++)
  System.out.println(numbers[index]);

for (int index = 0; index < array.length; index++)
  System.out.println(numbers[index]);

for (int index = numbers.length-1; index >= 0; index--)
  System.out.println(numbers[index]);

for (int number : numbers)
  System.out.println(number);
```
   
If we just want the string representation of an array, we can simply write:

```java
String str = Arrays.toString(numbers);
System.out.println(str);
```

## Exercise 1

Let us build a method that sums all the elements in an array.

```java
import java.util.Arrays;

public class SummingArrays {
  public static int sum(int[] numbers) {
    // FIX ME
  }

  public static void main(String[] args) {
    int[] numbers = {1, 1, 1, 1, 1};
    System.out.println("Summing up " + Arrays.toString(numbers) + " = " + sum(numbers));

    numbers = new int[] {10, 20, 30, 40};
    System.out.println("Summing up " + Arrays.toString(numbers) + " = " + sum(numbers));

    numbers = new int[] {0, -100, 30, 70};
    System.out.println("Summing up " + Arrays.toString(numbers) + " = " + sum(numbers));
  }
}
```

<!-- ```java
import java.util.Arrays;

public class SummingArrays {

   public static int sum(int[] numbers) {
      int sum = 0;
      for (int value : numbers) {
         sum += value;
      }

      return sum;
   }

   public static void main(String[] args) {
      int[] numbers = {1, 1, 1, 1, 1};
      System.out.println("Summing up " + Arrays.toString(numbers) + " = " + sum(numbers));

      numbers = new int[] {10, 20, 30, 40};
      System.out.println("Summing up " + Arrays.toString(numbers) + " = " + sum(numbers));

      numbers = new int[] {0, -100, 30, 70};
      System.out.println("Summing up " + Arrays.toString(numbers) + " = " + sum(numbers));
   }
}
``` -->

## Exercise 2

As we previously stated, arrays have a fixed size. In this exercise, we will address that limitation by creating an array that grows dynamically. The only restriction is that we cannot use classes from the collections library (e.g. `List`, `ArrayList`, `LinkedList`).

**Hint:** We can create as many arrays as needed array(s).

<!-- ## Solution

```java
import java.util.Arrays;

public class MyArray {
   private int[] internalArray = new int[0];
   private int nextPosition = 0;

   public void add(int a) {
      int[] array = new int[this.nextPosition + 1];

      for (int i = 0; i < this.nextPosition; i++)
         array[i] = this.internalArray[i];

      array[this.nextPosition] = a;
      this.internalArray = array;
      this.nextPosition++;
   }

   public int get(int index) {
      return this.internalArray[index];
   }

   public void set(int index, int a) {
      this.internalArray[index] = a;
   }

   public void printAll() {
      System.out.println(Arrays.toString(this.internalArray));
   }
}
``` -->
