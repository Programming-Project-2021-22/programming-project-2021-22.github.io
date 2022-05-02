---
slug: /testing/repeated
course: Programming Project 2021/22
module: Testing
title: Repeating Tests
subtitle: null
chapter: 13
section: 8
previous: /testing/nested
next: /testing/first
banner: https://upload.wikimedia.org/wikipedia/commons/5/59/JUnit_5_Banner.png
---
 

## Repeated tests

JUnit 5 has added support for running a test a specified number of times, an essential when you work with tests that are flaky in nature. 

**Flaky tests** are those that exhibit both a passing and failing behavior with the same code base. 

To run a test for X number of times, mark it with the `@RepeatedTest` annotation as shown below:

```java
@RepeatedTest(10)
void runMeMultipleTimes() {
  assertTrue(true);
}
```

You can customize the name of the test using a predefined set of placeholders:

```java
@RepeatedTest(value = 10, name = "runMe {currentRepetition}/{totalRepetitions}")
void runMeMultipleTimesCustomName() {
    assertTrue(true);
}
```

