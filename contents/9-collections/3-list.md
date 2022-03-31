---
slug: /collections/list
course: Programming Project 2021/22
module: Java Collections Framework
title: Lists
subtitle: null
chapter: 9
section: 3
previous: /collections/collection
next: /collections/set
---

![](../../figures/collection-hierarchy.png)

## Interface: `List`

A sequential `Collection` that may contain duplicate elements.

It defines methods for:
- **Positional access**: manipulates elements based on their numerical position in the list. 
  Methods: `get()`, `set()`, `add()`, `addAll()`, and `remove()`
- **Search**: searches for a specified object in the list and returns its numerical position. 
  Methods: `indexOf()` and `lastIndexOf()`
- **Iteration**: extends `Iterator` semantics to take advantage of the list's sequential nature. 
  Method: `listIterator()`
- **Range-view**: performs arbitrary range operations on the list. 
    Method: `sublist()`

Available in two general-purpose implementations:
- **ArrayList**
- **LinkedList**
  - **Vector**
  - **Stack**

[Source](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/List.html)

## Class: `ArrayList<E>`

A resizable-array implementation of the `List<E>` interface

Main characteristics:
- May contain duplicate elements (from `List`)
- Allows random access (from `List`)
- May contain `null`
- Maintains insertion order
- Implements all optional `List` methods
- Not synchronized 

[Source](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/ArrayList.html)

In the following, you will find several code snippets that demonstrate how to use an `ArrayList` object.

### `new ArrayList<>()`

```java
import java.util.*;  
class Constructors {  
	public static void main(String args[]){  
		// Builds an empty array list.
		ArrayList<String> names = new ArrayList<>();
		System.out.println("Empty list: " + names);
		names.add("Joey");

		// Build an array list from an existing collection
		ArrayList<String> names2 = new ArrayList<>(names);
		System.out.println("New list from previous list: " + names2);

		// Builds an empty array list that has the specified initial capacity.
		ArrayList<String> names3 = new ArrayList<>(5);
		// The size of the array is still zero
		System.out.println(names3.size());
		// And this statement will throw an exception
		names3.set(2, "Joey");
	}
}
```

```output
Empty list: []
New list from previous list: [Joey]
0
Exception in thread "main" java.lang.IndexOutOfBoundsException: Index 2 out of bounds for length 0
	at java.base/jdk.internal.util.Preconditions.outOfBounds(Preconditions.java:64)
	at java.base/jdk.internal.util.Preconditions.outOfBoundsCheckIndex(Preconditions.java:70)
	at java.base/jdk.internal.util.Preconditions.checkIndex(Preconditions.java:248)
	at java.base/java.util.Objects.checkIndex(Objects.java:373)
	at java.base/java.util.ArrayList.set(ArrayList.java:439)
	at Constructors.main(Constructors.java:20)
```

### `add()`, `remove()`, `get()`

```java
import java.util.*;
public class AddRemoveGet {
   public static void main(String[] args) {
      List<String> friends = new ArrayList<>();
      // Adding elements to the list
      friends.add("Chandler");
      friends.add("Joey");
      friends.add("Monica");
      friends.add("Phoebe");
      System.out.println(friends);

      // Removing an element from the list
      friends.remove("Joey");
      // Removing the element at a given index from the list
      friends.remove(0);
      System.out.println(friends);

      // Getting an element from the list at a given index
      String firstFriend = friends.get(0);
      System.out.println("First friend: " + firstFriend);
      // Get does not remove the element from the list
      System.out.println(friends);
   }
}
```
```output
[Chandler, Joey, Monica, Phoebe]
[Monica, Phoebe]
First friend: Monica
[Monica, Phoebe]
```

### `contains()`, `indexOf()`, `clear()`, `size()`

```java
import java.util.*;
public class ContainsIndexOfClearSize {
   public static void main(String[] args) {
      List<String> friends = new ArrayList<>();
      friends.add("Chandler");
      friends.add("Joey");
      friends.add("Monica");

      // Checking if the array contains an element
      System.out.println("Contains Joey? " + friends.contains("Joey"));
      System.out.println("Contains Phoebe? " + friends.contains("Phoebe"));

      // Getting the index of an element
      System.out.println("IndexOf Joey? " + friends.indexOf("Joey"));

      // Getting the size of the list
      System.out.println("Size:" + friends.size());

      // Removing all elements from the list
      friends.clear();
      System.out.println("Size:" + friends.size());
   }
}
```
```output
Contains Joey? true
Contains Phoebe? false
IndexOf Joey? 1
Size:3
Size:0
```

### `addAll()`

```java
import java.util.*;
public class AddAll {
   public static void main(String[] args) {
      List<String> friends = new ArrayList<>();
      friends.add("Chandler");
      friends.add("Joey");
      System.out.println(friends);

      List<String> newFriends = new ArrayList<>();
      newFriends.add("Monica");
      newFriends.add("Phoebe");
      System.out.println(newFriends);

      friends.addAll(newFriends);
      System.out.println(friends);
   }
}
```

```output
[Chandler, Joey]
[Monica, Phoebe]
[Chandler, Joey, Monica, Phoebe]
```

### `removeAll()`

```java
import java.util.*;
public class RemoveAll {
   public static void main(String[] args) {
      List<String> friends = new ArrayList<>();
      friends.add("Chandler");
      friends.add("Joey");
      friends.add("Monica");
      friends.add("Phoebe");
      System.out.println(friends);

      List<String> noLongerFriends = new ArrayList<>();
      noLongerFriends.add("Monica");
      noLongerFriends.add("Phoebe");
      System.out.println(noLongerFriends);

      friends.removeAll(noLongerFriends);
      System.out.println(friends);
   }
}
```
```output
[Chandler, Joey, Monica, Phoebe]
[Monica, Phoebe]
[Chandler, Joey]
```

### `retainAll()`

```java
import java.util.*;
public class RetainAll {
   public static void main(String[] args) {
      List<String> friends = new ArrayList<>();
      friends.add("Chandler");
      friends.add("Joey");
      friends.add("Monica");
      friends.add("Phoebe");
      System.out.println(friends);

      List<String> noLongerFriends = new ArrayList<>();
      noLongerFriends.add("Monica");
      noLongerFriends.add("Phoebe");
      System.out.println(noLongerFriends);

      friends.retainAll(noLongerFriends);
      System.out.println(friends);
   }
}
```
```output
[Chandler, Joey, Monica, Phoebe]
[Monica, Phoebe]
[Monica, Phoebe]
```

<!-- ## 

```java
import java.util.*;

class Student {
   String name;
   int age;

   Student(String name, int age) {
      this.name = name;
      this.age = age;
   }

   @Override
   public String toString() {
      return "Student {name:'" + name + "', age:" + age + '}';
   }
}

public class ObjectArrayList {
   public static void main(String[] args) {
      List<Student> students = new ArrayList<>();
      students.add(new Student("Mary", 22));
      students.add(new Student("John", 21));
      students.add(new Student("Joe", 23));

      System.out.println(students);

      for (Student student : students) {
         if (student.age > 21)
            System.out.println(student.name + ": I'm " + student.age + "!");
      }
   }
}
``` -->


### `ArrayList<String>`: `sort()`

```java
String[] friendsArray = {"Joey", "Monica", "Phoebe", "Chandler"};
List<String> friends = new ArrayList<>(List.of(friendsArray));

System.out.println("Original: " + friends);

friends.sort(String::compareToIgnoreCase);
System.out.println("Sorted: " + friends);
```

```
Original: [Joey, Monica, Phoebe, Chandler]
Sorted: [Chandler, Joey, Monica, Phoebe]
```

### `ArrayList<Integer>`: `sort()`

```java
Integer[] integers = {10, 5, 20, 0};
List<Integer> list = new ArrayList<>(List.of(integers));

System.out.println("Original:" + list);

list.sort(Integer::compareTo);
System.out.println("Sorted: " + list);
```

```output
Original:[10, 5, 20, 0]
Sorted: [0, 5, 10, 20]
```

### `ArrayList<Person>`: `sort()`

```java
public class Person implements Comparable<Person>{

   String name;
   int age;

   public Person(String name, int age) {
      this.name = name;
      this.age = age;
   }

   @Override
   public String toString() {
      return "("+name + "," + age+")";
   }

   // Compares Person objects by age
   @Override
   public int compareTo(Person other) {
      return this.age - other.age;
   }

}
```

```java
Person tiago = new Person("Tiago", 31);
Person davi = new Person("Davi", 0);
Person camila = new Person("Camila", 33);

ArrayList<Person> people = new ArrayList<>(List.of(tiago, camila, davi));
System.out.println("Original: " + people);

people.sort(Person::compareTo);
System.out.println("Sorted: " + people);
```

```output
Original: [(Tiago,31), (Camila,33), (Davi,0)]
Sorted: [(Davi,0), (Tiago,31), (Camila,33)]
```

## Exercise 1

1. Create a `Dog` class containing two fields:
    - name 
    - age (e.g. int from 1 to 15)
1. Create an `ArrayList` of `Dog` and add four dogs to it
1. Print the `ArrayList`
1. Use a for-i loop method to print dogs older than 10
1. Use a for-each loop to calculate the average age of the dogs in an ArrayList
1. Use an `Iterator` to print dogs older than their average age

<!-- ## Solution

```java
public class Dog {

   private String name;
   private int age;

   public Dog(String name, int age) {
      setName(name);
      setAge(age);
   }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
     if(age < 0 || age > 15)
       throw new IllegalArgumentException("Invalid age: "+age+". Must be 0 <= age <= 15");
    this.age = age;
  }

   @Override
	public String toString() {
		return "(" + name + ", " + age + ')';
	}
}
```

```java
public class Exercise1 {

   public static void main(String[] args) {
      Dog d1 = new Dog("King", 5);
      Dog d2 = new Dog("Rex", 7);
      Dog d3 = new Dog("Boss", 2);
      Dog d4 = new Dog("Duke", 11);

      ArrayList<Dog> dogs = new ArrayList<>();
      dogs.add(d1);
      dogs.add(d2);
      dogs.add(d3);
      dogs.add(d4);

      System.out.println(dogs);

      System.out.println();
      printIfOlderThanTen(dogs);

      System.out.println();
      printIfOlderThanAverage(dogs);
   }

   private static void printIfOlderThanTen(ArrayList<Dog> dogs) {
      System.out.println("Dogs older than " + 10 + ": ");
      for (int i = 0; i < dogs.size(); i++) {
         Dog dog = dogs.get(i);

         if (dog.getAge() > 10) {
            System.out.println(dog);
         }
      }
   }

   private static void printIfOlderThanAverage(ArrayList<Dog> dogs) {
      double averageDogAge = getAverage(dogs);
      System.out.println("Dogs older than " + averageDogAge + " (average): ");
      
      Iterator<Dog> iterator = dogs.iterator();
      while (iterator.hasNext()) {
         Dog dog = iterator.next();
         
         if (dog.getAge() > averageDogAge) {
            System.out.println(dog);
         }
      }
   }

   private static double getAverage(ArrayList<Dog> dogs) {
      double sum = 0;

      for (Dog dog : dogs) {
         sum += dog.getAge();
      }

      return sum / dogs.size();
   }
}
``` -->

## Exercise 2

1. Modify the previous example by adding repeated `Dog` objects
1. Write a method that removes any duplicates from an `ArrayList<E>`:
    - Without using a `Set`
    - Assuming referential equality
<!-- 
## Solution

```java
void removeDuplicates(ArrayList<Dog> dogs) {
   ArrayList<Dog> uniqueList = new ArrayList<>();
   ArrayList<Dog> duplicateList = new ArrayList<>();

   for (Dog dog : dogs) {
      if (!uniqueList.contains(dog)) {
         uniqueList.add(dog);
      } else {
         duplicateList.add(dog);
      }
   }

   for (Dog dog : duplicateList) {
      dogs.remove(dog);
   }
}
```

## Solution using `ListIterator`

```java
void removeDuplicatesIterator(ArrayList<Dog> dogs) {
   ArrayList<Dog> uniqueList = new ArrayList<>();

   ListIterator<Dog> iterator = dogs.listIterator();
   while (iterator.hasNext()) {

      Dog dog = iterator.next();
      
      if (!uniqueList.contains(dog)) {
         uniqueList.add(dog);
      } else {
         iterator.remove();
      }
      
   }
}
``` -->