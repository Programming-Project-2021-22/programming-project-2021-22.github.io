---
slug: /testing/exceptions
course: Programming Project 2021/22
module: Testing
title: Expected Exceptions
subtitle: null
chapter: 13
section: 5
previous: /testing/hooks
next: /testing/timeouts
banner: https://upload.wikimedia.org/wikipedia/commons/5/59/JUnit_5_Banner.png
---
 
## Verifying expected exceptions

The following `Calculator` class has a `divide` method that should throw an exception if `denominator` is equal to zero.

```java
public class Calculator {

  public static int sum(int value1, int value2) {
      return value1 + value2;
  }

  public static int multiply(int value1, int value2) {
      return value1 * value2;
  }

  public static int divide(int numerator, int denominator) {
      return numerator / denominator;
  }
}
```

We can verify that behavior via the `assertThrows` method, as shown below:

```java
@Test
void divisionByZeroThrowsException() {
  assertThrows(ArithmeticException.class, () -> {
      Calculator.divide(1, 0);
  });
}
```

Note that:
- The first parameter of `assertThrows` is the exception type you expect to be thrown.
- The second parameter is the code you expect to throw the exception.

## Exercise

Write test methods that verify if the `get` method of `ArrayList` throws an `IndexOutOfBoundsException` when passing an index out of range (`index < 0` or `index >= size()`). 

1. Test index `-1` on an non-empty list
1. Test index `0` on an empty list
1. Test index `1` on a list with a single element
1. Test index `5` on a list with 5 elements
1. Test that getting the element on index `0` of a non-empty list does not throw an exception.