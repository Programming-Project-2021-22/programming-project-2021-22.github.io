---
slug: /testing/nested
course: Programming Project 2021/22
module: Testing
title: Nested Tests
subtitle: null
chapter: 13
section: 7
previous: /testing/timeouts
next: /testing/repeated
banner: https://upload.wikimedia.org/wikipedia/commons/5/59/JUnit_5_Banner.png
---
 
## Nested tests

Sometimes, we will find ourselves with a large test class that, for some reason, we don't want to split into multiple files.

The example below will show you how to use the `@Nested` annotation.

```java
class NestedCalculatorTest {
   @Nested
   class SumTest {
      @Test
      void sumPositiveNumbers() {
         int value = Calculator.sum(7, 13);
         assertTrue(value > 0);
      }

      @Test
      void sumNegativeNumbers() {
         int value = Calculator.sum(-24, -1);
         assertTrue(value < 0);
      }
   }

   @Nested
   class MultiplicationTest {
      @Test
      void positiveMultiplication() {
         int value = Calculator.multiply(10, 20);
         assertTrue(value > 0);
      }

      @Test
      void negativeMultiplication() {
         int value = Calculator.multiply(-5, -4);
         assertTrue(value > 0);
      }
   }
}
```

## Do we really need nested test classes?

A [developer on StackOverflow](https://stackoverflow.com/questions/36220889/whats-the-purpose-of-the-junit-5-nested-annotation), does not see the point:

> In JUnit 5, there is a new annotation: `@Nested`.
> 
> I understand how the annotation works, I understand why we use nested classes, I just don't understand why we need to have nested test classes.

His question was answered quite in depth:

> **Typical use case**
> 
> Very often, developer teams define a test class by class to test. That is a shared good practice but it also may make your test class very big and to count several hundred of lines. You can indeed have classes to test with multiple methods to test, multiple scenarios for each one and also some initialization steps required in the unit test methods to test the scenarios.
> All of these will naturally increase the test class size.
> Above a threshold (maybe 500 lines or about), it becomes legitimate to ask yourself whether a refactoring is needed.
> 
> A big class (test class or not), even well organized is harder to read, maintain than multiple classes grouping things with high cohesion/relationship between.
> In the unit tests cases, it can be sometime still worse because you may not find a test scenario and write a new one while it existed but you didn't manage to find it because the test class is big.
>
> **`@Nested` : the solution**
>
>`@Nested` addresses this issue by giving the possibility to group multiple test methods inside multiple nested classes of a main(outer) test class.
> . . . 

You can read the rest of this answer [here](https://stackoverflow.com/questions/36220889/whats-the-purpose-of-the-junit-5-nested-annotation).