---
slug: /exceptions/custom
course: Programming Project 2021/22
module: Exception Handling
title: Custom Exceptions
subtitle: null
chapter: 5
section: 5
previous: /exceptions/throwables
next: /exceptions/stack-trace
---

## Creating new exception types

Any custom exception or error we create must extend `Throwable` or one of its subclasses

By convention, we add one the two suffixes to our custom exception types: 
- `Exception`
- `Error`

As in:
- `InvalidMessageException`
- `SuperDarkError`

Typically, we declare fours constructors for a custom exception type:
- No parameters
- String parameters
- String and throwable parameters
- Throwable parameter

Whenever possible, extend a more specific exception class
  - `IOException`
  - `ArithmeticException`

Otherwise, decide whether your class should represent checked or unchecked exceptions
- If users should be required to handle it, extend `Exception`
- If users should not be required to handle it, extend `RuntimeException`

Here is an example of a very basic custom exception:

```java
public class MyException extends Throwable {
  public MyException() {}

  public MyException(String message) {
    super(message);
  }

  public MyException(String message, Throwable cause) {
    super(message, cause);
  }

  public MyException(Throwable cause) {
    super(cause);
  }

  @Override
  public String getMessage() {
    return "This is my own exception";
  }
}
```

```java
public class Main {

  public static void main(String[] args) {
    try {
      throwMyException();
    } catch (MyException e) {
      e.printStackTrace();
    }
  }

  public static void throwMyException() throws MyException {
    throw new MyException();
  }

}
```

## Exercise 3: Creating your first custom exception

1. Write a custom exception class called ```WrongFileExtension``` that:
- Contains constructors that accept a `String` as a parameter, which contains a file extension.
- Overrides the ```getMessage()``` method to return a custom message.
2. Write a class main method that reads a file extension from the console using the snippet below:
    ```java
    Scanner scanner = new Scanner(System.in);
    System.out.print("Please enter an file format: ");
    String extension = scanner.nextLine();
    ```
3. If the provided file extension is not equal to `json`, `xml`, or `csv`, throw a `WrongFileExtension`.


You can find the solution to this exercise [here](https://github.com/Programming-Project-2021-22/lecture-exceptions/tree/exercise-3).
