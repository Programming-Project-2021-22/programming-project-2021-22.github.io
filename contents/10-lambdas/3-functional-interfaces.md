---
slug: /lambdas/functional-interfaces
course: Programming Project 2021/22
module: Lambda Expressions
title: Functional Interfaces
subtitle: null
chapter: 10
section: 3
previous: /lambdas/what-is
next: /lambdas/local-variables
---

## Functional interfaces

A lambda expression is used with a **functional interface**, i.e. an interface with one `abstract` method.

Functional interfaces may have `default` and `static` methods.

Some examples of functional interfaces are: 
- `java.lang.Consumer`, which only has the method `accept()`
- `java.lang.Runnable`, which only has the method `run()`
- `java.lang.Comparable`, which only has the method `compareTo()`
- `java.lang.AutoCloseable`, which only has the method `close()`

## Examples

The `Helloable` interface we saw in the beginning of this module is a functional interface: 

```java
public interface Helloable {
   abstract void sayHello(Character character);
}
```

And so is:

```java
@FunctionalInterface
public interface Runnable {
   public abstract void run();
}
```

And:

```java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

## Target type of a lambda expression

The interface for which a lambda expression is invoked is called its **target type**:

  ```java
  Helloable custom =
        c -> System.out.println("Hello " + c.firstName.charAt(0) + ". " + c.lastName);

  sayHelloEverybody(
        characters, 
        c -> System.out.println("Hello " + c.firstName.charAt(0) + ". " + c.lastName));
  ```

The target type of a lambda expression must:
- Be a functional interface 
- Be inferrable from the context in which is used

You can use lambda expressions in:
- A variable declaration
- An assignment
- A return statement
- An array initializer
- Method or constructor arguments
- A lambda expression body
- A ternary conditional expression
- A cast expression
