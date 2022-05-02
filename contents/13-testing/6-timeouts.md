---
slug: /testing/timeouts
course: Programming Project 2021/22
module: Testing
title: Timeouts
subtitle: null
chapter: 13
section: 6
previous: /testing/exceptions
next: /testing/nested
banner: https://upload.wikimedia.org/wikipedia/commons/5/59/JUnit_5_Banner.png
---
 
## Testing with timeouts

In general, **we want to have many small tests that execute quickly**.

However, in some situations, we will need to invoke methods in our tests whose execution time we cannot control.

when you don’t want your test to wait indefinitely.

## `assertTimeout`

`assertTimeout` allows us to verify performance levels, i.e., if our methods will finish executing within a given time. 

It accepts two parameters:
1. The expected maximum duration
1. The code that should run within said duration

Here is an example:


```java
import org.junit.jupiter.api.Test;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTimeout;

public class TimeoutTest {
  @Test
  void testShouldCompleteIn1Second() {
    assertTimeout(Duration.of(1000, ChronoUnit.MILLIS), () -> Thread.sleep(3000));
  }

  @Test
  void testShouldCompleteIn1SecondAndReturnValue() {
    String message = assertTimeout(Duration.of(1, ChronoUnit.SECONDS), () -> "Hello, World!");
    assertEquals("Hello, World!", message);
  }
}
```

When do you think this kind of assertion can be helpful in real life?

## `assertTimeoutPreemptively`

An additional related method is `assertTimeoutPreemptively`.

It stops the execution of the test as soon as the timeout value is exceeded.

To see the difference in behavior, first execute `testFinishesInTimePreemptively` and then `testFinishesInTime`:

```java
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

import static org.junit.jupiter.api.Assertions.*;

public class TimeoutTest {

  @Test
  void testFinishesInTimePreemptively() {
    assertTimeoutPreemptively(Duration.of(1000, ChronoUnit.MILLIS), () -> Thread.sleep(10000));
  }

  @Test
  void testFinishesInTime() {
    assertTimeout(Duration.of(1000, ChronoUnit.MILLIS), () -> Thread.sleep(10000));
  }
}
```