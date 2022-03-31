---
slug: /arrays/arrays-class
course: Programming Project 2021/22
module: Arrays
title: The Arrays class
subtitle: null
chapter: 8
section: 3
previous: /arrays/multidimensional
next: /arrays/varargs
---


> This class contains various methods for manipulating arrays (such as sorting and searching). This class also contains a static factory that allows arrays to be viewed as lists.
> 
> The methods in this class all throw a NullPointerException, if the specified array reference is null, except where noted.
>
> The documentation for the methods contained in this class includes brief descriptions of the implementations. Such descriptions should be regarded as implementation notes, rather than parts of the specification. Implementors should feel free to substitute other algorithms, so long as the specification itself is adhered to. (For example, the algorithm used by sort(Object[]) does not have to be a MergeSort, but it does have to be stable.)
> 
> This class is a member of the Java Collections Framework.

From the [Java Documentation](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/Arrays.html).


Here is a demo of how to use the `Arrays` class:

```java
import java.util.Arrays;

public class ArraysDemo {
  public static void main(String[] args) {
    int[] numbers = {10, -2, 5, 7};
    System.out.println("Original array: " + Arrays.toString(numbers));

    Arrays.sort(numbers);
    System.out.println("Sorted array: " + Arrays.toString(numbers));

    Arrays.fill(numbers, 9);
    System.out.println("Filled array: " + Arrays.toString(numbers));

    int[] numbers2 = {9, 9, 9, 9};
    System.out.println("Qualitatively equal? " + Arrays.equals(numbers, numbers2));

    int[] sortedArray = {0, 5, 10, 15};
    System.out.println("Index of 10: " + Arrays.binarySearch(sortedArray, 10));
    System.out.println("Index of 20: " + Arrays.binarySearch(sortedArray, 20));

    int[][] matrix = {{1, 2}, {3, 4}};
    System.out.println("Printing a multidimensional array: " + Arrays.deepToString(matrix));
  }
}
```