---
slug: /inheritance/introduction
course: Programming Project 2021/22
module: Inheritance
title: Introduction
subtitle: null
chapter: 6
section: 1
previous: /exceptions/stack-trace
next: /inheritance/interfaces
---


## What are Objects?

Objects are key to understanding object-oriented technology. 

Look around right now and you'll find many examples of real-world objects: 
- the lamps
- your laptop 
- your smartphone
- the projector
- the whiteboard

Real-world objects share two characteristics: They all have **state** and **behavior**. 
- Lamps have state (on/off) and behavior (turn-on, turn-off). 
- Laptops have state (open/closed, battery charge, operating system) and behavior (open, close, charge, turn-on, turn-off). 

Identifying the state and behavior for real-world objects is a great way to begin thinking in terms of object-oriented programming.

Take a minute right now to observe the real-world objects that are in your immediate area. For each object that you see, ask yourself two questions: 
- What possible states can this object be in?
- What possible behavior can this object perform?

Software objects are conceptually similar to real-world objects: they too consist of state and related behavior. 
- An object stores its state in fields 
- An object exposes its behavior through methods 

Methods operate on an object's internal state and serve as the primary mechanism for object-to-object communication. 

Hiding internal state and requiring all interaction to be performed through an object's methods is known as **data encapsulation** — a fundamental principle of object-oriented programming.

Consider a bicycle, for example:

By attributing state (current speed, current pedal cadence, and current gear) and providing methods for changing that state, the object remains in control of how the outside world is allowed to use it. For example, if the bicycle only has 6 gears, a method to change gears could reject any value that is less than 1 or greater than 6.

## Benefits of object-oriented programming

Bundling code into individual software objects provides a number of benefits, including:
1. **Modularity:** The source code for an object can be written and maintained independently of the source code for other objects. Once created, an object can be easily passed around inside the system.
1. **Information-hiding**: By interacting only with an object's methods, the details of its internal implementation remain hidden from the outside world.
1. **Code re-use**: If an object already exists (perhaps written by another software developer), you can use that object in your program. This allows specialists to implement/test/debug complex, task-specific objects, which you can then trust to run in your own code.
1. **Pluggability and debugging ease**: If a particular object turns out to be problematic, you can simply remove it from your application and plug in a different object as its replacement. This is analogous to fixing mechanical problems in the real world. If a bolt breaks, you replace it, not the entire machine.


## What are Classes?

In the real world, you'll often find many individual objects all of the same kind. There may be thousands of other bicycles in existence, all of the same make and model. Each bicycle was built from the same set of blueprints and therefore contains the same components. 

In object-oriented terms, we say that your bicycle is an instance of the class of objects known as bicycles. A class is the blueprint from which individual objects are created.

The following `Bicycle` class is one possible implementation of a bicycle:

```java
class Bicycle {

  int cadence = 0;
  int speed = 0;
  int gear = 1;

  void changeCadence(int newValue) {
    cadence = newValue;
  }

  void changeGear(int newValue) {
    gear = newValue;
  }

  void speedUp(int increment) {
    speed = speed + increment;
  }

  void applyBrakes(int decrement) {
    speed = speed - decrement;
  }

  void printStates() {
    System.out.println("cadence:" +
            cadence + " speed:" +
            speed + " gear:" + gear);
  }

}
```

The fields `cadence`, `speed`, and `gear` represent the object's state.

The methods `changeCadence()`, `changeGear()`, `speedUp()`, `applyBreaks()`, and `printStates()` define how we can interact with bicycles objects.

You may have noticed that the `Bicycle` class does not contain a main method. That's because it's not a complete application; it's just the blueprint for bicycles that might be used in an application. The responsibility of creating and using new `Bicycle` objects belongs to some other class in your application.

Here's a `BicycleDemo` class that creates two separate `Bicycle` objects and invokes their methods:

```java
class BicycleDemo {
    public static void main(String[] args) {

        // Create two different 
        // Bicycle objects
        Bicycle bike1 = new Bicycle();
        Bicycle bike2 = new Bicycle();

        // Invoke methods on 
        // those objects
        bike1.changeCadence(50);
        bike1.speedUp(10);
        bike1.changeGear(2);
        bike1.printStates();

        bike2.changeCadence(50);
        bike2.speedUp(10);
        bike2.changeGear(2);
        bike2.changeCadence(40);
        bike2.speedUp(10);
        bike2.changeGear(3);
        bike2.printStates();
    }
}
```

The output of this test prints the ending pedal cadence, speed, and gear for the two bicycles:

```ini
cadence:50 speed:10 gear:2
cadence:40 speed:20 gear:3
```

[source](https://docs.oracle.com/javase/tutorial/java/concepts/class.html)

## What is Inheritance?

- Inheritance is a knowledge representation construct that regards a particular type of relation between types.
- Inheritance enables us to build more specific types based on more generic ones.
- For example:
	- a *checking account* is a kind of *account* in which you can make deposits and withdrawals. 
	- a *truck* is a kind of *vehicle* used for hauling large items.
- Keep in mind that: 
  **if x instantiates B, and B is a subclass of A, x instantiates A as well**.
- Inheritance is a core feature of object-oriented programming, which consists on building classes on top of other classes and interfaces.
- This can be done by:
  - Extending a class
  - Implementing an interface
- Inheritance is a mechanism for code reuse and to allow independent extensions of the original software via public classes and interfaces. 

## Class hierarchies

The relationships of classes (an interfaces) through inheritance give rise to a hierarchy, like the one shown below:

![](../../figures/class-hierarchy.png '#width=400px')

The figure uses the UML class diagram notation and depicts a class hierarchy where:
- `Car`, `Truck`, and `Motorcycle` specialize `Vehicle`
- `SUV` specializes `Car`
- `GarbageTruck` and `FireTruck` specialize `Truck`


## Class inheritance

Java supports class inheritance via the **`extends`** keyword.

When present, `extends` specifies an inheritance relationship between two classes, in which:
- The class name before `extends` identifies the subclass
- The class name after `extends` identifies the superclass 

A class can extend up to 1 other class.

Here are two examples of class inheritance.

```java
class Vehicle {
  // member declarations
}
class Car extends Vehicle {
  // inherit accessible members from Vehicle
  // provide own member declarations
}
class Account {
  // member declarations
}
class SavingsAccount extends Account {
  // inherit accessible members from Account
  // provide own member declarations
}
  ```

In these examples: 
- `Car` is a subclass of `Vehicle`
- `SavingsAccount` is a subclass of `Account`

We generally use the following terminology:
- `Vehicle` and `Account` are called the **base classes**, **parent classes**, or **superclasses**. 
- `Car` and `SavingsAccount` are called **derived classes**, **child classes**, or **subclasses**.

Inheritance has the following "consequences" for child classes:
- They inherit accessible fields and methods from their parent classes and other ancestors.
- They **never inherit constructors**, instead they declare their own. 
- They may declare their own fields and methods.

## Class inheritance: Example

```java
class Account{
  private String name;
  private long amount;

  Account(String name, long amount)   {
    this.name = name;
    setAmount(amount);
  }

  void deposit(long amount)   {
    this.amount += amount;
  }

  String getName()   {
    return name;
  }

  long getAmount()   {
    return amount;
  }

  void setAmount(long amount)   {
    this.amount = amount;
  }
}
```

```java
class SavingsAccount extends Account {
   SavingsAccount(long amount)   {
      super("savings", amount);
   }
}
```

Note that `SavingsAccount` is a trivial class it does not declare additional fields or methods. It does, however, declare a constructor that initializes the fields in its `Account` superclass. 

Initialization happens when Account's constructor is called via Java's **```super```** keyword, followed by a parenthesized argument list.

Note that `super()` can only be called from a child's constructor, not from other methods!

Here is another subclass of `Account`:

```java
class CheckingAccount extends Account {
   CheckingAccount(long amount) {
      super("checking", amount);
   }

   void withdraw(long amount) {
      setAmount(getAmount() - amount);
   }
}
```

Notice that it declares a `withdraw()` method, which calls `setAmount()` and `getAmount()` from `Account`. 

It does that because it cannot directly access the `amount` field in `Account` because it is declared as `private`.

## Controlling access to the members of a class

Access level modifiers determine whether other classes can use a particular field or invoke a particular method. 

There are two levels of access control:

* At the class level, which can be defined as:
  - `public`: a class that is visible by all classes; or
  - package-private: a class that is only visible within its own package.
* At the member level (field or method), which can be defined as:
  - `public`: a member that is accessible by all classes;
  - `protected`: a member that is accessible by classes in the same package or by subclasses anywhere;
  - package-private: a member that is accessible by classes in the same package; or
  - `private`: a member that can only be accessed in its own class.

The following table shows the access to members permitted by each modifier:

|           | Within class | Within pkg | Diff pkg in subclass | Diff pkg |
|-----------|:------------:|:----------:|:--------------------:|:--------:|
| public    |      +       |      +     |           +          |     +    |
| protected |      +       |      +     |           +          |          |
| default   |      +       |      +     |                      |          |
| private   |      +       |            |                      |          |

Legend:
- \+ : accessible         
- blank : not accessible

If other programmers use your class, you want to ensure that errors from misuse cannot happen. Access levels can help you do this.

Here are some tips on choosing an **access level**:  
- Use the most restrictive access level that makes sense for a particular member. Use `private` unless you have a good reason not to.
- Avoid `public` fields except for constants. Public fields tend to link you to a particular implementation and limit your flexibility in changing your code.

[Source](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)

## Controlling access to the members of a class: Example

With the runner below, try to access members of different levels of access

```java
class Runner {

  public static void main(String[] args) {
    SavingsAccount sa = new SavingsAccount(10000);
    System.out.println("account name: " + sa.getName());
    System.out.println("initial amount: " + sa.getAmount());

    sa.deposit(5000);
    System.out.println("new amount after deposit: " + sa.getAmount());

    CheckingAccount ca = new CheckingAccount(20000);
    System.out.println("account name: " + ca.getName());
    System.out.println("initial amount: " + ca.getAmount());

    ca.deposit(6000);
    System.out.println("new amount after deposit: " + ca.getAmount());

    ca.withdraw(3000);
    System.out.println("new amount after withdrawal: " + ca.getAmount());
  }
  
}
```

```ini
account name: savings
initial amount: 10000
new amount after deposit: 15000
account name: checking
initial amount: 20000
new amount after deposit: 26000
new amount after withdrawal: 23000
```


## Exercise 1

1. Write a `public` class named `Vehicle`
    - Add a private `licensePlate` field
    - And protected getter/setter methods for `licensePlate`
2. Extend `Vehicle` with the `public` class `Car`
    - Add a package private `numberOfSeats` field
    - Add protected getter/setter metehods for `numberOfSeats`.
3. Write a `Runner` class where you create a Vehicle and a Car and invoke all its accessible members.

## Final classes

You might declare a class that **should not be extended** using the **`final`** keyword. 

Simply prefix a class header with final, as in:

```java
final class Password {
  // class body
}
``` 

Given this declaration, the compiler will report an error if someone attempts to extend `Password`.

Some reasons to declare classes as final are:

1. **Implementing equals becomes tricky.** Suppose an `Animal` has a single property: name. Should an `Animal` with name `"Fido"` equal a `Dog` with name `"Fido"`?

    ```java
    @Override
    boolean equals(Object o) {
        return o instanceof Animal
                && this.name.equals(((Animal) o).name);
    }
    ```

    What if `Dog` has an additional property `breed` that an `Animal` lacks? There’s no obvious solution here!

2. **Seemingly innocent overrides can have surprising effects.** If a private method calls a public method in the base class, then overriding the public method may have unexpected side-effects on the inner workings of the base class.

3. **Class invariants may break.** The base class perhaps maintains certain internal invariants. Perhaps it’s immutable, or intended to be thread-safe. There’s no way to enforce such design decisions upon subclasses. If you receive an object of the base class type, you technically can’t assume it’s immutable or thread-safe unless it’s final.
