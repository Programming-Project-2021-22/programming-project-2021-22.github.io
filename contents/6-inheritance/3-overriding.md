---
slug: /inheritance/overriding
course: Programming Project 2021/22
module: Inheritance
title: Method Overriding
subtitle: null
chapter: 6
section: 3
previous: /inheritance/interfaces
next: /inheritance/multiple-inheritance
---

## Method overriding

A subclass can **override** (replace) an inherited method so that the subclass's version of the method is called instead. 

An overriding method must specify **the same name, parameter list, and return type** as the method being overridden. 

Here is an example:

```java
class Vehicle {
   private String make;
   private String model;
   private int year;

   Vehicle(String make, String model, int year)   {
      this.make = make;
      this.model = model;
      this.year = year;
   }

   // getters and setters

   void print() {
     System.out.println("Make: " + make + ", Model: " + model + ", Year: " + year);
   }
}
```

```java
class Truck extends Vehicle {
   private double tonnage;

   Truck(String make, String model, int year, double tonnage)   {
      super(make, model, year);
      this.tonnage = tonnage;
   }

   double getTonnage()   {
      return tonnage;
   }

   void print()   {
      super.print();
      System.out.println("Tonnage: " + tonnage);
   }
}
```

`Truck`'s `print()` method has the same name, return type, and parameter list as `Vehicle`'s `print()` method. 

Note that `Truck`'s `print()` method first calls `Vehicle`'s `print()` method by prefixing `super` to the method name. It often makes sense to execute the superclass logic first and then execute the subclass logic.

In order to call a superclass method from the overriding subclass method, prefix the method's name with the reserved word `super` and the member access operator. Otherwise you will end up recursively calling the subclass's overriding method. 

```java
void print()   {
  super.print();
  System.out.println("Tonnage: " + tonnage);
}
```

In some cases a subclass will mask non-private superclass fields by declaring same-named fields. You can use super and the member access operator to access the non-private superclass fields.

```java
class Vehicle {
  String make;
  // ...
}

class Truck extends Vehicle {
  String make; 
  // ...
  void print() {
    super.make;
    this.make;
    // ...
  }
}
```

## `@Override`

It is a good practice to annotate the overriding methods with the annotation `@Override`

```java
@Override
void print()   {
    super.print();
    System.out.println("Tonnage: " + tonnage);
  }
```

**Advantages:** 
- Compile-time checking to make sure you actually are overriding the correct method. If you make the common mistake of misspelling a method name or incorrectly matching its parameters, you will be warned!
- It makes your code easier to understand because it is more obvious when methods are overwritten.


## `this` vs `super`

- `this` refers to this class
- `super` refers to the parent class

```java
class Animal {
  public void whoAreYou() {
    System.out.println("I am an animal");
  }
}

class Fish extends Animal {
  public void whoAreYou() {
    System.out.println("I am a Fish");
  }

  public void whoAreYouReally() {
    super.whoAreYou();
    this.whoAreYou();
  }
}

public class ThisSuper {
  public static void main(String[] args) {
    Animal a = new Animal();
    a.whoAreYou();
    System.out.println("---");
    Fish f = new Fish();
    f.whoAreYou();
    System.out.println("---");
    f.whoAreYouReally();
  }
}
```

```output
I am an animal
---
I am a Fish
---
I am an animal
I am a Fish
```

## Use final to block method overriding

Occasionally you might need to declare a **method that should not be overridden** (for security reasons, for instance). 

You can use the `final` keyword for this purpose, as in 

```java
final String getMake()
``` 

The compiler will then report an error if anyone attempts to override this method in a subclass.

## Exercise 4

Modify the class `Car` from the previous exercise such that it overrides `setLicensePlate(String)` defined in `Vehicle`.

```java
public class Car extends Vehicle {
  int numberOfSeats = 4;
}
```

```java
public class Vehicle {
  private String licensePlate;

  public String getLicensePlate() {
    return licensePlate;
  }

  public void setLicensePlate (String licensePlate) {
    this.licensePlate = licensePlate;
  }
}
```

## Exercise 5

Using the `Bicycle` class below:

```java
public class Bicycle {
  int speed = 0;
  int gear = 1;

  void changeGear(int newValue) {
    gear = newValue;
  }

  void speedUp(int increment) {
    speed = speed + increment;
  }

  void applyBrakes(int decrement) {
    speed = speed - decrement;
  }

  @Override
  public String toString()  {
    return "speed:" + speed + ", gear:" + gear;
  }
}
```

Write a `MountainBike` class that specialize it, such that:
- It has a new field, `int seatHeight`
- Its minimum `gear` value is 1 and its maximum `gear` value is 4.
- Its `toString()` method reuses `Bicycle::toString()` but adds the `seatHeight` value.

Now write a `Runner` class that creates objects and call methods of both classes.

## Exercise 6

Write `InverseString`, a class that implements the [`java.lang.CharSequence`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/CharSequence.html) interface. 

You will have to implement:
- `char charAt(int index)`: Returns the char value at the specified index.
- `int length()`: Returns the length of this character sequence.
- `CharSequence subSequence(int start, int end)`: Returns a CharSequence that is a subsequence of this sequence.
- `String toString()`: Returns a string containing the characters in this sequence in the same order as this sequence.

The special characteristic of `InverseString` is that it inverts the `CharSequence` given as input in its constructor.

Then, write a small `main()` method to test your class; make sure to call all four methods.
 
