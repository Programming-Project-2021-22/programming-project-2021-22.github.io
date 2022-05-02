---
slug: /testing/junit-5-basics
course: Programming Project 2021/22
module: Testing
title: " Basics of JUnit 5"
subtitle: null
chapter: 13
section: 3
previous: /testing/getting-started
next: /testing/hooks
banner: https://upload.wikimedia.org/wikipedia/commons/5/59/JUnit_5_Banner.png
---
 
## Test classes and test methods

A **test class** exhibits the following characteristics:
- Has at least one test method
- Has a visibility equal to public, protected or package protected
- Has a no-arg constructor
  - Otherwise, we need to use JUnit 5's `ParameterResolver` API

A **test method** exhibits the following characteristics:
- Is annotated with the `org.junit.jupiter.api.Test` annotation.
- Has a visibility equal to public, protected or package protected
- Returns `void`
- May have parameters
  - If it does, we need to use JUnit 5's `ParameterResolver` API

## Where should I put my test classes?

Typically, unit tests are created in a separate project or separate source folder to keep the test code separated from the real code. 

The standard convention from the Maven and Gradle build tools is to use: 
  
  ```output
  src/main/java - for Java classes
  src/test/java - for test classes
  ```


## Naming test classes

We can name our test classes however we want. However, you will often see, programmers using certain suffixes:
- `Test` => `CaculatorTest`
- `Spec` => `CaculatorSpec`
- `Specification` => `CaculatorSpecification` 

The `Spec` naming convention is popularized by behavior-driven development (BDD) practice. 

Your goal should be to *pick one naming convention* and *stick with it in your project*

The names of a test class is the name of the production class followed by the suffix "Test"
- Production class: `Calculator`
- Test class: `CalculatorTest`

## Customizing display names

JUnit 5 allows you to define custom display names for your test classes.

You can use the `org.junit.jupiter.api.DisplayName` annotation to provide a name that can contain spaces, special characters, and even emojis.

  ```java
  import org.junit.jupiter.api.DisplayName;
  import org.junit.jupiter.api.Test;
  import static org.junit.jupiter.api.Assertions.assertEquals;

  @DisplayName("Calculator specification")
  public class NamedCalculatorTest {
    @Test
    @DisplayName("1 + 1 should equal 2")
    void sum() {
        int result = Calculator.sum(1, 1);
        assertEquals(2, result);
    }
    @Test
    @DisplayName("(-1) + (-1) should equal -2")
    void sumNegative() {
        int result = Calculator.sum(-1, -1);
        assertEquals(-2, result);
    }
    @Test
    @DisplayName("1 * 1 should equal 1")
    void multiply() {
        int result = Calculator.multiply(1, 1);
        assertEquals(1, result);
    }
  }
  ```

To make Maven display `@DisplayName`, follow [these](https://maven.apache.org/surefire/maven-surefire-plugin/examples/junit-platform.html) instructions.

```xml
<plugin>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>3.0.0-M5</version>
  <configuration>
    <statelessTestsetReporter implementation="org.apache.maven.plugin.surefire.extensions.junit5.JUnit5Xml30StatelessReporter">
      <disable>false</disable>
      <version>3.0</version>
      <usePhrasedFileName>false</usePhrasedFileName>
      <usePhrasedTestSuiteClassName>true</usePhrasedTestSuiteClassName>
      <usePhrasedTestCaseClassName>true</usePhrasedTestCaseClassName>
      <usePhrasedTestCaseMethodName>true</usePhrasedTestCaseMethodName>
    </statelessTestsetReporter>
    <consoleOutputReporter implementation="org.apache.maven.plugin.surefire.extensions.junit5.JUnit5ConsoleOutputReporter">
      <disable>false</disable>
      <encoding>UTF-8</encoding>
      <usePhrasedFileName>false</usePhrasedFileName>
    </consoleOutputReporter>
    <statelessTestsetInfoReporter implementation="org.apache.maven.plugin.surefire.extensions.junit5.JUnit5StatelessTestsetInfoReporter">
      <disable>false</disable>
      <usePhrasedFileName>false</usePhrasedFileName>
      <usePhrasedClassNameInRunning>true</usePhrasedClassNameInRunning>
      <usePhrasedClassNameInTestCaseSummary>true</usePhrasedClassNameInTestCaseSummary>
  </statelessTestsetInfoReporter>
  </configuration>
</plugin>
```

## Assertions

Assertions in JUnit 5 are static methods that we call in our test methods to *verify expected behavior*. 

Each assertion tests whether the given condition is true or not.

If an asserted condition does not evaluate to true then a test failure is reported.

All assertions are defined as part of `org.junit.jupiter.api.Assertions` class:
- `assertTrue()`: Assert that condition is true
- `assertFalse()`: Assert that condition is false
- `assertNull()`: Assert that object is null
- `assertNotNull()`: Assert that object is not null
- `assertEquals()`: Assert that expected and actual are equal
- `assertNotEquals()`: Assert that expected and actual are not equal
- `assertArrayEquals()`: Assert that expected and actual arrays are equals
- `assertSame()`: Assert that expected and actual refer to the same object
- `assertNotSame()`: Assert that expected and actual do not refer to the same object

Here is an example of how to use `assertEquals()`:

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTestAssertions {
   @Test
   void sum() {
      assertEquals(2, Calculator.sum(1, 1));
   }

   @Test
   void sumNegative() {
      assertEquals(-2, Calculator.sum(-1, -1));
   }

   @Test
   void multiply() {
      assertEquals(1, Calculator.multiply(1, 1));
   }
}
```

If we change our previous test method to this:

```java
@Test
void sum() {
  assertEquals(1, Calculator.sum(1, 1));
}
```

Our test should fail:

```output
org.opentest4j.AssertionFailedError: 
Expected :2
Actual   :1

at it.unibz.inf.CalculatorTestAssertions.sum(CalculatorTestAssertions.java:10)
at java.util.ArrayList.forEach(ArrayList.java:1257)
at java.util.ArrayList.forEach(ArrayList.java:1257)
at com.intellij.rt.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:33)
at com.intellij.rt.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:230)
at com.intellij.rt.junit.JUnitStarter.main(JUnitStarter.java:58)
```

## Error vs Failure

In JUnit, there is a difference between *error* and *failure*:
- A **failure** occurs when an assertion is not met.
- An **error** occurs when your test throws an unexpected exception.

```java
class FailureAndErrorTests {
  @Test
  void stringIsNotEmpty() {
      String str = "";
      assertFalse(str.isEmpty());
  }

  @Test
  void thisMethodThrowsException() {
      String str = null;
      assertTrue(str.isEmpty());
  }
}
```

```output
[INFO] Results:
[INFO] 
[ERROR] Failures: 
[ERROR]   FailureAndErrorTests.stringIsNotEmpty:13 expected: <false> but was: <true>
[ERROR] Errors: 
[ERROR]   FailureAndErrorTests.thisMethodThrowsException:19 NullPointer
[INFO] 
[ERROR] Tests run: 2, Failures: 1, Errors: 1, Skipped: 0
```


## Disabling tests

Sometimes, you may need/want to need to disable a given test method, that, is 

```java
class FailureAndErrorTests {
  @Test
  void stringIsNotEmpty() {
      String str = "";
      assertFalse(str.isEmpty());
  }

  @Test
  void thisMethodThrowsException() {
      String str = null;
      assertTrue(str.isEmpty());
  }

  @Test
  @Disabled
  void ignoredMethod() {
      System.out.println("This method will not be executed.");
  }
}
```

```output
[INFO] Results:
[INFO] 
[ERROR] Failures: 
[ERROR]   FailureAndErrorTests.stringIsNotEmpty:13 expected: <false> but was: <true>
[ERROR] Errors: 
[ERROR]   FailureAndErrorTests.thisMethodThrowsException:19 NullPointer
[INFO] 
[ERROR] Tests run: 2, Failures: 1, Errors: 1, Skipped: 1
```


## Exercise

1. Using the class `Person` below, write the `equals` method so that two persons with the same `name` and `age` are the same.
2. Write a test class that tests if your method is working as expected.
3. Try your best to "break" your `equals` method.

```java
public class Person {
   String name;
   int age;

   public Person(String name, int age) {
      this.name = name;
      this.age = age;
   }

   @Override
   public boolean equals(Object o) {
      // WRITE YOUR CODE HERE
   }
}
```

<!-- ## Solution

```java
public class Person {
   String name;
   int age;

   public Person(String name, int age) {
      this.name = name;
      this.age = age;
   }

   @Override
   public boolean equals(Object o) {
      if (this == o) 
        return true;
      
      if (o == null || getClass() != o.getClass()) 
        return false;
      
      Person person = (Person) o;
      return age == person.age && name.compareTo(person.name)==0;
   }

   @Override
   public int hashCode() {
      return Objects.hash(name, age);
   }

   @Override
   public String toString() {
      return String.format("%s: %d", name, age);
   }
}
```

## Solution

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PersonTest {
   @Test
   void testEquals() {
      Person p1 = new Person("Tiago", 30);
      Person p2 = new Person("Tiago", 30);

      assertEquals(p1, p2);
   }

   @Test
   void testSameNameDiffAge() {
      Person p1 = new Person("Tiago", 30);
      Person p2 = new Person("Tiago", 25);

      assertNotEquals(p1, p2);
   }

   @Test
   void testSameAgeDiffName() {
      Person p1 = new Person("Tiago", 30);
      Person p2 = new Person("Davide", 30);

      assertNotEquals(p1, p2);
   }
}
```

## Have you tested...

- Creating persons' names using `new String()`?

  ```java
  @Test
  void nameComparisonShouldWorkWithNewStrings() {
    Person p1 = new Person(new String("Tiago"), 30);
    Person p2 = new Person(new String("Tiago"), 30);

    assertEquals(p1, p2);
  }
  ```

- Comparing names with different cases?

  ```java
  @Test
  void nameComparisonShouldBeCanseInsensitive() {
    Person p1 = new Person("Tiago", 30);
    Person p2 = new Person("tiago", 30);

    assertEquals(p1, p2);
  }
  ```

- Comparing with a null object?

  ```java
  @Test
  void shouldNotBeEqualToNull() {
    Person p1 = new Person("Tiago", 30);
    assertNotEquals(p1, null);
  }
  ```

Does your program break with these tests? If so, how would you fix it? -->

## Assertion method variations

Each `assertXXX` method provided by JUnit has at least three overloaded methods:

```java
@Test
void nullAssertionTest() {
    String str = null;
    assertNull(str);
    assertNull(str, "str should be null");
    assertNull(str, () -> "str should be null");
}
```

1. `assertNull(str)` checks if the input value (i.e., `str`) is `null`.
2. `assertNull(str, "str should be null")` checks if the input value is `null` and allows you to pass in a String message that will be shown if the assertion fails.
3. `assertNull(str, () -> "str should be null")` checks if the input value is `null` and makes uses a lambda expression that will generate the required message if the assertion fails.


## Grouping assertions

JUnit is designed to work best with small test methods:
- It executes each test method within a separate instance of the test class. 
- It reports failure on each test method. 
- It supports sharing setup code between test methods. 

This is a design decision that permeates JUnit, and when you decide to report multiple failures per test, you begin to fight against JUnit, which **is not recommended.**

Instead of doing this:

```java
@Test
void testEverythingAtOnce(){
    assertEquals(Calculator.sum(1, 1), 2);
    assertEquals(Calculator.sum(-1, -1), -2);
    assertEquals(Calculator.multiply(1, 1), 1);
}
```

Do this:

```java
@Test
void sum() {
   assertEquals(Calculator.sum(1, 1), 2);
}

@Test
void sumNegative() {
   assertEquals(Calculator.sum(-1, -1), -2);
}

@Test
void multiply() {
   assertEquals(Calculator.multiply(1, 1), 1);
}
```

## A single assertion per test

JUnit advocates the practice of having **a single assertion per test**.

By single assertion, it means testing a **single behavior**.

The code below is not a bad practice, as it is testing the behavior of `Person::toString()`:
  
```java
@Test
void testToString() {
    Person p = new Person("Tiago", 30);
    String str = p.toString();

    assertTrue(str.contains("Tiago"));
    assertTrue(str.contains("30"));
}
```

What if our test fails in the first assertion? We wouldn't know if the rest of the behavior if executing properly...

In such cases, it is useful to use the `assertAll` method:
- It clubs all related assertions, and 
- Runs them as a single assertion to report only the failed ones. 
- Each of the assertions is specified as a lambda expression

```java
@Test
void testToStringAssertAll() {
  Person p = new Person("Tiago", 30);
  String str = p.toString();

  assertAll(() -> assertTrue(str.contains("Tiago")),
            () -> assertTrue(str.contains("30")) );
}
```

```output
[INFO] Results:
[INFO] 
[ERROR] Failures: 
[ERROR]   PersonTest.testToStringAssertAll:61 Multiple Failures (2 failures)
        org.opentest4j.AssertionFailedError: toString() includes person's name ==> expected: <true> but was: <false>
        org.opentest4j.AssertionFailedError: toString() includes person's age ==> expected: <true> but was: <false>
[INFO] 
[ERROR] Tests run: 1, Failures: 1, Errors: 0, Skipped: 0
```


