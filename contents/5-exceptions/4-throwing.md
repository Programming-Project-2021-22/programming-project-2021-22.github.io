---
slug: /exceptions/throwing
course: Programming Project 2021/22
module: Exception Handling
title: Throwing Exceptions
subtitle: null
chapter: 5
section: 4
previous: /exceptions/declaring
next: /exceptions/custom
---

Before you can catch an exception, some code somewhere must throw one. 

Any code can throw an exception: 
- your code
- code from a package written by someone (e.g. the packages that come with the Java platform), or
- the Java runtime environment. 

[Source](https://docs.oracle.com/javase/tutorial/essential/exceptions/throwing.html) 

## The `throw` statement

Regardless of what throws the exception, it's always thrown with the `throw` statement.

The `throw` statement requires a single argument: a throwable object. 

Throwable objects are instances of any subclass of the `Throwable` class. 

Here's an example of a throw statement:

```java
throw someThrowableObject;
```

Now, let us look at the `throw` statement in context. 

The following `pop()` method is taken from a class that implements a common stack data structure. The method removes the top element from the stack and returns the object.

```java
public Object pop() {
  Object obj;

  if (size == 0) {
    throw new EmptyStackException();
  }

  obj = objectAt(size - 1);
  setObjectAt(size - 1, null);
  size--;
  return obj;
}
```

The `pop()` method checks to see whether any elements are on the stack. 

If the stack is empty (its `size` is equal to `0`), `pop()` instantiates a new `EmptyStackException` object and throws it. 

Note that the declaration of the `pop()` method does not contain a `throws` clause because `EmptyStackException` is not a checked exception, so pop is not required to state that it might occur.

[Source](https://docs.oracle.com/javase/tutorial/essential/exceptions/throwing.html)

## Chained exceptions

An application often responds to an exception by throwing another exception. In effect, the first exception causes the second exception. It can be very helpful to know when one exception causes another. 

**Chained exceptions** help us do that!

The following example shows how to use a chained exception.

```java
try {
  // some code
} catch (IOException e) {
  throw new Exception("Other IOException", e);
}
```

In this example, when an `IOException` is caught, a new `Exception` exception is created with the original cause attached and the chain of exceptions is thrown up to the next higher level exception handler.

Here is a more extensive example of exception chaining:

```java
public class Main {

  public static void main(String[] args) {
    try {
      method1();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void method1() throws Exception {
    try {
      method2();
    } catch (Exception e) {
      throw new Exception("Exception thrown in method1()", e);
    }
  }

  public static void method2() throws Exception {
    try {
      method3();
    } catch (Exception e) {
      throw new Exception("Exception thrown in method2()", e);
    }
  }

  public static void method3() throws Exception {
    throw new Exception("Exception thrown in method3()");
  }

}
```

Note that the we will see the chained exceptions in the stack trace:

```console
java.lang.Exception: Exception thrown in method1()
	at UsingChainedExceptions.method1(UsingChainedExceptions.java:15)
	at UsingChainedExceptions.main(UsingChainedExceptions.java:5)
Caused by: java.lang.Exception: Exception thrown in method2()
	at UsingChainedExceptions.method2(UsingChainedExceptions.java:23)
	at UsingChainedExceptions.method1(UsingChainedExceptions.java:13)
	... 1 more
Caused by: java.lang.Exception: Exception thrown in method3()
	at UsingChainedExceptions.method3(UsingChainedExceptions.java:28)
	at UsingChainedExceptions.method2(UsingChainedExceptions.java:21)
	... 2 more
```

The following are the methods and constructors in `Throwable` that support chained exceptions.

- `Throwable getCause()`: returns the `Throwable` that caused the current `Throwable`.
- `Throwable initCause(Throwable)`: sets the current `Throwable`'s cause.
- `Throwable(Throwable)`: builds a new `Throwable` ands sets its cause.

