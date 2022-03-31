---
slug: /arrays/varargs
course: Programming Project 2021/22
module: Arrays
title: Varags
subtitle: null
chapter: 8
section: 4
previous: /arrays/arrays-class
next: /arrays/limitations
---

Consider the code below:

```java
public static void main(String[] args) {
  double d1 = 10.0;
  double d2 = 20.0;
  double d3 = 30.0;
  double d4 = 40.0;

  System.out.println("d1 = " + d1);
  System.out.println("d2 = " + d2);
  System.out.println("d3 = " + d3);
  System.out.println("d4 = " + d4);

  System.out.println("Average of d1 and d2 is " + average(d1, d2));
  System.out.println("Average of d1, d2, and d3 is " + average(d1, d2, d3));
  System.out.println("Average of d1, d2, d3, and d4 is " + average(d1, d2, d3, d4));
}
```
   
It compiles and prints out:

```output
d1 = 10.0
d2 = 20.0
d3 = 30.0
d4 = 40.0
Average of d1 and d2 is 15.0
Average of d1, d2, and d3 is 20.0
Average of d1, d2, d3, and d4 is 25.0
```

Why do you think we can call **`average()`** with 1, 2, 3 and 4 numbers?

```java
average(d1, d2);
average(d1, d2, d3);
average(d1, d2, d3, d4);
```

What if I told we could also call it with 5, 6, 7, 8, 9, and even 10 numbers?

```java
average(d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
```

## Variable-length arguments list

We can make all those calls because the method was defined using **varargs**!

```java
public static double average(double... values) {
  double sum = 0;

  for (double value : values) {
      sum += value;
  }

  return sum / values.length;
}
```

The three periods (`...`) after the final parameter's type indicate that the final argument may be passed as: 
   
- as a sequence of arguments 
  
  ```java
  System.out.println("Average of d1, d2, d3, and d4 is " + average(d1, d2, d3, d4));
  ```
  

- an array  
  
  ```java
  double[] doubles = {d1, d2, d3, d4};
  System.out.println("Average of d1, d2, d3, and d4 is " + average(doubles));
  ```

Varargs can be used only in the final argument position.

In the method body, we treat the variable-length argument as an arrays