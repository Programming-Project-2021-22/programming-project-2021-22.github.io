---
slug: /generics/methods
course: Programming Project 2021/22
module: Generic Programming
title: Generic Methods
subtitle: null
chapter: 7
section: 2
previous: /generics/introduction
next: /generics/type-parameters
---

## About generic methods

If the operations performed by several overloaded methods are identical for each argument type, they can be more conveniently coded using a generic method. 

You can write a single generic method declaration that can be called with arguments of different types. 

Based on the types of the arguments passed to the generic method, the compiler handles each method call appropriately. 

The compiler ensures the type safety of your code, preventing many runtime errors.

## Declaring a generic method
	
Here is how we declare a generic method:

```java
public static <T> T maximum(T value1, T value2)
```
    
A generic method declaration has a **type-parameter section**:
- This section is identified by angle brackets that precede the method’s return type. 
- Each type-parameter section contains one or more type parameters, separated by commas. 

  ```java
  public static <T, S> T doSomething(T value1, S value2)
  ```
    
## Type parameter

A **type parameter** is an identifier that specifies a generic type name. 
- It can be used to declare: 
    - the return type 
    - parameter types
    - local variable types in a generic method declaration
- It acts as a placeholder for the type of an argument passed to a generic method
- It can only represent reference types (not primitive types like `int`, `double` and `char`)

A type parameter can:
- be declared only once in the type-parameter section
- but can appear more than once in the method’s parameter list

##  Type parameter naming conventions

By convention, type parameter names are **single, uppercase letters**. which is meant to contrast with variable naming conventions. Otherwise, it would be difficult to tell the difference between a type variable and an ordinary class or interface name.

The most commonly used type parameter names are:
- E - Element (used extensively by the Java Collections Framework)
- K - Key
- N - Number
- T - Type
- V - Value
- S, U, V - 2nd, 3rd, 4th types

## Type safety at compile time

**How does the compiler know the type of T?**  It infers the type from how we invoke the method.

```java
import java.util.*;

public class AddAndReturn {

  public static <T> T addAndReturn(T element, List<T> list) {
      list.add(element);
      return element;
  }

  public static void main(String[] args) {
      String stringElement = "stringElement";
      List<String> stringList = new ArrayList<>();

      String element = addAndReturn(stringElement, stringList);

      Integer integerElement = Integer.valueOf(123);
      List<Integer> integerList = new ArrayList<Integer>();

      Integer element2 = addAndReturn(integerElement, integerList);
  }

}  
```

## Implementing a generic method

A generic method is implemented just like any other method.

The only difference is that you get to declare and use variables of the generic type (e.g. `T`).

```java
public static <T> void printArray(T[] inputArray) {
  for (T element : inputArray)
    System.out.printf("%s ", element);

  System.out.println();
}
```

## Invocation order

**Who is invoked when generic and non-generic methods are available?**  Non-generic methods are given priority.

```java
public class AddAndReturn {
  public static <T> void doSomething(T element) {
      System.out.println("Called generic version.");
  }

  public static void doSomething(Number element) {
      System.out.println("Called Number version.");
  }

  public static void doSomething(Integer element) {
      System.out.println("Called Integer version.");
  }

  public static void main(String[] args) {
      Integer element = Integer.valueOf(123);
      doSomething(element);
  }
}
```

## Erasure at compile-time

**Erasure**: A process in which the Java compiler removes the type-parameter section from a generic method and replaces the parameters' types with actual types.

By default all generic types are replaced with type `Object`. 
  
This:

```java
public static <T> void doSomething(T element) {
  T value = element; 
  // ...
}
```

Becomes this:

```java
public static void doSomething(Object element) {
  Object value = element; 
  // ...
}
```

## Exercise

Write a generic method that: 
- returns true if the parameter is null and false otherwise
- infers from the main method below how the generic method should be declared 

Write another generic method that:
- returns the object it receives as a parameter
- infers the declaration from the code below

```java
public static void main(String[] args) {
  Integer i = null;
  System.out.println(isItNull(i));
  i = 123;
  System.out.println(isItNull(i));

  String s = null;
  System.out.println(isItNull(s));
  s = "Something";
  System.out.println(isItNull(s));

  Integer i2 = returnSame(i);
  System.out.println(i2);

  String s2 = returnSame(s);
  System.out.println(s2);
}
```

<!-- ## Solution

```java
public class Exercise1 {
   public static <T> boolean isItNull(T var) {
      return var == null;
   }

   public static <T> T returnSame(T var) {
      return var;
   }

   public static void main(String[] args) {
      Integer i = null;
      System.out.println(isItNull(i));
      i = 123;
      System.out.println(isItNull(i));

      String s = null;
      System.out.println(isItNull(s));
      s = "Something";
      System.out.println(isItNull(s));

      Integer i2 = returnSame(i);
      System.out.println(i2);

      String s2 = returnSame(s);
      System.out.println(s2);
   }
}
``` -->

