---
slug: /inheritance/abstract
course: Programming Project 2021/22
module: Inheritance
title: Abstract Classes
subtitle: null
chapter: 6
section: 5
previous: /inheritance/multiple-inheritance
next: /inheritance/overloading
---
 
## What is an abstract class?

A class that cannot be directly instantiated

An abstract class:
- is declared using the keyword `abstract`
- may be extended by concrete or abstract classes
- may have abstract and concrete methods
- may have a constructor
- may have have any kind of attributes (e.g. non-static, `static`, `final`, `private`, `public`)  
    
```java
abstract class GraphicObject {
  int id;

  GraphicObject(int id){
    this.id = id;
  }

  void print(){
    System.out.println("Printing a Graphic Object");
  }

  abstract void draw();
}
```

If a class includes abstract methods, then it must be declared abstract.

```java
// THIS IS NOT ALLOWED, BECAUSE draw() IS NOT IMPLEMENTED
class GraphicObject {
  
  abstract void draw();
  
  // Remainder of class body...
}
```

A subclass of an abstract class usually provides implementations for all of its abstract methods. If it does not, the subclass itself must also be declared abstract.

```java
abstract class Rectangle extends GraphicObject {
  
  void print();
  
  // Remainder of class body...
}
```

Abstract classes prevent a programmer from instantiating the base class, because a developer **has marked it as having missing functionality**. It also provides compile-time safety so that you can ensure that any classes that extend your abstract class provides the bare minimum functionality to work.


## Abstract Classes vs. Interfaces

**Abstract class:**
- **abstract** keyword
- Attributes:
	- final, regular, static 
	- private, protected, public
- Methods:
	- abstract, static, regular
	- private, protected, public
- Constructors: allowed
- Multiple inheritance: forbidden

**Interface:**
- **interface** keyword
- Attributes:
	- final and static
	- public
- Methods:
	- abstract, static, default
	- public
- Constructors: forbidden
- Multiple inheritance: allowed

