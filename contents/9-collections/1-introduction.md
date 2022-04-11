---
slug: /collections/introduction
course: Programming Project 2021/22
module: Java Collections Framework
title: Introduction
subtitle: null
chapter: 9
section: 1
previous: /arrays/limitations
next: /collections/collection
---

The Java Collections Framework provides:

- A set of **standard interfaces**: 
   - Collection, 
   - List, 
   - Queue, 
   - Set...
- A set of **standard implementations** of these interfaces: 
   - ArrayList, 
   - LinkedList, 
   - Stack...
	
We can use standard implementations or we can **implement your own** collections!

![](../../figures/collection-hierarchy.png)

The framework was designed to meet several goals, such as
- high-performance 
- homogeneous interfaces
- high degree of interoperability
- ease of extensibility

## Collections

For each data structure, the framework provides:

1. **Interfaces**: 
    - Abstract data structures
    - Allow collections to be manipulated independently of the details of their implementation 
2. **Implementations**:
    - Reusable data structures
    - Concrete implementations of a collection interface(s)
3. **Algorithms**:
    - Methods that perform useful computations on these data structures:
      - Searching
      - Sorting
    - Algorithms are polymorphic

Here are two examples:

### List

A countable number of ordered values, where the same value may occur more than once (from [Wikipedia](https://en.wikipedia.org/wiki/List_(abstract_data_type))).

- Interface: `List` 
- Implementation: `ArrayList<E>` class
- Algorithms and methods: 
  - `add()`
  - `remove()`
  - `sort()`
  - `contains()`

### Queue

A sequence of values that be modified by additions at one end and removals on the other (from [Wikipedia](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)))

- A **first-in-first-out** data structure
- Interface: `Queue` 
- Implementation: `PriorityQueue` class
- Algorithms and methods: 
  - `offer()`
  - `poll()`
  - `peek()`


## Quick demo

```java
import java.util.*;

public class Runner {

	public static void main(String[] args) {
		List<String> friends = new ArrayList<>();

		friends.add("Rachel");
		friends.add("Ross");
		friends.add("Joey");
		friends.add("Monica");
		friends.add("Phoebe");
		friends.add("Chandler");
		System.out.println(friends);

		String thirdFriend = friends.get(2);
		System.out.println("Third element: "+ thirdFriend);

		for (String friend : friends) {
			System.out.println("Hello! I'm "+friend+".");
		}
	}
}
```

## Generic collections

Did you notice that we declared our `friends` list as `List<String>`?

We did it because `List` is a **generic interface**
- `String` is the type of element held in our list
- It parametrizes many methods available in our list

It is recommended to declare your collections' types:

```java
List<Integer> numbers;
List<String> names;
List<Person> friends;
```
   
When declaring and constructing a collection, you can specify the type once:

```java
// If you do this:
List<String> names = new ArrayList<>();

// The compiler interprets as this:
List<String> names = new ArrayList<String>();
```

If you do not declare your collection type, this is what happens:

```java
import java.util.ArrayList;

public class NonGenericArrayList {
   public static void main(String[] args) {
      ArrayList list = new ArrayList();

      // It behaves as if you have done this:
      // ArrayList<Object> list = new ArrayList();

      // It accepts any object type
      list.add(2);
      list.add("John");
      list.add(true);

      System.out.println(list);

      // But you have to cast every time you retrieve an element
      Integer integer = (Integer) list.get(0);
      String string   = (String) list.get(1);

      // And wrong casting can generate an Exception
      Integer secondInteger = (Integer) list.get(1);
   }
}
```

