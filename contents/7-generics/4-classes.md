---
slug: /generics/classes
course: Programming Project 2021/22
module: Generic Programming
title: Generic Types
subtitle: null
chapter: 7
section: 4
previous: /generics/type-parameters
next: /arrays/one-dimensional
---

## What is a generic type?

A generic type is a generic class or interface that is parameterized over types.

The following `MyStack` class will be modified to demonstrate the concept:

```java
public class MyStack {

  List<Object> list = new LinkedList<>();

  public void push(Object o) {
      list.addFirst(o);
  }

  public Object pop() {
      Object o = list.getFirst();
      list.removeFirst();
      return o;
  }

  @Override
  public String toString() {
      return list.toString();
  }

}
```

Since `MyStack` methods accept and return instances of `Object`, you are free to pass in whatever you want, provided that it is not one of the primitive types. 

**There is no way to verify, at compile time, how the class is used.**

One part of the code may place an `Integer` in the stack and expect to get integers out of it, while another part of the code may mistakenly pass in a `String`, resulting in a runtime error:

```java
public static void main(String[] args) {
  MyStack stack = new MyStack();

  stack.push("Rick");
  stack.push(10);
  String element = (String) stack.pop(); // => This will throw an exception
  System.out.println(element);
}
```

This is what the generic version of `MyStack` looks like:

```java
public class MyStack<T> {

   List<T> list = new LinkedList<>();

   public void push(T o) {
      list.addFirst(o);
   }

   public T pop() {
      T o = list.getFirst();
      list.removeFirst();
      return o;
   }

   @Override
   public String toString() {
      return list.toString();
   }

}
```

## Why generic classes?

The concept of a **data structure** can be understood independently of the element type it manipulates:
- Stack, 
- Tree, or
- Queue

Generic classes allows implementing data structures in a type-independent manner, which is a big contribution for **software reusability**!

Once you have a generic class, you can use a simple, concise notation to indicate the type(s) that should be used in place of the class’s type parameter(s). 

At compilation time, the compiler ensures the type safety of your code and uses the erasure techniques to enable your client code to interact with the generic class.

## Declaring generic classes

This is how we declare a generic class:

```java
public class MyStack<T> {

  List<T> list = new LinkedList<>();

  public void push(T o) {
      list.addFirst(o);
  }

  public T pop() {
      T o = list.getFirst();
      list.removeFirst();
      return o;
  }

}
```
   
The **type-parameter section** follows the class' name (`<T>` in our example).

A generic class may have multiple type parameters.

Note that, whenever you reuse a type parameter inside your class, you are binding the type of the variable, parameter, or return type to that of the class.

## Using a generic class

When using a generic class, we need to instantiate the type parameter: 

```java
MyStack<String> stack =  new MyStack<>();
```
   
Then, all of its parameterized methods will follow the new type:

```java   
stack.push("Rick");
stack.push("Morty");

String character = stack.pop();
```


You will only be able to pass strings to the `stack.push()` method.

You will not need to cast objects returned from the `stack.pop()` method.

## Multiple type parameters

The `Pair` interface and the `OrderedPair` class both have 2 type parameters:

```java
public interface Pair<K, V> {
    public K getKey();
    public V getValue();
}

public class OrderedPair<K, V> implements Pair<K, V> {
    private K key;
    private V value;
    
    public OrderedPair(K key, V value) {
      this.key = key;
      this.value = value;
    }

    public K getKey()	{ return key; }
    public V getValue() { return value; }
}
```

The following statements create two instantiations of the `OrderedPair` class:

```java
Pair<String, Integer> p1 = new OrderedPair<String, Integer>("Even", 8);
Pair<String, String>  p2 = new OrderedPair<String, String>("hello", "world");
```

## Raw types

A **raw type** is a generic type used without providing a type argument, as in:
   
```java
MyStack rawStack = new MyStack();
```
   
Raw types show up in **legacy code** because lots of API classes (such as the Collections classes) were not generic prior to JDK 5.0

When using raw types, you essentially get **pre-generics behavior** (a `MyStack` **gives you objects**)

For backward compatibility, assigning a parameterized type to its raw type is allowed:

```java
MyStack<Integer> intStack = new MyStack<>();
MyStack rawStack = intStack;
```

But if you assign a raw type to a parameterized type, you get a warning:

```java
MyStack rawStack = new MyStack();           
MyStack<Integer> intStack = rawStack;  
```

## Restrictions on generic types

We can only provide upper-bound restrictions on generic types:

```java
public class MyStack<T extends Person> {
  // class body...
}
```

**You cannot use wildcards at a class level!**

## Why should I write generic classes and interfaces?

Generics enables classes and interfaces to have "parameters". 

Much like the more familiar parameters used in method declarations, type parameters provide a way for you to **re-use the same code with different inputs**. 

Code that uses generics has many benefits over non-generic code:
- Stronger type checks at compile time
- No need for casting
- Enabling programmers to implement generic algorithms


## Exercise

- Create the `OrderedList` generic class: a list that is always ordered
- You should be able to add and remove elements from the list

```java
public static void main(String[] args) {
  OrderedList<String> orderedStringList = new OrderedList<>();
  orderedStringList.add("Rick");
  System.out.println(orderedStringList);

  orderedStringList.add("Morty");
  orderedStringList.add("Beth");
  orderedStringList.add("Beth");
  System.out.println(orderedStringList);

  orderedStringList.remove("Beth");
  System.out.println(orderedStringList);
}
```

```bash
[Rick]
[Beth, Beth, Morty, Rick]
```


<!-- ## Solution

```java
class OrderedList<T extends Comparable<T>> {
   List<T> list = new ArrayList<>();

   public void add(T element){
      for (int i = 0; i < list.size(); i++) {
         T value = list.get(i);

         // if element is smaller than value
         if (element.compareTo(value) <= 0) {
            List<T> smallerValues = list.subList(0, i);
            List<T> higherValues = list.subList(i, list.size());

            list = new ArrayList<>();
            list.addAll(smallerValues);
            list.add(element);
            list.addAll(higherValues);
            return;
         }
      }

      list.add(element);
   }

   public void remove(T element){
      list.remove(element);
   }

   @Override
   public String toString() {
      return list.toString();
   }
}
```

```java
public class Exercise3 {
   public static void main(String[] args) {
      OrderedList<String> orderedStringList = new OrderedList<>();
      orderedStringList.add("Rick");
      System.out.println(orderedStringList);

      orderedStringList.add("Morty");
      orderedStringList.add("Beth");
      orderedStringList.add("Beth");
      orderedStringList.add("Jerry");
      orderedStringList.add("Snuffles");
      System.out.println(orderedStringList);

      orderedStringList.remove("Beth");
      System.out.println(orderedStringList);
   }
}
``` -->

<!-- ## References



Part of the material has been taken from the following sources. The usage of the referenced copyrighted work is in line with fair use since it is for nonprofit educational purposes.

- http://stackoverflow.com/questions/1668408/what-is-the-use-of-t-in-public-static-t-t-addandreturnt-element-collection
- http://stackoverflow.com/questions/16707340/when-to-use-wildcards-in-java-generics
- http://stackoverflow.com/questions/18176594/when-to-use-generic-methods-and-when-to-use-wild-card
- http://tutorials.jenkov.com/java-generics/index.html
- http://www.javapractices.com/topic/TopicAction.do?Id=65
- https://docs.oracle.com/javase/tutorial/java/generics/
- http://beginnersbook.com/2013/12/linkedlist-in-java-with-example/
- https://www.tutorialspoint.com/data_structures_algorithms/linked_list_algorithms.htm
- https://www.tutorialspoint.com/java/java_generics.htm
- https://docs.oracle.com/javase/tutorial/java/generics/types.html -->
