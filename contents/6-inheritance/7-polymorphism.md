---
slug: /inheritance/polymorphism
course: Programming Project 2021/22
module: Inheritance
title: Polymorphism
subtitle: null
chapter: 6
section: 7
previous: /inheritance/overloading
next: /inheritance/object
---

**Polymorphism is the ability of an object to take on many forms**. 

The most common use of polymorphism in OOP occurs when a parent class reference is used to refer to a child class object.

Any object that **can pass more than one IS-A test** is considered to be polymorphic. This makes all objects polymorphic, since **they all pass the IS-A test for their own type and for the class `Object`.**

It is important to know that the only possible way to access an object is through a reference variable, which can **only be of one type.** 

Once declared, the type of a reference variable cannot be changed.

Consider the following classes and interface:

```java
public interface Vegetarian { }
public class Animal { }
public class Deer extends Animal implements Vegetarian { }
```

The following statements are true for this example:
- A `Deer` is an `Animal`
- A `Deer` is a `Vegetarian`
- A `Deer` is a `Deer`
- A `Deer` is an `Object`

The following declarations are legal:
```java
Deer d = new Deer();
Animal a = d;
Vegetarian v = d;
Object o = d;
```

The variables `d`, `a`, `v`, and `o` refer to the same `Deer` object in the heap.

## Polymorphism: Example

```java
interface IntA {
   public void doThis();
}

class A implements IntA {
  @Override
  public void doThis() {
    System.out.println("Did this!");
  }

  public void doThat() {
    System.out.println("Did that!");
  }
}

class B extends A {
  public void doSomething() {
    System.out.println("Did something!");
  }
}
```

```java
public class Polymorphism {
  public static void main(String[] args) {
    B b = new B();
    b.doThis();
    b.doThat();
    b.doSomething();

    System.out.println("----");

    A a = new B();
    a.doThis();
    a.doThat();

    System.out.println("----");

    IntA i = new B();
    i.doThis();
  }
}
```

```output
Did this!
Did that!
Did something!
----
Did this!
Did that!
----
Did this!
```

Note that `doThis()` is visible via `a`, `b`, and `i` and prints the same output the whenever it is invoked. `doThat()` however, is only visible to `a` and `b`; and `doSomething()`, is only visible to `b`. 
