---
slug: /collections/collection
course: Programming Project 2021/22
module: Java Collections Framework
title: The Collection Interface
subtitle: null
chapter: 9
section: 2
previous: /collections/introduction
next: /collections/list
---

## Interface: `Collection<E>`

The root interface in the **collection hierarchy**, representing a group of objects, known as its **elements**.

Some collections allow duplicate elements and others do not.

Some are ordered and others unordered.

The JDK does provide any **direct** implementations of this interface: it provides implementations of more specific subinterfaces, like `Set` and `List`.

This interface is typically used to pass collections around and manipulate them where maximum generality is desired.

[Source](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Collection.html)

![](../../figures/collection-hierarchy.png)


## Basic operations

Some basic operations you can always perform in a `Collection<E>`:

- `boolean contains​(Object o)`: Returns true if this collection contains the specified element.
- `boolean containsAll​(Collection<?> c)`: Returns true if this collection contains all of the elements in the specified collection.
- `int size()`: Returns the number of elements in this collection.

But some others you can only perform in a mutable `Collection<E>`:

- `boolean add​(E e)`: Ensures that this collection contains the specified element (optional operation).
- `boolean addAll​(Collection<? extends E> c)`: Adds all of the elements in the specified collection to this collection (optional operation).
- `void clear()`: Removes all of the elements from this collection (optional operation).
- `boolean remove​(Object o)`: Removes a single instance of the specified element from this collection, if it is present (optional operation).
- `boolean removeAll​(Collection<?> c)`: Removes all of this collection's elements that are also contained in the specified collection (optional operation).
- `boolean retainAll​(Collection<?> c)`: Retains only the elements in this collection that are contained in the specified collection (optional operation).

Here is a demo:

```java
import java.util.*;

public class BasicOperations {
   public static void main(String[] args) {
      Collection<String> friends = new ArrayList<>();

      friends.add("Chandler");
      friends.add("Joey");
      friends.add("Monica");

      System.out.println(friends);

      friends.remove("Joey");

      System.out.println(friends);

      System.out.println("Contains Monica? " + friends.contains("Monica"));
      System.out.println("Contains Joey? " + friends.contains("Joey"));

      System.out.println("Collection size: " + friends.size());
   }
}
```

## Traversing collections

We can traverse collections in three ways:
1. Using a `for-each` loop
1. Using the `forEach()` method
1. Using an `Iterator`

### 1. Traversing collections with a `for-each` loop

```java
import java.util.*;

class TraversingWithForEachLoop {
	public static void main(String args[]){
		Collection<String> friends = new ArrayList<>();

		friends.add("Chandler");
		friends.add("Joey");
		friends.add("Monica");
		friends.add("Rachel");
		friends.add("Ross");
		friends.add("Phoebe");

		// Traversing the collection using a for-each loop
		for (String friend : friends) {
			System.out.println(friend);
		}
	}
}
```

### 2. Traversing collections using the `forEach()` method

```java
import java.util.*;

class TraversingWithForEachMethod {
	public static void main(String args[]){
		Collection<String> friends = new ArrayList<>();

		friends.add("Chandler");
		friends.add("Joey");
		friends.add("Monica");
		friends.add("Rachel");
		friends.add("Ross");
		friends.add("Phoebe");

		// Traversing the collection using a forEach method
		friends.forEach( friend -> System.out.println(friend) );
	}
} 
```

More on lambdas in a later class.

### 3. Traversing collections using an `Iterator`

`Iterator` is an interface that allows iterating over elements in a forward direction by using a *cursor pointer* to the current element.

This interface defines three methods:
- `boolean hasNext()`: returns true if iterator has more elements
- `Object next()`: returns the element and moves the cursor pointer to the next element
- `void remove()`: removes the last elements returned by the iterator

And this is how we use it: 

```java
// Create an iterator with its cursor point to the first element in iterable
Iterator<String> itr = iterable.iterator();

// Check if there is a next element
while(itr.hasNext()){

  // Retrieve next element and update cursor
  String value = itr.next();
  
  // Do something with the value
}
```

Thus, the analogous 


```java
import java.util.*;

class TraversingWithIterator {
	public static void main(String args[]){
		// Creating the collection
		Collection<String> friends = new ArrayList<>();

		// Adding objects in the colleciton
		friends.add("Chandler");
		friends.add("Joey");
		friends.add("Monica");
		friends.add("Rachel");
		friends.add("Ross");
		friends.add("Phoebe");

		// Traversing the collection using an Iterator
		Iterator<String> itr = friends.iterator();

		while(itr.hasNext()){
			String friend = itr.next();
			System.out.println(friend);
		}
	}
}
```

## Iterable and Iterator

**[Iterable](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/lang/Iterable.html)**: A simple representation of a series of elements that can be iterated over
- Does not have any iteration state, e.g. a "current element"
- Offers one method that **produces instances of `Iterator`

**[Iterator](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/Iterator.html)**: An object with an iteration state
- Can check if it has more elements using `hasNext()`
- Can move to the next element (if any) using `next()`

An `Iterable` should be able to produce valid instances of `Iterator`

## Printing a collection

Here are two ways in which we can print a collection:

```java
import java.util.*;

public class PrintingCollections {
   public static void main(String[] args) {
      Collection<String> friends = new ArrayList<>();

      friends.add("Chandler");
      friends.add("Joey");
      friends.add("Monica");
      friends.add("Rachel");
      friends.add("Ross");
      friends.add("Phoebe");

      // Option #1
      System.out.println(friends);

      // Option #2
      String value = "{ " + String.join(" - ", friends) + " } ";
      System.out.println(value);
   }
}
```

```output
[Chandler, Joey, Monica, Rachel, Ross, Phoebe]
{ Chandler - Joey - Monica - Rachel - Ross - Phoebe } 
```

