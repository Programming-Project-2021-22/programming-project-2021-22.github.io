---
slug: /exceptions/declaring
course: Programming Project 2021/22
module: Exception Handling
title: Declaring Exceptions Thrown by Methods
subtitle: null
chapter: 5
section: 3
previous: /exceptions/throwables
next: /exceptions/throwing
---


Java adopts a catch or throws approach for checked exceptions. That is, if your method can throw a checked exception under certain conditions, you must either handle it by itself or you must declare that it may throw it.

## The `throws` clause

To declare the types of exception a method may throw, we use the `throws` clause:

```java
public static int quotient(int numerator, int denominator) throw ArithmeticException {
  return numerator / denominator; // possible division by zero
}
```

A method may throw multiple exception types:

```java
public void doSomething(int[] array) throw IOException, ArrayIndexOutOfBoundsException {
  // ....
}
```

However, note that you don't need to declare unchecked exceptions. Thus, the previous declaration might be simplified as:

```java
public void doSomething(int[] array) throw IOException {
  // ....
}
```

Any subtype of the exception type identified in the `throws` clause may be thrown by the method.

Thus, a method in which can throw `IOException`, may actually throw:  
- `FileNotFoundException`
- `EOFException` 
- `UnsupportedEncodingException`