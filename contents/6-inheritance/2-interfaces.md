---
slug: /inheritance/interfaces
course: Programming Project 2021/22
module: Inheritance
title: Interfaces
subtitle: null
chapter: 6
section: 2
previous: /inheritance/introduction
next: /inheritance/overriding
---


## "Programming contracts"

There are a number of situations in software engineering when it is important for disparate groups of programmers to **agree to a "contract" that spells out how their software interacts.** 

Each group should be able to write their code without any knowledge of how the other group's code is written. 

**Interfaces are such contracts.**

An interface is a reference type, similar to a class, that can only contain:
- constants
- abstract methods
- default methods (before Java 8, interfaces could have only abstract methods)
- static methods 
- nested types

Method bodies exist only for default methods and static methods. 

**Interfaces cannot be directly instantiated**, but:
- they can be implemented by classes
- they can be extended by other interfaces 

## Defining an interface

Let us imagine that we want to define a standardized **Application Programming Interface (API)** for controlling cars for all car manufactures to implement.

We could do that by defining an interface!

Defining an interface is very similar to defining a class:

```java
interface CarController extends VehicleController {

  // constant declarations
  double MAX_SPEED = 100;
  double SAFE_SPEED = 80;
  
  // abstract methods
  void accelerate(double targetSpeed);
  double getCurrentSpeed();

  // default methods
  default void evaluateSpeed() {
    if(this.getCurrentSpeed()<=SAFE_SPEED)
      System.out.println("The car is at a safe speed: "+ getCurrentSpeed()+" km/h");
    else
      System.out.println("The car is at a risky speed: "+ getCurrentSpeed()+" km/h");
  }

  // static methods
  static void isSpeedAllowed(double speed) {
    if(speed <= MAX_SPEED)
      System.out.println(speed+" km/h is allowed.");
    else
      System.out.println(speed+" km/h is not allowed.");
  }
  
}
```

## Using an interface

To use an interface, you write a **class that implements the interface.** 

When a concrete class implements an interface, it **provides a method body for each of the methods declared in the interface:** 

```java
class Fiat500Controller implements CarController {
  private double speed = 0;

  @Override
  public void accelerate(double targetSpeed) {
    this.speed = Math.min(targetSpeed, 100);
    System.out.println("Accelerating car to " + speed + " km/h.");
  }

  @Override
  public double getCurrentSpeed() {
    return this.speed;
  }
}
```

In our example, each automobile manufacturer would implement this interface, possibly one per car model. Fiats's implementation would likely be substantially different from Toyota's, but both manufacturers would still adhere to the same interface.


## Interface declaration

An interface declaration consists of 
- modifiers (`public`, `private`, `protected`, `static`...), 
- the keyword `interface`, 
- the interface name, 
- a comma-separated list of parent interfaces (if any), and 
- the interface body. 

For example:

```java
interface CarController extends VehicleController, SafeController {
  // interface body here
}
```

If you do not specify that an interface is `public`, then it is accessible only to classes defined **in the same package as the interface**.

An interface can extend other interfaces, just as a class can extend another class. However, whereas a **class can extend at most one other class**, an interface **can extend any number of interfaces**. 

## Interface body

An interface body can contain: 

**1. Constants**
- implicitly `public`, `static`, and `final`

```java
// this:
double SAFE_SPEED = 80;
// is interpreted as this:
public static final double SAFE_SPEED = 80;
```

**2. Abstract methods** 
- declare only a **method signature**: without braces and terminated with a semicolon
- implicitly `public`
- not implemented  

```java
void accelerate(double targetSpeed);
```

**3. Default methods** 
- defined with the ```default``` modifier 
- implicitly `public`
- implemented
- since Java 8

```java
default void evaluateSpeed() {
  if (this.getCurrentSpeed() <= SAFE_SPEED)
    System.out.println("The car is at a safe speed: "+ getCurrentSpeed()+" km/h");
  else
    System.out.println("The car is at a risky speed: "+ getCurrentSpeed()+" km/h");
}
```

**4. Static methods** 
- defined with the ```static``` modifier
- implicitly `public`
- implemented
- should be invoked with the class name, without the need for creating an instance of the class

```java
static void isSpeedAllowed(double speed) {
  if(speed <= CarController.MAX_SPEED)
    System.out.println(speed+" km/h is allowed.");
  else
    System.out.println(speed+" km/h is not allowed.");
}
```

Noted how all constants and methods in an interface are implicitly `public`? So you may as well omit the `public` modifier in your code.


## Exercise 2

1. Declare the interface `Drawable`
    - Add the method `void draw();`
1. Declare the interface `Printable`
    - Add the method `void print();`
1. Declare the interface `Clearable` that extends `Drawable`
    - Add the method `void clear()`
1. Declare the interface `DrawablePrintableClearable` that extends `Drawable` and `Printable`
    - Add the method `void clear()`

## Implementing an Interface

To declare that a class implements an interface, you include an `implements` clause in the class declaration. 

```java
public class Car implements Drivable {
  // class body here
}
```

Your class can implement **more than one interface**, so the `implements` keyword is followed by a comma-separated list of the interfaces implemented by the class. 
  
```java
public class SuperCar implements Drivable, Flyable {
  // class body here
}
``` 

By convention, the ```implements``` clause follows the ```extends``` clause, if there is one.

```java
public class Car extends Vehicle implements Drivable {
  // class body here
}
```

A **concrete class** that implements an interface must provide implementations for all abstract methods defined in the interface.

```java
public interface Drivable {
  void accelerateTo(double speed);
  void breakTo(double speed);
  void turnTo(double radius);
}
```

```java
public class Car implements Drivable {
  @Override
  public void accelerateTo(double speed) {
    // method body
  }
  
  @Override
  public void breakTo(double speed) {
    // method body
  }

  @Override
  public void turn(double radius) {
    // method body
  }
}
```

## Implementing an interface: Example

Consider the interface `Comparable`, which defines how to compare the size of objects.

```java
public interface Comparable {
  // this (object calling isLargerThan)
  // and other must be instances of the same class.
  // it returns 1, 0, -1 if
  // this is greater than, equal to, or less than other
  int isLargerThan(Comparable other);
}
```

Any class can implement `Comparable` if there is some way to compare the relative "size" of objects that instantiated the class. 
- For strings, it could be the number of characters; 
- For books, it could be the number of pages; 
- For people, it could be the weight; 

If you know that a class implements `Comparable`, then you know that you can compare the size of the objects that instantiate that class.

Here is how a `Rectangle` class could implement the `Comparable` interface: 

```java
public class Rectangle implements Comparable {
  public int width = 0;
  public int height = 0;

  public int getArea() {
    return width * height;
  }

  // the method required to implement
  // the Comparable interface
  @Override
  public int isLargerThan(Comparable other) {
    Rectangle otherRect = (Rectangle) other;
    if (this.getArea() < otherRect.getArea()) return -1;
    else if (this.getArea() > otherRect.getArea()) return 1;
    else return 0;
  }
}
```

## Hierarchies of interfaces and classes

Hierarchies in Java usually involve interfaces and classes, like the one shown below (from the Collection API)
![](../../figures/collection-hierarchy.png)


## Exercise 3

Implement the interfaces from the previous exercises:
- `public class Rectangle implements Drawable`
- `public class Circle implements Printable`
- `public class Triangle implements DrawablePrintableClearable`

Write a `Runner` class for testing.


## Using an interface as a type

When you define a new interface, you are defining a **new reference data type**. So, you can use interface names anywhere you can use any other data type name. 

If you define a reference variable whose type is an interface, **any object you assign to it must be an instance of a class that implements the interface.**

You can only do this:

```java
List<String> strings = new ArrayList<String>();
```

because:

```java
ArrayList implements List
```

## Evolving interfaces

Consider the interface below:

```java
public interface DoIt {
  void doSomething(int i, double x);
  int doSomethingElse(String s);
}
  ```

Suppose that, at a later time, you want to add a third method to `DoIt`, so that the interface now becomes:

```java
public interface DoIt {
  void doSomething(int i, double x);
  int doSomethingElse(String s);
  boolean didItWork(int i, double x, String s);
}
```


If you make this change, then **all classes that implement the old `DoIt` interface will break** because they no longer implement the old interface. 

**Programmers relying on this interface will protest loudly!**

This impact is particularly serious if the **number of classes that implement `DoIt` is large**.

If you want to add additional methods to an interface, you have some non-breaking options: 

1. You could create a `DoItPlus` interface that **extends** `DoIt`

  ```java
  public interface DoItPlus extends DoIt {
    boolean didItWork(int i, double x, String s);
  }
  ```

2. You could define your new methods as **default methods.**
  
  ```java
  public interface DoIt {
   void doSomething(int i, double x);
   int doSomethingElse(String s);
   default boolean didItWork(int i, double x, String s) {
    // Method body 
   }
  }
  ```

3. You could define your new methods as **static methods.**
  
  ```java
  public interface DoIt {
   void doSomething(int i, double x);
   int doSomethingElse(String s);
   static boolean doSomethingStatically() {
    // Method body 
   }
  }
  ```

## Why was default introduced in Java 8?

Java 8 introduced the “Default Method” feature, which allowed developers to add new methods to the interfaces without breaking the existing implementation of these interface.

It provided flexibility to allow interface defined implementations, which will use as default in the situation where a concrete class fails to provide an implementation for that method.

if this:

```java
public interface OldInterface {
    public void existingMethod();
}
```

becomes this:

```java
public interface OldInterface {
    public void existingMethod();
    default public void newDefaultMethod() {
        System.out.println("New default method is added in the interface");
    }
}
```

then this class will still compile successfully:

```java
public class OldInterfaceImplementation implements OldInterface {
    public void existingMethod() {
        // existing implementation is here ...
    }
}
```

and its instances will have a new method:

```java
OldInterfaceImplementation obj = new oldInterfaceImpl();
// print “New default method added in interface”
obj.newDefaultMethod();
```

A considerable motivation for default methods was the complexity of reengineering existing JDK frameworks. 

Modifying one interface in the JDK framework breaks all classes that extends the interface, which means that adding any new method **could break millions of lines of code**. Therefore, default methods have been introduced as a mechanism to extending interfaces in a backward compatible way. 

Default methods can be provided to an interface without affecting the implemented classes as it already includes an implementation. An implementing class can override the default implementation provided by the interface.


## Default versus static methods

Default methods can be overridden in an implementing class, while static cannot.

If a static method belongs to an interface, it can only be invoked via the interface itself, **not via the class implementing the interface**. See:

```java
public interface MyInterface {
    default void defaultMethod(){
        System.out.println("Default");
    }

    static void staticMethod(){
        System.out.println("Static");
    }    
}

public class MyClass implements MyInterface {
    public static void main(String[] args) {
        MyClass.staticMethod(); //not valid - static method may be invoked on containing interface class only
        MyInterface.staticMethod(); //valid
    }
}
```
