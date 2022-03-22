---
slug: /generics/type-parameters
course: Programming Project 2021/22
module: Generic Programming
title: Bounded and Unbounded Type Parameters
subtitle: null
chapter: 7
section: 3
previous: /generics/methods
next: /generics/classes
---

##  Upper-bound type parameters

There may be times when you want to restrict the types that can be used as type parameters. 

For example, a method that operates on numbers might only want to accept instances of `Number` or its subclasses. The `Number` class is the superclass of classes `BigDecimal`, `BigInteger`, `Byte`, `Double`, `Float`, `Integer`, `Long`, and `Short`.
   
To declare a bounded type parameter, list the type parameter's name, followed by `extends`, followed by its **upper bound**:

```java
<T extends Number> Number maximum(T number1, T number2, T number3){
  // ...
}
```

Here, `extends` is used in a general sense to mean either:
- `extends`, as in classes
- `implements`, as in interfaces

##  Erasure and upper-bound type parameters
   
This method: 

```java
public static <T extends Comparable<T>> T maximum(T x, T y, T z) {
  T max = x; // assume x is initially the largest
  if (y.compareTo(max) > 0)
    max = y; // y is the largest so far
  if (z.compareTo(max) > 0)
    max = z; // z is the largest
  return max; // returns the largest object
}
```

Becomes:

```java
public static Comparable maximum(Comparable x, Comparable y, Comparable z) {
  Comparable max = x; 
  if (y.compareTo(max) > 0)
    max = y; 
  if (z.compareTo(max) > 0)
    max = z; 
  return max; 
}
```

## Exercise

1. Write a generic method that returns the highest number in a list. 
2. Infer the declaration from the code below

```java
public static void main(String[] args) {
  List<Integer> integers = Arrays.asList(10, 20, 30, 40);
  System.out.println("Max integer: " + getMax(integers));

  List<Long> longs = Arrays.asList(10L, 20L);
  System.out.println("Max long: " + getMax(longs));

  List<Double> doubles = Arrays.asList(10.1, 10.2, 10.3, 10.4);
  System.out.println("Max double: " + getMax(doubles));
}
```

<!-- ## Solution

```java
import java.util.Arrays;
import java.util.List;

public class Exercise2 {

   public static <T extends Number> T getMax(List<T> list) {
      if (list == null || list.size() == 0)
         return null;

      T max = list.get(0);

      for (T value : list) {
         if (max.doubleValue() < value.doubleValue())
            max = value;
      }

      return max;
   }

   public static void main(String[] args) {
      List<Integer> integers = Arrays.asList(10, 20, 30, 40);
      System.out.println("Max integer: " + getMax(integers));

      List<Long> longs = Arrays.asList(10L, 20L);
      System.out.println("Max long: " + getMax(longs));

      List<Double> doubles = Arrays.asList(10.1, 10.2, 10.3, 10.4);
      System.out.println("Max double: " + getMax(doubles));
   }
}
``` -->

##  Wildcards

In generic code, the question mark `?`, called **wildcard**, represents an unknown type. 
- unbounded
- upper bounded
- lower bounded

##  Unbounded wildcards

The unbounded wildcard type is specified using the wildcard character (`?`), for example, `List<?>`. This is called a list of unknown type. 

There are two scenarios where an unbounded wildcard is a useful approach:
- You are writing a method that can be implemented using functionality provided in the `Object` class.
- You are using methods in the generic class that don't depend on the type parameter. E.g., `List.size` or `List.clear`. 

Here is an example of a method that can be implemented using `Object::toString()`:

```java
public static void printList(List<Object> list) {
  for (Object elem : list)
    System.out.println(elem + " ");
  
  System.out.println();
}
```
   
The goal of `printList` is to print a list of any type, but it fails to achieve that goal. It prints only a list of objects, i.e. `List<Object>`. It cannot print `List<Integer>`, `List<String>`, `List<Double>`, because they are not subtypes of `List<Object>`. 

Instead, if we use a wildcard, it can handle all of these cases:
 
```java
public static void printList(List<?> list) {
  for (Object elem: list)
    System.out.print(elem + " ");
  
  System.out.println();
}
```

##  Upper-bounded wildcards

You can use an upper bounded wildcard to relax the restrictions on a variable. 

For example, say you want to write a method that works on 
- `List<Integer>`,
- `List<Double>`, and 
- `List<Number>`.

You can achieve this by using an upper bounded wildcard.
   
```java
List<? extends Number>
```

But what is the difference between:

```java
List<? extends Number>
```

```java
List<T extends Number>
```
   
You declare a `T` so that you **can refer to it again**.

Here is an example in which it is useful to use upper-bounded wildcards:

```java
List<Person> merge( List<? extends Person> list1, List<? extends Person> list2) {
  List<Person> merged = new ArrayList<>();
  merged.addAll(list1);
  merged.addAll(list2);
  return merged;
}
```

Which can later be used as:
   
```java
List<Person> people = merge(new ArrayList<Person>(), new ArrayList<Student>() );
```

or as:
   
```java
List<Person> people = merge(new ArrayList<Student>(), new ArrayList<Teacher>() );
```

None of the above would have worked if the collect method had been declared as:

```java
List<Person> merge(List<Person> list1, List<Person> list2)
```
 
Example from [this](https://softwareengineering.stackexchange.com/questions/303584/what-is-the-difference-between-extends-foo-and-foo) StackOverflow answer.  


##  Lower-bounded wildcards

Say you want to write a method that puts Integer objects into a list. To maximize flexibility, you would like the method to work on **anything that can hold Integer values**, that is:
- `List<Integer>`, 
- `List<Number>`, and 
- `List<Object>` 

To write the method that works on lists of `Integer` and the supertypes of `Integer`, such as `Integer`, `Number`, and `Object`, you would specify: 

```java
List<? super Integer>. 
```

## `<T>` vs. `<?>` (1)

Sometimes, wildcards and type parameters do the same thing, but for certain purposes, you will need type parameters:
- To enforce some relation between parameter types
- To bind the a parameter and the return type of a method

Suppose you want to ensure that the `src` and `dest` lists passed to `copy()` have the same type.

You can do it with type parameters:

```java
public static <T extends Number> void copy(List<T> dest, List<T> src)
```
   
Making it safe to copy elements from `src` to `dest`.

If you were to use a wildcard instead:\

```java
public static void copy(List<? extends Number> dest, List<? extends Number> src)
```
   
You would be able to pass `List<Integer>` and `List<Float>` as `dest` and `src`, making it unsafe to move elements from `src` to `dest`.


## `<T>` vs. `<?>` (2)

Another big difference is that `<T>` allows you to **refer to "T" within the method** as if the concrete class was given. 

```java
public <T extends Animal> void takeThing(ArrayList<T> list){
  T first = list.get(0);
  // ...
}
```

If you had used a wildcard instead, you would not be able to do that:

```java
public void takeThing(ArrayList<? extends Animal> list){
  // ...
}
```
   
