---
slug: /lambdas/what-is
course: Programming Project 2021/22
module: Lambda Expressions
title: What is a Lambda Expression?
subtitle: null
chapter: 10
section: 2
previous: /lambdas/introduction
next: /lambdas/functional-interfaces
---

## Definition

A lambda expression is a shorter way of writing an implementation of a method for later execution. It is also known as a *closure* or an *anonymous method*

This feature was introduced in Java 8 to replace the "vertical problem" of anonymous classes:

```java
Runnable r = new Runnable() {
  public void run() {
    System.out.println("Howdy, world!");
  }
};
```

```java
Runnable r = () -> System.out.println("Howdy, world!");
```

[Source](https://www.oracle.com/technical-resources/articles/java/architect-lambdas-part1.html)


## Syntax of lambda expressions

- The syntax of a lambda expression is:
  
  **`(formal parameter list) -> { expression or statements }`**
  

  ```java
  (x, y) -> x + y
  ```
  
  ```java
  (x, y) -> { 
    return x + y;
  } 
  ```
  
  ```java
  (int x, int y) -> { 
    return x + y;
  } 
  ```

### Parameter list

A comma-separated list of formal parameters that match the formal parameters of the single method in a functional interface  
  
- Specifying the parameter types is optional (they can be inferred from the context)

  ```java
  (x, y) -> x + y
  ```

- Must be enclosed within parentheses except when a single parameter is specified without its type:

  ```java
  (int x, int y) -> x + y
  ```
  ```java
  (int x) -> x * 2
  ```
  ```java
  x -> x * 2
  ```

- If there are no parameters, empty parentheses must be specified:

  ```java
  () -> System.out.println("Hello lambdas")
  ```

[Source](https://www.oracle.com/technical-resources/articles/java/lambda.html)


### Lambda body

The **lambda body** has a result that must be one of the following:
- `void`, if the functional interface method result is `void`
- A Java type, primitive type, or reference type that is the same as the return type of the functional interface method

The **lambda body result** is returned according to one of the following options:
  
- If a single expression is used, the expression value is returned
  
  ```java
  (int x, int y) -> x + y
  ```
  

- If a statement block is used and the method has a return type, a return statement must be used:
  
  ```java
  (int x, int y) -> {
    x++;
    y++;
    return x + y;
  }
  ```
  

If the functional interface method result is `void`, return statements are optional.

When a lambda expression is invoked, the code in the lambda body is executed.

[Source](https://www.oracle.com/technical-resources/articles/java/lambda.html)


## Examples

Here is an example of how we can use lambda expressions with `forEach()` methods to apply operations on all elements of a collection:

```java
public class Main {
  public static void main(String[] args) {
    Map<String, String> map = new HashMap<>();

    map.put("Reverse Giraffe", "parasite");
    map.put("Morty", "person");
    map.put("Sleepy Gary", "parasite");
    map.put("Beth", "person");
    map.put("Hamuray", "parasite");

    map.keySet().forEach(
      character -> System.out.println(character + ": I'm real!"));
    
    map.keySet().forEach(
      (character) -> System.out.println(character + ": Are you real?"));
    
    map.forEach(
      (character, nature) -> System.out.println(character + ": I'm a " + nature));
    
    map.forEach(
        (String character, String nature) -> System.out.println(character + ": I'm a " + nature));
    
    map.forEach(
        (character, nature) -> {
          if (nature.equals("person")) {
            System.out.println(character + ": Kill the parasites!");
          }
        });
  }
}
```

Here is another example of the use of lambda expressions. This time we are calculating the sum and the product of all numbers in an array:

```java
public class IntReturn {
  public static void main(String[] args) {
    int[] values = {1, 2, 3, 4};

    int sum = reduce(values, 0, (x, y) -> x + y);
    System.out.println("Sum: " + sum);

    int product = reduce(values, 1, (int x, int y) -> x * y);
    System.out.println("Product: " + product);

    int sumOfSquares =
        reduce(
            values,
            0,
            (x, y) -> {
              int ySquared = (int) Math.pow(y, 2);
              return x + ySquared;
            });

    System.out.println("Sum of squares: " + sumOfSquares);
  }

  static int reduce(int[] array, int initial, BinaryOperator operator) {
    for (int value : array) {
      initial = operator.apply(initial, value);
    }

    return initial;
  }
}
```