---
slug: /inheritance/overloading
course: Programming Project 2021/22
module: Inheritance
title: Method Overloading
subtitle: null
chapter: 6
section: 6
previous: /inheritance/abstract
next: /inheritance/polymorphism
---

Consider the following classes:

```java
public class GraphicObject {
    int id;

    public GraphicObject(int id) {
      this.id = id;
    }

    public void print() {
      System.out.println("Printing object " + id);
    }
}

public class Rectangle extends GraphicObject {
    public Rectangle(int id) {
      super(id);
    }

    @Override
    public void print() {
      super.print();
      System.out.println("Printing something extra for rectangle " + id);
    }
}
```

Suppose that you wanted to add another `print()` method on `Rectangle`:

```java
public void print(String value) {
    System.out.println( "Printing rectangle " + id + " with parameter \"" + value + "\"");
  }
```

The modified `Rectangle` class now has two `print` methods: 
1. `void print()`
2. `void print(String value)`

The second method does not override `print()`, but **overloads** it!

## Overriding vs. Overloading in Java

**Overriding**:
- Having two methods with the **same method signature**
- One method is in an **ancestor class**
- One is in the **child class**
- Overriding allows a child class to provide a specific implementation of a method that is already provided one of its ancestor classes

**Overloading**:
- Having multiple methods in a class with **the same name** but **different parameters.**

Here is a concrete comparison:

![overloading-overriding](../../figures/overloading-vs-overriding.png)

## Which method will be invoked?

What will be the output of the following program?

```java
class X {
   void method(int a) {
      System.out.println("ONE");
   }

   void method(double d) {
      System.out.println("TWO");
   }
}

class Y extends X {
   @Override
   void method(double d) {
      System.out.println("THREE");
   }
}

public class Quiz1 {
   public static void main(String[] args) {
      new Y().method(100);
   }
}
```

`ONE`, `TWO` or `THREE`?

## Which method will be invoked? (2)

What will be the output of the following program?

```java
class A { }
class B extends A { }
class C { }

public class Quiz2 {
   static void overloadedMethod(A a) {
      System.out.println("ONE");
   }

   static void overloadedMethod(B b) {
      System.out.println("TWO");
   }

   static void overloadedMethod(Object obj) {
      System.out.println("THREE");
   }

   public static void main(String[] args) {
      C c = new C();
      overloadedMethod(c);
   }
}
```

`ONE`, `TWO` or `THREE`?

## Which method will be invoked? (3)

What will be the output of the following program?

```java
class J { }
class K extends J { }
class L extends K { }

public class Quiz3 {
    static void overloadedMethod(J j) {
        System.out.println("ONE");
    }

    static void overloadedMethod(K k) {
        System.out.println("TWO");
    }

    static void overloadedMethod(Object obj) {
        System.out.println("THREE");
    }

    public static void main(String[] args) {
        L l = new L();
        overloadedMethod(l);
    }
}
```

`ONE`, `TWO` or `THREE`?

## Which method will be invoked? (4)

What will be the output of the following program?

```java
class M {}
class N extends M {}
class O extends N {}

public class Quiz4 {
  static void overloadedMethod(M m) {
    System.out.println("ONE");
  }

  static void overloadedMethod(N n) {
    System.out.println("TWO");
  }

  static void overloadedMethod(O o) {
    System.out.println("THREE");
  }

  public static void main(String[] args) {
    M m = new O();
    N n = new O();
    O o = new O();
    overloadedMethod(m);
    overloadedMethod(n);
    overloadedMethod(o);
  }
}
```

`ONE`, `TWO` or `THREE`?  
`ONE`, `TWO` or `THREE`?  
`ONE`, `TWO` or `THREE`?  

## Exercise 7

Write a `Calculator` class that has a method to calculate displacement during uniform acceleration `double calculateDisplacement(double time, double acceleration, double initialVelocity)`

Remember that `d = (v0 * t) + (a * t^2)/2` where:
  - `d`: distance  
  - `v0`: initial velocity  
  - `a`: acceleration  
  - `t`: time  

Overload `calculateDisplacement` with two new versions:
- `double calculateDisplacement(double time, double acceleration)` assuming `initialVelocity = 1`
- `double calculateDisplacement(double time)` assuming also `acceleration = 1`

```java
public class Calculator {

  // Add methods here

  public static void main(String[] args) {
    System.out.println("Distance: " + calculateDistance(10, 1, 1));
    System.out.println("Distance: " + calculateDistance(10, 1));
    System.out.println("Distance: " + calculateDistance(10));
  }

}
```

```ini
Distance: 60.0
Distance: 60.0
Distance: 60.0
```

