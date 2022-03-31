---
slug: /exceptions/exceptions
course: Programming Project 2021/22
module: Exception Handling
title: Introduction
subtitle: null
chapter: 5
section: 1
previous: /java/memory-model
next: /exceptions/throwables
---

## Learning goals

In this module, you will learn about:

1. Exceptional occurrences in our programs
1. `Throwable`, `Exception`, `RuntimeException`, and `Error`
1. Handling exceptions using `try-catch`
1. Declaring exceptions
1. Creating custom exceptions

## Introduction

Consider the following program:

```java
import java.util.Scanner;

public class Main {
   public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);

      System.out.print("Please enter an integer numerator: ");
      int numerator = scanner.nextInt();

      System.out.print("Please enter an integer denominator: ");
      int denominator = scanner.nextInt();

      int quotient = quotient(numerator, denominator);
      System.out.printf("%nResult: %d / %d = %d%n", numerator, denominator, quotient);
   }

   public static int quotient(int numerator, int denominator){
      return numerator / denominator;
   }
}
```

What will happen if we input `0` as the `denominator`?

What if you input a `String` instead of an `int`?

Our program will throw **exceptions**!

## What is an exception?

An exception is *an event, which occurs during the execution of a program, that disrupts the normal flow of the program's instructions*.

Some examples include: 
- Integer division by zero
- Array access out of bound
- Trying to access a field via a null pointer

An exception is an object that contains:
- Information about the error, including its type
- The state of the program when it occurred
- Optionally, other custom information

The term exception is shorthand for the phrase *"exceptional event"*

[Source](https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html)

## What happens when an exception occurs?

**Process**:

1. An exception occurs
1. The method stops executing
1. The method creates an exception object
1. The methods hands the exception object off to the runtime system 
1. The runtime system searches the *call stack* for an *exception handler*
1. If the runtime system finds an appropriate exception handler, the exception is hand to it
1. The exception handler starts to execute

If no exception handler is found on step 6, the program prints the call stack to the console and terminates.

<br/>

![exception-process](../../figures/exceptions-errorOccurs.gif)

In this context, we often use the following expressions:

- **to throw an exception**: refers to the actions of creating an exception object and handing it over to the runtime system.
- **to catch an exception"**: refers to the actions of the runtime system handing over an exception to a piece of code that can handle it.

## Call Stack

The **call stack** is the ordered list of methods that had been called to get to the method where the exception occurred.

Here is a couple of console outputs that show us the call stack from exceptions thrown by our program above.

```output
Please enter an integer numerator: 100
Please enter an integer denominator: 0
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at DivideByZeroNoExceptionHandling.quotient(DivideByZeroNoExceptionHandling.java:7)
	at DivideByZeroNoExceptionHandling.main(DivideByZeroNoExceptionHandling.java:19)
```

```output
Please enter an integer numerator: a
Exception in thread "main" java.util.InputMismatchException
	at java.util.Scanner.throwFor(Scanner.java:864)
	at java.util.Scanner.next(Scanner.java:1485)
	at java.util.Scanner.nextInt(Scanner.java:2117)
	at java.util.Scanner.nextInt(Scanner.java:2076)
	at DivideByZeroNoExceptionHandling.main(DivideByZeroNoExceptionHandling.java:14)
```

We can get the following information from the call stack:

- The thread in which the exception occurred
- The method which threw the exception
- The exact line which threw the exception
- The ordered list of method calls at the moment the exception was thrown, either if it our class or someone else's

**Tip:** To understand what broke your code and discover how to fix it, start by looking at the first method you wrote within the call stack.

## Exception handlers

An **exception handler** is a block of code that can handle exceptions of one or more types.

The basic structure of an exception handler looks like this:

```java
try {
  // The code we want to secure
} catch (ExceptionType exception) {
  // The code we want to execute if an exception of type ExceptionType is thrown
} finally {
  // The code we want to execute regardless if an exception has been thrown or not
}
```

It must have exactly one **`try`** block.

It may have zero or more **`catch`** blocks.

It may at most one **`finally`** block.

However, it must either have a **`catch`** or a **`finally`** block.

Here is how we can add exception handlers to our previous program:

```java
import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    boolean continueLoop = true; // determines if more input is needed

    while (continueLoop) {
      try { // read two numbers and calculate quotient
        System.out.print("Please enter an integer numerator: ");
        int numerator = scanner.nextInt();

        System.out.print("Please enter an integer denominator: ");
        int denominator = scanner.nextInt();

        int quotient = quotient(numerator, denominator);
        System.out.printf("%nResult: %d / %d = %d%n", numerator, denominator, quotient);

        continueLoop = false;
      } catch (InputMismatchException e) {
        e.printStackTrace();
        scanner.nextLine(); // discard input so we can try again
        System.out.printf("You must enter integers. Please try again.%n");
      } catch (ArithmeticException e) {
        e.printStackTrace();
        System.out.printf("Cannot divide by 0. Please try again.%n");
      }
    }
  }

  public static int quotient(int numerator, int denominator) {
    return numerator / denominator;
  }
}
```

## The `try` block

The first step in constructing an exception handler is to enclose the code that might throw an exception within a try block.

```java
try {
  System.out.print("Please enter an integer numerator: ");
  int numerator = scanner.nextInt();
  // ...
}
```

If an exception occurs within the `try` block, it will be first handed to its associated `catch` or `finally` block. 

[Source](https://docs.oracle.com/javase/tutorial/essential/exceptions/try.html)

## The `catch` block

A `catch` block is preceded by a `try` block or another `catch` block.

Here is an example:

```java
catch (ArithmeticException e) {
  // ...
}
```

A `catch` block matches a thrown exception if it is of the type defined in block or a subtype of it.
This means that we can write a `catch` block that matches all by doing:

```java
catch (Exception e) {
  // ...
}
```

We can declare multiple `catch` blocks to handle exception types differently:

```java
catch (InputMismatchException e) {
  // ...
}
catch (ArithmeticException e) {
  // ...
}
```

Or we can catch several specific exception types in a single `catch` block:


```java
catch (ArithmeticException | InputMismatchException e) {
  // ...
}
```

Here is how our previous example would look like:

```java
import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    boolean continueLoop = true; // determines if more input is needed

    while (continueLoop) {
      try { // read two numbers and calculate quotient
        System.out.print("Please enter an integer numerator: ");
        int numerator = scanner.nextInt();

        System.out.print("Please enter an integer denominator: ");
        int denominator = scanner.nextInt();

        int quotient = quotient(numerator, denominator);
        System.out.printf("%nResult: %d / %d = %d%n", numerator, denominator, quotient);

        continueLoop = false;
      } catch (ArithmeticException | InputMismatchException e) {
        e.printStackTrace();
        scanner.nextLine(); // discard input so we can try again
        System.out.printf("Either an ArithmeticException or an InputMismatchException was thrown. Please try again.%n");
      }
    }
  }

  public static int quotient(int numerator, int denominator) {
    return numerator / denominator;
  }
}
```

[Source](https://docs.oracle.com/javase/tutorial/essential/exceptions/catch.html
)

## Exercise 1: Using `try-catch`

1. Write a program that throws an ArrayIndexOutOfBoundsException.
2. Change the previous program so that it will catch the thrown exception.

You can find the solution to this exercise [here](https://github.com/Programming-Project-2021-22/lecture-exceptions/tree/exercise-1).


## The `finally` block

The `finally` block always executes after a `try` block is executed, which ensures that it is executed even if an unexpected exception occurs.

The `finally` block allows programmers to avoid having cleanup code accidentally bypassed by a `return`, `continue`, or `break`. Thus, putting cleanup code in a `finally` block is always a good practice, even when no exceptions are anticipated.

> Note: The finally block may not execute if the JVM exits while the try or catch code is being executed.

Let us observe the how the following code is executed.

```java
public class FinallyExample {
  public static void main(String[] args) {
    try {
      throwException();
      System.out.println("Line after throwException() call");
    } catch (Exception e) {
      System.out.println("Catch block in main()");
    }
    doesNotThrowException();
  }

  public static void throwException() throws Exception {
    try {
      System.out.println("Try block in throwException()");
      throw new Exception();
    } catch (Exception exception) {
      System.out.println("Catch block in throwException()");
      throw exception;
    } finally {
      System.out.println("Finally block in throwException()");
    }
  }

  public static void doesNotThrowException() {
    try {
      System.out.println("Try block in doesNotThrowException()");
    } catch (Exception exception) {
      System.out.println("Catch block in doesNotThrowException()");
    } finally {
      System.out.println("Finally block in doesNotThrowException()");
    }
    System.out.println("End of doesNotThrowException()");
  }
}
```

Now, let us add a finally block to our previous example:

```java
import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    boolean continueLoop = true; // determines if more input is needed

    while (continueLoop) {
      Integer numerator, denominator, quotient = null;

      try { // read two numbers and calculate quotient
        System.out.print("Please enter an integer numerator: ");
        numerator = scanner.nextInt();

        System.out.print("Please enter an integer denominator: ");
        denominator = scanner.nextInt();

        quotient = quotient(numerator, denominator);
        System.out.printf("%nResult: %d / %d = %d%n", numerator, denominator, quotient);

        continueLoop = false;
      } catch (InputMismatchException e) {
        scanner.nextLine(); // discard input so we can try again
        e.printStackTrace();
        System.out.printf("You must enter integers. Please try again.%n");
      } catch (ArithmeticException e) {
        e.printStackTrace();
        System.out.printf("Cannot divide by 0. Please try again.%n");
      } finally {
        if (quotient != null)
          System.out.printf("OK: Successful division!%n");
        else
          System.out.printf("ERROR: Unsuccessful division!%n");
      }
    }
  }

  public static int quotient(int numerator, int denominator) {
    return numerator / denominator;
  }
}
```

[Source](https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html)

## Do we really need the `finally` block?

An actual [question](https://stackoverflow.com/questions/3861522/do-you-really-need-the-finally-block) from Stackoverflow: 

> There are 3 permutations of a try...catch...finally block in java.
> 
> 1. try...catch
> 2. try...catch...finally
> 3. try...finally
> 
> Once the finally block is executed, control goes to the next line after the finally block. If I remove the finally block and move all its statements to the line after the try...catch block, would that have the same effect as having them in the finally block?

Some appropriate answers to this questions are:

1. Exceptions are for actual exceptional situations:
    - You should not assume that the execution of your code will always continue after an execution is thrown.
    - We usually don't want our applications to swallow errors.
2. You may return on the catch block and the finally block will still be executed:  
    ```java
    public void myFunc() {
      double p = 1.0D;
      String str = "bla";
      try {
        p = Double.valueOf(str);
      }
      catch (Exception ex){
        System.out.println("Exception Happened");
        return;  //return statement here!!!
      } finally{
        System.out.println("Finally");
      }
      System.out.println("After finally");
    }
    ```
    ```
    Exception Happened 
    Finally
    ```

## Exercise 2: Using `try-catch-finally`

- Write a main method with two try-catch-finally blocks:
	- In the first try block, throw an exception
	- In the second try block, do not throw an exception
	- In each `try`, `catch`, and `finally` block print out something in the console

You can find the solution to this exercise [here](https://github.com/Programming-Project-2021-22/lecture-exceptions/tree/exercise-2).

## Try-with-resources

The code below uses the try-with-resources statement:

```java
import java.io.FileWriter;
import java.io.IOException;

public class Main {

  public static void main(String[] args) {
    String fileName = "bohemian-rhapsody.txt";
    
    try (FileWriter writer = new FileWriter(fileName)) {
      writer.write("Is this the real life?\n");
      writer.write("Is this just fantasy?\n");
      writer.write("Caught in a landslide\n");
      writer.write("No escape from reality\n");
    } catch(IOException e){
      System.out.println("Could not write to file! :(");
    }
  }

}
```

It may substitute the `finally` block in many occasions.

To use it, however, the resource being open must implement the [**`AutoCloseable`**](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/AutoCloseable.html) interface.

<!-- 
## Exercise 3

- Write the ```Resource1 implements AutoCloseable``` class that prints out something in the `close()` method
- In the main method, write a try-with-resources code that creates a `Resource1` object and just prints something

. . .

```java
public class Runner {

  public static void main(String[] args) {
    try (Resource1 r = new Resource1()) {
      System.out.println("Inside Resource 1 Test TRY block.");
    }

    System.out.println("Inside Resource 1 Test.");
  }

}
```

```java
public class Resource1 implements AutoCloseable {

  @Override
  public void close() {
    System.out.println("Closing open resources in Resource 1.");
  }

}
``` -->


